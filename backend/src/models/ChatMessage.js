import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  sender: {
    type: String,
    required: true,
    enum: ['dungsil', 'user']
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  isSaved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// 인덱스
chatMessageSchema.index({ sessionId: 1, createdAt: -1 });

export default mongoose.model('ChatMessage', chatMessageSchema);
