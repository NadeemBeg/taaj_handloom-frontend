import './CharkhaLoop.css';

/* ============================================================
   TAAJ Handloom — cinematic looping craft story.
   A seamless six-scene loop rendered in pure SVG + CSS:
     THREAD → CHARKHA → HANDLOOM → WEAVE → SAREE → THREAD
   Designed to fill the dark "From Thread to Tradition" panel.
   Loops forever with no visible seam (the hero thread is
   continuous across the 0%/100% wrap). Fully static under
   prefers-reduced-motion (see CharkhaLoop.css).
   ============================================================ */

export function CharkhaLoop() {
  return (
    <div className="chl" aria-hidden="true">
      <div className="chl-glow" />

      <div className="chl-stage">
        <svg className="chl-svg" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="chlThread" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#B4832B" />
              <stop offset="35%" stopColor="#E4C471" />
              <stop offset="65%" stopColor="#CDA14B" />
              <stop offset="100%" stopColor="#B4832B" />
            </linearGradient>
            <linearGradient id="chlCloth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8A1230" />
              <stop offset="55%" stopColor="#6A0F26" />
              <stop offset="100%" stopColor="#48091B" />
            </linearGradient>
            <linearGradient id="chlWood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a5763f" />
              <stop offset="100%" stopColor="#6b4418" />
            </linearGradient>
            <radialGradient id="chlShuttle" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#b07a2e" />
              <stop offset="60%" stopColor="#7d541f" />
              <stop offset="100%" stopColor="#4a2f10" />
            </radialGradient>
            <linearGradient id="chlSheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="50%" stopColor="#FBEFC9" stopOpacity=".6" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <pattern id="chlZari" width="40" height="34" patternUnits="userSpaceOnUse">
              <g fill="#E4C471" opacity=".92">
                <path d="M10 7 l2.2 3.6 -2.2 3.6 -2.2 -3.6 z" />
                <circle cx="10" cy="10.6" r=".9" fill="#FBEFC9" />
                <path d="M30 24 l2.2 3.6 -2.2 3.6 -2.2 -3.6 z" />
                <circle cx="30" cy="27.6" r=".9" fill="#FBEFC9" />
              </g>
            </pattern>
            <clipPath id="chlSareeClip">
              <rect x="196" y="72" width="248" height="200" rx="4" />
            </clipPath>
            <clipPath id="chlWeaveClip">
              <rect x="210" y="96" width="220" height="168" />
            </clipPath>
            <linearGradient id="chlLadyShadeG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a060c" stopOpacity="0" />
              <stop offset="100%" stopColor="#180509" stopOpacity="1" />
            </linearGradient>
            <clipPath id="chlLadyClip">
              <path d="M288 186 C 278 236 264 288 259 320 L 381 320 C 376 288 362 236 352 186 Z" />
              <path d="M298 120 C 302 148 302 168 300 186 L 340 186 C 338 168 338 148 342 120 C 328 112 312 112 298 120 Z" />
              <path d="M300 122 C 322 138 352 148 374 176 C 384 202 376 232 362 252 C 358 212 340 182 315 162 C 305 152 300 138 300 122 Z" />
            </clipPath>
          </defs>

          {/* SCENE 1 / 6 · HERO THREAD (spans the loop wrap) */}
          <g className="chl-hero">
            <g className="chl-hero-glow">
              <path
                className="chl-hero-line"
                d="M -60 176 C 120 120 240 236 380 168 C 480 122 560 156 700 190"
                stroke="#E4C471"
                strokeWidth="7"
                opacity=".22"
              />
              <path
                className="chl-hero-line"
                d="M -60 200 C 130 150 250 250 400 196 C 520 152 600 186 700 214"
                stroke="#CDA14B"
                strokeWidth="2"
                opacity=".35"
              />
              <path
                className="chl-hero-line"
                d="M -60 176 C 120 120 240 236 380 168 C 480 122 560 156 700 190"
                stroke="url(#chlThread)"
                strokeWidth="3.4"
              />
              <path
                className="chl-hero-spec"
                d="M -60 176 C 120 120 240 236 380 168 C 480 122 560 156 700 190"
                stroke="#FFF7E2"
                strokeWidth="2"
              />
            </g>
          </g>

          {/* SCENE 2 · CHARKHA */}
          <g className="chl-scene chl-s2">
            <rect x="150" y="256" width="340" height="10" rx="4" fill="url(#chlWood)" />
            <rect x="168" y="266" width="16" height="26" rx="3" fill="#6b4418" />
            <rect x="456" y="266" width="16" height="26" rx="3" fill="#6b4418" />
            <g transform="translate(238,196)">
              <circle r="66" fill="none" stroke="#a5763f" strokeWidth="7" />
              <circle r="60" fill="none" stroke="#c08c4a" strokeWidth="2" />
              <g className="chl-wheel">
                <g stroke="#c89a54" strokeWidth="2.4">
                  <line x1="0" y1="-60" x2="0" y2="60" />
                  <line x1="-60" y1="0" x2="60" y2="0" />
                  <line x1="-42" y1="-42" x2="42" y2="42" />
                  <line x1="-42" y1="42" x2="42" y2="-42" />
                  <line x1="-23" y1="-55" x2="23" y2="55" />
                  <line x1="-55" y1="-23" x2="55" y2="23" />
                  <line x1="23" y1="-55" x2="-23" y2="55" />
                  <line x1="55" y1="-23" x2="-55" y2="23" />
                </g>
                <circle r="9" fill="#7d541f" stroke="#c08c4a" strokeWidth="2" />
                <circle r="2.4" fill="#E4C471" />
              </g>
              <circle r="66" fill="none" stroke="#4a2f10" strokeWidth="1.4" opacity=".5" />
            </g>
            <path d="M300 174 C 360 168 400 176 428 188" fill="none" stroke="#CDA14B" strokeWidth="1.4" opacity=".8" />
            <path d="M300 214 C 360 220 400 212 428 200" fill="none" stroke="#CDA14B" strokeWidth="1.4" opacity=".8" />
            <rect x="396" y="186" width="86" height="6" rx="3" fill="#a5763f" />
            <g transform="translate(438,189)">
              <ellipse className="chl-bobbin-fill" cx="0" cy="0" rx="20" ry="15" fill="url(#chlThread)" />
              <ellipse cx="0" cy="0" rx="20" ry="15" fill="none" stroke="#b07a2e" strokeWidth="1.4" opacity=".5" />
              <line x1="-24" y1="0" x2="24" y2="0" stroke="#6b4418" strokeWidth="3" />
            </g>
            <path d="M240 130 C 320 120 380 150 424 184" fill="none" stroke="url(#chlThread)" strokeWidth="2" />
            <path className="chl-hero-spec" d="M240 130 C 320 120 380 150 424 184" fill="none" stroke="#FFF7E2" strokeWidth="1.4" />
          </g>

          {/* SCENE 3 · HANDLOOM */}
          <g className="chl-scene chl-s3">
            <rect x="150" y="80" width="340" height="14" rx="4" fill="url(#chlWood)" />
            <rect x="150" y="266" width="340" height="16" rx="4" fill="#6b4418" />
            <rect x="150" y="76" width="16" height="210" rx="5" fill="#7d541f" />
            <rect x="474" y="76" width="16" height="210" rx="5" fill="#7d541f" />
            <rect x="153" y="76" width="4" height="210" fill="#a5763f" />
            <rect x="477" y="76" width="4" height="210" fill="#a5763f" />
            <g stroke="url(#chlThread)" strokeWidth="1.3" opacity=".85">
              <line x1="188" y1="96" x2="188" y2="256" />
              <line x1="212" y1="96" x2="212" y2="256" />
              <line x1="236" y1="96" x2="236" y2="256" />
              <line x1="260" y1="96" x2="260" y2="256" />
              <line x1="284" y1="96" x2="284" y2="256" />
              <line x1="308" y1="96" x2="308" y2="256" />
              <line x1="332" y1="96" x2="332" y2="256" />
              <line x1="356" y1="96" x2="356" y2="256" />
              <line x1="380" y1="96" x2="380" y2="256" />
              <line x1="404" y1="96" x2="404" y2="256" />
              <line x1="428" y1="96" x2="428" y2="256" />
              <line x1="452" y1="96" x2="452" y2="256" />
            </g>
            <g clipPath="url(#chlSareeClip)">
              <rect className="chl-loom-cloth" x="182" y="196" width="276" height="70" fill="url(#chlCloth)" />
              <rect className="chl-loom-cloth" x="182" y="196" width="276" height="70" fill="url(#chlZari)" opacity=".85" />
            </g>
            <rect x="182" y="246" width="276" height="20" fill="#B4832B" opacity=".95" />
            <g className="chl-reed">
              <rect x="176" y="188" width="288" height="8" rx="3" fill="#6b4418" />
            </g>
            <g transform="translate(190,178)">
              <g className="chl-shuttle">
                <path d="M-18 0 C -12 -7 12 -7 18 0 C 12 7 -12 7 -18 0 Z" fill="url(#chlShuttle)" />
                <ellipse cx="0" cy="0" rx="5" ry="3.4" fill="#E4C471" />
                <circle r="1.8" fill="#4a2f10" />
                <line x1="-40" y1="0" x2="-18" y2="0" stroke="url(#chlThread)" strokeWidth="1.6" />
              </g>
            </g>
          </g>

          {/* SCENE 4 · WEAVE (macro interlace) */}
          <g className="chl-scene chl-s4">
            <g clipPath="url(#chlWeaveClip)">
              <g stroke="#8A1230" strokeWidth="9">
                <line x1="222" y1="90" x2="222" y2="270" />
                <line x1="248" y1="90" x2="248" y2="270" />
                <line x1="274" y1="90" x2="274" y2="270" />
                <line x1="300" y1="90" x2="300" y2="270" />
                <line x1="326" y1="90" x2="326" y2="270" />
                <line x1="352" y1="90" x2="352" y2="270" />
                <line x1="378" y1="90" x2="378" y2="270" />
                <line x1="404" y1="90" x2="404" y2="270" />
              </g>
              <g className="chl-weave-grow">
                <g fill="none" strokeLinecap="round">
                  <path className="chl-weft" d="M214 108 q13 -7 26 0 t26 0 t26 0 t26 0 t26 0 t26 0 t26 0" stroke="#A31742" strokeWidth="7" />
                  <path className="chl-weft" d="M214 130 q13 7 26 0 t26 0 t26 0 t26 0 t26 0 t26 0 t26 0" stroke="#E4C471" strokeWidth="6" />
                  <path className="chl-weft" d="M214 152 q13 -7 26 0 t26 0 t26 0 t26 0 t26 0 t26 0 t26 0" stroke="#A31742" strokeWidth="7" />
                  <path className="chl-weft" d="M214 174 q13 7 26 0 t26 0 t26 0 t26 0 t26 0 t26 0 t26 0" stroke="#CDA14B" strokeWidth="6" />
                  <path className="chl-weft" d="M214 196 q13 -7 26 0 t26 0 t26 0 t26 0 t26 0 t26 0 t26 0" stroke="#A31742" strokeWidth="7" />
                  <path className="chl-weft" d="M214 218 q13 7 26 0 t26 0 t26 0 t26 0 t26 0 t26 0 t26 0" stroke="#E4C471" strokeWidth="6" />
                  <path className="chl-weft" d="M214 240 q13 -7 26 0 t26 0 t26 0 t26 0 t26 0 t26 0 t26 0" stroke="#A31742" strokeWidth="7" />
                </g>
              </g>
            </g>
            <rect x="210" y="96" width="220" height="168" fill="none" stroke="#CDA14B" strokeWidth="3" opacity=".55" />
          </g>

          {/* SCENE 5 · SAREE */}
          <g className="chl-scene chl-s5">
            <g className="chl-saree-sway">
              <g className="chl-saree-drape">
                <path
                  d="M196 84 C 250 74 330 78 372 92 C 402 150 398 214 372 268 C 320 280 244 278 196 268 C 178 210 176 140 196 84 Z"
                  fill="url(#chlCloth)"
                />
                <g stroke="#3E0916" strokeWidth="2" opacity=".4" fill="none">
                  <path d="M232 92 C 224 160 226 214 240 266" />
                  <path d="M292 88 C 288 160 290 216 300 270" />
                  <path d="M340 92 C 344 158 342 212 352 266" />
                </g>
                <g stroke="#C21A4E" strokeWidth="1.4" opacity=".55" fill="none">
                  <path d="M262 90 C 258 160 260 214 270 268" />
                  <path d="M316 90 C 318 158 316 214 326 268" />
                </g>
                <path
                  d="M196 84 C 250 74 330 78 372 92 C 402 150 398 214 372 268 C 320 280 244 278 196 268"
                  fill="none"
                  stroke="#B4832B"
                  strokeWidth="9"
                />
                <path
                  d="M196 84 C 250 74 330 78 372 92 C 402 150 398 214 372 268 C 320 280 244 278 196 268"
                  fill="none"
                  stroke="#E4C471"
                  strokeWidth="2.4"
                />
                <g clipPath="url(#chlSareeClip)">
                  <rect x="196" y="84" width="188" height="188" fill="url(#chlZari)" opacity=".9" />
                  <rect className="chl-saree-sheen" x="150" y="72" width="60" height="210" fill="url(#chlSheen)" />
                </g>
              </g>
            </g>
          </g>

          {/* SCENE 6 · MODEL wearing the exact same saree (front → 3/4 → side → front) */}
          <g className="chl-scene chl-s6">
            {/* floor shadow stays flat while she turns */}
            <ellipse cx="320" cy="322" rx="64" ry="8" fill="#160409" opacity=".32" />
            <g className="chl-lady-turn">
              <g className="chl-lady-bob">
                {/* arms (behind the drape) */}
                <path d="M300 128 C 291 150 289 172 294 190" fill="none" stroke="#c19a68" strokeWidth="7" strokeLinecap="round" />
                <path d="M340 128 C 349 150 351 172 346 190" fill="none" stroke="#b8905f" strokeWidth="7" strokeLinecap="round" />
                {/* hair (behind) + neck + head */}
                <ellipse cx="320" cy="80" rx="20" ry="16" fill="#241009" />
                <rect x="313" y="103" width="14" height="16" rx="4" fill="#c9a06e" />
                <circle cx="320" cy="92" r="18" fill="#caa06e" />
                <path d="M302 86 C 304 72 336 72 338 86 C 338 74 328 66 320 66 C 312 66 302 74 302 86 Z" fill="#241009" />
                <ellipse cx="333" cy="72" rx="9" ry="8" fill="#1c0c07" />
                <circle cx="320" cy="88" r="1.6" fill="#E4C471" />
                <circle cx="304" cy="100" r="1.6" fill="#E4C471" />
                <circle cx="336" cy="100" r="1.6" fill="#E4C471" />

                {/* saree — same cloth: gradient body, zari border, buti motifs */}
                <path d="M288 186 C 278 236 264 288 259 320 L 381 320 C 376 288 362 236 352 186 Z" fill="url(#chlCloth)" />
                <path d="M298 120 C 302 148 302 168 300 186 L 340 186 C 338 168 338 148 342 120 C 328 112 312 112 298 120 Z" fill="#5A0E22" />
                <g className="chl-lady-pallu">
                  <path d="M300 122 C 322 138 352 148 374 176 C 384 202 376 232 362 252 C 358 212 340 182 315 162 C 305 152 300 138 300 122 Z" fill="url(#chlCloth)" />
                  <path d="M300 122 C 322 138 352 148 374 176 C 384 202 376 232 362 252" fill="none" stroke="#B4832B" strokeWidth="5" />
                  <path d="M300 122 C 322 138 352 148 374 176 C 384 202 376 232 362 252" fill="none" stroke="#E4C471" strokeWidth="1.6" />
                </g>
                {/* buti motifs on skirt + pallu */}
                <g clipPath="url(#chlLadyClip)">
                  <rect x="256" y="110" width="132" height="214" fill="url(#chlZari)" opacity=".85" />
                  {/* pleat shading */}
                  <g stroke="#3E0916" strokeWidth="1.6" opacity=".4" fill="none">
                    <path d="M300 190 C 296 250 290 292 286 320" />
                    <path d="M320 190 C 320 250 320 292 320 320" />
                    <path d="M340 190 C 344 250 350 292 354 320" />
                  </g>
                  {/* turn shading — darkens toward the side view */}
                  <rect className="chl-lady-shade" x="256" y="64" width="132" height="262" fill="url(#chlLadyShadeG)" />
                </g>
                {/* zari hem border */}
                <path d="M259 314 C 300 322 340 322 381 314" fill="none" stroke="#B4832B" strokeWidth="8" />
                <path d="M259 314 C 300 322 340 322 381 314" fill="none" stroke="#E4C471" strokeWidth="2" />
                {/* zari border down the leading edge */}
                <path d="M352 186 C 362 236 376 288 381 320" fill="none" stroke="#B4832B" strokeWidth="5" />
              </g>
            </g>
          </g>
        </svg>
      </div>

      <div className="chl-caps">
        <span className="chl-cap chl-cap1">Thread</span>
        <span className="chl-cap chl-cap2">Charkha</span>
        <span className="chl-cap chl-cap3">Handloom</span>
        <span className="chl-cap chl-cap4">Weave</span>
        <span className="chl-cap chl-cap5">Saree</span>
        <span className="chl-final">Saree Being Woven for You.</span>
      </div>

      <div className="chl-dots">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
