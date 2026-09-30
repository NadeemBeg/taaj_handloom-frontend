import { useEffect, useState, type CSSProperties } from 'react';
import './BrandLoader.css';

/* ============================================================
   TAAJ Handloom brand loading screen.
   A traditional Maheshwari pit loom weaves a jewel-wine saree
   (thread → loom → saree), then lifts away to reveal the site.
   Pure SVG + CSS — no images, GIFs or animation libraries.
   ============================================================ */

// --- tunables -------------------------------------------------
const WEAVE_MS = 4400; // time for the saree to fully weave in
const HOLD_MS = 300; //   pause on the finished saree before lifting
const LIFT_MS = 900; //   fade/slide-away transition (matches CSS)
// Show the loader only on the first page-load of a browser tab
// session (true), or on every full page load (false).
const SHOW_ONCE_PER_SESSION = false;
const SEEN_KEY = 'taaj:loader-seen';
// --------------------------------------------------------------

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function decideInitialShow(): boolean {
  if (!SHOW_ONCE_PER_SESSION) return true;
  try {
    return !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return true;
  }
}

export function BrandLoader() {
  const [show] = useState(decideInitialShow);
  const [lifting, setLifting] = useState(false);
  const [done, setDone] = useState(false);

  const weaveMs = prefersReduced ? 400 : WEAVE_MS;

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* ignore private-mode storage errors */
    }

    const liftAt = weaveMs + HOLD_MS;
    const t1 = window.setTimeout(() => setLifting(true), liftAt);
    const t2 = window.setTimeout(() => setDone(true), liftAt + LIFT_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [show, weaveMs]);

  if (!show || done) return null;

  return (
    <div
      className={`tl-loader tl-go${lifting ? ' tl-lift' : ''}`}
      style={{ '--tl-weave': `${weaveMs}ms` } as CSSProperties}
      role="status"
      aria-live="polite"
      aria-label="Weaving your saree — loading TAAJ Handloom"
    >
      <div className="tl-wordmark" aria-hidden="true">
        <div className="tl-name">
          TAAJ<b>·</b>HANDLOOM
        </div>
        <div className="tl-sub">Maheshwari Handloom</div>
        <div className="tl-rule" />
      </div>

      <div className="tl-stage" aria-hidden="true">
        <svg className="tl-loom" viewBox="0 0 400 300" role="img" aria-label="A traditional handloom weaving a saree">
          <defs>
            <pattern id="tlWarp" width="9" height="8" patternUnits="userSpaceOnUse">
              <rect width="9" height="8" fill="none" />
              <line className="tl-warpline" x1="1.5" y1="0" x2="1.5" y2="8" stroke="#C9A24B" strokeWidth="1" opacity=".6" />
              <line className="tl-warpline" x1="5.5" y1="0" x2="5.5" y2="8" stroke="#8a6a3a" strokeWidth=".7" opacity=".45" />
            </pattern>

            <linearGradient id="tlClothField" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8A1230" />
              <stop offset="45%" stopColor="#6A0F26" />
              <stop offset="100%" stopColor="#48091B" />
            </linearGradient>
            <linearGradient id="tlClothShot" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A31742" stopOpacity=".55" />
              <stop offset="50%" stopColor="#5A0E22" stopOpacity="0" />
              <stop offset="100%" stopColor="#7A1030" stopOpacity=".5" />
            </linearGradient>

            <pattern id="tlCloth" width="20" height="11" patternUnits="userSpaceOnUse">
              <rect width="20" height="11" fill="none" />
              <line x1="4" y1="0" x2="4" y2="11" stroke="#8A1B36" strokeWidth="2" />
              <line x1="15" y1="0" x2="15" y2="11" stroke="#3E0916" strokeWidth="1.6" />
              <line x1="10" y1="0" x2="10" y2="11" stroke="#D4AB55" strokeWidth="1.1" opacity=".95" />
              <line x1="0" y1="0" x2="0" y2="11" stroke="#B4832B" strokeWidth=".7" opacity=".7" />
              <line x1="0" y1="3.2" x2="20" y2="3.2" stroke="#E4C471" strokeWidth=".55" opacity=".2" />
              <line x1="0" y1="8" x2="20" y2="8" stroke="#25060E" strokeWidth=".6" opacity=".4" />
            </pattern>

            <pattern id="tlButi" width="46" height="40" patternUnits="userSpaceOnUse">
              <g fill="#CDA14B" opacity=".85">
                <path d="M12 8 l2.4 4 -2.4 4 -2.4 -4 z" />
                <circle cx="12" cy="12" r="1" fill="#F3E7CB" />
                <path d="M34 28 l2.4 4 -2.4 4 -2.4 -4 z" />
                <circle cx="34" cy="32" r="1" fill="#F3E7CB" />
              </g>
            </pattern>

            <pattern id="tlBorder" width="10" height="14" patternUnits="userSpaceOnUse">
              <rect width="10" height="14" fill="#B4832B" />
              <path d="M5 2 L8 7 L5 12 L2 7 Z" fill="#8a6420" opacity=".6" />
              <line x1="0" y1="0" x2="0" y2="14" stroke="#8a6420" strokeWidth="1" />
            </pattern>

            <clipPath id="tlFabClip">
              <rect id="tlFabClipRect" x="82" y="74" width="236" height="168" rx="1" />
            </clipPath>

            <linearGradient id="tlSheenG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="50%" stopColor="#FBEFC9" stopOpacity=".38" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="tlShuttleG" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#8a5a22" />
              <stop offset="55%" stopColor="#6b4418" />
              <stop offset="100%" stopColor="#4a2f10" />
            </radialGradient>
          </defs>

          {/* wooden frame */}
          <rect x="46" y="46" width="308" height="18" rx="4" fill="#7a5230" />
          <rect x="46" y="46" width="308" height="6" rx="3" fill="#8f6438" />
          <rect x="46" y="246" width="308" height="20" rx="4" fill="#6f4a2b" />
          <rect x="46" y="246" width="308" height="6" rx="3" fill="#835836" />
          <rect x="44" y="40" width="16" height="236" rx="5" fill="#6f4a2b" />
          <rect x="340" y="40" width="16" height="236" rx="5" fill="#6f4a2b" />
          <rect x="47" y="40" width="4" height="236" rx="2" fill="#8f6438" />
          <rect x="343" y="40" width="4" height="236" rx="2" fill="#8f6438" />

          {/* bare warp threads */}
          <rect x="82" y="66" width="236" height="180" fill="url(#tlWarp)" />

          {/* woven saree fabric (reveals bottom-up) */}
          <g clipPath="url(#tlFabClip)">
            <rect x="82" y="74" width="236" height="168" fill="url(#tlClothField)" />
            <rect x="82" y="74" width="236" height="168" fill="url(#tlClothShot)" />
            <rect x="82" y="74" width="236" height="168" fill="url(#tlCloth)" />
            <rect x="82" y="74" width="236" height="168" fill="url(#tlButi)" />
            <rect x="82" y="74" width="14" height="168" fill="url(#tlBorder)" />
            <rect x="304" y="74" width="14" height="168" fill="url(#tlBorder)" />
            <rect x="82" y="226" width="236" height="16" fill="url(#tlBorder)" />
            <rect x="82" y="222" width="236" height="1.6" fill="#E4C471" opacity=".9" />
            <rect x="82" y="218" width="236" height="1.2" fill="#CDA14B" opacity=".7" />
            <rect id="tlSheen" x="82" y="74" width="70" height="168" fill="url(#tlSheenG)" />
          </g>

          <line x1="82" y1="74" x2="318" y2="74" stroke="#CDA14B" strokeWidth="1" opacity=".35" />

          {/* reed / beater */}
          <g id="tlReed">
            <rect x="72" y="70" width="256" height="7" rx="3" fill="#5a3a20" opacity=".9" />
            <rect x="72" y="68" width="256" height="2" rx="1" fill="#8f6438" />
          </g>

          {/* shuttle */}
          <g id="tlShuttleRise">
            <g id="tlShuttleSweep">
              <line x1="70" y1="80" x2="98" y2="80" stroke="#CDA14B" strokeWidth="1.4" opacity=".7" />
              <g transform="translate(84,80)">
                <path d="M-16 0 C-11 -6 11 -6 16 0 C11 6 -11 6 -16 0 Z" fill="url(#tlShuttleG)" />
                <ellipse cx="0" cy="0" rx="4.5" ry="3" fill="#c9a24b" />
                <circle cx="0" cy="0" r="1.6" fill="#4a2f10" />
                <path d="M-16 0 C-11 -6 11 -6 16 0" fill="none" stroke="#a8783a" strokeWidth=".8" opacity=".8" />
              </g>
            </g>
          </g>
        </svg>
      </div>

      <div className="tl-caption">
        <div className="tl-main">
          <span className="tl-shine">saree being woven for you.</span>
        </div>
        <div className="tl-capsub" aria-hidden="true">
          <i /> spun on the pit loom <i />
        </div>
      </div>

      <div className="tl-bar" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
