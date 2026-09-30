export type SortValue = 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'best_selling';

const OPTIONS: { value: SortValue; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Popular' },
  { value: 'best_selling', label: 'Best Selling' },
];

export function SortSelect({ value, onChange }: { value: SortValue; onChange: (v: SortValue) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-charcoal/70">
      <span className="hidden sm:inline">Sort</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortValue)}
        className="rounded-full border border-brand/20 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
