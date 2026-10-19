import React from 'react';

export default function DeveloperIllustration() {
  return (
    <div className="developer-illustration-container" aria-hidden="true">
      <svg
        viewBox="0 0 600 500"
        className="developer-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="deskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--ill-desk, #6c63ff)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--ill-desk, #55198b)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e2238" />
            <stop offset="100%" stopColor="#121626" />
          </linearGradient>
          <linearGradient id="chairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8c43ce" />
            <stop offset="100%" stopColor="#55198b" />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <circle cx="300" cy="250" r="180" fill="url(#deskGrad)" />

        <g className="floating-badge badge-1">
          <rect x="70" y="80" width="100" height="42" rx="21" fill="var(--bg-card)" stroke="#61DAFB" strokeWidth="2" />
          <circle cx="92" cy="101" r="9" fill="#61DAFB" />
          <text x="108" y="106" fill="var(--text)" fontSize="13" fontWeight="700" fontFamily="system-ui">React</text>
        </g>

        <g className="floating-badge badge-2">
          <rect x="420" y="60" width="110" height="42" rx="21" fill="var(--bg-card)" stroke="#387EB8" strokeWidth="2" />
          <circle cx="442" cy="81" r="9" fill="#FFE052" />
          <text x="458" y="86" fill="var(--text)" fontSize="13" fontWeight="700" fontFamily="system-ui">Python</text>
        </g>

        <g className="floating-badge badge-3">
          <rect x="50" y="270" width="115" height="42" rx="21" fill="var(--bg-card)" stroke="#6C63FF" strokeWidth="2" />
          <circle cx="72" cy="291" r="9" fill="#6C63FF" />
          <text x="88" y="296" fill="var(--text)" fontSize="13" fontWeight="700" fontFamily="system-ui">CrewAI</text>
        </g>

        <g className="floating-badge badge-4">
          <rect x="440" y="260" width="110" height="42" rx="21" fill="var(--bg-card)" stroke="#2496ED" strokeWidth="2" />
          <circle cx="462" cy="281" r="9" fill="#2496ED" />
          <text x="478" y="286" fill="var(--text)" fontSize="13" fontWeight="700" fontFamily="system-ui">Docker</text>
        </g>

        <rect x="90" y="370" width="420" height="16" rx="8" fill="var(--text-muted)" opacity="0.35" />
        <path d="M120 386L95 470h20l20-84h-15z" fill="var(--text-muted)" opacity="0.25" />
        <path d="M480 386L505 470h-20l-20-84h15z" fill="var(--text-muted)" opacity="0.25" />

        <path d="M285 320h30v50h-30z" fill="#4B5563" />
        <path d="M260 370h80v6h-80z" rx="3" fill="#374151" />

        <rect x="180" y="160" width="240" height="160" rx="10" fill="url(#screenGrad)" stroke="#374151" strokeWidth="4" filter="url(#glowEffect)" />
        <rect x="190" y="170" width="220" height="140" rx="6" fill="#0E121E" />

        <rect x="205" y="184" width="45" height="6" rx="3" fill="#6C63FF" />
        <rect x="256" y="184" width="60" height="6" rx="3" fill="#46E0B8" />
        <rect x="215" y="198" width="80" height="6" rx="3" fill="#FFE052" />
        <rect x="300" y="198" width="50" height="6" rx="3" fill="#61DAFB" />
        <rect x="215" y="212" width="110" height="6" rx="3" fill="#FF4F8B" />
        <rect x="225" y="226" width="70" height="6" rx="3" fill="#A78BFA" />
        <rect x="205" y="240" width="50" height="6" rx="3" fill="#34D399" />
        <rect x="260" y="240" width="80" height="6" rx="3" fill="#F472B6" />
        <rect x="205" y="254" width="90" height="6" rx="3" fill="#60A5FA" />
        <rect x="205" y="268" width="30" height="6" rx="3" fill="#FBBF24" />

        <rect x="240" y="268" width="8" height="7" fill="#46E0B8" className="screen-cursor" />

        <rect x="380" y="295" width="85" height="58" rx="4" fill="#1F2937" stroke="#4B5563" strokeWidth="2" />
        <rect x="386" y="301" width="73" height="46" rx="2" fill="#111827" />
        <path d="M370 353h105l-6 10h-93z" fill="#374151" />
        <polyline points="392,335 405,325 418,330 430,315 445,310" stroke="#46E0B8" strokeWidth="2.5" fill="none" />

        <rect x="135" y="335" width="24" height="32" rx="4" fill="#EF4444" />
        <path d="M159 342c4 0 7 3 7 7s-3 7-7 7" stroke="#EF4444" strokeWidth="3" fill="none" />
        <path d="M142 328c0-5 3-7 3-12" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" opacity="0.6" className="steam steam-1" />
        <path d="M150 328c0-5 3-7 3-12" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" opacity="0.6" className="steam steam-2" />

        <rect x="475" y="340" width="22" height="24" rx="3" fill="#D97706" />
        <path d="M486 340c-6-10 0-20 0-20s6 10 0 20z" fill="#10B981" />
        <path d="M486 335c-10-4-10-14-10-14s10 4 10 14z" fill="#34D399" />
        <path d="M486 335c10-4 10-14 10-14s-10 4-10 14z" fill="#059669" />

        <rect x="235" y="356" width="110" height="10" rx="3" fill="#374151" />
        <rect x="355" y="358" width="14" height="8" rx="4" fill="#4B5563" />

        <circle cx="290" cy="425" r="45" fill="url(#chairGrad)" opacity="0.85" />
      </svg>
    </div>
  );
}
