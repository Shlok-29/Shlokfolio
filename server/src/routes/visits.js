import { Router } from 'express';
import Visit from '../models/Visit.js';
import { dbReady } from '../config/db.js';

const router = Router();

router.get('/', async (_req, res) => {
  if (!dbReady) return res.json({ count: null });
  const doc = await Visit.findOne({ key: 'site' }).lean();
  res.json({ count: doc?.count ?? 0 });
});

router.post('/', async (_req, res) => {
  if (!dbReady) return res.json({ count: null });
  const doc = await Visit.findOneAndUpdate(
    { key: 'site' },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  ).lean();
  res.json({ count: doc.count });
});

export default router;
