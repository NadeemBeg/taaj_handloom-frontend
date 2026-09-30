import type { Product, CategoryRef } from '../types/catalog';

export function categorySlugOf(product: Product): string | undefined {
  const c = product.category;
  if (c && typeof c === 'object') return (c as CategoryRef).slug;
  return undefined;
}

/** Category display name, when the category is populated. */
export function categoryNameOf(product: Product): string | undefined {
  const c = product.category;
  return c && typeof c === 'object' ? (c as CategoryRef).name : undefined;
}

/** SEO-friendly product URL, e.g. /sarees/maheshwari-saree-green */
export function productPath(product: Product): string {
  const cat = categorySlugOf(product) ?? 'shop';
  return `/${cat}/${product.slug}`;
}

/** Absolute URL for a site path — safe to share in WhatsApp messages. */
export function absoluteUrl(path: string): string {
  if (typeof window === 'undefined') return path;
  try {
    return new URL(path, window.location.origin).toString();
  } catch {
    return path;
  }
}
