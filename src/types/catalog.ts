/** Client-side catalog types mirroring the backend product JSON. */

export interface ProductImage {
  url: string;
  publicId?: string;
  alt?: string;
}

export interface Pricing {
  mrp: number;
  price: number;
  wholesalePrice?: number;
  minWholesaleQty?: number;
}

export interface Stock {
  quantity: number;
  reserved: number;
  sold: number;
  lowStockThreshold: number;
}

export interface CategoryRef {
  _id: string;
  name: string;
  slug: string;
}

export interface Product {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  sku: string;
  category?: CategoryRef | string;
  subcategory?: CategoryRef | string | null;
  shortDescription?: string;
  description?: string;
  careInstructions?: string;
  pricing: Pricing;
  attributes?: {
    fabric?: string;
    material?: string;
    pattern?: string;
    occasion?: string[];
    tags?: string[];
  };
  media: {
    mainImage: ProductImage;
    gallery?: ProductImage[];
    video?: ProductImage;
  };
  flags?: {
    isFeatured?: boolean;
    isBestSeller?: boolean;
    isNewArrival?: boolean;
    isActive?: boolean;
  };
  hasVariants?: boolean;
  baseStock?: Stock;
}

export interface Variant {
  _id: string;
  sku: string;
  color: { name: string; hex?: string };
  size?: string;
  price?: number;
  mrp?: number;
  wholesalePrice?: number;
  stock?: Stock;
  images?: ProductImage[];
  isActive?: boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: ProductImage;
  parent?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  seo?: { title?: string; description?: string };
}

export interface Banner {
  _id: string;
  type: 'HERO' | 'STRIP' | 'CATEGORY_TILE' | 'CTA';
  title?: string;
  subtitle?: string;
  desktopImage: ProductImage;
  mobileImage?: ProductImage;
  ctaLabel?: string;
  ctaHref?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface SiteSettings {
  brand?: { name?: string; tagline?: string; logo?: ProductImage };
  whatsappNumber?: string;
  phone?: string;
  email?: string;
  address?: { line1?: string; city?: string; state?: string; pincode?: string; country?: string };
  social?: { instagram?: string; facebook?: string; youtube?: string };
  announcement?: string;
  seo?: { title?: string; description?: string };
  homeSections?: { key: string; enabled: boolean; order: number }[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
