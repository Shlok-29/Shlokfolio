import mongoose from 'mongoose';

export let dbReady = false;

export async function connectDB(uri) {
  if (!uri) {
    console.warn('[db] MONGODB_URI not set. Contact form and visitor counter are disabled.');
    return;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    dbReady = true;
    console.log('[db] connected');
  } catch (err) {
    console.warn(`[db] connection failed (${err.message}). Running without database.`);
  }
}
