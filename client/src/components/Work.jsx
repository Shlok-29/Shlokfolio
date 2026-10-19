import { useEffect, useState } from 'react';

const FILTERS = ['All', 'AI', 'Full stack'];

function Links({ p }) {
  if (!p.repo && !p.live) return null;
  return (
    <p className="links">
      {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live demo</a>}
      {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Source on GitHub</a>}
    </p>
  );
}

function Detail({ p }) {
  return (
    <>
      <p className="detail-desc">{p.description}</p>
      {p.highlights.length > 0 && (
        <ul className="ticks">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
      )}
      {p.stack.length > 0 && (
        <ul className="chips" aria-label="Tech stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
      )}
      <Links p={p} />
    </>
  );
}

export default function Work({ projects, links }) {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const onOpen = (e) => { setFilter('All'); setOpen(e.detail); };
    window.addEventListener('open-project', onOpen);
    return () => window.removeEventListener('open-project', onOpen);
  }, []);

  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured && (filter === 'All' || p.tags.includes(filter)));

  return (
    <section className="section" id="work" aria-labelledby="work-h">
      <div className="wrap">
        <h2 id="work-h">Things I've built</h2>
        <p className="section-lead">Mostly agents and full-stack apps. Open any row for the details.</p>

        {featured && (
          <article className="featured" id={`p-${featured.id}`}>
            <div className="featured-main">
              {featured.badge && <p className="badge">{featured.badge}</p>}
              <h3>{featured.name}</h3>
              <p className="featured-tag">{featured.tagline}</p>
            </div>
            <div className="featured-side"><Detail p={featured} /></div>
          </article>
        )}

        <div className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button key={f} className={`filter ${filter === f ? 'on' : ''}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <ul className="ledger">
          {rest.map((p) => {
            const isOpen = open === p.id;
            return (
              <li key={p.id} id={`p-${p.id}`} className={isOpen ? 'open' : ''}>
                <button className="row" aria-expanded={isOpen} aria-controls={`panel-${p.id}`} onClick={() => setOpen(isOpen ? null : p.id)}>
                  <span className="row-name">{p.name}</span>
                  <span className="row-tag">{p.tagline}</span>
                  <span className="row-kind">{p.tags.join(' and ')}</span>
                  <span className="row-icon" aria-hidden="true" />
                </button>
                <div className="panel" id={`panel-${p.id}`} role="region" aria-label={`${p.name} details`}>
                  <div className="panel-in"><Detail p={p} /></div>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="more">More repositories live on <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>.</p>
      </div>
    </section>
  );
}
