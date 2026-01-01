import express from 'express';
import Wallpaper from '../models/Wallpaper.js';
import { cloudinary, upload } from '../config/cloudinary.js';

const router = express.Router();

// Cloudinary public_id 추출 헬퍼 함수
const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  // URL에서 public_id 추출: https://res.cloudinary.com/xxx/image/upload/v123/dungsil/wallpapers/filename.jpg
  const matches = url.match(/\/dungsil\/wallpapers\/([^.]+)/);
  return matches ? `dungsil/wallpapers/${matches[1]}` : null;
};

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

// 배경화면 생성 (Cloudinary 이미지 업로드)
router.post('/', upload.fields([
  { name: 'mobile', maxCount: 1 },
  { name: 'tablet', maxCount: 1 },
  { name: 'desktop', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files || (!req.files.mobile && !req.files.tablet && !req.files.desktop)) {
      return res.status(400).json({ error: '최소 하나의 이미지 파일이 필요합니다' });
    }

    // 🔍 업로드된 파일 정보 로깅
    console.log('📤 파일 업로드 시작:');
    if (req.files.mobile) console.log('  Mobile:', req.files.mobile[0].path);
    if (req.files.tablet) console.log('  Tablet:', req.files.tablet[0].path);
    if (req.files.desktop) console.log('  Desktop:', req.files.desktop[0].path);

    const wallpaperData = {
      ...req.body,
      // Cloudinary URL 저장 (절대 경로)
      imageUrl: req.files.mobile ? req.files.mobile[0].path
              : req.files.tablet ? req.files.tablet[0].path
              : req.files.desktop[0].path,
      mobileImage: req.files.mobile ? req.files.mobile[0].path : null,
      tabletImage: req.files.tablet ? req.files.tablet[0].path : null,
      desktopImage: req.files.desktop ? req.files.desktop[0].path : null
    };

    // colors가 문자열로 전달된 경우 배열로 변환
    if (req.body.colors && typeof req.body.colors === 'string') {
      wallpaperData.colors = JSON.parse(req.body.colors);
    }

    const wallpaper = new Wallpaper(wallpaperData);
    await wallpaper.save();

    console.log('✅ 배경화면 생성 완료 (Cloudinary):', wallpaper._id);
    console.log('   저장된 URL:', wallpaperData.imageUrl);

    res.status(201).json(wallpaper);
  } catch (error) {
    console.error('❌ 배경화면 생성 오류:', error);
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

// 배경화면 수정 (Cloudinary 이미지 업데이트)
router.put('/:id', upload.fields([
  { name: 'mobile', maxCount: 1 },
  { name: 'tablet', maxCount: 1 },
  { name: 'desktop', maxCount: 1 }
]), async (req, res) => {
  try {
    const existingWallpaper = await Wallpaper.findById(req.params.id);
    if (!existingWallpaper) {
      return res.status(404).json({ error: '배경화면을 찾을 수 없습니다' });
    }

    const updateData = { ...req.body };

    // 새로 업로드된 이미지가 있으면 기존 이미지 삭제 후 업데이트
    if (req.files) {
      if (req.files.mobile) {
        // 기존 모바일 이미지 삭제
        const oldPublicId = getPublicIdFromUrl(existingWallpaper.mobileImage);
        if (oldPublicId) {
          await cloudinary.uploader.destroy(oldPublicId);
          console.log('🗑️  Cloudinary 이미지 삭제:', oldPublicId);
        }
        updateData.mobileImage = req.files.mobile[0].path;
        updateData.imageUrl = updateData.mobileImage; // 기본 이미지도 업데이트
      }
      if (req.files.tablet) {
        // 기존 태블릿 이미지 삭제
        const oldPublicId = getPublicIdFromUrl(existingWallpaper.tabletImage);
        if (oldPublicId) {
          await cloudinary.uploader.destroy(oldPublicId);
        }
        updateData.tabletImage = req.files.tablet[0].path;
      }
      if (req.files.desktop) {
        // 기존 데스크톱 이미지 삭제
        const oldPublicId = getPublicIdFromUrl(existingWallpaper.desktopImage);
        if (oldPublicId) {
          await cloudinary.uploader.destroy(oldPublicId);
        }
        updateData.desktopImage = req.files.desktop[0].path;
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

    console.log('✅ 배경화면 수정 완료 (Cloudinary):', wallpaper._id);

    res.json(wallpaper);
  } catch (error) {
    console.error('❌ 배경화면 수정 오류:', error);
    res.status(400).json({ error: error.message });
  }
});

// 배경화면 삭제 (Cloudinary 이미지도 함께 삭제)
router.delete('/:id', async (req, res) => {
  try {
    const wallpaper = await Wallpaper.findById(req.params.id);

    if (!wallpaper) {
      return res.status(404).json({ error: '배경화면을 찾을 수 없습니다' });
    }

    // Cloudinary에서 모든 이미지 삭제
    const imagesToDelete = [
      wallpaper.mobileImage,
      wallpaper.tabletImage,
      wallpaper.desktopImage
    ].filter(Boolean);

    for (const imageUrl of imagesToDelete) {
      const publicId = getPublicIdFromUrl(imageUrl);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
          console.log('🗑️  Cloudinary 이미지 삭제:', publicId);
        } catch (err) {
          console.error('⚠️  Cloudinary 이미지 삭제 실패:', publicId, err.message);
        }
      }
    }

    // MongoDB에서 삭제
    await Wallpaper.findByIdAndDelete(req.params.id);

    console.log('✅ 배경화면 삭제 완료:', req.params.id);

    res.json({ message: '배경화면이 삭제되었습니다' });
  } catch (error) {
    console.error('❌ 배경화면 삭제 오류:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
