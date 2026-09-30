import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block h-6 w-6 animate-spin rounded-full border-2 border-brand/30 border-t-brand-deep',
        className,
      )}
    />
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-brand/30 bg-ivory/60 px-6 py-16 text-center">
      <h3 className="font-display text-xl text-charcoal">{title}</h3>
      {description && <p className="max-w-sm text-sm text-charcoal/60">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
      <p className="text-sm text-red-700">Something went wrong while loading. Please try again.</p>
      {onRetry && (
        <button onClick={onRetry} className="text-sm font-medium text-brand-deep underline">
          Retry
        </button>
      )}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white">
      <div className="aspect-[3/4] w-full bg-brand-soft/40" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 rounded bg-brand-soft/50" />
        <div className="h-4 w-1/3 rounded bg-brand-soft/50" />
      </div>
    </div>
  );
}
