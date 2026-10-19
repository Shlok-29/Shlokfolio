import React from 'react';
import { GraduationCapIcon, TrophyIcon, ExternalLinkIcon } from './Icons.jsx';

export default function Education() {
  const educations = [
    {
      institution: 'IES College of Technology, Bhopal',
      degree: 'Bachelor of Technology in Computer Science (AI & ML)',
      duration: '2023 – 2027 (Final Year)',
      desc: 'Specializing in Artificial Intelligence, Machine Learning, Multi-Agent Systems, and Distributed Full-Stack Architecture.',
      bullets: [
        'Elected President of the Student Council (2026–27), previously served as Vice President.',
        'Organized and executed INFORIA college fest for two consecutive years as Event Head.',
        'Led student developer squads in national hackathons and multi-agent AI challenges.',
      ],
      badge: 'B.Tech CS (AI/ML)',
    },
  ];

  const certifications = [
    {
      name: 'Software Engineering Virtual Experience',
      issuer: 'JPMorgan Chase & Co.',
      type: 'Job Simulation',
      desc: 'Completed hands-on engineering modules covering interface development, data visualizer feeds, and system integration.',
      tag: 'Software Engineering',
    },
    {
      name: 'GenAI-Powered Data Analytics Simulation',
      issuer: 'Tata',
      type: 'Job Simulation',
      desc: 'Engineered generative AI solutions for automated data analytics, summarization, and predictive business intelligence.',
      tag: 'GenAI / Analytics',
    },
    {
      name: 'Cloud Computing and Internet of Things (IoT)',
      issuer: 'NPTEL (Ministry of Education, Govt. of India)',
      type: 'Certification',
      desc: 'Rigorous government-accredited certification validating expertise in cloud architectures, virtualization, and IoT protocols.',
      tag: 'Cloud & IoT',
    },
  ];

  return (
    <section className="df-section education-section" id="education">
      <div className="df-container">
        <div className="section-header">
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">ACADEMIC FOUNDATION & SPECIALIZED TRAINING</p>
        </div>

        <div className="education-cards-list">
          {educations.map((edu, idx) => (
            <div key={idx} className="education-card">
              <div className="education-card-header">
                <div className="edu-icon-badge">
                  <GraduationCapIcon size={32} />
                </div>
                <div className="edu-meta-div">
                  <div className="edu-header-top">
                    <h3 className="edu-institution">{edu.institution}</h3>
                    <span className="edu-duration-pill">{edu.duration}</span>
                  </div>
                  <h4 className="edu-degree">{edu.degree}</h4>
                </div>
              </div>

              <div className="education-card-body">
                <p className="edu-desc">{edu.desc}</p>
                <ul className="edu-bullets">
                  {edu.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="edu-bullet-item">
                      <span className="edu-bullet-dot">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="certifications-block">
          <h3 className="certifications-heading">
            <TrophyIcon size={22} className="cert-heading-icon" />
            <span>Virtual Job Simulations & Accreditations</span>
          </h3>

          <div className="certifications-grid">
            {certifications.map((cert, cIdx) => (
              <div key={cIdx} className="cert-card">
                <div className="cert-top">
                  <span className="cert-badge">{cert.tag}</span>
                  <span className="cert-type">{cert.type}</span>
                </div>
                <h4 className="cert-title">{cert.name}</h4>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-desc">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
