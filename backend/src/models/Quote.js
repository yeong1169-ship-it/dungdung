import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    default: '오늘 둥실이의 한마디',
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// 인덱스 생성
quoteSchema.index({ category: 1 });
quoteSchema.index({ createdAt: -1 });

export default mongoose.model('Quote', quoteSchema);
