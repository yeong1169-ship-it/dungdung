import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Quote from '../models/Quote.js';
import Wallpaper from '../models/Wallpaper.js';

dotenv.config();

// 샘플 명언 데이터
const quotes = [
  {
    text: "오랫동안 꿈을 그리는 사람은\n마침내 그 꿈을 닮아간다.",
    author: "앙드레 말로",
    category: "오늘 둥실이의 한마디"
  },
  {
    text: "시작이 반이다.\n오늘부터 시작해보자!",
    author: "한국 속담",
    category: "오늘 둥실이의 한마디"
  },
  {
    text: "작은 걸음도 걸음이다.\n천천히 나아가면 돼.",
    author: "둥실이",
    category: "오늘 둥실이의 한마디"
  },
  {
    text: "완벽하지 않아도 괜찮아.\n지금 이 순간을 즐겨봐!",
    author: "둥실이",
    category: "오늘 둥실이의 한마디"
  },
  {
    text: "실패는 성공의 어머니다.\n다시 도전하면 돼!",
    author: "토머스 에디슨",
    category: "오늘 둥실이의 한마디"
  },
  {
    text: "포기하지 마.\n넘어져도 다시 일어나면 돼!",
    author: "둥실이",
    category: "오늘 둥실이의 한마디"
  }
];

// 샘플 배경화면 데이터
const wallpapers = [
  {
    title: "가을의 산책",
    description: "오늘 가을 산책 다녀왔어! 산들산들 바람이 살랑이는 게 너무 기분 좋았어!",
    imageUrl: "/uploads/wallpapers/autumn-walk.jpg",
    colors: ["#7b9c00", "#adcb59", "#f2d67c"],
    views: 150,
    downloads: 45
  },
  {
    title: "평화로운 오후",
    description: "둥실둥실 물에 떠 있는 기분",
    imageUrl: "/uploads/wallpapers/peaceful-afternoon.jpg",
    colors: ["#8faf3e", "#fff9f0", "#5c4033"],
    views: 230,
    downloads: 89
  },
  {
    title: "꿈꾸는 둥실이",
    description: "오늘은 무슨 꿈을 꿀까?",
    imageUrl: "/uploads/wallpapers/dreaming.jpg",
    colors: ["#ffd2d2", "#ff9999", "#fff9f0"],
    views: 320,
    downloads: 120
  }
];

async function seedDatabase() {
  try {
    // MongoDB 연결
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB 연결 성공');

    // 기존 데이터 삭제
    await Quote.deleteMany({});
    await Wallpaper.deleteMany({});
    console.log('🗑️  기존 데이터 삭제 완료');

    // 새 데이터 추가
    await Quote.insertMany(quotes);
    console.log(`✅ ${quotes.length}개의 명언 추가 완료`);

    await Wallpaper.insertMany(wallpapers);
    console.log(`✅ ${wallpapers.length}개의 배경화면 추가 완료`);

    console.log('\n🎉 데이터 시딩 완료!');
    process.exit(0);
  } catch (error) {
    console.error('❌ 데이터 시딩 실패:', error);
    process.exit(1);
  }
}

seedDatabase();
