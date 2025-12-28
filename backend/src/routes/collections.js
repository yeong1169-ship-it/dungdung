import express from 'express';

const router = express.Router();

// 컬렉션은 프론트엔드에서 localStorage로 관리하므로
// 여기서는 통계 정보만 제공

// 인기 아이템 가져오기 (좋아요 많은 명언, 다운로드 많은 배경화면)
router.get('/popular', async (req, res) => {
  try {
    // 향후 구현: 인기 아이템 통계
    res.json({
      message: '인기 컬렉션 정보',
      quotes: [],
      wallpapers: []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
