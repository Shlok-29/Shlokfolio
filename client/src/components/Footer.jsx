import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from './Icons.jsx';

export default function Footer({ name }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="df-footer">
      <div className="df-container footer-content">
        <p className="footer-credit">
          Made with <span className="heart-emoji">❤️</span> by{' '}
          <strong className="footer-author">{name || 'Shlok Dubey'}</strong>
        </p>
        <p className="footer-subtext">
          Crafted with React, Node.js & Vite
        </p>
      </div>

      <button
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        title="Scroll to Top"
        aria-label="Scroll to top of page"
      >
        <ArrowUpIcon size={20} />
      </button>
    </footer>
  );
}
