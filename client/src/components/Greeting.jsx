import React from 'react';
import { GithubIcon, LinkedinIcon, MailIcon, LeetcodeIcon, StarIcon } from './Icons.jsx';
import DeveloperIllustration from './DeveloperIllustration.jsx';

export default function Greeting({ profile }) {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="df-section greeting-section" id="greeting">
      <div className="df-container greeting-grid">
        <div className="greeting-text-div">
          <div className="greeting-status-pill">
            <span className="status-dot" />
            <span>Open for AI/ML & Full Stack Roles (2026)</span>
          </div>

          <h1 className="greeting-title">
            Hi all, I'm {profile.name?.split(' ')[0] || 'Shlok'}{' '}
            <span className="wave-emoji" role="img" aria-label="Waving hand">
              👋
            </span>
          </h1>

          <p className="greeting-subtitle">
            A passionate <span className="highlight-text">AI/ML Engineer & Full Stack Developer</span> 🚀 having an
            experience of building autonomous multi-agent systems, scalable web applications with React, Node.js,
            FastAPI & Python, and leading university student initiatives.
          </p>

          <p className="greeting-location">
            📍 Based in <span className="highlight-text">{profile.location || 'Bhopal, India'}</span>
          </p>

          <div className="social-media-div">
            {profile.links?.github && (
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn github"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={22} />
              </a>
            )}
            {profile.links?.linkedin && (
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn linkedin"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={22} />
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="social-icon-btn gmail"
                title={`Email: ${profile.email}`}
                aria-label="Send an email"
              >
                <MailIcon size={22} />
              </a>
            )}
            {profile.links?.leetcode && (
              <a
                href={profile.links.leetcode}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn leetcode"
                title="LeetCode Profile"
                aria-label="LeetCode Profile"
              >
                <LeetcodeIcon size={22} />
              </a>
            )}
            {profile.links?.hackerrank && (
              <a
                href={profile.links.hackerrank}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn hackerrank"
                title="HackerRank Profile"
                aria-label="HackerRank Profile"
              >
                <span className="hn-badge">HR</span>
              </a>
            )}
          </div>

          <div className="greeting-actions">
            <button className="df-btn df-btn-primary" onClick={scrollToContact}>
              CONTACT ME
            </button>
            <button className="df-btn df-btn-outline" onClick={scrollToProjects}>
              VIEW PROJECTS
            </button>
            <a
              href={profile.links?.github}
              target="_blank"
              rel="noreferrer"
              className="df-btn df-btn-ghost"
              title="Star on GitHub"
            >
              <StarIcon size={16} />
              <span>STAR ON GITHUB</span>
            </a>
          </div>
        </div>

        <div className="greeting-image-div">
          <DeveloperIllustration />
        </div>
      </div>
    </section>
  );
}
