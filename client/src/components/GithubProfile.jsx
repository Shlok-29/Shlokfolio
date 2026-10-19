import React, { useEffect, useState } from 'react';
import { API } from '../lib/nav.js';
import { GithubIcon, ExternalLinkIcon, StarIcon, CodeIcon } from './Icons.jsx';

const LANG_COLORS = ['#6C63FF', '#FFE052', '#46E0B8', '#FF4F8B', '#387EB8', '#A78BFA'];

function timeAgo(iso) {
  if (!iso) return null;
  const days = Math.floor((Date.now() - new Date(iso)) / 864e5);
  if (days < 1) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  return `${Math.floor(days / 30)} months ago`;
}

export default function GithubProfile({ links, goals }) {
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

  const codingPlatforms = [
    { name: 'LeetCode', url: links?.leetcode, badge: 'Algorithms & Data Structures' },
    { name: 'HackerRank', url: links?.hackerrank, badge: 'Problem Solving' },
    { name: 'HackerEarth', url: links?.hackerearth, badge: 'Competitive Programming' },
  ];

  return (
    <section className="df-section github-section" id="github-profile">
      <div className="df-container">
        <div className="section-header">
          <h2 className="section-title">GitHub Profile & Activity</h2>
          <p className="section-subtitle">LIVE METRICS, REPOSITORY STATS & CONTRIBUTION RADAR</p>
        </div>

        <div className="github-card-main">
          <div className="github-stats-row">
            <div className="gh-stat-box">
              <span className="gh-stat-num">{gh?.publicRepos ?? '10+'}</span>
              <span className="gh-stat-label">Public Repositories</span>
            </div>
            <div className="gh-stat-box">
              <span className="gh-stat-num">{gh?.stars ?? '15+'}</span>
              <span className="gh-stat-label">GitHub Stars</span>
            </div>
            <div className="gh-stat-box">
              <span className="gh-stat-num">{gh?.followers ?? '12+'}</span>
              <span className="gh-stat-label">Followers</span>
            </div>
            <div className="gh-stat-box">
              <span className="gh-stat-num">{gh?.lastPush ? timeAgo(gh.lastPush) : 'Recent'}</span>
              <span className="gh-stat-label">Last Code Commit</span>
            </div>
          </div>

          <div className="gh-chart-wrapper">
            <div className="gh-chart-header">
              <div className="gh-chart-title">
                <GithubIcon size={20} />
                <span>Contributions & Commit Frequency</span>
              </div>
              {links?.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="gh-profile-link"
                >
                  <span>@Shlok-29</span>
                  <ExternalLinkIcon size={14} />
                </a>
              )}
            </div>

            <div className="gh-calendar-scroll">
              {chartOk ? (
                <img
                  src="https://ghchart.rshah.org/6c63ff/Shlok-29"
                  alt="GitHub contribution chart for Shlok-29"
                  className="gh-chart-img"
                  loading="lazy"
                  onError={() => setChartOk(false)}
                />
              ) : (
                <p className="muted-text">
                  Contribution graph preview unavailable. View live on{' '}
                  <a href={links?.github} target="_blank" rel="noreferrer">
                    GitHub profile
                  </a>
                  .
                </p>
              )}
            </div>

            {gh?.languages?.length > 0 && (
              <div className="gh-languages-block">
                <div className="gh-lang-bar">
                  {gh.languages.map((l, i) => (
                    <span
                      key={l.name}
                      style={{
                        flexGrow: l.share,
                        backgroundColor: LANG_COLORS[i % LANG_COLORS.length],
                      }}
                      title={`${l.name}: ${l.share}%`}
                    />
                  ))}
                </div>
                <div className="gh-lang-legend">
                  {gh.languages.map((l, i) => (
                    <div key={l.name} className="gh-legend-item">
                      <span
                        className="legend-color-dot"
                        style={{ backgroundColor: LANG_COLORS[i % LANG_COLORS.length] }}
                      />
                      <span className="legend-lang-name">{l.name}</span>
                      <span className="legend-lang-share">{l.share}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="github-bottom-split">
          <div className="platforms-col">
            <h3 className="sub-block-title">
              <CodeIcon size={20} />
              <span>Coding Practice Grounds</span>
            </h3>
            <div className="platforms-list">
              {codingPlatforms.map((cp) => (
                <a
                  key={cp.name}
                  href={cp.url}
                  target="_blank"
                  rel="noreferrer"
                  className="platform-item-link"
                >
                  <div className="platform-meta">
                    <span className="platform-name">{cp.name}</span>
                    <span className="platform-desc">{cp.badge}</span>
                  </div>
                  <ExternalLinkIcon size={16} className="platform-ext-icon" />
                </a>
              ))}
            </div>
          </div>

          <div className="goals-col">
            <h3 className="sub-block-title">
              <StarIcon size={20} />
              <span>Key Targets & Goals (2026)</span>
            </h3>
            <ul className="goals-list">
              {goals?.map((g, idx) => (
                <li key={idx} className="goal-item">
                  <span className="goal-check">✓</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
