import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES 모듈에서 __dirname 사용하기 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env 파일 로드
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Cloudinary 설정
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Wallpaper 모델 (간단하게 직접 정의)
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

// 로컬 파일 경로를 Cloudinary로 업로드
async function uploadToCloudinary(localPath, folder = 'dungsil/wallpapers') {
  if (!localPath) return null;

  // 로컬 경로에서 파일 시스템 경로 추출
  // 예: "/uploads/wallpapers/abc.png" -> "/backend/uploads/wallpapers/abc.png"
  const relativePath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
  const fullPath = path.join(__dirname, '../../', relativePath);

  console.log(`   📤 업로드 중: ${relativePath}`);

  // 파일 존재 확인
  if (!fs.existsSync(fullPath)) {
    console.log(`   ⚠️  파일 없음: ${fullPath}`);
    return null;
  }

  try {
    // Cloudinary에 업로드
    const result = await cloudinary.uploader.upload(fullPath, {
      folder: folder,
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto'
    });

    console.log(`   ✅ 업로드 완료: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`   ❌ 업로드 실패: ${error.message}`);
    return null;
  }
}

// 마이그레이션 실행
async function migrate() {
  try {
    console.log('🚀 Cloudinary 마이그레이션 시작...\n');

    // MongoDB 연결
    console.log('📊 MongoDB 연결 중...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB 연결 완료\n');

    // Cloudinary 설정 확인
    console.log('☁️  Cloudinary 설정:');
    console.log(`   Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    console.log(`   API Key: ${process.env.CLOUDINARY_API_KEY?.slice(0, 6)}...`);
    console.log('');

    // 모든 배경화면 가져오기
    const wallpapers = await Wallpaper.find({});
    console.log(`📋 총 ${wallpapers.length}개의 배경화면 발견\n`);

    if (wallpapers.length === 0) {
      console.log('⚠️  마이그레이션할 배경화면이 없습니다.');
      return;
    }

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    // 각 배경화면 처리
    for (let i = 0; i < wallpapers.length; i++) {
      const wallpaper = wallpapers[i];
      console.log(`\n[${i + 1}/${wallpapers.length}] "${wallpaper.title}" 처리 중...`);

      // 이미 Cloudinary URL인지 확인
      if (wallpaper.imageUrl?.includes('cloudinary.com')) {
        console.log('   ⏭️  이미 Cloudinary에 있음. 스킵.');
        skipCount++;
        continue;
      }

      try {
        const updates = {};

        // mobileImage 업로드
        if (wallpaper.mobileImage && !wallpaper.mobileImage.includes('cloudinary.com')) {
          const cloudinaryUrl = await uploadToCloudinary(wallpaper.mobileImage);
          if (cloudinaryUrl) {
            updates.mobileImage = cloudinaryUrl;
            updates.imageUrl = cloudinaryUrl; // 기본 이미지도 업데이트
          }
        }

        // tabletImage 업로드
        if (wallpaper.tabletImage && !wallpaper.tabletImage.includes('cloudinary.com')) {
          const cloudinaryUrl = await uploadToCloudinary(wallpaper.tabletImage);
          if (cloudinaryUrl) updates.tabletImage = cloudinaryUrl;
        }

        // desktopImage 업로드
        if (wallpaper.desktopImage && !wallpaper.desktopImage.includes('cloudinary.com')) {
          const cloudinaryUrl = await uploadToCloudinary(wallpaper.desktopImage);
          if (cloudinaryUrl) updates.desktopImage = cloudinaryUrl;
        }

        // imageUrl만 있고 device별 이미지가 없는 경우
        if (wallpaper.imageUrl && !wallpaper.imageUrl.includes('cloudinary.com')
            && !wallpaper.mobileImage && !wallpaper.tabletImage && !wallpaper.desktopImage) {
          const cloudinaryUrl = await uploadToCloudinary(wallpaper.imageUrl);
          if (cloudinaryUrl) updates.imageUrl = cloudinaryUrl;
        }

        // 업데이트할 내용이 있으면 DB 업데이트
        if (Object.keys(updates).length > 0) {
          await Wallpaper.findByIdAndUpdate(wallpaper._id, updates);
          console.log(`   ✅ DB 업데이트 완료`);
          successCount++;
        } else {
          console.log(`   ⚠️  업로드된 이미지 없음`);
          errorCount++;
        }

      } catch (error) {
        console.error(`   ❌ 오류: ${error.message}`);
        errorCount++;
      }
    }

    // 결과 요약
    console.log('\n' + '='.repeat(50));
    console.log('📊 마이그레이션 완료!');
    console.log('='.repeat(50));
    console.log(`✅ 성공: ${successCount}개`);
    console.log(`⏭️  스킵: ${skipCount}개 (이미 Cloudinary에 있음)`);
    console.log(`❌ 실패: ${errorCount}개`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ 마이그레이션 오류:', error);
  } finally {
    // MongoDB 연결 종료
    await mongoose.disconnect();
    console.log('\n👋 MongoDB 연결 종료');
  }
}

// 스크립트 실행
migrate();
