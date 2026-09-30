import { useInstagramFeed } from '../../hooks/useInstagram';
import { instagram } from '../../config/site';

/**
 * Compact Instagram strip for the footer — a small labelled handle link plus a
 * tight row of the latest 4 thumbnails. Kept deliberately minimal; if the feed
 * has no posts yet it shows just the handle link, so it never adds empty space.
 */
export function FooterInstagram() {
  const { handle, profileUrl } = instagram;
  const { data } = useInstagramFeed();
  const tiles = (data ?? []).slice(0, 6);

  return (
    <div className="mt-5">
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-label text-gold-light transition-colors hover:text-gold"
      >
        <InstagramGlyph />
        <span>@{handle}</span>
      </a>

      {tiles.length > 0 && (
        <div className="mt-2.5 grid w-max grid-cols-3 gap-1.5">
          {tiles.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-12 w-12 overflow-hidden rounded-md ring-1 ring-white/10"
              aria-label={post.caption ? post.caption.slice(0, 60) : `Instagram post from @${handle}`}
            >
              <img
                src={post.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-brand-deep/0 transition-colors group-hover:bg-brand-deep/25" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
