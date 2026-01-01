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

async function checkWallpapers() {
  try {
    console.log('🔍 배경화면 상태 확인 중...\n');

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB 연결 완료\n');

    const wallpapers = await Wallpaper.find({});
    console.log(`📋 총 ${wallpapers.length}개의 배경화면 발견\n`);

    let cloudinaryCount = 0;
    let localCount = 0;
    const localWallpapers = [];

    for (const wallpaper of wallpapers) {
      const isCloudinary = wallpaper.imageUrl?.includes('cloudinary.com');

      if (isCloudinary) {
        cloudinaryCount++;
        console.log(`✅ [Cloudinary] ${wallpaper.title}`);
      } else {
        localCount++;
        localWallpapers.push(wallpaper);
        console.log(`❌ [로컬 경로] ${wallpaper.title} - ${wallpaper.imageUrl}`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 결과 요약');
    console.log('='.repeat(60));
    console.log(`✅ Cloudinary에 있는 배경화면: ${cloudinaryCount}개`);
    console.log(`❌ 로컬 경로인 배경화면: ${localCount}개 (유실 위험)`);
    console.log('='.repeat(60));

    if (localCount > 0) {
      console.log('\n⚠️  로컬 경로 배경화면은 서버 재시작 시 유실됩니다!');
      console.log('💡 해결 방법: 관리자 페이지에서 해당 배경화면을 삭제하고 다시 업로드하세요.\n');
      console.log('삭제할 배경화면 목록:');
      localWallpapers.forEach((wp, i) => {
        console.log(`   ${i + 1}. ${wp.title} (ID: ${wp._id})`);
      });
    }

  } catch (error) {
    console.error('❌ 오류:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 MongoDB 연결 종료');
  }
}

checkWallpapers();
