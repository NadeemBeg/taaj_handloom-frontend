import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CharkhaLoop } from './CharkhaLoop';

const STEPS = [
  { label: 'Thread', Icon: ThreadIcon },
  { label: 'Charkha', Icon: CharkhaMini },
  { label: 'Handloom', Icon: LoomIcon },
  { label: 'Weave', Icon: WeaveIcon },
  { label: 'Saree', Icon: SareeIcon },
];

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduce;
}

/**
 * "From Thread to Tradition" — the brand craft story. By default an ORIGINAL
 * animated SVG charkha (lightweight, on-brand, no licensing) sits beside the
 * weaving journey. If a licensed charkha clip is provided via `videoSrc`, it is
 * lazy-loaded only when scrolled into view, falling back to the SVG on error or
 * when motion is reduced — so the section is never blank and never janky.
 */
export function CharkhaStory({ videoSrc }: { videoSrc?: string }) {
  const reduce = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [failed, setFailed] = useState(false);

  const wantVideo = Boolean(videoSrc) && !reduce && !failed;

  // Defer the video download until the section is near the viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !wantVideo) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '250px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [wantVideo]);

  useEffect(() => {
    if (inView && videoRef.current) videoRef.current.play().catch(() => undefined);
  }, [inView]);

  const showVideo = wantVideo;

  return (
    <section className="relative overflow-hidden bg-forest-900 text-ivory">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2">
        {/* Media */}
        <div
          ref={wrapRef}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-forest-800 ring-1 ring-gold/25"
        >
          {/* Cinematic craft loop: thread → charkha → handloom → weave → saree → thread */}
          <CharkhaLoop />
          {showVideo && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              loop
              playsInline
              preload="none"
              aria-label="A traditional charkha spinning yarn"
              onError={() => setFailed(true)}
            >
              {inView && videoSrc && <source src={videoSrc} type="video/mp4" />}
            </video>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-900/60 via-transparent to-transparent" />
        </div>

        {/* Copy */}
        <div>
          <span className="eyebrow text-gold-light">The Craft</span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ivory sm:text-5xl">
            From Thread to Tradition
          </h2>
          <p className="mt-4 max-w-md text-ivory/80">
            Every TAAJ saree begins as raw yarn spun on the charkha, then travels to the pit loom
            where our weavers of Maheshwar interlace silk and cotton — border by border, motif by
            motif — into a finished Maheshwari drape.
          </p>

          {/* Journey */}
          <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-4">
            {STEPS.map((s, i) => (
              <li key={s.label} className="flex items-center gap-2">
                <span className="flex items-center gap-2 rounded-full border border-gold/30 bg-forest-800/60 px-3 py-1.5">
                  <s.Icon />
                  <span className="text-sm font-medium text-ivory/90">{s.label}</span>
                </span>
                {i < STEPS.length - 1 && <span className="text-gold/70" aria-hidden="true">→</span>}
              </li>
            ))}
          </ol>

          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-forest-900 transition-colors hover:bg-gold-light"
          >
            Discover our craft
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* — Journey step icons (small, gold stroke) — */
function base(children: React.ReactNode) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold-light" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}
function ThreadIcon() { return base(<><path d="M6 3v14a3 3 0 0 0 6 0V7a3 3 0 0 1 6 0v14" /></>); }
function CharkhaMini() { return base(<><circle cx="12" cy="12" r="8" /><path d="M12 4v16M4 12h16M6 6l12 12M18 6L6 18" /></>); }
function LoomIcon() { return base(<><path d="M4 5h16M4 19h16M7 5v14M17 5v14M4 10h16M4 14h16" /></>); }
function WeaveIcon() { return base(<><path d="M3 8c3 0 3 8 6 8s3-8 6-8 3 8 6 8" /></>); }
function SareeIcon() { return base(<><path d="M8 3c0 4-3 5-3 9a7 7 0 0 0 14 0c0-4-3-5-3-9" /><path d="M8 3h8" /></>); }
