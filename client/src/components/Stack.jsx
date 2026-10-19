export default function Stack({ stack }) {
  const groups = Object.entries(stack);
  const flat = groups.flatMap(([, items]) => items);
  const half = Math.ceil(flat.length / 2);
  const rows = [flat.slice(0, half), flat.slice(half)];

  return (
    <section className="section" id="stack" aria-labelledby="stack-h">
      <div className="wrap">
        <h2 id="stack-h">What I build with</h2>
      </div>
      <div className="marquees" aria-hidden="true">
        {rows.map((row, i) => (
          <div className={`marquee ${i ? 'rev' : ''}`} key={i}>
            <div className="track">
              {[...row, ...row, ...row, ...row].map((s, j) => <span key={j}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div className="wrap">
        <dl className="groups">
          {groups.map(([name, items]) => (
            <div key={name}>
              <dt>{name}</dt>
              <dd>{items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
