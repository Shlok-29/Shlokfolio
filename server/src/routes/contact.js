import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import Message from '../models/Message.js';
import { dbReady } from '../config/db.js';

const router = Router();
const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, '../../data');
const messagesFile = path.resolve(dataDir, 'messages.json');

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function getLocalMessages() {
  try {
    ensureDataDir();
    if (fs.existsSync(messagesFile)) {
      return JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
    }
  } catch (err) {
    console.error('[contact] Error reading local messages:', err);
  }
  return [];
}

function saveLocalMessage(msg) {
  ensureDataDir();
  const messages = getLocalMessages();
  const entry = {
    _id: crypto.randomUUID(),
    ...msg,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  messages.unshift(entry);
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf8');
  return entry;
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Try again in a few minutes.' },
});

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getMailTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

async function sendNotificationEmail({ name, email, message }) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    console.warn('[contact] EMAIL_USER or EMAIL_PASS not configured in .env. Message saved to storage, but email notification skipped.');
    return;
  }

  const transporter = getMailTransporter();
  const to = process.env.EMAIL_TO || user;
  const subject = `💼 New Portfolio Message from ${name}`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <h2 style="color: #6c63ff; margin-top: 0; font-size: 22px;">New Message from Portfolio</h2>
      <p style="font-size: 15px; color: #4a5568; line-height: 1.5;">You have received a new contact submission from your portfolio website:</p>
      
      <div style="background-color: #f7fafc; border: 1px solid #edf2f7; padding: 16px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0 0 10px; font-size: 15px; color: #2d3748;"><strong>Sender:</strong> ${escapeHtml(name)}</p>
        <p style="margin: 0 0 10px; font-size: 15px; color: #2d3748;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #6c63ff; text-decoration: none;">${escapeHtml(email)}</a></p>
        <p style="margin: 0; font-size: 14px; color: #718096;"><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
      </div>

      <div style="margin: 24px 0;">
        <h4 style="margin: 0 0 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #718096;">Message:</h4>
        <div style="white-space: pre-wrap; background-color: #faf5ff; border-left: 4px solid #6c63ff; padding: 16px; border-radius: 4px; font-size: 15px; line-height: 1.6; color: #1a202c;">${escapeHtml(message)}</div>
      </div>

      <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid #edf2f7; font-size: 13px; color: #a0aec0;">
        💡 You can reply directly to this email to reach <strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}).
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${user}>`,
    to,
    replyTo: email,
    subject,
    text: `New portfolio message from ${name} (${email}):\n\n${message}`,
    html,
  });
  console.log(`[contact] Notification email sent successfully to ${to}`);
}

router.post('/contact', limiter, async (req, res) => {
  const { name = '', email = '', message = '', website = '' } = req.body || {};

  if (website) return res.status(201).json({ ok: true });

  if (name.trim().length < 2) return res.status(400).json({ error: 'Add your name.' });
  if (!EMAIL.test(email.trim())) return res.status(400).json({ error: 'Enter a valid email address.' });
  if (message.trim().length < 10) return res.status(400).json({ error: 'Write at least a sentence.' });

  try {
    if (dbReady) {
      await Message.create({ name: name.trim(), email: email.trim(), message: message.trim() });
    } else {
      saveLocalMessage({ name: name.trim(), email: email.trim(), message: message.trim() });
    }

    sendNotificationEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    }).catch((emailErr) => {
      console.error('[contact] Failed to send email notification:', emailErr.message);
    });

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('[contact] Failed to save message:', err);
    res.status(500).json({ error: 'Could not save your message. Try again.' });
  }
});

router.get('/messages', async (req, res) => {
  if (!process.env.ADMIN_TOKEN || req.get('x-admin-token') !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorised.' });
  }
  if (dbReady) {
    res.json(await Message.find().sort({ createdAt: -1 }).limit(200).lean());
  } else {
    res.json(getLocalMessages().slice(0, 200));
  }
});

export default router;
