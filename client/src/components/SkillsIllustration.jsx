import React from 'react';

export default function SkillsIllustration() {
  return (
    <div className="skills-illustration-container" aria-hidden="true">
      <svg
        viewBox="0 0 500 420"
        className="skills-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6c63ff" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="serverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#252c41" />
            <stop offset="100%" stopColor="#151b2e" />
          </linearGradient>
        </defs>

        <circle cx="250" cy="210" r="160" fill="var(--ill-desk, #6c63ff)" opacity="0.08" />

        <path
          d="M250 80c-25 0-45 16-51 38-3-1-7-1-10-1-20 0-36 16-36 36 0 2 0 4 .5 6-18 6-30.5 23-30.5 43 0 25 20 45 45 45h164c22 0 40-18 40-40 0-18-12-33-28-38 1-3 1-6 1-9 0-22-18-40-40-40-4 0-8 .5-12 1.5-7-24-29-41.5-43-41.5z"
          fill="url(#cloudGrad)"
          opacity="0.9"
          className="floating-cloud"
        />

        <path d="M255 130l-15 25h16l-8 25 22-30h-16z" fill="#FFE052" />

        <g className="server-unit">
          <rect x="170" y="240" width="160" height="42" rx="8" fill="url(#serverGrad)" stroke="#4B5563" strokeWidth="2" />
          <circle cx="190" cy="261" r="5" fill="#10B981" className="blinking-led led-1" />
          <circle cx="206" cy="261" r="5" fill="#3B82F6" className="blinking-led led-2" />
          <line x1="225" y1="261" x2="310" y2="261" stroke="#374151" strokeWidth="4" strokeLinecap="round" />

          <rect x="170" y="292" width="160" height="42" rx="8" fill="url(#serverGrad)" stroke="#4B5563" strokeWidth="2" />
          <circle cx="190" cy="313" r="5" fill="#F59E0B" className="blinking-led led-2" />
          <circle cx="206" cy="313" r="5" fill="#10B981" className="blinking-led led-3" />
          <line x1="225" y1="313" x2="310" y2="313" stroke="#374151" strokeWidth="4" strokeLinecap="round" />

          <rect x="170" y="344" width="160" height="42" rx="8" fill="url(#serverGrad)" stroke="#4B5563" strokeWidth="2" />
          <circle cx="190" cy="365" r="5" fill="#10B981" className="blinking-led led-3" />
          <circle cx="206" cy="365" r="5" fill="#EC4899" className="blinking-led led-1" />
          <line x1="225" y1="365" x2="310" y2="365" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
        </g>

        <g className="floating-mobile">
          <rect x="70" y="190" width="75" height="135" rx="12" fill="#1E2235" stroke="#6C63FF" strokeWidth="3" />
          <rect x="76" y="202" width="63" height="105" rx="6" fill="#0D111E" />
          <rect x="83" y="212" width="30" height="6" rx="3" fill="#6C63FF" />
          <rect x="83" y="225" width="49" height="18" rx="4" fill="#3B82F6" opacity="0.4" />
          <rect x="83" y="249" width="49" height="18" rx="4" fill="#10B981" opacity="0.4" />
          <rect x="83" y="273" width="49" height="18" rx="4" fill="#EC4899" opacity="0.4" />
        </g>

        <g className="floating-code">
          <rect x="350" y="180" width="120" height="95" rx="8" fill="#1E2235" stroke="#46E0B8" strokeWidth="2.5" />
          <circle cx="363" cy="192" r="3.5" fill="#EF4444" />
          <circle cx="373" cy="192" r="3.5" fill="#F59E0B" />
          <circle cx="383" cy="192" r="3.5" fill="#10B981" />
          <line x1="363" y1="208" x2="420" y2="208" stroke="#46E0B8" strokeWidth="3" strokeLinecap="round" />
          <line x1="363" y1="220" x2="450" y2="220" stroke="#6C63FF" strokeWidth="3" strokeLinecap="round" />
          <line x1="373" y1="232" x2="440" y2="232" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
          <line x1="373" y1="244" x2="410" y2="244" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />
          <line x1="363" y1="256" x2="390" y2="256" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
        </g>

        <path d="M250 180v60" stroke="#6C63FF" strokeWidth="3" strokeDasharray="4 4" className="circuit-flow" />
        <path d="M145 250h25" stroke="#6C63FF" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M330 250h20" stroke="#46E0B8" strokeWidth="2" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}
