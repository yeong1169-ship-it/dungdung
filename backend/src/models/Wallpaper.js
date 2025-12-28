import mongoose from 'mongoose';

const wallpaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  // 각 디바이스별 이미지
  mobileImage: {
    type: String
  },
  tabletImage: {
    type: String
  },
  desktopImage: {
    type: String
  },
  colors: [{
    type: String
  }],
  resolutions: {
    mobile: {
      width: { type: Number, default: 1242 },
      height: { type: Number, default: 2688 }
    },
    tablet: {
      width: { type: Number, default: 1688 },
      height: { type: Number, default: 2388 }
    },
    desktop: {
      width: { type: Number, default: 1920 },
      height: { type: Number, default: 1080 }
    }
  },
  views: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// 인덱스
wallpaperSchema.index({ createdAt: -1 });
wallpaperSchema.index({ views: -1 });
wallpaperSchema.index({ downloads: -1 });

export default mongoose.model('Wallpaper', wallpaperSchema);
