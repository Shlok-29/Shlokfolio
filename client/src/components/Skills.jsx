import React from 'react';
import SkillsIllustration from './SkillsIllustration.jsx';
import TechIcon from './TechIcon.jsx';

export default function Skills({ stack }) {
  const softwareSkills = [
    { name: 'Python', tag: 'Python' },
    { name: 'JavaScript', tag: 'JavaScript' },
    { name: 'TypeScript', tag: 'TypeScript' },
    { name: 'React', tag: 'React' },
    { name: 'Next.js', tag: 'Next.js' },
    { name: 'Node.js', tag: 'Node.js' },
    { name: 'FastAPI', tag: 'FastAPI' },
    { name: 'MongoDB', tag: 'MongoDB' },
    { name: 'PostgreSQL', tag: 'PostgreSQL' },
    { name: 'Docker', tag: 'Docker' },
    { name: 'CrewAI / Agents', tag: 'CrewAI' },
    { name: 'Gemini API', tag: 'Gemini API' },
    { name: 'Tailwind CSS', tag: 'Tailwind' },
    { name: 'Git', tag: 'Git' },
    { name: 'HTML5', tag: 'HTML' },
    { name: 'CSS3', tag: 'CSS' },
  ];

  const proficiencies = [
    { name: 'Frontend / Web Applications (React, Next.js)', progress: 90, color: '#61DAFB' },
    { name: 'Backend & REST APIs (FastAPI, Node.js, Express)', progress: 92, color: '#387EB8' },
    { name: 'AI, Machine Learning & Multi-Agents (CrewAI, Gemini)', progress: 94, color: '#6C63FF' },
    { name: 'Databases & System Architecture (Mongo, Postgres, Docker)', progress: 85, color: '#10B981' },
    { name: 'Leadership & Project Management (Student Council President)', progress: 96, color: '#FFB627' },
  ];

  return (
    <section className="df-section skills-section" id="skills">
      <div className="df-container">
        <div className="section-header">
          <h2 className="section-title">What I do</h2>
          <p className="section-subtitle">
            PASSIONATE AI/ML & FULL STACK DEVELOPER WHO LOVES BUILDING IMPACTFUL PRODUCTS
          </p>
        </div>

        <div className="skills-main-grid">
          <div className="skills-ill-col">
            <SkillsIllustration />
          </div>

          <div className="skills-content-col">
            <div className="software-skills-wrapper">
              <h3 className="skills-subheading">Tech Stack & Frameworks</h3>
              <div className="software-skills-grid">
                {softwareSkills.map((s) => (
                  <div key={s.name} className="software-skill-item" title={s.name}>
                    <TechIcon name={s.tag} size={44} />
                    <span className="skill-label">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skills-bullets">
              <div className="skill-bullet-item">
                <span className="bullet-icon">⚡</span>
                <p>
                  Developing highly interactive, performant Front-End & Full Stack web applications using{' '}
                  <strong>React, Next.js, JavaScript/TypeScript</strong> and modern CSS.
                </p>
              </div>

              <div className="skill-bullet-item">
                <span className="bullet-icon">⚡</span>
                <p>
                  Architecting <strong>autonomous multi-agent systems and intelligent workflows</strong> using{' '}
                  <strong>CrewAI, Gemini API, and LLMs</strong> (e.g. Udbhav 2k26 National Hackathon Top 10 Finalist).
                </p>
              </div>

              <div className="skill-bullet-item">
                <span className="bullet-icon">⚡</span>
                <p>
                  Engineering robust, scalable RESTful APIs and microservices with{' '}
                  <strong>FastAPI, Express.js, MongoDB, PostgreSQL</strong>, and containerizing with <strong>Docker</strong>.
                </p>
              </div>

              <div className="skill-bullet-item">
                <span className="bullet-icon">⚡</span>
                <p>
                  Leading student tech communities, organizing hackathons, and driving cross-functional collaboration as{' '}
                  <strong>Student Council President</strong> and <strong>AIESEC Junior Manager</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="proficiency-container">
          <div className="proficiency-header">
            <h3 className="proficiency-title">Proficiency</h3>
            <p className="proficiency-desc">
              Hands-on mastery across core development domains and system leadership.
            </p>
          </div>

          <div className="proficiency-list">
            {proficiencies.map((p) => (
              <div key={p.name} className="proficiency-item">
                <div className="proficiency-meta">
                  <span className="prof-name">{p.name}</span>
                  <span className="prof-value">{p.progress}%</span>
                </div>
                <div className="prof-meter-track">
                  <div
                    className="prof-meter-fill"
                    style={{
                      width: `${p.progress}%`,
                      background: `linear-gradient(90deg, #6c63ff 0%, ${p.color} 100%)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
