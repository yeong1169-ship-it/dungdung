import express from 'express';
import ChatMessage from '../models/ChatMessage.js';
import { generateDungsilResponse, generateImagePrompt, isImageRequest } from '../services/gemini.js';

const router = express.Router();

// 세션의 모든 메시지 가져오기
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { limit = 50 } = req.query;

    const messages = await ChatMessage.find({ sessionId })
      .sort({ createdAt: 1 })
      .limit(parseInt(limit));

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 메시지 생성
router.post('/', async (req, res) => {
  try {
    const message = new ChatMessage(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 메시지 저장 상태 토글
router.patch('/:id/save', async (req, res) => {
  try {
    const message = await ChatMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ error: '메시지를 찾을 수 없습니다' });
    }

    message.isSaved = !message.isSaved;
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 저장된 메시지만 가져오기
router.get('/saved/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const messages = await ChatMessage.find({
      sessionId,
      isSaved: true
    }).sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 메시지 삭제
router.delete('/:id', async (req, res) => {
  try {
    const message = await ChatMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ error: '메시지를 찾을 수 없습니다' });
    }

    res.json({ message: '메시지가 삭제되었습니다' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 세션 전체 삭제
router.delete('/session/:sessionId', async (req, res) => {
  try {
    const result = await ChatMessage.deleteMany({ sessionId: req.params.sessionId });

    res.json({
      message: '세션이 삭제되었습니다',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// AI 응답 생성
router.post('/generate', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: '메시지가 필요합니다' });
    }

    // 이미지 요청인지 확인
    const isImageReq = isImageRequest(message);

    // AI 응답 생성
    const response = await generateDungsilResponse(message, conversationHistory);

    const result = {
      response,
      isImageRequest: isImageReq
    };

    // 이미지 요청인 경우 이미지 프롬프트도 생성
    if (isImageReq) {
      const imagePrompt = await generateImagePrompt(message);
      result.imagePrompt = imagePrompt;
      console.log('🎨 이미지 프롬프트 생성:', imagePrompt);
    }

    res.json(result);
  } catch (error) {
    console.error('AI 응답 생성 오류:', error);
    res.status(500).json({
      error: 'AI 응답 생성에 실패했습니다',
      message: error.message
    });
  }
});

// AI 이미지 생성 (Pollinations.ai 사용 - 무료, API 키 불필요)
router.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: '프롬프트가 필요합니다' });
    }

    console.log('🎨 원본 프롬프트:', prompt);

    // 둥실이 캐릭터를 반드시 포함하도록 프롬프트 최적화 (캐릭터 중심)
    const dungsilPrompt = `MAIN SUBJECT: adorable kawaii chibi otter character with round chubby body, caramel brown soft fur, beige fluffy belly, tiny pink paw pads, big sparkling eyes, peacefully floating on calm water surface. SCENE: ${prompt}. STYLE: warm cheerful pastel colors, simple cute wholesome digital art, soft lighting, character-focused composition, gentle atmosphere`;

    console.log('🦦 둥실이 중심 프롬프트:', dungsilPrompt);

    // Pollinations.ai URL 생성 - 둥실이 캐릭터 필수 포함
    const encodedPrompt = encodeURIComponent(dungsilPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&seed=${Date.now()}`;

    console.log('✅ 둥실이 이미지 URL 생성 완료!');

    res.json({ imageUrl });
  } catch (error) {
    console.error('❌ 이미지 생성 오류:', error);

    // 오류 시 기본 둥실이 캐릭터 이미지 반환
    const fallbackPrompt = encodeURIComponent('MAIN SUBJECT: adorable round chubby kawaii chibi otter character, caramel brown fur, beige belly, pink paw pads, big eyes, floating peacefully on water. STYLE: simple cute digital art, warm pastel colors, wholesome gentle atmosphere');
    const fallbackUrl = `https://image.pollinations.ai/prompt/${fallbackPrompt}?width=512&height=512&nologo=true&seed=${Date.now()}`;

    res.json({
      imageUrl: fallbackUrl,
      error: '이미지 생성에 실패하여 기본 둥실이 이미지를 제공합니다'
    });
  }
});

export default router;
