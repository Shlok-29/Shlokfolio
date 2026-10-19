import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Message from '../models/Message.js';
import { dbReady } from '../config/db.js';

const router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Try again in a few minutes.' },
});

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/contact', limiter, async (req, res) => {
  const { name = '', email = '', message = '', website = '' } = req.body || {};

  if (website) return res.status(201).json({ ok: true });

  if (name.trim().length < 2) return res.status(400).json({ error: 'Add your name.' });
  if (!EMAIL.test(email.trim())) return res.status(400).json({ error: 'Enter a valid email address.' });
  if (message.trim().length < 10) return res.status(400).json({ error: 'Write at least a sentence.' });

  if (!dbReady) {
    return res.status(503).json({ error: 'Messages are offline right now. Email me directly instead.' });
  }
  try {
    await Message.create({ name, email, message });
    res.status(201).json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Could not save your message. Try again.' });
  }
});

router.get('/messages', async (req, res) => {
  if (!process.env.ADMIN_TOKEN || req.get('x-admin-token') !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorised.' });
  }
  if (!dbReady) return res.status(503).json({ error: 'Database offline.' });
  res.json(await Message.find().sort({ createdAt: -1 }).limit(200).lean());
});

export default router;
