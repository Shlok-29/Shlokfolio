import mongoose from 'mongoose';

export let dbReady = false;

export async function connectDB(uri) {
  if (!uri) {
    console.warn('[db] MONGODB_URI not set. Using local file storage fallback.');
    return;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    dbReady = true;
    console.log('[db] Connected to MongoDB');
  } catch (err) {
    console.warn(`[db] MongoDB connection failed (${err.message}). Using local file storage fallback.`);
  }
}
