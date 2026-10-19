import { useEffect, useRef } from 'react';
import { go, openProject, reducedMotion } from '../lib/nav.js';

const HUBS = [
  { key: 'build', angle: -158, color: 'marigold', target: 'work' },
  { key: 'lead', angle: -22, color: 'rani', target: 'lane-lead' },
  { key: 'learn', angle: 98, color: 'mint', target: 'lane-learn' },
];

const rad = (d) => (d * Math.PI) / 180;

function readPalette() {
  const s = getComputedStyle(document.documentElement);
  const v = (n) => s.getPropertyValue(n).trim();
  return {
    text: v('--text'), muted: v('--muted'), line: v('--line'),
    marigold: v('--marigold'), rani: v('--rani'), mint: v('--mint'),
  };
}

function alpha(hex, a) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export default function AgentField({ profile }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const still = reducedMotion();
    let w = 0, h = 0, raf = 0, t = 0, visible = true, first = true;
    const mouse = { x: -999, y: -999 };
    let hover = null;
    let pal = readPalette();

    const mk = (o) => ({ x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0, phase: Math.random() * 6.28, ...o });
    const center = mk({ kind: 'center', label: profile.name.split(' ')[0], r: 15 });
    const hubs = HUBS.map((hb) => mk({ ...hb, kind: 'hub', label: profile.lanes[hb.key].label, r: 10 }));
    const kids = [];
    hubs.forEach((hub) => {
      const items =
        hub.key === 'build'
          ? profile.projects.map((p) => ({ label: p.name, id: p.id }))
          : profile.journey.filter((j) => j.lane === hub.key).map((j) => ({ label: j.short }));
      items.forEach((it, i) => kids.push(mk({ kind: 'kid', hub, label: it.label, id: it.id, r: 4.5, i, n: items.length })));
    });
    const all = [center, ...hubs, ...kids];

    function layout() {
      const mobile = w < 760;
      const cx = mobile ? w * 0.5 : w * 0.7;
      const cy = mobile ? h * 0.34 : h * 0.44;
      const R = mobile ? Math.min(w * 0.3, h * 0.2) : Math.min(w * 0.19, h * 0.27);
      center.tx = cx; center.ty = cy; center.R = R;
      hubs.forEach((hub) => {
        hub.tx = cx + Math.cos(rad(hub.angle)) * R;
        hub.ty = cy + Math.sin(rad(hub.angle)) * R;
      });
      kids.forEach((k) => {
        const spread = Math.min(150, k.n * 30);
        const a = rad(k.hub.angle + (k.n === 1 ? 0 : (k.i / (k.n - 1) - 0.5) * spread));
        const rk = R * (mobile ? 0.62 : 0.64);
        k.tx = k.hub.tx + Math.cos(a) * rk;
        k.ty = k.hub.ty + Math.sin(a) * rk;
      });
      if (first || still) all.forEach((n) => { n.x = n.tx; n.y = n.ty; });
      first = false;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
      draw();
    }

    function step() {
      all.forEach((n) => {
        const amp = n.kind === 'kid' ? 5 : 3;
        const tx = n.tx + Math.sin(t * 0.7 + n.phase) * amp;
        const ty = n.ty + Math.cos(t * 0.6 + n.phase) * amp;
        n.vx += (tx - n.x) * 0.04;
        n.vy += (ty - n.y) * 0.04;
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 110 && d > 0.1) {
          const f = (110 - d) / 110;
          n.vx += (dx / d) * f * 1.6;
          n.vy += (dy / d) * f * 1.6;
        }
        n.vx *= 0.82; n.vy *= 0.82;
        n.x += n.vx; n.y += n.vy;
      });
    }

    function edge(a, b, color, seed, big) {
      ctx.strokeStyle = alpha(color, big ? 0.45 : 0.28);
      ctx.lineWidth = big ? 1.4 : 1;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      if (still) return;
      const p = (t * (big ? 0.22 : 0.16) + seed) % 1;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p, big ? 2.6 : 1.8, 0, 6.283);
      ctx.fill();
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      if (!w) return;
      ctx.strokeStyle = pal.line; ctx.setLineDash([3, 7]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(center.x, center.y, center.R, 0, 6.283); ctx.stroke();
      ctx.setLineDash([]);

      hubs.forEach((hb, i) => edge(center, hb, pal[hb.color], i * 0.33, true));
      kids.forEach((k, i) => edge(k.hub, k, pal[k.hub.color], (i * 0.137) % 1, false));

      const labelKids = w >= 760;
      kids.forEach((k) => {
        const c = pal[k.hub.color];
        const on = hover === k;
        ctx.fillStyle = c;
        ctx.beginPath(); ctx.arc(k.x, k.y, on ? k.r + 2.5 : k.r, 0, 6.283); ctx.fill();
        if (labelKids || on) {
          const right = k.x >= k.hub.x;
          ctx.font = `${on ? 600 : 500} 12px "Hanken Grotesk", system-ui, sans-serif`;
          ctx.textAlign = right ? 'left' : 'right';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = on ? pal.text : pal.muted;
          ctx.fillText(k.label, k.x + (right ? 10 : -10), k.y);
        }
      });

      hubs.forEach((hb) => {
        const c = pal[hb.color], on = hover === hb;
        ctx.fillStyle = alpha(c, 0.18);
        ctx.beginPath(); ctx.arc(hb.x, hb.y, hb.r + (on ? 12 : 8), 0, 6.283); ctx.fill();
        ctx.fillStyle = c;
        ctx.beginPath(); ctx.arc(hb.x, hb.y, hb.r, 0, 6.283); ctx.fill();
        ctx.font = '700 15px "Bricolage Grotesque", system-ui, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = pal.text;
        const up = hb.angle < 0;
        ctx.fillText(hb.label, hb.x, hb.y + (up ? -hb.r - 14 : hb.r + 26));
      });

      ctx.fillStyle = pal.text;
      ctx.beginPath(); ctx.arc(center.x, center.y, center.r + (hover === center ? 3 : 0), 0, 6.283); ctx.fill();
      ctx.fillStyle = pal.marigold;
      ctx.beginPath(); ctx.arc(center.x, center.y, 5, 0, 6.283); ctx.fill();
      ctx.font = '700 17px "Bricolage Grotesque", system-ui, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = pal.text;
      ctx.fillText(center.label, center.x, center.y + center.r + 24);
    }

    function loop() {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      t += 0.016;
      step();
      draw();
    }

    function pick(x, y) {
      let best = null, bd = 1e9;
      all.forEach((n) => {
        const d = Math.hypot(n.x - x, n.y - y);
        const reach = n.r + (n.kind === 'kid' ? 12 : 14);
        if (d < reach && d < bd) { best = n; bd = d; }
      });
      return best;
    }

    const rel = (e) => {
      const b = canvas.getBoundingClientRect();
      return [e.clientX - b.left, e.clientY - b.top];
    };
    const onMove = (e) => {
      const [x, y] = rel(e);
      mouse.x = x; mouse.y = y;
      hover = pick(x, y);
      canvas.style.cursor = hover ? 'pointer' : 'default';
      if (still) draw();
    };
    const onLeave = () => { mouse.x = mouse.y = -999; hover = null; canvas.style.cursor = 'default'; if (still) draw(); };
    const onClick = (e) => {
      const n = pick(...rel(e));
      if (!n) return;
      if (n.kind === 'center') go('contact');
      else if (n.kind === 'hub') go(n.target);
      else if (n.hub.key === 'build') openProject(n.id);
      else go(n.hub.target);
    };
    const onTheme = () => { pal = readPalette(); draw(); };

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('click', onClick);
    window.addEventListener('themechange', onTheme);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);
    document.fonts?.ready.then(draw);
    resize();
    if (!still) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('themechange', onTheme);
    };
  }, [profile]);

  return <canvas ref={ref} className="field" aria-hidden="true" />;
}
