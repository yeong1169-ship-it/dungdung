import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import Wallpaper from '../models/Wallpaper.js';

const router = express.Router();

// Multer 설정 (이미지 업로드)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/wallpapers');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('이미지 파일만 업로드 가능합니다 (jpeg, jpg, png, webp)'));
    }
  }
});

// 모든 배경화면 가져오기
router.get('/', async (req, res) => {
  try {
    const { sort = 'newest', search, limit = 20, page = 1 } = req.query;

    let sortOption = {};
    switch (sort) {
      case 'popular':
        sortOption = { views: -1 };
        break;
      case 'downloads':
        sortOption = { downloads: -1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      default: // newest
        sortOption = { createdAt: -1 };
    }

    const filter = search ? {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const wallpapers = await Wallpaper.find(filter)
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Wallpaper.countDocuments(filter);

    res.json({
      wallpapers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 배경화면 가져오기
router.get('/:id', async (req, res) => {
  try {
    const wallpaper = await Wallpaper.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!wallpaper) {
      return res.status(404).json({ error: '배경화면을 찾을 수 없습니다' });
    }

    res.json(wallpaper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 배경화면 생성 (이미지 업로드 포함)
router.post('/', upload.fields([
  { name: 'mobile', maxCount: 1 },
  { name: 'tablet', maxCount: 1 },
  { name: 'desktop', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files || (!req.files.mobile && !req.files.tablet && !req.files.desktop)) {
      return res.status(400).json({ error: '최소 하나의 이미지 파일이 필요합니다' });
    }

    const wallpaperData = {
      ...req.body,
      // 기본 imageUrl은 모바일 이미지 사용, 없으면 태블릿, 없으면 데스크톱
      imageUrl: req.files.mobile ? `/uploads/wallpapers/${req.files.mobile[0].filename}`
              : req.files.tablet ? `/uploads/wallpapers/${req.files.tablet[0].filename}`
              : `/uploads/wallpapers/${req.files.desktop[0].filename}`,
      mobileImage: req.files.mobile ? `/uploads/wallpapers/${req.files.mobile[0].filename}` : null,
      tabletImage: req.files.tablet ? `/uploads/wallpapers/${req.files.tablet[0].filename}` : null,
      desktopImage: req.files.desktop ? `/uploads/wallpapers/${req.files.desktop[0].filename}` : null
    };

    // colors가 문자열로 전달된 경우 배열로 변환
    if (req.body.colors && typeof req.body.colors === 'string') {
      wallpaperData.colors = JSON.parse(req.body.colors);
    }

    const wallpaper = new Wallpaper(wallpaperData);
    await wallpaper.save();

    res.status(201).json(wallpaper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 배경화면 다운로드 카운트 증가
router.patch('/:id/download', async (req, res) => {
  try {
    const wallpaper = await Wallpaper.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!wallpaper) {
      return res.status(404).json({ error: '배경화면을 찾을 수 없습니다' });
    }

    res.json(wallpaper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 배경화면 수정
router.put('/:id', upload.fields([
  { name: 'mobile', maxCount: 1 },
  { name: 'tablet', maxCount: 1 },
  { name: 'desktop', maxCount: 1 }
]), async (req, res) => {
  try {
    const updateData = { ...req.body };

    // 새로 업로드된 이미지가 있으면 업데이트
    if (req.files) {
      if (req.files.mobile) {
        updateData.mobileImage = `/uploads/wallpapers/${req.files.mobile[0].filename}`;
        updateData.imageUrl = updateData.mobileImage; // 기본 이미지도 업데이트
      }
      if (req.files.tablet) {
        updateData.tabletImage = `/uploads/wallpapers/${req.files.tablet[0].filename}`;
      }
      if (req.files.desktop) {
        updateData.desktopImage = `/uploads/wallpapers/${req.files.desktop[0].filename}`;
      }
    }

    if (req.body.colors && typeof req.body.colors === 'string') {
      updateData.colors = JSON.parse(req.body.colors);
    }

    const wallpaper = await Wallpaper.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!wallpaper) {
      return res.status(404).json({ error: '배경화면을 찾을 수 없습니다' });
    }

    res.json(wallpaper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 배경화면 삭제
router.delete('/:id', async (req, res) => {
  try {
    const wallpaper = await Wallpaper.findByIdAndDelete(req.params.id);

    if (!wallpaper) {
      return res.status(404).json({ error: '배경화면을 찾을 수 없습니다' });
    }

    res.json({ message: '배경화면이 삭제되었습니다' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
