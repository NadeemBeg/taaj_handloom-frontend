import { cn } from '../../lib/cn';

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <PageBtn disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Prev
      </PageBtn>
      {pages.map((p, idx) => {
        const gap = idx > 0 && p - pages[idx - 1] > 1;
        return (
          <span key={p} className="flex items-center gap-1.5">
            {gap && <span className="px-1 text-charcoal/40">…</span>}
            <button
              onClick={() => onChange(p)}
              aria-current={p === page ? 'page' : undefined}
              className={cn(
                'h-9 min-w-9 rounded-full px-3 text-sm transition-colors',
                p === page ? 'bg-brand-deep text-white' : 'text-charcoal hover:bg-brand-soft/40',
              )}
            >
              {p}
            </button>
          </span>
        );
      })}
      <PageBtn disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Next
      </PageBtn>
    </nav>
  );
}

function PageBtn({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="h-9 rounded-full px-3 text-sm text-charcoal transition-colors hover:bg-brand-soft/40 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
