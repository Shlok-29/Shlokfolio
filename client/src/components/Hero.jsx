import AgentField from './AgentField.jsx';
import { go } from '../lib/nav.js';

export default function Hero({ profile }) {
  return (
    <header className="hero" id="top">
      <AgentField profile={profile} />
      <div className="hero-bar">
        <span className="mark">{profile.name}</span>
        <span className="status"><i aria-hidden="true" />Open to opportunities</span>
      </div>
      <div className="hero-copy">
        <h1>{profile.tagline}</h1>
        <p className="hero-intro">{profile.intro}</p>
        <div className="hero-cta">
          <button className="btn solid" onClick={() => go('work')}>See the work</button>
          <button className="btn" onClick={() => go('contact')}>Say hello</button>
        </div>
        <p className="hero-hint">Every dot in the graph is clickable. Try one.</p>
      </div>
    </header>
  );
}
