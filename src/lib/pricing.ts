import type { CustomerType } from '../store/customer';

interface PricingLike {
  mrp: number;
  price: number;
  wholesalePrice?: number;
  minWholesaleQty?: number;
}

export interface ResolvedPrice {
  price: number;
  mrp: number;
  isWholesale: boolean;
  minQty: number;
}

/**
 * Resolve the effective price for the active shopping mode. In wholesale mode we
 * use the product's wholesale price (falling back to retail if none is set) and
 * surface the minimum order quantity. Optional variant overrides win.
 */
export function resolvePrice(
  base: PricingLike,
  customerType: CustomerType,
  overrides?: { price?: number; mrp?: number; wholesalePrice?: number },
): ResolvedPrice {
  const retail = overrides?.price ?? base.price;
  const mrp = overrides?.mrp ?? base.mrp;
  const wholesale = overrides?.wholesalePrice ?? base.wholesalePrice;
  const isWholesale = customerType === 'wholesale' && typeof wholesale === 'number' && wholesale > 0;
  return {
    price: isWholesale ? (wholesale as number) : retail,
    mrp,
    isWholesale,
    minQty: isWholesale ? Math.max(1, base.minWholesaleQty ?? 1) : 1,
  };
}
