import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const wallpaperSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  mobileImage: String,
  tabletImage: String,
  desktopImage: String,
  colors: [String],
  resolutions: Object,
  views: Number,
  downloads: Number
}, { timestamps: true });

const Wallpaper = mongoose.model('Wallpaper', wallpaperSchema);

async function cleanupWallpapers() {
  try {
    console.log('🧹 유실된 배경화면 정리 시작...\n');

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB 연결 완료\n');

    const wallpapers = await Wallpaper.find({});
    console.log(`📋 총 ${wallpapers.length}개의 배경화면 발견\n`);

    const toDelete = [];

    for (const wallpaper of wallpapers) {
      const isCloudinary = wallpaper.imageUrl?.includes('cloudinary.com');

      if (!isCloudinary) {
        toDelete.push(wallpaper);
        console.log(`❌ [삭제 예정] ${wallpaper.title} - ${wallpaper.imageUrl}`);
      } else {
        console.log(`✅ [유지] ${wallpaper.title}`);
      }
    }

    if (toDelete.length === 0) {
      console.log('\n✨ 모든 배경화면이 Cloudinary에 있습니다!');
      return;
    }

    console.log(`\n⚠️  ${toDelete.length}개의 유실된 배경화면을 삭제합니다...`);

    for (const wallpaper of toDelete) {
      await Wallpaper.findByIdAndDelete(wallpaper._id);
      console.log(`   🗑️  삭제됨: ${wallpaper.title} (ID: ${wallpaper._id})`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ 정리 완료!');
    console.log('='.repeat(60));
    console.log(`🗑️  삭제된 배경화면: ${toDelete.length}개`);
    console.log(`✅ 남은 배경화면: ${wallpapers.length - toDelete.length}개`);
    console.log('='.repeat(60));

    console.log('\n💡 이제 관리자 페이지에서 배경화면을 다시 업로드하면');
    console.log('   자동으로 Cloudinary에 저장됩니다!');

  } catch (error) {
    console.error('❌ 오류:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 MongoDB 연결 종료');
  }
}

cleanupWallpapers();
