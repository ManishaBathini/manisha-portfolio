import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import './index.css';

// ── Typewriter hook ───────────────────────────────────
const useTypewriter = (texts: string[], speed = 75, pause = 2000) => {
  const [displayed, setDisplayed] = useState('');
  const [textIdx, setTextIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx(i => i + 1);
      }, speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx(i => i - 1);
      }, speed / 2);
    } else {
      // cycle to next text — wrapped in setTimeout to avoid sync setState in effect
      timeout = setTimeout(() => {
        setDeleting(false);
        setTextIdx(i => (i + 1) % texts.length);
        setCharIdx(0);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return displayed;
};

// ── Hero Component ───────────────────────────────────
const Hero = () => {
  const role = useTypewriter([
    'Full-Stack Developer',
    'AI Application Builder',
    'React Developer',
    'Python Developer',
    'MCA Graduate',
  ]);


  return (
    <section className="hero" id="home" aria-label="Hero section">
      <Navbar />

        {/* Hexagon SVG grid — right half */}
        <svg className="hero-hex-bg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexPattern" x="0" y="0" width="80" height="70" patternUnits="userSpaceOnUse">
              <polygon
                points="40,2 72,18 72,52 40,68 8,52 8,18"
                fill="none"
                stroke="#1e3a1e"
                strokeWidth="1"
                opacity="0.55"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>

        <div className="hero-inner">

          {/* ── LEFT CONTENT ─────────────────── */}
          <div className="hero-left">

            {/* "Hey, I'm" line */}
            <h1 className="hero-heading">
              <span className="hero-hey">Hey, there 👋</span>
              <span className="hero-name"> <span className="hero-hey">I'm</span> Manisha Bathini</span>
              <span className="hero-role-line">
                <span className="hero-role-gt">&gt;</span>
                <span className="hero-role-text">{role}</span>
                <span className="typewriter-cursor" aria-hidden="true" />
              </span>
            </h1>

            {/* Subtext */}
            <p className="hero-sub">
              Building impactful digital products is a challenge I embrace.{' '}
            
                Expertise in React.js, Node.js, Python & AI-powered web applications
             
              — crafting scalable, intelligent, and beautiful software.
            </p>

            {/* Resume button */}
            <a
              href="/Manisha_Bathini_Resume.pdf"
              download
              className="btn-resume"
              aria-label="Download Manisha Bathini Resume"
            >
              {/* Down-arrow icon — left of text */}
              <svg className="btn-resume-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/>
              </svg>
              <span>Download Resume</span>
            </a>

            {/* Social buttons — coloured icons like reference */}
            <div className="hero-socials">
              {/* LinkedIn — blue icon */}
              <a
                href="https://linkedin.com/in/manisha-bathini"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-social btn-social--linkedin"
                aria-label="LinkedIn Profile"
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136
                  2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267
                  5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782
                  13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24
                  1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>

              {/* Email — green icon */}
              <a
                href="mailto:manishabathini9999@gmail.com"
                className="btn-social btn-social--email"
                aria-label="Send Email"
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0
                  4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Email
              </a>

              {/* Phone — emerald icon */}
              <a
                href="tel:+917013320025"
                className="btn-social btn-social--phone"
                aria-label="Call Phone"
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6
                  0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2
                  2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                Phone
              </a>
            </div>


          </div>{/* end hero-left */}

          {/* ── RIGHT ILLUSTRATION ───────────── */}
          <div className="hero-right">
            {/* Floating tech badges */}
            <span className="tech-badge">JS</span>
            <span className="tech-badge">&lt;/&gt;</span>
            <span className="tech-badge">React</span>
            <span className="tech-badge">Python</span>
            <span className="tech-badge">Node.js</span>
            <span className="tech-badge">MongoDB</span>

            {/* Lottie Animation */}
            <div className="hero-lottie">
              {/* @ts-expect-error — lottie-player is a custom element */}
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json"
                background="transparent"
                speed="1"
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>

        </div>{/* end hero-inner */}

        {/* ── Scroll Arrow — absolute, centered bottom of section ── */}
        <div className="scroll-arrow-wrap" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28" height="28"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <span className="scroll-arrow-label">scroll down</span>
        </div>

      </section>
  );
};

export default Hero;
