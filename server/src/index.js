import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectDB, dbReady } from './config/db.js';
import profileRoutes from './routes/profile.js';
import githubRoutes from './routes/github.js';
import contactRoutes from './routes/contact.js';
import visitRoutes from './routes/visits.js';

const app = express();
const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, '../../client/dist');
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https://ghchart.rshah.org', 'https://avatars.githubusercontent.com'],
        connectSrc: ["'self'", '*'],
      },
    },
  })
);

const configuredOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((o) => o.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const isOriginAllowed = (origin) => {
  if (!origin) return true;
  if (configuredOrigins.length === 0 || configuredOrigins.includes('*')) return true;
  if (configuredOrigins.includes(origin)) return true;
  return configuredOrigins.some((pattern) => {
    if (pattern.includes('*')) {
      const regex = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
      return regex.test(origin);
    }
    return false;
  });
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} is not allowed by CORS`));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10kb' }));

app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Shlok Dubey Portfolio API',
    uptime: Math.round(process.uptime()),
    database: dbReady ? 'connected (mongodb)' : 'local-file storage fallback',
    endpoints: {
      health: '/api/health',
      profile: '/api/profile',
      github: '/api/github',
      visit: '/api/visit',
      contact: 'POST /api/contact',
    },
  });
});

app.get('/api/health', (_req, res) => res.json({ ok: true, db: dbReady, storage: dbReady ? 'mongodb' : 'local-file' }));

app.use('/api/profile', profileRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/visit', visitRoutes);
app.use('/api', contactRoutes);
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));

if (fs.existsSync(dist)) {
  app.use(express.static(dist, { maxAge: '1h' }));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.use((err, _req, res, _next) => {
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({ error: err.message });
  }
  console.error(err);
  res.status(500).json({ error: 'Something went wrong.' });
});

await connectDB(process.env.MONGODB_URI);
app.listen(PORT, '0.0.0.0', () => console.log(`[api] listening on 0.0.0.0:${PORT}`));

