import { formatINR, discountPercent } from '@taaj/shared';
import { cn } from '../../lib/cn';

export function PriceTag({
  mrp,
  price,
  size = 'md',
  className,
}: {
  mrp: number;
  price: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const off = discountPercent(mrp, price);
  const priceSize = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-lg';
  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-1', className)}>
      <span className={cn('tnum font-semibold text-charcoal', priceSize)}>{formatINR(price)}</span>
      {off > 0 && (
        <>
          <span className="tnum text-sm text-muted/70 line-through">{formatINR(mrp)}</span>
          <span className="badge bg-gold-soft text-gold">{off}% off</span>
        </>
      )}
    </div>
  );
}
