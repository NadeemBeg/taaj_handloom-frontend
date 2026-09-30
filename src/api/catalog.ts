import { apiClient } from '../lib/apiClient';
import type { Banner, Category, PaginationMeta, Product, SiteSettings, Variant } from '../types/catalog';

interface Envelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ProductListParams {
  page?: number;
  limit?: number;
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string[];
  inStock?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  hasDiscount?: boolean;
  fabric?: string;
  pattern?: string;
  occasion?: string;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'best_selling';
}

export async function fetchProducts(
  params: ProductListParams,
): Promise<{ items: Product[]; meta: PaginationMeta }> {
  const res = await apiClient.get<Envelope<{ items: Product[]; meta: PaginationMeta }>>('/products', {
    params,
    // Axios serializes array params as color[]=a&color[]=b by default; backend
    // accepts repeated `color` too. Use comma-free repeat for clarity.
    paramsSerializer: { indexes: null },
  });
  return res.data.data;
}

export async function fetchProductBySlug(
  slug: string,
): Promise<{ product: Product; variants: Variant[] }> {
  const res = await apiClient.get<Envelope<{ product: Product; variants: Variant[] }>>(
    `/products/${slug}`,
  );
  return res.data.data;
}

export async function searchProducts(q: string, limit = 8): Promise<Product[]> {
  const res = await apiClient.get<Envelope<{ results: Product[] }>>('/products/search', {
    params: { q, limit },
  });
  return res.data.data.results;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await apiClient.get<Envelope<{ categories: Category[] }>>('/categories');
  return res.data.data.categories;
}

export async function fetchBanners(type = 'HERO'): Promise<Banner[]> {
  const res = await apiClient.get<Envelope<{ banners: Banner[] }>>('/banners', { params: { type } });
  return res.data.data.banners;
}

export async function fetchSettings(): Promise<SiteSettings> {
  const res = await apiClient.get<Envelope<{ settings: SiteSettings }>>('/settings');
  return res.data.data.settings;
}

export interface AppliedCoupon {
  code: string;
  type: 'PERCENT' | 'FLAT';
  value: number;
  discount: number;
}
export async function validateCoupon(code: string, subtotal: number): Promise<AppliedCoupon> {
  const res = await apiClient.post<Envelope<AppliedCoupon>>('/coupons/validate', { code, subtotal });
  return res.data.data;
}
