import React from 'react';
import { BriefcaseIcon, TrophyIcon } from './Icons.jsx';

export default function Experience() {
  const experiences = [
    {
      role: 'SDE Intern (Remote)',
      company: 'Bluestock Fintech',
      period: 'Internship',
      category: 'Software Engineering',
      desc: 'Contributed to production fintech systems, user interfaces, and backend integration pipelines.',
      bullets: [
        'Built full-stack components and optimized API performance for high-concurrency requests.',
        'Collaborated with senior engineers on security audits, code reviews, and test coverage.',
      ],
      skills: ['Full Stack', 'API Integration', 'JavaScript', 'Fintech'],
    },
    {
      role: 'President (2026–27), previously Vice President',
      company: 'Student Council, IES College of Technology',
      period: '2025 – Present',
      category: 'Leadership & Management',
      desc: 'Apex leadership of the student council governing all academic, technical, and co-curricular student bodies.',
      bullets: [
        'Direct council strategy, oversee budget allocations, and manage cross-department teams across 1,000+ students.',
        'Bridge student body initiatives directly with faculty heads, university directors, and external partners.',
      ],
      skills: ['Strategic Leadership', 'Team Management', 'Public Speaking', 'Event Operations'],
    },
    {
      role: 'Junior Manager',
      company: 'AIESEC in Bhopal',
      period: 'Operations & Global Exchanges',
      category: 'International Operations',
      desc: 'Drove cross-cultural exchange programs and community leadership forums for the world’s largest youth-led organization.',
      bullets: [
        'Managed international exchange operations and coordinated outreach campaigns supporting 50+ participants.',
        'Core organizer for the Youth Speak Forum, earning an official Letter of Excellence for operational excellence.',
      ],
      skills: ['Global Operations', 'Outreach Strategy', 'Youth Speak Forum', 'Crisis Management'],
    },
    {
      role: 'Event Head — INFORIA 2K24 & 2K25',
      company: 'IES College Technical & Cultural Fest',
      period: '2 Consecutive Years',
      category: 'Event Leadership',
      desc: 'Headed planning and ground execution of the flagship university fest with 5,000+ footfall across two seasons.',
      bullets: [
        'Coordinated multi-track hackathons, cultural events, celebrity nights, and corporate sponsorships.',
        'Managed 80+ volunteers and ensured seamless incident-free execution.',
      ],
      skills: ['Large-scale Event Management', 'Sponsorship', 'Crisis Protocol', 'Team Leadership'],
    },
  ];

  return (
    <section className="df-section experience-section" id="experience">
      <div className="df-container">
        <div className="section-header">
          <h2 className="section-title">Work Experiences</h2>
          <p className="section-subtitle">SOFTWARE ENGINEERING & LEADERSHIP JOURNEY</p>
        </div>

        <div className="experience-cards-grid">
          {experiences.map((exp, idx) => (
            <div key={idx} className="experience-card">
              <div className="exp-card-header">
                <div className="exp-icon-box">
                  <BriefcaseIcon size={26} />
                </div>
                <div className="exp-title-meta">
                  <div className="exp-meta-top">
                    <span className="exp-period-badge">{exp.period}</span>
                    <span className="exp-category-pill">{exp.category}</span>
                  </div>
                  <h3 className="exp-role">{exp.role}</h3>
                  <h4 className="exp-company">{exp.company}</h4>
                </div>
              </div>

              <div className="exp-card-body">
                <p className="exp-desc">{exp.desc}</p>
                <ul className="exp-bullets">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="exp-bullet-item">
                      <span className="exp-bullet-dot">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp-skills-row">
                  {exp.skills.map((s) => (
                    <span key={s} className="exp-skill-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
