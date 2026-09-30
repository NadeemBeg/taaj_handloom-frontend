import { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts, useCategoryBySlug, useCategoryTree } from '../hooks/useCatalog';
import { ProductGrid } from '../components/product/ProductGrid';
import { CategoryCircle } from '../components/catalog/CategoryCircle';
import { CategoryRail } from '../components/catalog/CategoryRail';
import { Pagination } from '../components/catalog/Pagination';
import { ProductFilters, type CatalogFilters } from '../components/catalog/ProductFilters';
import { SortSelect, type SortValue } from '../components/catalog/SortSelect';
import { EmptyState, ErrorState } from '../components/ui/feedback';
import { SeoHead } from '../components/SeoHead';
import { CATEGORY_PAGES } from '../config/site';
import type { ProductListParams } from '../api/catalog';

const EMPTY_FILTERS: CatalogFilters = { colors: [] };

export function Catalog() {
  const { categorySlug } = useParams();
  const fallback = categorySlug ? CATEGORY_PAGES[categorySlug] : undefined;
  const category = useCategoryBySlug(categorySlug);
  const { tree } = useCategoryTree();
  // The department in view: the current parent, or the parent that owns the
  // current child. Its circular rail shows the parent + all its children.
  const dept = useMemo(() => {
    if (!categorySlug) return null;
    const parent = tree.find((p) => p.slug === categorySlug);
    if (parent) return parent;
    return tree.find((p) => p.children.some((c) => c.slug === categorySlug)) ?? null;
  }, [tree, categorySlug]);

  const [filters, setFilters] = useState<CatalogFilters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortValue>('newest');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Reset paging when the category, filters, or sort change.
  useEffect(() => setPage(1), [categorySlug, filters, sort]);

  const params: ProductListParams = useMemo(
    () => ({
      page,
      limit: 12,
      sort,
      category: categorySlug,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      color: filters.colors.length ? filters.colors : undefined,
      inStock: filters.inStock,
      hasDiscount: filters.hasDiscount,
      isNewArrival: filters.isNewArrival,
      isBestSeller: filters.isBestSeller,
    }),
    [page, sort, categorySlug, filters],
  );

  const { data, isLoading, isError, refetch } = useProducts(params);

  const title = category?.name ?? fallback?.title ?? (categorySlug ? categorySlug : 'All Products');
  const blurb = category?.description ?? fallback?.blurb;

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const breadcrumbLd = categorySlug
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Shop', item: `${origin}/products` },
          { '@type': 'ListItem', position: 3, name: title, item: `${origin}/${categorySlug}` },
        ],
      }
    : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <SeoHead
        title={title}
        description={blurb}
        canonical={categorySlug ? `/${categorySlug}` : '/products'}
        jsonLd={breadcrumbLd}
      />

      <header className="mb-6">
        {categorySlug && (
          <nav className="mb-2 text-xs text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-deep">Home</Link>
            <span className="px-1.5">/</span>
            <Link to="/products" className="hover:text-brand-deep">Shop</Link>
            <span className="px-1.5">/</span>
            <span className="text-charcoal/70">{title}</span>
          </nav>
        )}
        <h1 className="font-display text-3xl text-charcoal sm:text-4xl">{title}</h1>
        {blurb && <p className="mt-2 max-w-2xl text-charcoal/60">{blurb}</p>}

        {dept && (
          <div className="mt-5">
            <CategoryRail>
              {[dept, ...dept.children].map((cat) => (
                <CategoryCircle key={cat._id} category={cat} active={cat.slug === categorySlug} size="sm" />
              ))}
            </CategoryRail>
          </div>
        )}
      </header>

      <div className="flex items-center justify-between gap-3 border-y border-brand/10 py-3">
        <button
          onClick={() => setShowFilters(true)}
          className="inline-flex items-center gap-2 rounded-full border border-brand/20 px-4 py-2 text-sm font-medium text-charcoal lg:hidden"
        >
          <FilterIcon /> Filters
        </button>
        <p className="hidden text-sm text-charcoal/50 lg:block">
          {data ? `${data.meta.total} product${data.meta.total === 1 ? '' : 's'}` : ' '}
        </p>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <div className="mt-6 flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl bg-white p-5 ring-1 ring-black/5">
            <ProductFilters value={filters} onChange={setFilters} onClear={() => setFilters(EMPTY_FILTERS)} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {isError ? (
            <ErrorState onRetry={() => refetch()} />
          ) : isLoading ? (
            <ProductGrid loading />
          ) : data && data.items.length > 0 ? (
            <>
              <ProductGrid products={data.items} />
              <div className="mt-10">
                <Pagination page={data.meta.page} totalPages={data.meta.totalPages} onChange={setPage} />
              </div>
            </>
          ) : (
            <EmptyState
              title="No products found"
              description="Try adjusting your filters or explore another category."
            />
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] overflow-y-auto bg-white p-5 shadow-xl">
            <ProductFilters value={filters} onChange={setFilters} onClear={() => setFilters(EMPTY_FILTERS)} />
            <button
              onClick={() => setShowFilters(false)}
              className="mt-6 w-full rounded-full bg-brand-deep py-2.5 text-sm font-medium text-white"
            >
              Show results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}
