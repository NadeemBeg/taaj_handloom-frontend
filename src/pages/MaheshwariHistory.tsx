import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { Button } from '../components/ui/Button';
import { HISTORY, LANGS, type Lang } from './maheshwariHistoryContent';

/**
 * The History of the Maheshwari Saree — a dedicated heritage page.
 *
 * Self-contained multilingual page: an on-page language selector (English,
 * Hindi, Marathi, Kannada, Telugu) switches ALL of this page's text and
 * nothing else on the site. Content is drawn from a Maheshwar handloom
 * archive and documented history; design reuses the TAAJ Handloom system.
 */
function initialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const q = new URLSearchParams(window.location.search).get('lang');
  return LANGS.some((l) => l.code === q) ? (q as Lang) : 'en';
}

export function MaheshwariHistory() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [hasPortrait, setHasPortrait] = useState(true);
  const t = HISTORY[lang];

  return (
    <div>
      <SeoHead
        title="History of Maheshwari Saree"
        description="The heritage story of the Maheshwari saree — its royal origins in Maheshwar under Maharani Ahilyabai Holkar, the journey from thread to saree, and the handloom tradition kept alive by master weavers."
        canonical="/history-of-maheshwari-saree"
      />

      {/* Page-only language selector — stays visible while scrolling */}
      <div className="fixed right-3 top-[72px] z-30 sm:right-5">
        <label className="flex items-center gap-2 rounded-full border border-line bg-cream/95 px-3 py-1.5 shadow-card backdrop-blur">
          <GlobeIcon />
          <span className="sr-only">{t.ui.language}</span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="cursor-pointer bg-transparent pr-1 text-sm font-medium text-charcoal focus:outline-none"
            aria-label={t.ui.language}
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-brand-deep text-ivory">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: 'radial-gradient(60% 80% at 50% 0%, rgba(180,131,43,0.35) 0%, transparent 60%)' }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.28em] text-gold-light">
            {t.hero.eyebrow}
          </span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ivory sm:text-6xl">
            {t.hero.title} <span className="text-gold-light">{t.hero.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-ivory/80 sm:text-lg">{t.hero.subtitle}</p>
          <GoldRule className="mx-auto mt-8" />
        </div>
      </section>

      {/* 2 — Maheshwar, the birthplace */}
      <Prose kicker={t.maheshwar.kicker} title={t.maheshwar.title}>
        {t.maheshwar.paras.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Prose>

      {/* 3 — Maharani Ahilyabai Holkar */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2">
          <figure className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-brand-deep shadow-card-hover ring-1 ring-gold/40">
              {/* Fallback tribute emblem — shown when no authentic portrait file is present */}
              <TributeEmblem name={t.ahilyabai.title} dates={t.ahilyabai.dates} />
              {hasPortrait && (
                <img
                  src="/history/ahilyabai.jpg"
                  alt={t.ahilyabai.title}
                  onError={() => setHasPortrait(false)}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              )}
              <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/30" />
            </div>
            <figcaption className="mt-3 text-center text-xs italic text-muted">{t.ahilyabai.caption}</figcaption>
          </figure>

          <div>
            <Kicker>{t.ahilyabai.kicker}</Kicker>
            <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">{t.ahilyabai.title}</h2>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-gold">{t.ahilyabai.dates}</p>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal/75">
              {t.ahilyabai.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 — The journey of a thread */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Kicker center>{t.thread.kicker}</Kicker>
          <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">{t.thread.title}</h2>
          <p className="mt-4 text-charcoal/70">{t.thread.intro}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.thread.steps.map((s, i) => (
            <div key={i} className="relative rounded-2xl bg-white p-6 shadow-soft ring-1 ring-line/70">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-deep font-display text-lg font-semibold text-gold-light">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-xl text-brand-deep">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 — From thread to saree (on the loom) */}
      <Prose kicker={t.weave.kicker} title={t.weave.title} tint>
        {t.weave.paras.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Prose>

      {/* 6 — The art of Maheshwari weaving */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <Kicker>{t.art.kicker}</Kicker>
          <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">{t.art.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-charcoal/75 sm:text-lg">{t.art.para}</p>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-gold">{t.art.bordersTitle}</h3>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {t.art.borders.map((b) => (
              <li
                key={b}
                className="rounded-full border border-gold/40 bg-white px-4 py-1.5 text-sm text-charcoal/80"
              >
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-gold/30 bg-gold-soft/40 p-6">
            <h3 className="font-display text-xl text-brand-deep">{t.art.palluTitle}</h3>
            <p className="mt-2 text-charcoal/75">{t.art.pallu}</p>
          </div>
        </div>
      </section>

      {/* 7 — Timeline */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Kicker center>{t.timeline.kicker}</Kicker>
            <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">{t.timeline.title}</h2>
          </div>
          <ol className="mt-12 space-y-8 border-l border-line pl-6 sm:pl-8">
            {t.timeline.items.map((it, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold bg-ivory sm:-left-[39px]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{it.era}</span>
                <h3 className="mt-1 font-display text-2xl text-brand-deep">{it.title}</h3>
                <p className="mt-2 text-charcoal/70">{it.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8 — A craft passed through generations */}
      <Prose kicker={t.generations.kicker} title={t.generations.title}>
        {t.generations.paras.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Prose>

      {/* 9 — The Record of Craft (text-based, retold from the Maheshwar handloom archive) */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Kicker center>{t.archive.kicker}</Kicker>
            <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">{t.archive.title}</h2>
            <p className="mt-4 text-charcoal/70">{t.archive.intro}</p>
          </div>

          {/* Pull quote lifted from the archive itself */}
          <figure className="relative mx-auto mt-10 max-w-3xl rounded-3xl border border-gold/30 bg-gold-soft/40 px-8 py-9 text-center">
            <QuoteMark className="mx-auto" />
            <blockquote className="mt-3 font-display text-xl leading-snug text-brand-deep sm:text-2xl">
              {t.archive.quote}
            </blockquote>
          </figure>

          {/* The five records, as text */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {t.archive.items.map((item, i) => (
              <article
                key={i}
                className={`flex flex-col rounded-2xl bg-white p-6 shadow-soft ring-1 ring-line/70 sm:p-7 ${
                  i === t.archive.items.length - 1 && t.archive.items.length % 2 === 1
                    ? 'lg:col-span-2'
                    : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-deep font-display text-lg font-semibold text-gold-light">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-0.5 font-display text-xl text-brand-deep sm:text-2xl">{item.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-charcoal/75 sm:text-base">{item.desc}</p>
                <ul className="mt-5 grid gap-2.5 border-t border-line/70 pt-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {item.facts.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-charcoal/80">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Legacy + TAAJ connection */}
      <Prose kicker={t.legacy.kicker} title={t.legacy.title}>
        {t.legacy.paras.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Prose>

      {/* 11 — Closing heritage CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-brand-deep px-8 py-14 text-center text-ivory">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: 'radial-gradient(70% 90% at 50% 0%, rgba(180,131,43,0.30) 0%, transparent 65%)' }}
          />
          <h2 className="relative font-display text-3xl text-ivory sm:text-4xl">{t.closing.title}</h2>
          <p className="relative max-w-xl text-ivory/80">{t.closing.body}</p>
          <Link to="/sarees" className="relative mt-2">
            <Button size="lg" variant="gold">
              {t.closing.cta}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ---------------- helpers ---------------- */

function Kicker({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <span
      className={`text-xs font-semibold uppercase tracking-[0.24em] text-gold ${center ? 'block text-center' : ''}`}
    >
      {children}
    </span>
  );
}

function GoldRule({ className = '' }: { className?: string }) {
  return <span className={`block h-px w-24 bg-gradient-to-r from-transparent via-gold-light to-transparent ${className}`} />;
}

function Prose({
  kicker,
  title,
  tint,
  children,
}: {
  kicker: string;
  title: string;
  tint?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={tint ? 'bg-ivory' : ''}>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <Kicker>{kicker}</Kicker>
        <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">{title}</h2>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal/75 sm:text-lg">{children}</div>
      </div>
    </section>
  );
}

/** Respectful fallback emblem for the Ahilyabai section (a crown over a lotus),
 *  shown when no authentic portrait image file is provided. */
function TributeEmblem({ name, dates }: { name: string; dates: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#7C2433] to-[#4C1520] px-6 text-center">
      <svg viewBox="0 0 100 100" className="h-24 w-24 text-gold-light" fill="none" aria-hidden="true">
        {/* crown */}
        <path
          d="M25 40 L30 22 L42 34 L50 18 L58 34 L70 22 L75 40 Z"
          fill="currentColor"
          opacity="0.95"
        />
        <rect x="25" y="40" width="50" height="7" rx="2" fill="currentColor" />
        {/* lotus */}
        <g fill="currentColor" opacity="0.9">
          <path d="M50 58 C46 66 46 74 50 80 C54 74 54 66 50 58 Z" />
          <path d="M50 62 C42 66 38 72 38 79 C46 78 50 73 50 66 Z" />
          <path d="M50 62 C58 66 62 72 62 79 C54 78 50 73 50 66 Z" />
          <path d="M50 64 C40 64 33 70 31 78 C30 78 30 78 30 78 C40 80 48 76 50 68 Z" opacity="0.7" />
          <path d="M50 64 C60 64 67 70 69 78 C60 80 52 76 50 68 Z" opacity="0.7" />
        </g>
      </svg>
      <div className="text-gold-soft">
        <p className="font-display text-lg leading-tight">{name}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-light/80">{dates}</p>
      </div>
    </div>
  );
}

function QuoteMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 32" className={`h-7 w-9 text-gold ${className}`} fill="currentColor" aria-hidden="true">
      <path d="M0 32V18C0 8 6 2 16 0l2 4C10 6 6 10 6 16h8v16H0zm22 0V18c0-10 6-16 16-18l2 4c-8 2-12 6-12 12h8v16H22z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-deep" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9s1.3-6.5 3.8-9z" />
    </svg>
  );
}
