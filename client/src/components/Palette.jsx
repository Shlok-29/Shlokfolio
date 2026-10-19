import { useEffect, useMemo, useRef, useState } from 'react';
import { go } from '../lib/nav.js';

export default function Palette({ open, onClose, profile, onToggleTheme }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const input = useRef(null);

  const commands = useMemo(() => {
    const ext = (url) => () => window.open(url, '_blank', 'noopener');
    return [
      { label: 'Go to Skills (What I do)', run: () => go('skills') },
      { label: 'Go to Education', run: () => go('education') },
      { label: 'Go to Work Experiences', run: () => go('experience') },
      { label: 'Go to Open Source & Projects', run: () => go('projects') },
      { label: 'Go to Achievements & Certifications', run: () => go('achievements') },
      { label: 'Go to GitHub Activity & Stats', run: () => go('github-profile') },
      { label: 'Go to Contact Me', run: () => go('contact') },
      ...(profile.projects || []).map((p) => ({
        label: `Project: ${p.name}`,
        hint: p.tagline,
        run: () => {
          go('projects');
          if (p.repo) window.open(p.repo, '_blank', 'noopener');
        },
      })),
      { label: 'Open GitHub Profile', run: ext(profile.links?.github) },
      { label: 'Open LinkedIn Profile', run: ext(profile.links?.linkedin) },
      { label: 'Open LeetCode Profile', run: ext(profile.links?.leetcode) },
      { label: 'Send an email to Shlok', run: () => (window.location.href = `mailto:${profile.email}`) },
      { label: 'Toggle Light or Dark Theme', run: onToggleTheme },
    ];
  }, [profile, onToggleTheme]);

  const list = commands.filter((c) => `${c.label} ${c.hint || ''}`.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQ('');
      setIdx(0);
      setTimeout(() => input.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => setIdx(0), [q]);

  if (!open) return null;

  const run = (c) => {
    onClose();
    setTimeout(c.run, 60);
  };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, list.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && list[idx]) run(list[idx]);
  };

  return (
    <div className="scrim" onMouseDown={onClose}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <input
          ref={input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKey}
          placeholder="Type a section or project to jump..."
          aria-label="Search commands"
        />
        <ul role="listbox">
          {list.length === 0 && <li className="empty">Nothing matches "{q}".</li>}
          {list.map((c, i) => (
            <li
              key={c.label}
              role="option"
              aria-selected={i === idx}
              className={i === idx ? 'sel' : ''}
              onMouseEnter={() => setIdx(i)}
              onClick={() => run(c)}
            >
              <span>{c.label}</span>
              {c.hint && <small>{c.hint}</small>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
