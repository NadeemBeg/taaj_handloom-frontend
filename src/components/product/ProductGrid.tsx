import type { Product } from '../../types/catalog';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '../ui/feedback';

export function ProductGrid({
  products,
  loading,
  skeletonCount = 8,
}: {
  products?: Product[];
  loading?: boolean;
  skeletonCount?: number;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products?.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
