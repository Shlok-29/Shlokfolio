import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  key: { type: String, unique: true, default: 'site' },
  count: { type: Number, default: 0 },
});

export default mongoose.model('Visit', visitSchema);
