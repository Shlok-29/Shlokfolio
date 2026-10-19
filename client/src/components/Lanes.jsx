const COLORS = { build: 'marigold', lead: 'rani', learn: 'mint' };

export default function Lanes({ lanes, journey, bio }) {
  return (
    <section className="section alt" id="lanes" aria-labelledby="lanes-h">
      <div className="wrap">
        <h2 id="lanes-h">Three lanes, one person</h2>
        <div className="bio">{bio.map((b) => <p key={b}>{b}</p>)}</div>

        <div className="lanes">
          {Object.entries(lanes).map(([key, lane]) => (
            <div className="lane" id={`lane-${key}`} key={key} style={{ '--c': `var(--${COLORS[key]})` }}>
              <h3><i aria-hidden="true" />{lane.label}</h3>
              <p className="lane-line">{lane.line}</p>
              <ol>
                {journey.filter((j) => j.lane === key).map((j) => (
                  <li key={j.short}>
                    <p className="j-title">{j.title}</p>
                    <p className="j-org">{j.org}{j.period ? `, ${j.period}` : ''}</p>
                    {j.points.length > 0 && <ul>{j.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
