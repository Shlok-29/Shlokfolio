import { Router } from 'express';

const router = Router();
const USER = process.env.GITHUB_USER || 'Shlok-29';
const TTL = 10 * 60 * 1000;
let cache = { at: 0, data: null };

async function gh(path) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-server' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
  return res.json();
}

router.get('/', async (_req, res) => {
  if (cache.data && Date.now() - cache.at < TTL) return res.json(cache.data);
  try {
    const [user, repos] = await Promise.all([
      gh(`/users/${USER}`),
      gh(`/users/${USER}/repos?per_page=100&sort=pushed`),
    ]);
    const own = repos.filter((r) => !r.fork);
    const langs = {};
    own.forEach((r) => r.language && (langs[r.language] = (langs[r.language] || 0) + 1));
    const total = Object.values(langs).reduce((a, b) => a + b, 0) || 1;
    const data = {
      followers: user.followers,
      publicRepos: user.public_repos,
      stars: own.reduce((sum, r) => sum + r.stargazers_count, 0),
      lastPush: own[0]?.pushed_at || null,
      languages: Object.entries(langs)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, n]) => ({ name, share: Math.round((n / total) * 100) })),
    };
    cache = { at: Date.now(), data };
    res.json(data);
  } catch (err) {
    if (cache.data) return res.json(cache.data);
    res.status(502).json({ error: err.message });
  }
});

export default router;
