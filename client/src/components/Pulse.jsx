import { useEffect, useState } from 'react';
import { API } from '../lib/nav.js';

const LANG_COLORS = ['var(--marigold)', 'var(--rani)', 'var(--mint)', 'var(--muted)', 'var(--line)'];

function ago(iso) {
  if (!iso) return null;
  const days = Math.floor((Date.now() - new Date(iso)) / 864e5);
  if (days < 1) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  return `${Math.floor(days / 30)} months ago`;
}

export default function Pulse({ links, goals }) {
  const [gh, setGh] = useState(null);
  const [failed, setFailed] = useState(false);
  const [chartOk, setChartOk] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`${API}/api/github`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setGh)
      .catch((e) => e?.name !== 'AbortError' && setFailed(true));
    return () => ctrl.abort();
  }, []);

  const coding = [
    ['LeetCode', links.leetcode],
    ['HackerRank', links.hackerrank],
    ['HackerEarth', links.hackerearth],
  ];

  return (
    <section className="section alt" id="pulse" aria-labelledby="pulse-h">
      <div className="wrap">
        <h2 id="pulse-h">Proof of work</h2>
        <p className="section-lead">Live from GitHub, refreshed every ten minutes.</p>

        <div className="pulse">
          <div className="stats">
            {gh ? (
              <>
                <div><b>{gh.publicRepos}</b><span>public repositories</span></div>
                <div><b>{gh.stars}</b><span>stars earned</span></div>
                <div><b>{gh.followers}</b><span>followers</span></div>
                {gh.lastPush && <div><b>{ago(gh.lastPush)}</b><span>last push</span></div>}
              </>
            ) : (
              <p className="muted">{failed ? 'Live stats are offline. The profile link below always works.' : 'Loading GitHub stats…'}</p>
            )}
          </div>

          <div className="chart">
            {chartOk ? (
              <img
                src="https://ghchart.rshah.org/46e0b8/Shlok-29"
                alt="GitHub contribution calendar for Shlok-29"
                loading="lazy"
                onError={() => setChartOk(false)}
              />
            ) : (
              <p className="muted">The contribution calendar didn't load. See it on <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>.</p>
            )}
            {gh?.languages?.length > 0 && (
              <>
                <div className="bar" role="img" aria-label={`Languages: ${gh.languages.map((l) => `${l.name} ${l.share}%`).join(', ')}`}>
                  {gh.languages.map((l, i) => <span key={l.name} style={{ flexGrow: l.share, background: LANG_COLORS[i] }} />)}
                </div>
                <ul className="legend">
                  {gh.languages.map((l, i) => (
                    <li key={l.name}><i style={{ background: LANG_COLORS[i] }} />{l.name} {l.share}%</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="split">
          <div>
            <h3>Practice grounds</h3>
            <ul className="plain">
              {coding.map(([n, u]) => <li key={n}><a href={u} target="_blank" rel="noreferrer">{n}</a></li>)}
              <li><a href={links.github} target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h3>Where I'm headed in 2026</h3>
            <ul className="plain">{goals.map((g) => <li key={g}>{g}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
