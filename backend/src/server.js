import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';

// Routes
import quotesRouter from './routes/quotes.js';
import wallpapersRouter from './routes/wallpapers.js';
import chatRouter from './routes/chat.js';
import collectionsRouter from './routes/collections.js';
// import imageRoutes from './routes/image.js'; // 주석 처리: 파일이 존재하지 않음

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 데이터베이스 연결
connectDB();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // 이미지 CORS 허용
  contentSecurityPolicy: false // CSP 비활성화 (개발 환경)
})); // 보안 헤더
app.use(compression()); // 응답 압축
app.use(morgan('dev')); // 로깅
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100 // 최대 100개 요청
});
app.use('/api/', limiter);

// 정적 파일 제공 (업로드된 이미지) - CORS 헤더 추가
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static('uploads'));

// API Routes
app.use('/api/quotes', quotesRouter);
app.use('/api/wallpapers', wallpapersRouter);
app.use('/api/chat', chatRouter);
app.use('/api/collections', collectionsRouter);
// app.use('/api/images', imageRoutes); // 주석 처리: 파일이 존재하지 않음

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다!`);
  console.log(`📝 API 문서: http://localhost:${PORT}/api`);
});
