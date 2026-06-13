import { useEffect, useState } from 'react';
import './App.css';

import SplashCard from './components/SplashCard';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';

/* ──────────────────────────────────────────────
   Global UI click sound
   — fires on every <button> and <a> click in the entire app
   — single listener at document level, no changes needed per component
────────────────────────────────────────────── */
function playUIClick() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
    const now = ctx.currentTime;

    // Tone 1 — soft high click
    const osc1  = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(900, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.12, now + 0.008);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.15);

    // Tone 2 — lighter shimmer follow
    const osc2  = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1400, now + 0.05);
    gain2.gain.setValueAtTime(0, now + 0.05);
    gain2.gain.linearRampToValueAtTime(0.07, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.22);
  } catch { /* audio unavailable */ }
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showTop, setShowTop]       = useState(false);

  const handleEnter = () => { setShowSplash(false); };

  /* Scroll-reveal for Back to Top */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Global UI click sound — attaches once, covers every button & link */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Walk up the DOM to find the nearest button or anchor
      const el = target.closest('button, a');
      if (el) playUIClick();
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  /* ── Splash screen ── */
  if (showSplash) {
    return <SplashCard onEnter={handleEnter} />;
  }

  /* ── Full portfolio ── */
  return (
    <div className="app">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />

      {/* ── Footer ── */}
      <footer className="portfolio-footer">
        <div className="footer-inner">
          <p className="footer-copy">
            &copy; 2025{' '}
            <span className="footer-name">Manisha Bathini</span>.{' '}
            Crafted with ❤️ &amp; React.
          </p>
          <p className="footer-dev">Developed by Manisha Bathini</p>
          <div className="footer-socials">
            <a
              href="https://linkedin.com/in/manisha-bathini"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              {/* LinkedIn icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/manisha-bathini"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              {/* GitHub icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href="mailto:manishabathini9999@gmail.com"
              className="footer-social-link"
              aria-label="Email"
            >
              {/* Email icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-.027.002-.054.003-.08L12 13.75 23.997 5.377c.002.026.003.053.003.08z" />
                <path d="M12 11.25L.229 3.75A1.636 1.636 0 011.636 3h20.728c.6 0 1.13.325 1.407.75L12 11.25z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
      {/* ── Back to Top button ── */}
      <button
        className={`back-to-top${showTop ? ' back-to-top--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 15l7-7 7 7" />
        </svg>
      </button>

    </div>
  );
}

export default App;