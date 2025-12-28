import express from 'express';
import Quote from '../models/Quote.js';

const router = express.Router();

// 모든 명언 가져오기
router.get('/', async (req, res) => {
  try {
    const { category, limit = 10 } = req.query;

    const filter = category ? { category } : {};
    const quotes = await Quote.find(filter).limit(parseInt(limit));

    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 랜덤 명언 가져오기
router.get('/random', async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random);
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 명언 가져오기
router.get('/:id', async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ error: '명언을 찾을 수 없습니다' });
    }
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 명언 생성
router.post('/', async (req, res) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();
    res.status(201).json(quote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 명언 좋아요 증가
router.patch('/:id/like', async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!quote) {
      return res.status(404).json({ error: '명언을 찾을 수 없습니다' });
    }

    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 명언 수정
router.put('/:id', async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!quote) {
      return res.status(404).json({ error: '명언을 찾을 수 없습니다' });
    }

    res.json(quote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 명언 삭제
router.delete('/:id', async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);

    if (!quote) {
      return res.status(404).json({ error: '명언을 찾을 수 없습니다' });
    }

    res.json({ message: '명언이 삭제되었습니다' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
