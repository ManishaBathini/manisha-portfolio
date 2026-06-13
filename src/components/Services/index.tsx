import { useEffect, useRef, useState } from 'react';
import './index.css';

interface Service {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

const services: Service[] = [
  {
    icon: '💻',
    title: 'Full-Stack Web Development',
    description:
      'End-to-end web applications from database design to responsive UI. Built with React.js, Node.js, Express, and MongoDB for scalable, production-ready solutions.',
    tags: ['React.js', 'Node.js', 'MongoDB'],
  },
  {
    icon: '🤖',
    title: 'AI-Powered Applications',
    description:
      'Integrating cutting-edge AI capabilities using Google Gemini API, LLMs, and RAG architectures to build intelligent features like chatbots, evaluation systems, and voice interfaces.',
    tags: ['Gemini API', 'RAG', 'LLMs'],
  },
  {
    icon: '🔧',
    title: 'REST API Development',
    description:
      'Designing and building robust, secure REST APIs with proper authentication (JWT), error handling, and documentation for seamless frontend-backend integration.',
    tags: ['REST APIs', 'JWT', 'Express.js'],
  },
  {
    icon: '🧪',
    title: 'Test Automation',
    description:
      'Automating critical user workflows including login, form submission, and integration flows using Selenium WebDriver with Python for improved reliability and testing efficiency.',
    tags: ['Selenium', 'Python', 'Automation'],
  },
  {
    icon: '🎨',
    title: 'Responsive UI Design',
    description:
      'Creating pixel-perfect, mobile-first responsive interfaces using modern CSS, Bootstrap, and React component architecture that deliver excellent user experiences.',
    tags: ['HTML/CSS', 'Bootstrap', 'React.js'],
  },
  {
    icon: '🗄️',
    title: 'Database Design & Management',
    description:
      'Designing efficient database schemas for MongoDB and SQL databases, implementing data models, queries, and optimization strategies for high-performance applications.',
    tags: ['MongoDB', 'SQL', 'Node.js'],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(services.length).fill(false)
  );
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  const next = [...prev];
                  next[index] = true;
                  return next;
                });
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      headerObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      {/* Radial glow at top-center */}
      <div className="services-glow" aria-hidden="true" />

      {/* Header */}
      <div
        ref={headerRef}
        className={`services-header ${headerVisible ? 'services-header--visible' : ''}`}
      >
        <span className="services-section-tag">&lt;services /&gt;</span>
        <h2 className="services-title">Services</h2>
        <p className="services-subtitle">
          What I bring to your project — from idea to deployment.
        </p>
      </div>

      {/* Cards grid */}
      <div className="services-grid">
        {services.map((service, i) => (
          <div
            key={service.title}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`service-card ${visibleCards[i] ? 'service-card--visible' : ''}`}
          >
            <div className="service-card__icon" aria-hidden="true">
              {service.icon}
            </div>
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__desc">{service.description}</p>
            <div className="service-card__tags">
              {service.tags.map((tag) => (
                <span key={tag} className="service-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
