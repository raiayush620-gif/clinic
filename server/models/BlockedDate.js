import mongoose from 'mongoose';

const blockedDateSchema = mongoose.Schema(
  {
    date: { type: String, required: true, unique: true },
    reason: { type: String, default: 'Clinic Holiday' }
  },
  { timestamps: true }
);

const BlockedDate = mongoose.model('BlockedDate', blockedDateSchema);
export default BlockedDate;
