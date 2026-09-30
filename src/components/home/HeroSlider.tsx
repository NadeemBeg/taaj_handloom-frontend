import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Banner } from '../../types/catalog';
import { cldImg } from '../../lib/img';
import { cn } from '../../lib/cn';

const AUTOPLAY_MS = 6000;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function HeroSlider({ banners }: { banners: Banner[] }) {
  const slides = banners.filter((b) => b.desktopImage?.url);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Autoplay (disabled when paused, single slide, or reduced motion).
  const timer = useRef<number>();
  useEffect(() => {
    if (count <= 1 || paused || prefersReducedMotion()) return;
    timer.current = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer.current);
  }, [index, paused, count, go]);

  if (count === 0) return null;

  return (
    <section
      className="relative overflow-hidden bg-forest-900"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-[74vh] max-h-[660px] min-h-[440px]">
        {slides.map((b, i) => (
          <div
            key={b._id}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-premium',
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
            aria-hidden={i !== index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
          >
            <picture>
              {b.mobileImage?.url && <source media="(max-width: 640px)" srcSet={cldImg(b.mobileImage.url, 800)} />}
              <img
                src={cldImg(b.desktopImage.url, 1600)}
                alt={b.desktopImage.alt ?? b.title ?? 'TAAJ Handloom'}
                className="h-full w-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
            </picture>
            {/* Wine gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-forest-900/85 via-forest-900/55 to-forest-900/10" />

            <div className="absolute inset-0">
              <div className="mx-auto flex h-full max-w-7xl items-center px-6 sm:px-10">
                <div
                  className={cn(
                    'max-w-xl text-ivory transition-all duration-700 ease-premium',
                    i === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                  )}
                >
                  <span className="inline-block rounded-full border border-gold/50 bg-forest-900/30 px-4 py-1 text-xs font-semibold uppercase tracking-label text-gold-light backdrop-blur">
                    Maheshwar, Madhya Pradesh
                  </span>
                  {b.title && (
                    <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-ivory sm:text-5xl lg:text-6xl">
                      {b.title}
                    </h1>
                  )}
                  {b.subtitle && (
                    <p className="mt-4 max-w-md text-base text-ivory/85 sm:text-lg">{b.subtitle}</p>
                  )}
                  {b.ctaLabel && b.ctaHref && (
                    <Link
                      to={b.ctaHref}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-forest-900 shadow-gold transition-all duration-200 ease-premium hover:bg-gold-light"
                    >
                      {b.ctaLabel}
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ivory/85 p-2.5 text-forest-900 shadow-soft backdrop-blur transition hover:bg-ivory sm:left-5"
            >
              <Arrow dir="left" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ivory/85 p-2.5 text-forest-900 shadow-soft backdrop-blur transition hover:bg-ivory sm:right-5"
            >
              <Arrow dir="right" />
            </button>

            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s._id}
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    i === index ? 'w-7 bg-gold' : 'w-2 bg-ivory/60 hover:bg-ivory',
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
      />
    </svg>
  );
}
