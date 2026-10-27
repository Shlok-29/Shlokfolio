import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Visit from '../models/Visit.js';
import { dbReady } from '../config/db.js';

const router = Router();
const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, '../../data');
const visitsFile = path.resolve(dataDir, 'visits.json');

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function getLocalVisits() {
  try {
    ensureDataDir();
    if (fs.existsSync(visitsFile)) {
      const data = JSON.parse(fs.readFileSync(visitsFile, 'utf8'));
      return typeof data.count === 'number' ? data.count : 1;
    }
  } catch (err) {
    console.error('[visits] Error reading local visits:', err);
  }
  return 1;
}

function incrementLocalVisits() {
  ensureDataDir();
  const current = getLocalVisits();
  const next = current + 1;
  fs.writeFileSync(visitsFile, JSON.stringify({ key: 'site', count: next }, null, 2), 'utf8');
  return next;
}

router.get('/', async (_req, res) => {
  if (dbReady) {
    const doc = await Visit.findOne({ key: 'site' }).lean();
    return res.json({ count: doc?.count ?? 0 });
  }
  res.json({ count: getLocalVisits() });
});

router.post('/', async (_req, res) => {
  if (dbReady) {
    const doc = await Visit.findOneAndUpdate(
      { key: 'site' },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    ).lean();
    return res.json({ count: doc.count });
  }
  const count = incrementLocalVisits();
  res.json({ count });
});

export default router;

