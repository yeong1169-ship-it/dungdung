# 둥실이 백엔드 API 서버

Node.js + Express + MongoDB 기반의 RESTful API 서버입니다.

## 🚀 시작하기

### 사전 요구사항
- Node.js 18+
- MongoDB 설치 및 실행

### 설치

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 필요한 설정 수정

# MongoDB 시작 (별도 터미널)
mongod

# 샘플 데이터 추가
npm run seed

# 개발 서버 실행
npm run dev
```

서버가 http://localhost:5000 에서 실행됩니다.

---

## 📚 API 엔드포인트

### 명언 (Quotes)

#### 모든 명언 가져오기
```
GET /api/quotes
Query Parameters:
  - category: 카테고리 필터 (선택)
  - limit: 가져올 개수 (기본: 10)
```

#### 랜덤 명언 가져오기
```
GET /api/quotes/random
```

#### 특정 명언 가져오기
```
GET /api/quotes/:id
```

#### 명언 생성
```
POST /api/quotes
Body: {
  "text": "명언 내용",
  "author": "작성자",
  "category": "오늘 둥실이의 한마디"
}
```

#### 명언 좋아요
```
PATCH /api/quotes/:id/like
```

#### 명언 수정
```
PUT /api/quotes/:id
Body: { ... }
```

#### 명언 삭제
```
DELETE /api/quotes/:id
```

---

### 배경화면 (Wallpapers)

#### 모든 배경화면 가져오기
```
GET /api/wallpapers
Query Parameters:
  - sort: newest | popular | downloads | oldest (기본: newest)
  - search: 검색어 (선택)
  - limit: 페이지당 개수 (기본: 20)
  - page: 페이지 번호 (기본: 1)
```

#### 특정 배경화면 가져오기
```
GET /api/wallpapers/:id
```

#### 배경화면 생성 (이미지 업로드 포함)
```
POST /api/wallpapers
Content-Type: multipart/form-data
Fields:
  - image: 이미지 파일 (필수)
  - title: 제목 (필수)
  - description: 설명
  - colors: 컬러 배열 JSON 문자열
```

#### 배경화면 다운로드 카운트 증가
```
PATCH /api/wallpapers/:id/download
```

#### 배경화면 수정
```
PUT /api/wallpapers/:id
Content-Type: multipart/form-data
```

#### 배경화면 삭제
```
DELETE /api/wallpapers/:id
```

---

### 채팅 (Chat)

#### 세션의 메시지 가져오기
```
GET /api/chat/session/:sessionId
Query Parameters:
  - limit: 가져올 개수 (기본: 50)
```

#### 메시지 생성
```
POST /api/chat
Body: {
  "text": "메시지 내용",
  "sender": "dungsil" | "user",
  "sessionId": "세션 ID"
}
```

#### 메시지 저장 상태 토글
```
PATCH /api/chat/:id/save
```

#### 저장된 메시지만 가져오기
```
GET /api/chat/saved/:sessionId
```

#### 메시지 삭제
```
DELETE /api/chat/:id
```

#### 세션 전체 삭제
```
DELETE /api/chat/session/:sessionId
```

---

## 🗄️ 데이터베이스 스키마

### Quote
```javascript
{
  text: String (required),
  author: String (required),
  category: String (default: '오늘 둥실이의 한마디'),
  likes: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Wallpaper
```javascript
{
  title: String (required),
  description: String,
  imageUrl: String (required),
  colors: [String],
  resolutions: {
    mobile: { width: Number, height: Number },
    tablet: { width: Number, height: Number },
    desktop: { width: Number, height: Number }
  },
  views: Number (default: 0),
  downloads: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### ChatMessage
```javascript
{
  text: String (required),
  sender: String (enum: ['dungsil', 'user']),
  sessionId: String (required),
  isSaved: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📁 프로젝트 구조

```
backend/
├── src/
│   ├── server.js           # 서버 진입점
│   ├── config/
│   │   └── database.js     # MongoDB 연결 설정
│   ├── models/             # Mongoose 모델
│   │   ├── Quote.js
│   │   ├── Wallpaper.js
│   │   └── ChatMessage.js
│   ├── routes/             # API 라우트
│   │   ├── quotes.js
│   │   ├── wallpapers.js
│   │   ├── chat.js
│   │   └── collections.js
│   └── scripts/            # 유틸리티 스크립트
│       └── seedData.js     # 샘플 데이터 추가
├── uploads/                # 업로드 파일 저장
│   └── wallpapers/
├── .env                    # 환경 변수
├── .gitignore
├── package.json
└── README.md
```

---

## 🔧 환경 변수

```env
PORT=5000                                    # 서버 포트
NODE_ENV=development                         # 환경 (development/production)
MONGODB_URI=mongodb://localhost:27017/dungsil # MongoDB 연결 문자열
FRONTEND_URL=http://localhost:3000          # CORS 허용 URL
MAX_FILE_SIZE=10485760                       # 최대 파일 크기 (10MB)
UPLOAD_DIR=uploads                           # 업로드 디렉토리
```

---

## 🛡️ 보안 기능

- **Helmet**: 보안 HTTP 헤더 설정
- **CORS**: Cross-Origin Resource Sharing 제어
- **Rate Limiting**: API 호출 제한 (15분당 100회)
- **Compression**: 응답 데이터 압축
- **File Upload Validation**: 이미지 파일 타입 및 크기 제한

---

## 📝 스크립트

```bash
npm start          # 프로덕션 서버 실행
npm run dev        # 개발 서버 실행 (nodemon)
npm run seed       # 샘플 데이터 추가
```

---

## 🐛 디버깅

개발 모드에서는 자세한 에러 스택이 응답에 포함됩니다.

Health check:
```
GET /health
```

---

## 📦 의존성

### 주요 라이브러리
- **express**: 웹 프레임워크
- **mongoose**: MongoDB ODM
- **multer**: 파일 업로드
- **cors**: CORS 처리
- **helmet**: 보안 헤더
- **morgan**: HTTP 로깅
- **express-rate-limit**: Rate limiting
- **compression**: 응답 압축

---

## 🚧 향후 개선 사항

- [ ] 사용자 인증/권한 (JWT)
- [ ] 이미지 리사이징 (Sharp)
- [ ] 캐싱 (Redis)
- [ ] WebSocket (실시간 채팅)
- [ ] API 문서 자동화 (Swagger)
- [ ] 테스트 코드 (Jest)

---

## 📄 라이선스

MIT
