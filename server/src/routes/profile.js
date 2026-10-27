import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const sharedPath = path.resolve(here, '../../../shared/profile.json');
const localPath = path.resolve(here, '../data/profile.json');

export const profilePath = fs.existsSync(sharedPath) ? sharedPath : localPath;

const router = Router();

router.get('/', (_req, res) => {
  try {
    const target = fs.existsSync(sharedPath) ? sharedPath : localPath;
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.json(JSON.parse(fs.readFileSync(target, 'utf8')));
  } catch {
    res.status(500).json({ error: 'Profile data is unavailable.' });
  }
});

export default router;
