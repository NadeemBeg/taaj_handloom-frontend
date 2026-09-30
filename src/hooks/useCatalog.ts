import { useMemo } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
  fetchProducts,
  fetchProductBySlug,
  fetchCategories,
  fetchBanners,
  searchProducts,
  type ProductListParams,
} from '../api/catalog';
import type { Category } from '../types/catalog';

export interface CategoryNode extends Category {
  children: Category[];
}

export function useProducts(params: ProductListParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    placeholderData: keepPreviousData, // smooth pagination/filtering
  });
}

export function useProduct(slug: string | undefined) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug as string),
    enabled: Boolean(slug),
  });
}

export function useCategories() {
  return useQuery({ queryKey: ['categories'], queryFn: fetchCategories, staleTime: 5 * 60_000 });
}

/** Categories grouped into a parent → children tree (one level deep). */
export function useCategoryTree() {
  const query = useCategories();
  const tree = useMemo<CategoryNode[]>(() => {
    const all = query.data ?? [];
    const parents = all.filter((c) => !c.parent);
    const byParent = new Map<string, Category[]>();
    for (const c of all) {
      if (c.parent) {
        const list = byParent.get(c.parent) ?? [];
        list.push(c);
        byParent.set(c.parent, list);
      }
    }
    const order = (a: Category, b: Category) =>
      (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name.localeCompare(b.name);
    return parents
      .sort(order)
      .map((p) => ({ ...p, children: (byParent.get(p._id) ?? []).sort(order) }));
  }, [query.data]);
  return { ...query, tree };
}

/** Look up a single category by slug from the cached list. */
export function useCategoryBySlug(slug: string | undefined) {
  const { data } = useCategories();
  return useMemo(
    () => (slug ? (data ?? []).find((c) => c.slug === slug) : undefined),
    [data, slug],
  );
}

export function useBanners(type = 'HERO') {
  return useQuery({
    queryKey: ['banners', type],
    queryFn: () => fetchBanners(type),
    staleTime: 5 * 60_000,
  });
}

export function useSearch(q: string) {
  return useQuery({
    queryKey: ['search', q],
    queryFn: () => searchProducts(q, 12),
    enabled: q.trim().length > 1,
  });
}
