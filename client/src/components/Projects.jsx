import React, { useState } from 'react';
import { GithubIcon, ExternalLinkIcon, StarIcon, ForkIcon, TrophyIcon, CodeIcon } from './Icons.jsx';

export default function Projects({ projects, links }) {
  const [filter, setFilter] = useState('all');

  const featured = projects?.find((p) => p.featured) || projects?.[0];
  const regularProjects = projects || [];

  const filteredProjects = regularProjects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'ai') return p.tags?.includes('AI') || p.stack?.some((s) => /crew|ai|ml|fastapi/i.test(s));
    if (filter === 'fullstack') return p.tags?.includes('Full stack') || p.stack?.some((s) => /react|next|node/i.test(s));
    return true;
  });

  const getLanguageColor = (stack) => {
    const s = (stack?.[0] || '').toLowerCase();
    if (s.includes('python')) return '#3572A5';
    if (s.includes('type')) return '#3178C6';
    if (s.includes('java') || s.includes('js')) return '#F7DF1E';
    if (s.includes('react')) return '#61DAFB';
    return '#6C63FF';
  };

  return (
    <section className="df-section projects-section" id="projects">
      <div className="df-container">
        <div className="section-header">
          <h2 className="section-title">Open Source Projects</h2>
          <p className="section-subtitle">FEATURED BUILDS, HACKATHON WINNERS & REPOSITORIES</p>
        </div>

        {featured && (
          <div className="featured-project-container">
            <div className="featured-project-card">
              <div className="featured-banner">
                <span className="featured-tag">★ Featured Flagship Project</span>
                {featured.badge && (
                  <span className="featured-award-pill">
                    <TrophyIcon size={14} />
                    <span>{featured.badge}</span>
                  </span>
                )}
              </div>

              <div className="featured-content-grid">
                <div className="featured-details">
                  <h3 className="featured-title">{featured.name}</h3>
                  <p className="featured-tagline">{featured.tagline}</p>
                  <p className="featured-desc">{featured.description}</p>

                  <div className="featured-highlights-list">
                    {featured.highlights?.map((h, i) => (
                      <span key={i} className="highlight-pill">
                        ✓ {h}
                      </span>
                    ))}
                  </div>

                  <div className="featured-tech-row">
                    {featured.stack?.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="featured-actions">
                    {featured.repo && (
                      <a
                        href={featured.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="df-btn df-btn-primary"
                      >
                        <GithubIcon size={18} />
                        <span>View Repository</span>
                      </a>
                    )}
                    {featured.live && (
                      <a
                        href={featured.live}
                        target="_blank"
                        rel="noreferrer"
                        className="df-btn df-btn-outline"
                      >
                        <ExternalLinkIcon size={18} />
                        <span>Live Preview</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="featured-graphic">
                  <div className="featured-terminal">
                    <div className="terminal-bar">
                      <span className="dot red" />
                      <span className="dot yellow" />
                      <span className="dot green" />
                      <span className="terminal-title">chainmind-agent-orchestrator.py</span>
                    </div>
                    <pre className="terminal-code">
                      <code>
{`# Multi-Agent Supply Chain Orchestration
from crewai import Agent, Task, Crew
import fastapi

lead_agent = Agent(
    role="Supply Chain Sentinel",
    goal="Identify logistical bottlenecks",
    backstory="Autonomous multi-agent controller",
    tools=[InventoryPredictor, RouteOptimizer]
)

# Top 10 Grand Finalist - Capgemini AgentifAI
status = "SYSTEM OPERATIONAL [100% HEALTH]"`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="projects-filter-bar">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects ({regularProjects.length})
          </button>
          <button
            className={`filter-btn ${filter === 'ai' ? 'active' : ''}`}
            onClick={() => setFilter('ai')}
          >
            AI & Multi-Agents
          </button>
          <button
            className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`}
            onClick={() => setFilter('fullstack')}
          >
            Full Stack & Web
          </button>
        </div>

        <div className="repo-cards-grid">
          {filteredProjects.map((p) => {
            const langColor = getLanguageColor(p.stack);
            const mainLang = p.stack?.[0] || 'Python';

            return (
              <div key={p.id} className="repo-card">
                <div className="repo-card-top">
                  <div className="repo-header-left">
                    <CodeIcon size={20} className="repo-code-icon" />
                    <h4 className="repo-name">{p.name}</h4>
                  </div>
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="repo-external-link"
                      title="Open GitHub repo"
                    >
                      <GithubIcon size={18} />
                    </a>
                  )}
                </div>

                <p className="repo-desc">{p.description || p.tagline}</p>

                {p.highlights?.length > 0 && (
                  <div className="repo-highlights">
                    {p.highlights.map((h, hIdx) => (
                      <span key={hIdx} className="repo-hl-tag">
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                <div className="repo-tags-wrap">
                  {p.stack?.slice(0, 4).map((tech) => (
                    <span key={tech} className="repo-stack-badge">
                      {tech}
                    </span>
                  ))}
                  {p.stack?.length > 4 && (
                    <span className="repo-stack-badge more">+{p.stack.length - 4}</span>
                  )}
                </div>

                <div className="repo-footer">
                  <div className="repo-lang-meta">
                    <span className="lang-color-dot" style={{ backgroundColor: langColor }} />
                    <span className="lang-text">{mainLang}</span>
                  </div>

                  <div className="repo-actions">
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="repo-action-link"
                      >
                        Code
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="repo-action-link demo"
                      >
                        Demo <ExternalLinkIcon size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {links?.github && (
          <div className="more-projects-div">
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="df-btn df-btn-primary more-projects-btn"
            >
              <span>MORE PROJECTS ON GITHUB</span>
              <GithubIcon size={18} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
