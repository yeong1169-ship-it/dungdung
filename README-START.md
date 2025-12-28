# 둥실이 웹사이트 실행 가이드

프론트엔드와 백엔드가 모두 연동된 완전한 웹 애플리케이션입니다.

---

## 🚀 시작하기

### 1️⃣ MongoDB 설치 및 실행

#### macOS (Homebrew 사용)
```bash
# MongoDB 설치
brew install mongodb-community

# MongoDB 서비스 시작
brew services start mongodb-community

# 또는 Docker 사용
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Windows
1. MongoDB 공식 사이트에서 설치: https://www.mongodb.com/try/download/community
2. MongoDB Compass (GUI 도구)도 함께 설치 권장

---

### 2️⃣ 백엔드 서버 실행

```bash
# 백엔드 디렉토리로 이동
cd backend

# 의존성 설치
npm install

# 환경 변수 확인 (.env 파일이 있는지 확인)
# 없다면: cp .env.example .env

# 샘플 데이터 추가 (최초 1회만)
npm run seed

# 개발 서버 실행
npm run dev
```

**성공 메시지:**
```
✅ MongoDB 연결 성공: localhost
🚀 서버가 포트 5000에서 실행 중입니다!
```

백엔드 서버: **http://localhost:5000**

---

### 3️⃣ 프론트엔드 실행

**새 터미널을 열고:**

```bash
# 프로젝트 루트로 이동 (backend의 상위 디렉토리)
cd ..

# 의존성 설치 (최초 1회만)
npm install

# 개발 서버 실행
npm run dev
```

프론트엔드 서버: **http://localhost:3000**

---

## 📂 프로젝트 구조

```
홈 화면 디자인 요청/
├── src/                      # 프론트엔드
│   ├── App.tsx              # 메인 앱 (명언 API 연동 완료)
│   ├── lib/
│   │   └── api.ts           # API 클라이언트
│   ├── pages/
│   │   ├── Download.tsx
│   │   ├── Talk.tsx
│   │   ├── Collection.tsx
│   │   └── ...
│   └── ...
│
├── backend/                  # 백엔드
│   ├── src/
│   │   ├── server.js        # Express 서버
│   │   ├── models/          # MongoDB 모델
│   │   ├── routes/          # API 라우트
│   │   └── scripts/
│   │       └── seedData.js  # 샘플 데이터
│   ├── uploads/             # 업로드 파일
│   └── package.json
│
├── .env                     # 환경 변수 (프론트엔드)
└── package.json             # 프론트엔드 의존성
```

---

## ✅ 연동된 기능

### 현재 작동 중:
- ✅ **명언 API** - 백엔드에서 명언 가져오기
  - 랜덤 명언 새로고침
  - 좋아요 카운트 증가
  - 실시간 데이터 로딩

### 로컬 저장소 사용 중 (향후 API 연동 가능):
- 🔜 배경화면 다운로드
- 🔜 채팅 메시지
- 🔜 컬렉션 관리

---

## 🧪 API 테스트

### 브라우저에서:
- Health Check: http://localhost:5000/health
- 모든 명언: http://localhost:5000/api/quotes
- 랜덤 명언: http://localhost:5000/api/quotes/random

### cURL로:
```bash
# 명언 목록
curl http://localhost:5000/api/quotes

# 랜덤 명언
curl http://localhost:5000/api/quotes/random

# 배경화면 목록
curl http://localhost:5000/api/wallpapers
```

---

## 🔧 문제 해결

### MongoDB 연결 실패
```bash
# MongoDB 실행 확인
brew services list | grep mongodb

# 재시작
brew services restart mongodb-community
```

### 포트 충돌
- 백엔드: `.env` 파일에서 `PORT=5000` 수정
- 프론트엔드: `vite.config.ts`에서 포트 변경

### API 호출 실패
1. 백엔드 서버가 실행 중인지 확인
2. `.env` 파일에서 `VITE_API_URL` 확인
3. CORS 에러 시 백엔드 `.env`의 `FRONTEND_URL` 확인

---

## 📝 환경 변수

### 프론트엔드 (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### 백엔드 (backend/.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dungsil
FRONTEND_URL=http://localhost:3000
```

---

## 🎯 다음 단계

현재 명언 기능만 백엔드와 연동되어 있습니다.

추가로 연동 가능한 기능:
1. **배경화면 다운로드** - 이미지 업로드 및 다운로드
2. **채팅 메시지** - 서버에 메시지 저장
3. **컬렉션 관리** - 사용자별 저장 항목 관리

필요하시면 말씀해주세요!

---

## 📚 참고 문서

- 백엔드 API 문서: `backend/README.md`
- Vite 문서: https://vitejs.dev
- Express 문서: https://expressjs.com
- MongoDB 문서: https://docs.mongodb.com

---

## 🎉 개발 완료!

이제 프론트엔드와 백엔드가 연동된 완전한 웹 애플리케이션이 실행됩니다!

**접속 URL:**
- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:5000/api
- API Health: http://localhost:5000/health
