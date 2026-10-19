import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from './Icons.jsx';

export default function Navbar({ theme, onToggleTheme, onOpenPalette }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`df-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="df-header-container">
        <a
          href="#"
          className="df-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Shlok Dubey home"
        >
          <span className="logo-grey">&lt;</span>
          <span className="logo-name">Shlok Dubey</span>
          <span className="logo-grey">/&gt;</span>
        </a>

        <button
          className={`df-hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <nav className={`df-nav ${menuOpen ? 'open' : ''}`}>
          <ul className="df-nav-list">
            <li>
              <button className="df-nav-link" onClick={() => scrollTo('skills')}>
                Skills
              </button>
            </li>
            <li>
              <button className="df-nav-link" onClick={() => scrollTo('education')}>
                Education
              </button>
            </li>
            <li>
              <button className="df-nav-link" onClick={() => scrollTo('experience')}>
                Work Experiences
              </button>
            </li>
            <li>
              <button className="df-nav-link" onClick={() => scrollTo('projects')}>
                Projects
              </button>
            </li>
            <li>
              <button className="df-nav-link" onClick={() => scrollTo('achievements')}>
                Achievements
              </button>
            </li>
            <li>
              <button className="df-nav-link" onClick={() => scrollTo('contact')}>
                Contact Me
              </button>
            </li>
          </ul>

          <div className="df-nav-actions">
            <button
              className="df-search-btn"
              onClick={onOpenPalette}
              title="Quick Search (Ctrl+K)"
              aria-label="Quick Search"
            >
              <span className="search-text">Search</span>
              <kbd className="search-kbd">⌘K</kbd>
            </button>

            <button
              className={`df-theme-toggle ${theme === 'dark' ? 'is-dark' : 'is-light'}`}
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <div className="toggle-track">
                <span className="toggle-icon sun"><SunIcon size={14} /></span>
                <span className="toggle-icon moon"><MoonIcon size={14} /></span>
                <div className="toggle-thumb" />
              </div>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
