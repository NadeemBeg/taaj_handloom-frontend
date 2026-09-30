import { useSite } from '../../hooks/useSite';
import { cldImg } from '../../lib/img';

/**
 * "Follow the loom" band — invites customers to the brand's real social
 * handles (from Site Settings) and shows a decorative row of pieces from the
 * current collection (linking to the shop, not implying social posts).
 */
export function SocialStrip({ images = [] }: { images?: string[] }) {
  const { social, name } = useSite();
  const links = [
    { key: 'instagram', href: social.instagram, label: 'Instagram', Icon: InstagramIcon },
    { key: 'facebook', href: social.facebook, label: 'Facebook', Icon: FacebookIcon },
    { key: 'youtube', href: social.youtube, label: 'YouTube', Icon: YoutubeIcon },
  ].filter((l) => l.href);

  const handle = social.instagram
    ? '@' + social.instagram.replace(/\/+$/, '').split('/').pop()
    : name;

  // Nothing to link to and nothing to show — skip the section entirely.
  if (links.length === 0 && images.length === 0) return null;

  const tiles = images.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="text-center">
        <span className="eyebrow justify-center">Follow the loom</span>
        <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">Woven stories from Maheshwar</h2>
        <p className="mx-auto mt-3 max-w-md text-charcoal/60">
          See our latest Maheshwari pieces and the craft behind them.
          {links.length > 0 && <> Follow <span className="font-medium text-brand-deep">{handle}</span>.</>}
        </p>
      </div>

      {tiles.length > 0 && (
        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
          {tiles.map((src, i) => (
            <a
              key={i}
              href={links[0]?.href ?? '/products'}
              target={links[0]?.href ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-ivory ring-1 ring-line/60"
            >
              <img
                src={cldImg(src, 400)}
                alt="TAAJ Handloom piece"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-forest-900/0 transition-colors group-hover:bg-forest-900/25" />
            </a>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <div className="mt-8 flex justify-center gap-3">
          {links.map(({ key, href, label, Icon }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-brand-deep transition-colors hover:border-brand-deep/50 hover:bg-sage"
            >
              <Icon /> {label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M13 22v-8h2.7l.4-3H13V9.1c0-.9.25-1.5 1.5-1.5H16V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H7.5v3H10v8z" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M22 8.2a2.6 2.6 0 0 0-1.8-1.8C18.6 6 12 6 12 6s-6.6 0-8.2.4A2.6 2.6 0 0 0 2 8.2 27 27 0 0 0 1.6 12 27 27 0 0 0 2 15.8a2.6 2.6 0 0 0 1.8 1.8C5.4 18 12 18 12 18s6.6 0 8.2-.4a2.6 2.6 0 0 0 1.8-1.8c.3-1.6.4-3.8.4-3.8s0-2.2-.4-3.8zM10 15V9l5 3z" />
    </svg>
  );
}
