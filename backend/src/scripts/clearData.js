import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Quote from '../models/Quote.js';
import Wallpaper from '../models/Wallpaper.js';

dotenv.config();

async function clearDatabase() {
  try {
    // MongoDB 연결
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB 연결 성공');

    // 모든 데이터 삭제
    const quotesDeleted = await Quote.deleteMany({});
    const wallpapersDeleted = await Wallpaper.deleteMany({});

    console.log(`🗑️  ${quotesDeleted.deletedCount}개의 명언 삭제 완료`);
    console.log(`🗑️  ${wallpapersDeleted.deletedCount}개의 배경화면 삭제 완료`);

    console.log('\n🎉 데이터베이스 초기화 완료!');
    process.exit(0);
  } catch (error) {
    console.error('❌ 데이터베이스 초기화 실패:', error);
    process.exit(1);
  }
}

clearDatabase();
