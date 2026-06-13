import { useEffect, useRef, useState } from 'react';
import introSound from '../../assets/intro-sound.mp3';
import './index.css';

/* ── 30 random particles ── */
const PARTICLES = Array.from({ length: 30 }, () => ({
  left:     `${Math.random() * 100}%`,
  top:      `${Math.random() * 100}%`,
  delay:    `${Math.random() * 5}s`,
  duration: `${3 + Math.random() * 4}s`,
  size:     `${1.5 + Math.random() * 2.5}px`,
}));

/* ── Intro sound — exact copy from old working portfolio ── */
function playOpeningSound() {
  try {
    const audio = new Audio(introSound);
    audio.volume = 0.6;
    audio.play().catch(() => {});
  } catch { /* audio not available */ }
}

/* ── Click sound — Web Audio API shimmer ── */
function playClickSound() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
    const tone = (freq: number, t: number, dur: number, vol: number) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + t);
      gain.gain.setValueAtTime(0, ctx.currentTime + t);
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + dur + 0.05);
    };
    tone(880,  0.00, 0.12, 0.18);
    tone(1320, 0.06, 0.18, 0.12);
  } catch { /* audio not available */ }
}

/* ── Phase order ── */
const ORDER = ['idle', 'greeting', 'text', 'girl', 'cta', 'fadeout'] as const;
type Phase = typeof ORDER[number];

const SplashCard = ({ onEnter }: { onEnter: () => void }) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const doneRef = useRef(false);

  /* Phase sequencer — sound fires at 'text' (900ms) exactly like old portfolio */
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('greeting'), 400),
      setTimeout(() => { setPhase('text'); playOpeningSound(); }, 900),
      setTimeout(() => setPhase('girl'), 1800),
      setTimeout(() => setPhase('cta'),  3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const show = (p: Phase) => ORDER.indexOf(phase) >= ORDER.indexOf(p);

  const handleEnter = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    playClickSound();
    setPhase('fadeout');
    setTimeout(() => onEnter?.(), 1000);
  };

  return (
    <div className={`splash${phase === 'fadeout' ? ' splash--out' : ''}`}
      role="dialog" aria-label="Portfolio intro">

      {/* Particles */}
      <div className="splash__particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span key={i} className="splash__particle" style={{
            left: p.left, top: p.top,
            animationDelay: p.delay, animationDuration: p.duration,
            width: p.size, height: p.size,
          }} />
        ))}
      </div>

      {/* Glows */}
      <div className="splash__glow splash__glow--tl" aria-hidden="true" />
      <div className="splash__glow splash__glow--br" aria-hidden="true" />

      {/* Hexagon grid */}
      <svg className="splash-hex-bg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="splashHex" x="0" y="0" width="80" height="70" patternUnits="userSpaceOnUse">
            <polygon points="40,2 72,18 72,52 40,68 8,52 8,18"
              fill="none" stroke="#1e3a1e" strokeWidth="1" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#splashHex)" />
      </svg>

      {/* Anime character — slides up */}
      <div className={`splash__girl${show('girl') ? ' splash__girl--show' : ''}`} aria-hidden="true">
        <div className="splash__girl-shadow" />
        <div className="splash__girl-aura" />
        <img src="/anime-character.png" alt="Developer illustration"
          className="splash__girl-img" draggable={false} />
      </div>

      {/* Foreground content */}
      <div className="splash__stage">

        <p className={`splash__tag${show('greeting') ? ' splash__tag--show' : ''}`}>
          <span className="splash__tag-dot" />
          Full-Stack Developer · React · AI · Python
        </p>

        <div className={`splash__headline${show('text') ? ' splash__headline--show' : ''}`}>
          <h1 className="splash__h1">
            Welcome&nbsp;to&nbsp;<em className="splash__em">Manisha's</em>&nbsp;Portfolio
            <span className="splash__cursor" />
          </h1>
        </div>

        <p className={`splash__sub${show('text') ? ' splash__sub--show' : ''}`}>
          Crafting intelligent applications that are fast, scalable &amp; impactful.
        </p>

        <div className={`splash__actions${show('cta') ? ' splash__actions--show' : ''}`}>
          <button className="splash__btn" onClick={handleEnter} aria-label="Enter portfolio">
            <span className="splash__btn-bg" />
            <span className="splash__btn-label">Enter Portfolio</span>
            <svg className="splash__btn-arrow" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>

      {/* Corners */}
      <div className="splash__corner splash__corner--tl" aria-hidden="true" />
      <div className="splash__corner splash__corner--tr" aria-hidden="true" />
      <div className="splash__corner splash__corner--bl" aria-hidden="true" />
      <div className="splash__corner splash__corner--br" aria-hidden="true" />

    </div>
  );
};

export default SplashCard;