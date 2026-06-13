import React, { useState } from 'react';
import './index.css';

/* ─────────────────────────────────────────── */
/* DATA                                        */
/* ─────────────────────────────────────────── */
interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  demo: string;
  github: string;
}

const featuredProjects: Project[] = [
  {
    title: 'AI Mock Interview Platform',
    category: 'AI-POWERED · FULL STACK',
    image: '/project-interview.png',
    description:
      'An AI-powered mock interview platform with resume-based question generation, voice interaction, coding challenges, and real-time personalised feedback using Google Gemini API. Automated end-to-end testing via Selenium WebDriver.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Python', 'Gemini API', 'Selenium'],
    demo:   'https://ai-mock-interview-platform-peach-xi.vercel.app/',
    github: 'https://github.com/ManishaBathini/ai-mock-interview-platform',
  },
  {
    title: 'EduReach AI Platform',
    category: 'AI-POWERED · FULL STACK',
    image: '/project-edureach.png',
    description:
      'A full-stack MERN application with an Agentic RAG chatbot for college assistance. Features JWT authentication, AI voice counselor, real-time conversational support and seamless student onboarding powered by Google Gemini API.',
    tags: ['React.js', 'TypeScript', 'Node.js', 'MongoDB', 'Gemini API', 'JWT'],
    demo:   'https://edureach-ai-platform-4hbt.vercel.app/',
    github: 'https://github.com/ManishaBathini/edureach-ai-platform',
  },
];

const moreProjects: Project[] = [
   {
    title: 'FlowerNest',
    category: 'Web Design',
    image: 'https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg?w=1060&t=st=1701511063~exp=1701511663~hmac=4ad649cc2d4ea5ac27013923e81e5064bc823e437c979feacc811cfa265e3cd0',
    description:
      'FlowerNest beckons with a captivating display of nature\'s finest blooms, offering a seamless online journey where customers find the perfect bouquet.',
    tags: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    demo: 'https://flowernest-website.vercel.app/', github: 'https://github.com/ManishaBathini/flowernest-website',
  },
  {
    title: 'Wiki Search',
    category: 'Web App',
    image: 'https://img.theweek.in/content/dam/week/news/biztech/2018/April/wikipedia-logo.jpg',
    description:
      'The Wiki Search Application allows users to explore a vast repository of knowledge and information from Wikipedia with ease.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Wikipedia API'],
    demo: 'https://wikiapplicatoin.ccbp.tech/', github: 'https://github.com/ManishaBathini/wiki-pedia',
  },
  {
    title: 'Calculator',
    category: 'Web App',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple111/v4/18/a5/96/18a596ab-0d2f-6bc9-7b35-cdfe893f0a64/mzl.lvkguvcf.png/1200x630wa.png',
    description:
      'Effortlessly perform basic arithmetic calculations with this user-friendly Simple Calculator — your handy tool for quick math tasks.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://newcalci.ccbp.tech/', github: 'https://github.com/ManishaBathini/CODSOFT/tree/main/Calculator%20Website',
  },
  {
    title: 'Food Munch',
    category: 'Web Design',
    image: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg?w=2000',
    description:
      'Food Munch is the best-in-class food ordering page. With interactive UI/UX and simple call-to-actions, it delivers a seamless experience.',
    tags: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    demo: ' https://fooddmunchpage.ccbp.tech/', github: 'https://github.com/ManishaBathini/foodmunch-web-app',
  },
    {
    title: 'Todo Application',
    category: 'Web App',
    image: 'https://www.freecodecamp.org/news/content/images/2021/10/todo-image.png',
    description:
      'A todo application — your personal productivity powerhouse — seamlessly organising your tasks and schedules to maximise efficiency.',
    tags: ['React.js', 'CSS', 'JavaScript'],
    demo: 'https://finaltodoappli.ccbp.tech/', github: 'https://github.com/ManishaBathini/todo-app',
  },
   
  {
    title: 'AI Chatbot',
    category: 'AI · Web App',
    image: 'https://c8.alamy.com/comp/2C4GPR0/ai-chatbot-smart-digital-customer-service-application-concept-computer-or-mobile-device-application-using-artificial-intelligence-chat-bot-automatic-2C4GPR0.jpg',
    description:
      'Experience the future of AI-driven conversations with our Gen AI Chatbot, combining cutting-edge technology and natural language understanding.',
    tags: ['Python', 'NLP', 'React.js', 'JavaScript'],
    demo: 'https://manishagenai.ccbp.tech/', github: 'https://github.com/ManishaBathini/genai-bot',
  },
];

/* ─────────────────────────────────────────── */
/* ICONS                                       */
/* ─────────────────────────────────────────── */
const IconExternal = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);
const IconGH = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

