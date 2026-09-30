import { Link } from 'react-router-dom';
import type { Category } from '../../types/catalog';

/**
 * A circular category tile with a decorative scalloped/beaded ring frame
 * (doily-style, antique bronze) around a perfectly circular, centred image,
 * with the category name below. Used for both parent departments and child
 * categories on the Home rail and the Catalog department nav.
 */

// Bead positions around the ring — computed once, shared by every tile.
const BEAD_COUNT = 40;
const BEAD_RADIUS = 45;
const BEADS = Array.from({ length: BEAD_COUNT }, (_, i) => {
  const a = (i / BEAD_COUNT) * Math.PI * 2;
  return { x: 50 + Math.cos(a) * BEAD_RADIUS, y: 50 + Math.sin(a) * BEAD_RADIUS };
});

export function CategoryCircle({
  category,
  active = false,
  size = 'md',
}: {
  category: Category;
  active?: boolean;
  size?: 'sm' | 'md';
}) {
  const initial = category.name.charAt(0).toUpperCase();
  const width = size === 'sm' ? 'w-[76px] sm:w-24' : 'w-24 sm:w-28';
  const clipId = `catclip-${category._id}`;
  // antique-bronze frame by default; wine frame when this is the active category
  const ring = active ? '#6B1E2B' : '#7A4E28';
  const bead = active ? '#9B2D3B' : '#9C6A37';

  return (
    <Link
      to={`/${category.slug}`}
      title={category.name}
      aria-current={active ? 'page' : undefined}
      className={`group flex ${width} shrink-0 flex-col items-center gap-2.5 sm:gap-3`}
    >
      <span className="relative block aspect-square w-full">
        <svg
          viewBox="0 0 100 100"
          className="block h-full w-full transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.03]"
          role="img"
          aria-label={category.name}
        >
          <defs>
            <clipPath id={clipId}>
              <circle cx="50" cy="50" r="40" />
            </clipPath>
          </defs>

          {/* centred, circular image (or a monogram fallback) */}
          {category.image?.url ? (
            <image
              href={category.image.url}
              x="10"
              y="10"
              width="80"
              height="80"
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#${clipId})`}
            />
          ) : (
            <>
              <circle cx="50" cy="50" r="40" fill="#EFD3D6" />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="30"
                fontFamily="Cormorant Garamond, Georgia, serif"
                fill="#6B1E2B"
              >
                {initial}
              </text>
            </>
          )}

          {/* decorative scalloped/beaded frame */}
          <circle cx="50" cy="50" r="42" fill="none" stroke={ring} strokeWidth="0.9" />
          {BEADS.map((b, i) => (
            <circle key={i} cx={b.x} cy={b.y} r="1.5" fill={bead} />
          ))}
          <circle cx="50" cy="50" r="48" fill="none" stroke={ring} strokeWidth="0.9" />
        </svg>
      </span>

      <span
        className={`overflow-hidden text-center text-xs font-medium leading-tight transition-colors sm:text-sm [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] ${
          active ? 'text-brand-deep' : 'text-charcoal group-hover:text-brand-deep'
        }`}
      >
        {category.name}
      </span>
    </Link>
  );
}
