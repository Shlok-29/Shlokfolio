import React from 'react';
import { TrophyIcon, StarIcon, ExternalLinkIcon } from './Icons.jsx';

export default function Achievements({ links }) {
  const achievements = [
    {
      title: 'Top 10 Finalist — Udbhav 2k26 National Hackathon',
      issuer: 'Udbhav 2k26',
      date: 'National Level Hackathon',
      desc: 'Selected in the top 10 finalists nationwide for ChainMind, an autonomous multi-agent supply chain orchestration system built with CrewAI, FastAPI, and React.',
      tag: 'AI & Multi-Agents',
      badgeColor: '#FFB627',
      link: links?.github ? `${links.github}/Chain_Mind` : '#',
    },
    {
      title: 'Letter of Excellence — Youth Speak Forum',
      issuer: 'AIESEC in Bhopal',
      date: 'Leadership Award',
      desc: 'Awarded an official Letter of Excellence for managing global exchange operations, handling international delegates, and running high-impact youth leadership forums.',
      tag: 'Leadership & Operations',
      badgeColor: '#46E0B8',
    },
    {
      title: 'Elected Student Council President (2026–27)',
      issuer: 'IES College of Technology',
      date: 'Highest Student Office',
      desc: 'Elected to lead the entire university student body after serving as Vice President, steering institutional initiatives, campus tech clubs, and policy dialogues.',
      tag: 'Apex Governance',
      badgeColor: '#FF4F8B',
    },
    {
      title: 'Flagship Event Head — INFORIA 2K24 & 2K25',
      issuer: 'College Technical & Cultural Fest',
      date: '2 Consecutive Years',
      desc: 'Sole student leader trusted to direct the college’s largest annual fest for two continuous editions, managing budgets, sponsorships, and 5,000+ attendee logistics.',
      tag: 'Event Management',
      badgeColor: '#6C63FF',
    },
    {
      title: 'Anchor & Lead Volunteer — TEDx IES University',
      issuer: 'TEDx Events',
      date: 'Public Speaking & Media',
      desc: 'Anchored flagship university sessions and contributed as core organizer across 100+ academic, cultural, and technical symposiums.',
      tag: 'Public Speaking',
      badgeColor: '#EF4444',
    },
    {
      title: 'Hackathon Finalist — TIT SRIJAN & HackInMotion',
      issuer: 'National Hackathons',
      date: 'Competitive Coding',
      desc: 'Engineered SaathiChain (AI artisan commerce for Problem Statement 5) and StockPulse (multi-tenant inventory forecasting) under intense 36-hour sprint windows.',
      tag: 'Hackathon Sprint',
      badgeColor: '#3B82F6',
    },
  ];

  return (
    <section className="df-section achievements-section" id="achievements">
      <div className="df-container">
        <div className="section-header">
          <h2 className="section-title">Achievements & Certifications 🏆</h2>
          <p className="section-subtitle">
            AWARDS, LETTERS OF EXCELLENCE, HACKATHON GLORY & LEADERSHIP MILESTONES
          </p>
        </div>

        <div className="achievements-cards-grid">
          {achievements.map((item, idx) => (
            <div key={idx} className="achievement-card">
              <div className="ach-card-header">
                <div
                  className="ach-icon-circle"
                  style={{ backgroundColor: `${item.badgeColor}20`, color: item.badgeColor }}
                >
                  <TrophyIcon size={24} />
                </div>
                <div className="ach-meta-info">
                  <span className="ach-tag" style={{ borderColor: `${item.badgeColor}60`, color: item.badgeColor }}>
                    {item.tag}
                  </span>
                  <span className="ach-date">{item.date}</span>
                </div>
              </div>

              <div className="ach-card-body">
                <h3 className="ach-title">{item.title}</h3>
                <h4 className="ach-issuer">{item.issuer}</h4>
                <p className="ach-desc">{item.desc}</p>
              </div>

              {item.link && item.link !== '#' && (
                <div className="ach-card-footer">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="ach-link-btn"
                  >
                    <span>View Project</span>
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
