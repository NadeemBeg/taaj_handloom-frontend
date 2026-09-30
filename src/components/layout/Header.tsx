import { useState, type FormEvent } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart, selectCount } from '../../store/cart';
import { useWishlist, selectWishlistCount } from '../../store/wishlist';
import { useCategoryTree } from '../../hooks/useCatalog';
import { HeartIcon } from '../ui/HeartIcon';
import { cn } from '../../lib/cn';

const INFO_LINKS = [
  { label: 'Wholesale', to: '/wholesale' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'History', to: '/history-of-maheshwari-saree' },
];

export function Header() {
  const navigate = useNavigate();
  const count = useCart(selectCount);
  const wishCount = useWishlist(selectWishlistCount);
  const { tree } = useCategoryTree();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [q, setQ] = useState('');

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      setMenuOpen(false);
    }
  };

  // In an SPA the header never unmounts on navigation, so a clicked dropdown
  // link keeps focus and `group-focus-within` holds the menu open. Drop focus
  // on selection so the dropdown closes.
  const closeDropdown = () => (document.activeElement as HTMLElement | null)?.blur();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <button
          className="rounded-lg p-2 text-charcoal lg:hidden"
          aria-label="Open menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <Bars />
        </button>

        <Link to="/" className="flex items-baseline gap-1.5">
          <span className="font-display text-2xl font-semibold tracking-tight text-brand-deep">TAAJ</span>
          <span className="font-display text-lg text-charcoal/70">Handloom</span>
        </Link>

        {/* Desktop nav with category dropdowns */}
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={navLinkCls}>
            Home
          </NavLink>

          {tree.map((parent) => (
            <div key={parent._id} className="group relative">
              <NavLink to={`/${parent.slug}`} onClick={closeDropdown} className={navLinkCls}>
                {parent.name}
                {parent.children.length > 0 && <Chevron />}
              </NavLink>
              {parent.children.length > 0 && (
                <div className="invisible absolute left-0 top-full z-50 min-w-[240px] translate-y-1 rounded-2xl border border-line bg-white p-2 opacity-0 shadow-card-hover transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <Link
                    to={`/${parent.slug}`}
                    onClick={closeDropdown}
                    className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-deep hover:bg-sage"
                  >
                    All {parent.name}
                  </Link>
                  <div className="my-1 h-px bg-line" />
                  {parent.children.map((child) => (
                    <Link
                      key={child._id}
                      to={`/${child.slug}`}
                      onClick={closeDropdown}
                      className="block rounded-lg px-3 py-2 text-sm text-charcoal/80 hover:bg-sage hover:text-brand-deep"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {INFO_LINKS.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkCls}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="ml-auto hidden items-center md:flex">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sarees, suits…"
            className="w-48 rounded-full border border-line bg-white px-4 py-2 text-sm focus:border-brand focus:outline-none xl:w-64"
            aria-label="Search products"
          />
        </form>

        <Link
          to="/wishlist"
          className="relative ml-2 rounded-lg p-2 text-charcoal"
          aria-label={`Wishlist with ${wishCount} items`}
        >
          <HeartIcon />
          {wishCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-semibold text-white">
              {wishCount}
            </span>
          )}
        </Link>

        <Link
          to="/cart"
          className="relative rounded-lg p-2 text-charcoal"
          aria-label={`Cart with ${count} items`}
        >
          <Bag />
          {count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-deep px-1 text-[11px] font-semibold text-white">
              {count}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-line bg-white lg:hidden">
          <form onSubmit={submitSearch} className="px-4 py-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-full border border-line px-4 py-2 text-sm focus:border-brand focus:outline-none"
              aria-label="Search products"
            />
          </form>
          <nav className="flex flex-col px-2 pb-4">
            <MobileLink to="/" onClick={() => setMenuOpen(false)} label="Home" end />
            {tree.map((parent) => (
              <div key={parent._id} className="border-t border-line/70">
                <div className="flex items-center">
                  <MobileLink to={`/${parent.slug}`} onClick={() => setMenuOpen(false)} label={parent.name} className="flex-1" />
                  {parent.children.length > 0 && (
                    <button
                      aria-label={`Toggle ${parent.name} subcategories`}
                      onClick={() => setOpenGroup((g) => (g === parent._id ? null : parent._id))}
                      className="p-2 text-charcoal/50"
                    >
                      <Chevron open={openGroup === parent._id} />
                    </button>
                  )}
                </div>
                {openGroup === parent._id &&
                  parent.children.map((child) => (
                    <Link
                      key={child._id}
                      to={`/${child.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm text-charcoal/70 hover:text-brand-deep"
                    >
                      {child.name}
                    </Link>
                  ))}
              </div>
            ))}
            <div className="mt-1 border-t border-line/70 pt-1">
              {INFO_LINKS.map((item) => (
                <MobileLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)} label={item.label} />
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

const navLinkCls = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex items-center gap-0.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-brand-deep',
    isActive ? 'text-brand-deep' : 'text-charcoal/80',
  );

function MobileLink({
  to,
  label,
  onClick,
  end,
  className,
}: {
  to: string;
  label: string;
  onClick: () => void;
  end?: boolean;
  className?: string;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'rounded-lg px-3 py-2.5 text-sm font-medium',
          isActive ? 'text-brand-deep' : 'text-charcoal/80',
          className,
        )
      }
    >
      {label}
    </NavLink>
  );
}

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}
function Bars() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function Bag() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12l-1 13H7L6 7zM9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}
