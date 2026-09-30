import { useState, useEffect } from 'react';
import { PRODUCT_COLORS } from '@taaj/shared';
import { cn } from '../../lib/cn';

export interface CatalogFilters {
  minPrice?: number;
  maxPrice?: number;
  colors: string[];
  inStock?: boolean;
  hasDiscount?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

export function ProductFilters({
  value,
  onChange,
  onClear,
}: {
  value: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
  onClear: () => void;
}) {
  const [min, setMin] = useState(value.minPrice?.toString() ?? '');
  const [max, setMax] = useState(value.maxPrice?.toString() ?? '');

  // Keep local price inputs in sync when filters are cleared externally.
  useEffect(() => {
    setMin(value.minPrice?.toString() ?? '');
    setMax(value.maxPrice?.toString() ?? '');
  }, [value.minPrice, value.maxPrice]);

  const toggleColor = (name: string) => {
    const has = value.colors.includes(name);
    onChange({ ...value, colors: has ? value.colors.filter((c) => c !== name) : [...value.colors, name] });
  };

  const applyPrice = () =>
    onChange({
      ...value,
      minPrice: min ? Number(min) : undefined,
      maxPrice: max ? Number(max) : undefined,
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-charcoal">Filters</h2>
        <button onClick={onClear} className="text-xs font-medium text-brand-deep underline">
          Clear all
        </button>
      </div>

      <Section title="Price">
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full rounded-lg border border-brand/20 px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
          <span className="text-charcoal/40">–</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full rounded-lg border border-brand/20 px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </div>
        <button
          onClick={applyPrice}
          className="mt-2 rounded-full bg-brand-soft px-4 py-1.5 text-xs font-medium text-brand-deep hover:bg-brand-soft/70"
        >
          Apply price
        </button>
      </Section>

      <Section title="Colour">
        <div className="flex flex-wrap gap-2">
          {PRODUCT_COLORS.map((c) => {
            const active = value.colors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggleColor(c.name)}
                title={c.name}
                aria-pressed={active}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors',
                  active ? 'border-brand-deep bg-brand-soft/50 text-brand-deep' : 'border-brand/20 text-charcoal/70',
                )}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10"
                  style={{ backgroundColor: c.hex }}
                />
                {c.name}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Availability & offers">
        <CheckRow
          label="In stock only"
          checked={!!value.inStock}
          onChange={(v) => onChange({ ...value, inStock: v || undefined })}
        />
        <CheckRow
          label="Discounted"
          checked={!!value.hasDiscount}
          onChange={(v) => onChange({ ...value, hasDiscount: v || undefined })}
        />
        <CheckRow
          label="New arrivals"
          checked={!!value.isNewArrival}
          onChange={(v) => onChange({ ...value, isNewArrival: v || undefined })}
        />
        <CheckRow
          label="Bestsellers"
          checked={!!value.isBestSeller}
          onChange={(v) => onChange({ ...value, isBestSeller: v || undefined })}
        />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-brand/10 pt-4 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-charcoal/60">{title}</h3>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-charcoal/80">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-brand/40 text-brand-deep focus:ring-brand/40"
      />
      {label}
    </label>
  );
}
