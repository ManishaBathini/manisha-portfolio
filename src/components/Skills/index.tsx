import React, { useState } from 'react';
import './index.css';

interface Skill {
  name: string;
  icon: string;
  category: 'Frontend' | 'Backend' | 'Tools';
}

const skills: Skill[] = [
  { name: 'React.js',   icon: 'devicon-react-original colored',        category: 'Frontend' },
  { name: 'HTML5',      icon: 'devicon-html5-plain colored',            category: 'Frontend' },
  { name: 'CSS3',       icon: 'devicon-css3-plain colored',             category: 'Frontend' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored',       category: 'Frontend' },
  { name: 'Bootstrap',  icon: 'devicon-bootstrap-plain colored',        category: 'Frontend' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain colored',       category: 'Frontend' },
  { name: 'Node.js',    icon: 'devicon-nodejs-plain colored',           category: 'Backend'  },
  { name: 'Express.js', icon: 'devicon-express-original',               category: 'Backend'  },
  { name: 'Python',     icon: 'devicon-python-plain colored',           category: 'Backend'  },
  { name: 'MongoDB',    icon: 'devicon-mongodb-plain colored',          category: 'Backend'  },
  { name: 'SQL',        icon: 'devicon-azuresqldatabase-plain colored', category: 'Backend'  },
  { name: 'REST APIs',  icon: 'devicon-fastapi-plain colored',          category: 'Backend'  },
  { name: 'Git',        icon: 'devicon-git-plain colored',              category: 'Tools'    },
  { name: 'GitHub',     icon: 'devicon-github-original',                category: 'Tools'    },
  { name: 'VS Code',    icon: 'devicon-vscode-plain colored',           category: 'Tools'    },
];

type FilterTab = 'All' | 'Frontend' | 'Backend' | 'Tools';
const TABS: FilterTab[] = ['All', 'Frontend', 'Backend', 'Tools'];

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const filtered = activeTab === 'All'
    ? skills
    : skills.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="skills-section" aria-label="Skills">
      <div className="skills-glow" aria-hidden="true" />

      <div className="skills-container">

        {/* ── Header ── */}
        <div className="skills-header">
          <span className="skills-tag">&lt;skills /&gt;</span>
          <h2 className="skills-title">Skills</h2>
          <p className="skills-subtitle">
            Expertise across the full stack, driven by precision and innovation.
          </p>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="skills-tabs-wrap">
          <div className="skills-tabs-pill">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`skills-tab${activeTab === tab ? ' skills-tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Hexagon Grid ── */}
        <div className="skills-grid" key={activeTab}>
          {filtered.map((skill, index) => (
            <div
              key={skill.name}
              className="hex-wrapper"
              style={{ animationDelay: `${index * 50}ms` }}
              title={skill.name}
            >
              <div className="hex-outer">
                <div className="hex-inner">
                  <i className={skill.icon} aria-label={skill.name} />
                  <span className="hex-label">{skill.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
