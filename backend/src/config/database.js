import mongoose from 'mongoose';

// 전역 변수로 MongoDB 연결 상태 저장
global.isMongoConnected = false;

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000, // 2초 타임아웃
    });
    console.log(`✅ MongoDB 연결 성공: ${mongoose.connection.host}`);
    global.isMongoConnected = true;
  } catch (error) {
    console.error(`❌ MongoDB 연결 실패: ${error.message}`);
    console.log('⚠️  더미 데이터 모드로 실행합니다.');
    global.isMongoConnected = false;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB 연결이 끊어졌습니다.');
  global.isMongoConnected = false;
});

mongoose.connection.on('connected', () => {
  global.isMongoConnected = true;
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ MongoDB 오류: ${err}`);
  global.isMongoConnected = false;
});
