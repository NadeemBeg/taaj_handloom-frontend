import { Link } from 'react-router-dom';
import { useWishlist } from '../store/wishlist';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/feedback';
import { SeoHead } from '../components/SeoHead';

export function Wishlist() {
  const items = useWishlist((s) => s.items);
  const clear = useWishlist((s) => s.clear);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <SeoHead title="Wishlist" noindex />
      <div className="mb-6 flex items-end justify-between">
        <h1 className="font-display text-3xl text-charcoal sm:text-4xl">Your Wishlist</h1>
        {items.length > 0 && (
          <button onClick={clear} className="text-sm text-charcoal/50 hover:text-error">Clear all</button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Tap the heart on any piece to save it here."
          action={<Link to="/products"><Button className="mt-2">Browse the collection</Button></Link>}
        />
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}
