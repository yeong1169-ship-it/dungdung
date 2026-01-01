import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary 설정
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary 연결 확인
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('⚠️  Cloudinary 환경 변수가 설정되지 않았습니다!');
  console.error('📝 CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET를 .env에 추가하세요.');
  console.error('현재 환경 변수:', {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? '설정됨' : '없음',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? '설정됨' : '없음',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? '설정됨' : '없음'
  });
} else {
  console.log('✅ Cloudinary 설정 완료:', process.env.CLOUDINARY_CLOUD_NAME);
  console.log('   Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
  console.log('   API Key:', process.env.CLOUDINARY_API_KEY?.substring(0, 6) + '...');
}

// Cloudinary Storage 설정
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dungsil/wallpapers', // Cloudinary 폴더명
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // 허용 파일 형식
    transformation: [
      { quality: 'auto', fetch_format: 'auto' } // 자동 최적화
    ],
  },
});

// Multer 설정
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB 제한
  },
  fileFilter: (req, file, cb) => {
    // 이미지 파일만 허용
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('이미지 파일만 업로드 가능합니다 (JPEG, PNG, WebP)'));
    }
  },
});

export { cloudinary, upload };
