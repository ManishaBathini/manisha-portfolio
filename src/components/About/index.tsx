import { useEffect, useRef } from 'react';
import './index.css';

const STATS = [
  { value: '2', label: 'AI Projects' },
  { value: '8.5', label: 'CGPA' },
  { value: '10+', label: 'Technologies' },
  { value: 'MCA', label: 'Graduate' },
];

const About = () => {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    if (leftRef.current)  observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section" aria-label="About Manisha Bathini">
      <div className="about-glow top-about-glow" aria-hidden="true" />
      <div className="about-container">

        {/* ── LEFT — Photo ── */}
        <div className="about-photo-col" ref={leftRef}>
          <div className="about-photo-wrap">
            {/* Decorative back card */}
            <div className="about-photo-back" aria-hidden="true" />
            {/* Front image card */}
            <div className="about-photo-card">
              <img
                src="/manisha-photo.png"
                alt="Manisha Bathini"
                className="about-photo"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT — Content ── */}
        <div className="about-content" ref={rightRef}>
          <span className="about-tag">&lt;about /&gt;</span>
          <h2 className="about-title">About Me</h2>
          <div className="about-bar" aria-hidden="true" />
          <p className="about-para">
            I'm <strong>Manisha Bathini</strong>, an MCA graduate from Vivekananda PG College,
            Secunderabad (CGPA: 8.5) with a passion for building AI-powered, full-stack web
            applications that solve real-world problems.
          </p>
          <p className="about-para">
            With hands-on experience in <strong>React.js, Node.js, Python, MongoDB,</strong> and
            the <strong>Google Gemini API</strong>, I specialize in creating scalable, intelligent,
            and user-centric software solutions.
          </p>
          <p className="about-para">
            Beyond code, I'm driven by curiosity — whether organizing chess competitions or
            participating in AI hackathons, I thrive in collaborative, fast-paced environments.
          </p>

          {/* Info chips */}
          <div className="about-chips">
            <span className="about-chip">📍 Hyderabad, Telangana</span>
            <span className="about-chip">🎓 MCA | CGPA 8.5</span>
            <span className="about-chip">📧 manishabathini9999@gmail.com</span>
          </div>

          {/* Stats */}
          <div className="about-stats" role="list">
            {STATS.map((s) => (
              <div key={s.label} className="about-stat" role="listitem">
                <span className="about-stat-value">{s.value}</span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Leadership & Activities ── */}
      <div className="about-leadership">
        <div className="about-leadership-icon" aria-hidden="true">⭐</div>
        <div className="about-leadership-body">
          <h3 className="about-leadership-title">Leadership &amp; Activities</h3>
          <ul className="about-leadership-list">
            <li>
              Organised and coordinated a college-level chess competition, managing participant
              coordination and event execution.
            </li>
            <li>
              Participated in an AI-focused hackathon involving collaborative development,
              rapid prototyping, and problem-solving.
            </li>
          </ul>
        </div>
      </div>

    </section>
  );
};

export default About;