/* ─────────────────────────────────────────── */
/* FEATURED CARD — browser mockup left         */
/* ─────────────────────────────────────────── */
const FeaturedCard = ({ p }: { p: Project }) => (
  <article className="feat-card">

    {/* LEFT — browser mockup */}
    <div className="feat-mockup-col">
      <div className="feat-browser">
        {/* Browser chrome bar */}
        <div className="feat-browser-bar">
          <span className="feat-browser-dot" style={{ background: '#ff5f57' }} />
          <span className="feat-browser-dot" style={{ background: '#ffbd2e' }} />
          <span className="feat-browser-dot" style={{ background: '#28ca41' }} />
          <div className="feat-browser-url">
            <span>🔒</span>
            <span className="feat-browser-domain">manisha-portfolio.vercel.app</span>
          </div>
        </div>
        {/* Screenshot */}
        <div className="feat-browser-screen">
          {p.image ? (
            <img src={p.image} alt={p.title} className="feat-browser-img"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          ) : (
            <div className="feat-browser-placeholder">{ '{  }' }</div>
          )}
        </div>
      </div>
    </div>

    {/* RIGHT — content */}
    <div className="feat-content-col">
      <span className="feat-category">{p.category}</span>
      <h3 className="feat-title">{p.title}</h3>
      <p className="feat-desc">{p.description}</p>

      <div className="feat-tags">
        {p.tags.map((t) => <span key={t} className="feat-tag">{t}</span>)}
      </div>

      <div className="feat-ctas">
        <a href={p.github} className="feat-cta feat-cta--repo" target="_blank" rel="noopener noreferrer">
          <IconGH /> VIEW REPOSITORY
        </a>
        <a href={p.demo} className="feat-cta feat-cta--demo" target="_blank" rel="noopener noreferrer">
          LIVE DEMO <IconExternal />
        </a>
      </div>
    </div>

  </article>
);

/* ─────────────────────────────────────────── */
/* MORE CARD — image-top card (reference 2&3) */
/* ─────────────────────────────────────────── */
const CARD_GRADIENTS = [
  'linear-gradient(160deg,#0f3020 0%,#0a1f14 100%)',
  'linear-gradient(160deg,#0f1f30 0%,#080f20 100%)',
  'linear-gradient(160deg,#1f0f30 0%,#120820 100%)',
  'linear-gradient(160deg,#301f0f 0%,#1a0f06 100%)',
  'linear-gradient(160deg,#0f2030 0%,#071420 100%)',
  'linear-gradient(160deg,#0a2a1a 0%,#051510 100%)',
];
const CARD_ICONS = ['🍽️','✅','🔍','🖩','🌸','🤖'];

const MoreCard = ({ p, idx }: { p: Project; idx: number }) => (
  <article className="more-card" style={{ animationDelay: `${idx * 70}ms` }}>

    {/* Image / gradient top */}
    <div className="more-card-top"
      style={{ background: p.image ? '#111' : CARD_GRADIENTS[idx % CARD_GRADIENTS.length] }}>
      {p.image ? (
        <img src={p.image} alt={p.title} className="more-card-img"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
      ) : (
        <span className="more-card-emoji">{CARD_ICONS[idx % CARD_ICONS.length]}</span>
      )}
    </div>

    {/* Body */}
    <div className="more-card-body">
      <span className="more-card-cat">{p.category}</span>
      <h4 className="more-card-title">{p.title}</h4>
      <p className="more-card-desc">{p.description}</p>

      <div className="more-card-tags">
        {p.tags.slice(0, 3).map((t) => <span key={t} className="more-card-tag">{t}</span>)}
      </div>

      {/* Links — GitHub + Live Demo (no "View All") */}
      <div className="more-card-links">
        <a href={p.github} className="more-link more-link--gh" target="_blank" rel="noopener noreferrer">
          <IconGH /> GitHub
        </a>
        <a href={p.demo} className="more-link more-link--demo" target="_blank" rel="noopener noreferrer">
          <IconExternal /> Live Demo
        </a>
      </div>
    </div>

  </article>
);

/* ─────────────────────────────────────────── */
/* MAIN COMPONENT                             */
/* ─────────────────────────────────────────── */
const Projects: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="projects" className="projects-section" aria-label="Projects">
      <div className="projects-glow" aria-hidden="true" />

      <div className="projects-container">

        {/* Header */}
        <div className="projects-header">
          <span className="projects-tag">&lt;projects /&gt;</span>
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">
            Building intelligent solutions to real-world challenges.
          </p>
        </div>

        {/* Featured cards — browser mockup style */}
        <div className="feat-cards-stack">
          {featuredProjects.map((p) => (
            <FeaturedCard key={p.title} p={p} />
          ))}
        </div>

        {/* Toggle */}
        <div className="toggle-wrap">
          <button
            className="btn-toggle"
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
          >
            {showMore ? '↑ Show Less' : '↓ View More Projects'}
          </button>
        </div>

        {/* More projects grid */}
        {showMore && (
          <div className="more-cards-grid">
            {moreProjects.map((p, i) => (
              <MoreCard key={p.title} p={p} idx={i} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;