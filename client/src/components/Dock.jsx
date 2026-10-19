import { useEffect, useState } from 'react';
import { go } from '../lib/nav.js';

const ITEMS = [
  ['work', 'Work'],
  ['lanes', 'Lanes'],
  ['stack', 'Stack'],
  ['pulse', 'Proof'],
  ['contact', 'Contact'],
];

export default function Dock({ theme, onToggleTheme, onOpenPalette }) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ITEMS.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <nav className="dock" aria-label="Sections">
      {ITEMS.map(([id, label]) => (
        <button key={id} className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined} onClick={() => go(id)}>
          {label}
        </button>
      ))}
      <span className="sep" aria-hidden="true" />
      <button onClick={onOpenPalette} aria-label="Open command palette">Search <kbd>Ctrl K</kbd></button>
      <button onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
    </nav>
  );
}
