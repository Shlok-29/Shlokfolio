import React from 'react';

export default function TechIcon({ name, size = 42 }) {
  const n = (name || '').toLowerCase().trim();

  if (n.includes('python')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" fill="none" aria-label={name}>
        <path d="M63.39 2.5c-30.82 0-28.89 13.37-28.89 13.37l.03 13.85h29.38v4.18H20.94S2.5 31.79 2.5 62.91c0 31.14 16.08 30.13 16.08 30.13h9.61V79.46s-.52-16.08 15.82-16.08h29.13s15.3.26 15.3-15.04V16.37S90.49 2.5 63.39 2.5zM47.78 11.23a4.77 4.77 0 1 1 0 9.54 4.77 4.77 0 0 1 0-9.54z" fill="#387EB8" />
        <path d="M64.61 125.5c30.82 0 28.89-13.37 28.89-13.37l-.03-13.85H64.09v-4.18h42.97s18.44 2.11 18.44-29.01c0-31.14-16.08-30.13-16.08-30.13h-9.61v13.58s.52 16.08-15.82 16.08H54.86s-15.3-.26-15.3 15.04v31.97s-2.05 13.87 25.05 13.87zm15.61-8.73a4.77 4.77 0 1 1 0-9.54 4.77 4.77 0 0 1 0-9.54z" fill="#FFE052" />
      </svg>
    );
  }

  if (n.includes('react')) {
    return (
      <svg width={size} height={size} viewBox="0 0 115 102" fill="none" aria-label={name}>
        <ellipse rx="10.5" ry="10.5" cx="57.5" cy="51" fill="#61DAFB" />
        <ellipse rx="22" ry="54" cx="57.5" cy="51" stroke="#61DAFB" strokeWidth="6.5" transform="rotate(30 57.5 51)" />
        <ellipse rx="22" ry="54" cx="57.5" cy="51" stroke="#61DAFB" strokeWidth="6.5" transform="rotate(90 57.5 51)" />
        <ellipse rx="22" ry="54" cx="57.5" cy="51" stroke="#61DAFB" strokeWidth="6.5" transform="rotate(150 57.5 51)" />
      </svg>
    );
  }

  if (n === 'javascript' || n === 'js') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <rect width="128" height="128" rx="16" fill="#F7DF1E" />
        <path d="M37.84 100.8c5.44 0 9.87-3.14 11.96-7.39l-8.62-5.23c-1.12 1.83-2.61 3.28-4.93 3.28-3.58 0-5.82-2.31-5.82-8.58V50.56h-11.8v32.61c0 11.57 6.42 17.63 19.21 17.63zm39.12-1.42c12.24 0 20.3-6.19 20.3-17.76 0-9.55-5.9-14.1-16.79-18.8l-3.36-1.42c-5.75-2.46-8.21-4.78-8.21-8.51 0-3.81 2.91-6.49 7.31-6.49 4.33 0 7.01 2.16 8.73 5.97l8.66-5.67C90.39 42.13 84.72 38 75.99 38c-11.42 0-18.73 6.49-18.73 17.01 0 9.4 5.67 14.03 15.37 18.21l3.36 1.42c6.49 2.76 9.85 5.37 9.85 9.77 0 4.63-3.81 7.69-9.55 7.69-6.94 0-10.82-3.81-12.76-8.81l-8.96 5.15c2.99 7.84 10.37 12.94 22.39 12.94z" fill="#000000" />
      </svg>
    );
  }

  if (n.includes('typescript') || n === 'ts') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <rect width="128" height="128" rx="16" fill="#3178C6" />
        <path d="M43.2 55.4H28.8V44.2h39.8v11.2H54.2v46.1H43.2V55.4zm34.2 46.5c-6.8 0-12.2-2.6-15.5-7.3l9.4-5.6c2 3.1 4.5 4.7 7.7 4.7 3.5 0 5.4-1.6 5.4-3.7 0-2.3-2.1-3.6-7-5.1l-3.9-1.2c-7.9-2.5-12.7-6.9-12.7-14.2 0-8.5 7-14.7 17.5-14.7 6.4 0 11.4 2.2 14.5 6.2l-8.6 6c-1.8-2.3-3.8-3.4-6.4-3.4-3.2 0-4.9 1.4-4.9 3.3 0 2.1 1.9 3.2 6.5 4.6l3.9 1.2c8.8 2.8 13.4 7.2 13.4 14.7 0 9.1-7.1 15.5-19.4 15.5z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (n.includes('node')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <path d="M64 10l50 28.87v57.74L64 125.5 14 96.61V38.87L64 10z" fill="#339933" />
        <path d="M64 25.5l36.5 21v42L64 109.5 27.5 88.5v-42l36.5-21z" fill="#FFFFFF" opacity="0.15" />
        <path d="M64 36c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" fill="#FFFFFF" opacity="0.2" />
        <text x="64" y="73" fill="#FFFFFF" fontSize="30" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">NODE</text>
      </svg>
    );
  }

  if (n.includes('next')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <circle cx="64" cy="64" r="64" fill="#000000" />
        <path d="M103.5 106.8L48.8 35.5h-10v57h8V48.7l50.2 65.4c2.3-.9 4.5-1.9 6.5-3z" fill="#FFFFFF" />
        <rect x="80" y="35.5" width="8" height="35" fill="#FFFFFF" />
      </svg>
    );
  }

  if (n.includes('docker')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <path d="M123.6 57.5c-2.4-.6-5.8-.4-8.2.7-1.4.6-2.6 1.6-3.6 2.7-4.5-3.3-10-5.1-15.7-5.1-.9 0-1.8.1-2.7.2-2.1-7.8-8.6-13.8-16.7-15.4-.7-.1-1.3-.2-2-.2-1.5 0-3 .2-4.4.6V33H56.5v11H42.7V33H29v11h-3.4C13.2 44.5 3 53.6 2.5 65.9c-.3 6.9 2.5 13.5 7.6 18.2 8.7 7.9 22.8 10.9 44.6 10.9 26.5 0 49.3-8.8 59.8-23.7 5.1-.3 10-2.8 13.2-6.9 1.1-1.5 1.7-3.3 1.7-5.1 0-.6-.1-1.2-.4-1.8h-5.4z" fill="#2496ED" />
        <rect x="29" y="33" width="10.8" height="8.7" rx="1" fill="#FFFFFF" />
        <rect x="42.8" y="33" width="10.8" height="8.7" rx="1" fill="#FFFFFF" />
        <rect x="56.5" y="33" width="10.8" height="8.7" rx="1" fill="#FFFFFF" />
        <rect x="29" y="21.5" width="10.8" height="8.7" rx="1" fill="#FFFFFF" />
        <rect x="42.8" y="21.5" width="10.8" height="8.7" rx="1" fill="#FFFFFF" />
        <rect x="56.5" y="21.5" width="10.8" height="8.7" rx="1" fill="#FFFFFF" />
        <rect x="42.8" y="10" width="10.8" height="8.7" rx="1" fill="#FFFFFF" />
        <rect x="56.5" y="10" width="10.8" height="8.7" rx="1" fill="#FFFFFF" />
      </svg>
    );
  }

  if (n.includes('fastapi')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <circle cx="64" cy="64" r="64" fill="#009688" />
        <path d="M68 22L36 70h26l-6 36 36-50H66l6-34z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (n.includes('mongo')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <path d="M64 4c-.9.9-18.7 18.2-22.1 42.1C38.3 71.9 45 92.4 59.9 111.4c2.7 3.5 4.1 6.6 4.1 6.6s1.4-3.1 4.1-6.6c14.9-19 21.6-39.5 18-65.3C82.7 22.2 64.9 4.9 64 4z" fill="#47A248" />
        <path d="M64 4v114c2.7 3.5 4.1 6.6 4.1 6.6s1.4-3.1 4.1-6.6c14.9-19 21.6-39.5 18-65.3C82.7 22.2 64.9 4.9 64 4z" fill="#499D4A" opacity="0.8" />
      </svg>
    );
  }

  if (n.includes('postgres')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <circle cx="64" cy="64" r="64" fill="#336791" />
        <path d="M64 26c-19 0-33 13-33 30 0 10.3 5.3 19.3 13.5 24.5V98l13-7.5c2.1.3 4.3.5 6.5.5 19 0 33-13 33-30s-14-30-33-30z" fill="#FFFFFF" />
        <circle cx="53" cy="50" r="4" fill="#336791" />
        <circle cx="75" cy="50" r="4" fill="#336791" />
      </svg>
    );
  }

  if (n.includes('git')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <path d="M123.6 57.5L70.5 4.4a9.1 9.1 0 0 0-12.9 0L44.8 17.2l16.3 16.3a10.8 10.8 0 0 1 13.7 13.8l15.7 15.7a10.8 10.8 0 1 1-6.5 6.5L69 54.8v34.4a10.8 10.8 0 1 1-9.1 0V53.6a10.8 10.8 0 0 1-5.7-14.2L38 23.2 4.4 56.8a9.1 9.1 0 0 0 0 12.9l53.1 53.1a9.1 9.1 0 0 0 12.9 0l53.2-53.2a9.1 9.1 0 0 0 0-12.9z" fill="#F05032" />
      </svg>
    );
  }

  if (n.includes('crew') || n.includes('agent') || n.includes('ai') || n.includes('ml')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <circle cx="64" cy="64" r="64" fill="#6C63FF" />
        <circle cx="64" cy="42" r="14" fill="#FFFFFF" />
        <circle cx="38" cy="84" r="12" fill="#FFE052" />
        <circle cx="90" cy="84" r="12" fill="#46E0B8" />
        <line x1="64" y1="42" x2="38" y2="84" stroke="#FFFFFF" strokeWidth="4" />
        <line x1="64" y1="42" x2="90" y2="84" stroke="#FFFFFF" strokeWidth="4" />
        <line x1="38" y1="84" x2="90" y2="84" stroke="#FFFFFF" strokeWidth="4" />
      </svg>
    );
  }

  if (n.includes('gemini') || n.includes('llm')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <defs>
          <linearGradient id="gemGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1A73E8" />
            <stop offset="50%" stopColor="#8E24AA" />
            <stop offset="100%" stopColor="#EA4335" />
          </linearGradient>
        </defs>
        <circle cx="64" cy="64" r="64" fill="url(#gemGrad)" />
        <path d="M64 20C64 44.3 44.3 64 20 64c24.3 0 44 19.7 44 44 0-24.3 19.7-44 44-44-24.3 0-44-19.7-44-44z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (n.includes('tailwind')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <circle cx="64" cy="64" r="64" fill="#0F172A" />
        <path d="M42 54c4.8-19.2 14.4-19.2 28.8 0 7.2 9.6 14.4 14.4 21.6 14.4 10.8 0 18-9.6 21.6-28.8-4.8 19.2-14.4 19.2-28.8 0-7.2-9.6-14.4-14.4-21.6-14.4-10.8 0-18 9.6-21.6 28.8zm-28.8 28.8C18 63.6 27.6 63.6 42 82.8c7.2 9.6 14.4 14.4 21.6 14.4 10.8 0 18-9.6 21.6-28.8-4.8 19.2-14.4 19.2-28.8 0-7.2-9.6-14.4-14.4-21.6-14.4-10.8 0-18 9.6-21.6 28.8z" fill="#38BDF8" />
      </svg>
    );
  }

  if (n.includes('html')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <path d="M19 114L9 2h110l-10 112-45 12.5L19 114z" fill="#E44D26" />
        <path d="M64 116.5l36.5-10.2 8.5-95.3H64v105.5z" fill="#F16529" />
        <path d="M64 52.5h-19l-1.3-15H64V24H30l4 44.5H64v-16zm0 37l-.2.1-16.3-4.4-1-11.2H33.4l2 23 28.6 8v-15.5z" fill="#EBEBEB" />
        <path d="M64 52.5v16h18.2l-1.7 19.5L64 92.4v15.5l28.6-8 3.8-43.4H64v-4zm0-28.5v13.5h33.2l1.2-13.5H64z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (n.includes('css')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" aria-label={name}>
        <path d="M19 114L9 2h110l-10 112-45 12.5L19 114z" fill="#1572B6" />
        <path d="M64 116.5l36.5-10.2 8.5-95.3H64v105.5z" fill="#33A9DC" />
        <path d="M64 52.5h-19l-1.3-15H64V24H30l4 44.5H64v-16zm0 37l-.2.1-16.3-4.4-1-11.2H33.4l2 23 28.6 8v-15.5z" fill="#EBEBEB" />
        <path d="M64 52.5v16h18.2l-1.7 19.5L64 92.4v15.5l28.6-8 3.8-43.4H64v-4zm0-28.5v13.5h33.2l1.2-13.5H64z" fill="#FFFFFF" />
      </svg>
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.2,
        background: 'linear-gradient(135deg, #6c63ff 0%, #55198b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: size * 0.35,
        textTransform: 'uppercase',
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
      }}
    >
      {name.slice(0, 2)}
    </div>
  );
}
