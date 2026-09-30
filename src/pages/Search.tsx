import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../hooks/useCatalog';
import { ProductGrid } from '../components/product/ProductGrid';
import { EmptyState, ErrorState } from '../components/ui/feedback';
import { SeoHead } from '../components/SeoHead';

export function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const { data, isLoading, isError, refetch } = useSearch(q);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <SeoHead title={`Search: ${q}`} />
      <h1 className="font-display text-3xl text-charcoal">
        Search results {q && <span className="text-charcoal/50">for “{q}”</span>}
      </h1>

      <div className="mt-8">
        {!q ? (
          <EmptyState title="Start typing to search" description="Find sarees, suits and chunari by name, SKU, fabric or tag." />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : isLoading ? (
          <ProductGrid loading skeletonCount={4} />
        ) : data && data.length > 0 ? (
          <ProductGrid products={data} />
        ) : (
          <EmptyState title="No matches" description={`We couldn't find anything for “${q}”.`} />
        )}
      </div>
    </div>
  );
}
