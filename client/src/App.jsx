import { useCallback, useEffect, useState } from 'react';
import { useProfile, useVisits } from './hooks/useProfile.js';
import Navbar from './components/Navbar.jsx';
import Greeting from './components/Greeting.jsx';
import Skills from './components/Skills.jsx';
import Education from './components/Education.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Achievements from './components/Achievements.jsx';
import GithubProfile from './components/GithubProfile.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Palette from './components/Palette.jsx';

export default function App() {
  const profile = useProfile();
  const visits = useVisits();
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || document.documentElement.dataset.theme || 'dark';
    } catch {
      return 'dark';
    }
  });
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {}
    window.dispatchEvent(new Event('themechange'));
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
      if (e.key === 'Escape') setPaletteOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="df-app-wrapper">
      <a className="skip-nav" href="#skills">
        Skip to main content
      </a>

      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main id="main-content">
        <Greeting profile={profile} />
        <Skills stack={profile.stack} />
        <Education />
        <Experience />
        <Projects projects={profile.projects} links={profile.links} />
        <Achievements links={profile.links} />
        <GithubProfile links={profile.links} goals={profile.goals} />
        <Contact profile={profile} visits={visits} />
      </main>

      <Footer name={profile.name} />

      <Palette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        profile={profile}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}
