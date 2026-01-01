import { useState, useEffect, useRef } from "react";
import { wallpapersApi, type Wallpaper } from "../lib/api";
import { toast } from "sonner";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ChromePicker } from "react-color";

// API 서버 기본 URL (이미지 경로 생성용)
const API_SERVER_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001';

// 이미지 URL 생성 함수
const getImageUrl = (path: string | undefined) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path; // 이미 전체 URL이거나 Base64인 경우
  return `${API_SERVER_URL}${path}`; // 상대 경로인 경우 서버 URL 추가
};

type DeviceType = "mobile" | "tablet" | "desktop";

interface ImageFile {
  file: File | null;
  preview: string;
}

interface ThumbnailFile {
  preview: string;
  crop: Crop;
  completedCrop: PixelCrop | null;
}

interface FormData {
  title: string;
  description: string;
  images: {
    mobile: ImageFile;
    tablet: ImageFile;
    desktop: ImageFile;
  };
  thumbnail: ThumbnailFile;
  colors: string[];
}

export default function AdminWallpapers() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingWallpaper, setEditingWallpaper] = useState<Wallpaper | null>(null);
  const [currentDevice, setCurrentDevice] = useState<DeviceType>("mobile");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [showPreview, setShowPreview] = useState(false);
  const [showEyedropper, setShowEyedropper] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string>("");
  const eyedropperCanvasRef = useRef<HTMLCanvasElement>(null);
  const [showCrop, setShowCrop] = useState(false);
  const [previewCrop, setPreviewCrop] = useState<Crop>({ unit: "%", width: 80, height: 96, x: 10, y: 2 });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const thumbnailImgRef = useRef<HTMLImageElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    images: {
      mobile: { file: null, preview: "" },
      tablet: { file: null, preview: "" },
      desktop: { file: null, preview: "" },
    },
    thumbnail: { preview: "", crop: { unit: "%", width: 90, height: 90, x: 5, y: 5 }, completedCrop: null },
    colors: [],
  });

  useEffect(() => {
    loadWallpapers();
  }, []);

  // 스포이드용 캔버스 업데이트
  useEffect(() => {
    if (showEyedropper && eyedropperCanvasRef.current) {
      const canvas = eyedropperCanvasRef.current;
      const ctx = canvas.getContext("2d");
      const imageUrl = formData.images.mobile.preview || formData.images.tablet.preview || formData.images.desktop.preview;

      if (ctx && imageUrl) {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          ctx.drawImage(img, 0, 0);
        };
        img.src = imageUrl;
      }
    }
  }, [showEyedropper, formData.images]);

  const loadWallpapers = async () => {
    try {
      setLoading(true);

      // API에서 배경화면 가져오기
      const data = await wallpapersApi.getAll({ limit: 100 });
      setWallpapers(data.wallpapers);
    } catch (error) {
      console.error("배경화면 로딩 실패:", error);
      setWallpapers([]);
      toast.error("배경화면을 불러오는데 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (device: DeviceType, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드 가능합니다");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const preview = reader.result as string;
      setFormData({
        ...formData,
        images: {
          ...formData.images,
          [device]: {
            file,
            preview,
          },
        },
        thumbnail: formData.thumbnail.preview ? formData.thumbnail : {
          preview,
          crop: { unit: "%", width: 90, height: 90, x: 5, y: 5 },
          completedCrop: null
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const extractColors = async (imageUrl: string) => {
    return new Promise<string[]>((resolve, reject) => {
      const img = new Image();

      img.onerror = () => {
        reject(new Error("이미지 로딩 실패"));
      };

      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (!ctx) {
            resolve([]);
            return;
          }

          // 이미지 크기 설정
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          ctx.drawImage(img, 0, 0);

          // 이미지 데이터 가져오기
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;
          const colorMap = new Map<string, number>();

          // 픽셀 샘플링 (성능을 위해 일부만 샘플링)
          const step = 10;
          for (let i = 0; i < pixels.length; i += 4 * step) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const a = pixels[i + 3];

            // 투명도가 낮은 픽셀은 제외
            if (a < 128) continue;

            // 너무 밝거나 어두운 색상 제외
            const brightness = (r + g + b) / 3;
            if (brightness > 240 || brightness < 15) continue;

            // 색상을 약간 그룹화 (비슷한 색상을 하나로)
            const rBucket = Math.round(r / 10) * 10;
            const gBucket = Math.round(g / 10) * 10;
            const bBucket = Math.round(b / 10) * 10;
            const colorKey = `${rBucket},${gBucket},${bBucket}`;

            colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
          }

          // 가장 많이 나타난 색상 3개 선택
          const sortedColors = Array.from(colorMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([color]) => {
              const [r, g, b] = color.split(',').map(Number);
              return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
            });

          console.log("추출된 색상:", sortedColors);
          resolve(sortedColors);
        } catch (error) {
          console.error("색상 추출 중 오류:", error);
          reject(error);
        }
      };

      // Base64 이미지는 crossOrigin 설정 불필요
      if (!imageUrl.startsWith('data:')) {
        img.crossOrigin = "anonymous";
      }
      img.src = imageUrl;
    });
  };

  const handleExtractColors = async () => {
    let imageToExtract = "";
    if (formData.images.mobile.preview) imageToExtract = formData.images.mobile.preview;
    else if (formData.images.tablet.preview) imageToExtract = formData.images.tablet.preview;
    else if (formData.images.desktop.preview) imageToExtract = formData.images.desktop.preview;

    if (!imageToExtract) {
      toast.error("먼저 이미지를 업로드해주세요");
      return;
    }

    try {
      const colors = await extractColors(imageToExtract);
      setFormData({ ...formData, colors });
      toast.success(`${colors.length}개의 색상이 추출되었습니다`);
    } catch (error) {
      console.error("색상 추출 실패:", error);
      toast.error("색상 추출에 실패했습니다");
    }
  };

  const handleAddColor = () => {
    if (formData.colors.length >= 3) {
      toast.error("최대 3개까지 색상을 추가할 수 있습니다");
      return;
    }

    // 중복 색상 체크
    if (formData.colors.includes(selectedColor)) {
      toast.error("이미 추가된 색상입니다");
      return;
    }

    setFormData({
      ...formData,
      colors: [...formData.colors, selectedColor],
    });
    setShowColorPicker(false);
    toast.success("색상이 추가되었습니다");
  };

  const getColorFromCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = eyedropperCanvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    try {
      const imageData = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1);
      const [r, g, b] = imageData.data;
      return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    } catch (error) {
      return null;
    }
  };

  const handleImageMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const color = getColorFromCanvas(e);
    if (color) {
      setHoveredColor(color);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const hexColor = getColorFromCanvas(e);

    if (!hexColor) {
      toast.error("색상 추출에 실패했습니다");
      return;
    }

    console.log('🎨 스포이드 클릭:', { hexColor });

    // 자동으로 색상 추가
    if (formData.colors.length >= 3) {
      toast.error("최대 3개까지만 색상을 추가할 수 있습니다");
      return;
    }

    if (formData.colors.includes(hexColor)) {
      toast.error(`${hexColor}은(는) 이미 추가된 색상입니다`);
      return;
    }

    setFormData({
      ...formData,
      colors: [...formData.colors, hexColor],
    });
    toast.success(`✅ ${hexColor} 색상이 추가되었습니다! (${formData.colors.length + 1}/3)`);
  };

  const handleRemoveColor = (index: number) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((_, i) => i !== index),
    });
  };

  const handleApplyCrop = async () => {
    if (!previewImgRef.current || !completedCrop) {
      toast.error("크롭 영역을 선택해주세요");
      return;
    }

    try {
      const image = previewImgRef.current;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        toast.error("크롭 처리에 실패했습니다");
        return;
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // completedCrop은 이미 픽셀 단위
      const pixelCrop = {
        x: completedCrop.x * scaleX,
        y: completedCrop.y * scaleY,
        width: completedCrop.width * scaleX,
        height: completedCrop.height * scaleY,
      };

      console.log('Crop info:', { completedCrop, pixelCrop, scaleX, scaleY });

      // 캔버스 크기 설정 - 카드 비율 유지 (5:6)
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      // 이미지의 크롭된 부분을 캔버스에 그리기
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      // 캔버스를 Base64로 변환
      const croppedImageUrl = canvas.toDataURL("image/jpeg", 0.95);

      // formData 업데이트 - 현재 디바이스의 이미지를 크롭된 이미지로 교체
      const currentDevice = formData.images.mobile.preview ? "mobile"
        : formData.images.tablet.preview ? "tablet"
        : "desktop";

      setFormData({
        ...formData,
        images: {
          ...formData.images,
          [currentDevice]: {
            file: null,
            preview: croppedImageUrl,
          },
        },
      });

      setShowCrop(false);
      setPreviewCrop({ unit: "%", width: 80, height: 96, x: 10, y: 2 });
      setCompletedCrop(null);
      toast.success("크롭이 적용되었습니다");
    } catch (error) {
      console.error("크롭 적용 실패:", error);
      toast.error("크롭 적용에 실패했습니다");
    }
  };

  // Base64를 File 객체로 변환하는 헬퍼 함수
  const base64ToFile = async (base64String: string, filename: string): Promise<File> => {
    const res = await fetch(base64String);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("제목을 입력해주세요");
      return;
    }

    // file 또는 preview가 있는지 확인
    const hasMobileImage = formData.images.mobile.file || formData.images.mobile.preview;
    const hasTabletImage = formData.images.tablet.file || formData.images.tablet.preview;
    const hasDesktopImage = formData.images.desktop.file || formData.images.desktop.preview;

    if (!hasMobileImage && !hasTabletImage && !hasDesktopImage && !editingWallpaper) {
      toast.error("최소한 하나의 이미지를 업로드해주세요");
      return;
    }

    try {
      // FormData 생성
      const submitFormData = new FormData();
      submitFormData.append('title', formData.title);
      submitFormData.append('description', formData.description);
      submitFormData.append('colors', JSON.stringify(formData.colors));

      // 각 디바이스별 이미지 파일 추가
      // file이 있으면 file 사용, 없으면 preview(Base64)를 File로 변환
      if (formData.images.mobile.file) {
        submitFormData.append('mobile', formData.images.mobile.file);
      } else if (formData.images.mobile.preview && formData.images.mobile.preview.startsWith('data:')) {
        const file = await base64ToFile(formData.images.mobile.preview, 'mobile.jpg');
        submitFormData.append('mobile', file);
      }

      if (formData.images.tablet.file) {
        submitFormData.append('tablet', formData.images.tablet.file);
      } else if (formData.images.tablet.preview && formData.images.tablet.preview.startsWith('data:')) {
        const file = await base64ToFile(formData.images.tablet.preview, 'tablet.jpg');
        submitFormData.append('tablet', file);
      }

      if (formData.images.desktop.file) {
        submitFormData.append('desktop', formData.images.desktop.file);
      } else if (formData.images.desktop.preview && formData.images.desktop.preview.startsWith('data:')) {
        const file = await base64ToFile(formData.images.desktop.preview, 'desktop.jpg');
        submitFormData.append('desktop', file);
      }

      if (editingWallpaper) {
        // 수정
        await wallpapersApi.update(editingWallpaper._id, submitFormData);
        toast.success("배경화면이 수정되었습니다");
      } else {
        // 추가
        await wallpapersApi.create(submitFormData);
        toast.success("새 배경화면이 추가되었습니다");
      }

      handleCloseModal();
      loadWallpapers();
    } catch (error) {
      console.error("배경화면 저장 실패:", error);
      toast.error("배경화면 저장에 실패했습니다");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말로 이 배경화면을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await wallpapersApi.delete(id);
      toast.success("배경화면이 삭제되었습니다");
      loadWallpapers();
    } catch (error) {
      console.error("배경화면 삭제 실패:", error);
      toast.error("배경화면 삭제에 실패했습니다");
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingWallpaper(null);
    setShowPreview(false);
    setFormData({
      title: "",
      description: "",
      images: {
        mobile: { file: null, preview: "" },
        tablet: { file: null, preview: "" },
        desktop: { file: null, preview: "" },
      },
      thumbnail: { preview: "", crop: { unit: "%", width: 90, height: 90, x: 5, y: 5 }, completedCrop: null },
      colors: [],
    });
    setCurrentDevice("mobile");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[#5c4033]">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[22px] text-[#5c4033] mb-2">
            배경화면 관리
          </h2>
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] opacity-70">
            총 {wallpapers.length}개
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-br from-[#FFD2D2] to-[#FF9999] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] px-6 py-4 rounded-[14px] shadow-md whitespace-nowrap min-h-[52px]"
        >
          + 추가
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {wallpapers.length === 0 ? (
          <div className="col-span-full bg-white rounded-[18px] border border-[#e5fed9] shadow-sm p-10 text-center">
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] opacity-50">
              아직 배경화면이 없습니다
            </p>
          </div>
        ) : (
          wallpapers.map((wallpaper) => (
            <div
              key={wallpaper._id}
              className="bg-white rounded-[18px] border border-[#e5fed9] shadow-sm overflow-hidden"
            >
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={getImageUrl(wallpaper.imageUrl)}
                  alt={wallpaper.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('이미지 로드 실패:', wallpaper.title);
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E이미지 없음%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              <div className="p-5">
                <h3 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[14px] text-[#5c4033] mb-4 line-clamp-1">
                  {wallpaper.title}
                </h3>

                {wallpaper.colors && wallpaper.colors.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {wallpaper.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-[11px] text-[#5c4033] opacity-60 mb-4">
                  <span>👁️ {wallpaper.views}</span>
                  <span>📥 {wallpaper.downloads}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingWallpaper(wallpaper);
                      const fullImageUrl = getImageUrl(wallpaper.imageUrl);
                      setFormData({
                        title: wallpaper.title,
                        description: wallpaper.description || "",
                        images: {
                          mobile: { file: null, preview: fullImageUrl },
                          tablet: { file: null, preview: "" },
                          desktop: { file: null, preview: "" },
                        },
                        thumbnail: {
                          preview: fullImageUrl,
                          crop: { unit: "%", width: 90, height: 90, x: 5, y: 5 },
                          completedCrop: null
                        },
                        colors: wallpaper.colors || [],
                      });
                      setIsAddModalOpen(true);
                    }}
                    className="flex-1 bg-[#8faf3e] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] py-3 rounded-full hover:bg-[#7a9535] transition-colors"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(wallpaper._id)}
                    className="flex-1 bg-white text-[#ff9999] font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] py-3 rounded-full hover:bg-[#fff5f5] transition-colors border-2 border-[#ff9999]"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 모달 */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-[24px] w-full min-w-[343px] max-w-[418px] max-h-[90vh] shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {showPreview ? (
              // 미리보기 화면 - 상세 페이지처럼 보이기
              <div className="flex flex-col h-full max-h-[90vh]">
                {/* 헤더 - 고정 */}
                <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 flex-shrink-0">
                  <button
                    onClick={() => {
                      setShowPreview(false);
                      setShowCrop(false);
                    }}
                    className="text-[#5c4033] hover:text-[#8faf3e] text-[24px]"
                  >
                    ←
                  </button>
                  {!showCrop && (
                    <button
                      onClick={() => setShowCrop(true)}
                      className="bg-[#8faf3e] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] px-3 py-2 rounded-full hover:bg-[#7a9535] transition-colors"
                    >
                      ✂️ 크롭
                    </button>
                  )}
                </div>

                {/* 스크롤 가능한 콘텐츠 영역 */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">

                {/* 메인 이미지 또는 크롭 */}
                <div className="relative w-full bg-gray-100 rounded-[16px] overflow-hidden">
                  {showCrop ? (
                    <div>
                      <p className="text-center font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033] mb-2">
                        이미지 영역을 조정하세요
                      </p>
                      <ReactCrop
                        crop={previewCrop}
                        onChange={(c) => setPreviewCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={5 / 6}
                        keepSelection
                      >
                        <img
                          ref={previewImgRef}
                          src={formData.images.mobile.preview || formData.images.tablet.preview || formData.images.desktop.preview}
                          alt="Crop preview"
                          className="max-h-[400px] mx-auto"
                          style={{ display: 'block' }}
                        />
                      </ReactCrop>
                      <div className="flex gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => {
                            setShowCrop(false);
                            setPreviewCrop({ unit: "%", width: 80, height: 96, x: 10, y: 2 });
                            setCompletedCrop(null);
                          }}
                          className="flex-1 bg-[#f5f5f5] text-[#5c4033] font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] py-2 rounded-full hover:bg-[#e5e5e5] transition-colors"
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          onClick={handleApplyCrop}
                          className="flex-1 bg-[#8faf3e] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] py-2 rounded-full hover:bg-[#7a9535] transition-colors"
                        >
                          적용
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[398/488]">
                      {(formData.images.mobile.preview || formData.images.tablet.preview || formData.images.desktop.preview) ? (
                        <img
                          src={formData.images.mobile.preview || formData.images.tablet.preview || formData.images.desktop.preview}
                          alt={formData.title}
                          className="w-full h-full object-cover rounded-t-[16px]"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          이미지 없음
                        </div>
                      )}

                      {/* 색상 팔레트 오버레이 */}
                      {formData.colors.length > 0 && (
                        <div className="absolute right-4 bottom-4 flex gap-1">
                          {formData.colors.slice(0, 3).map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full border-2 border-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 다운로드 페이지 리스트 카드 스타일로 표시 */}
                <div className="bg-white rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] overflow-hidden">
                  {/* 하단 컨텐츠 영역 */}
                  <div className="flex items-end justify-between px-[16px] pt-[16px] pb-[16px]">
                    {/* 왼쪽: 제목과 날짜 */}
                    <div className="flex flex-col gap-[14px] items-start flex-1">
                      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[#5c4033] text-[18px] text-left">
                        {formData.title || "제목 없음"}
                      </p>
                      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[rgba(92,64,51,0.8)] text-left">
                        {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '. ').replace(/\.$/, '')}
                      </p>
                    </div>

                    {/* 오른쪽: 컬러 칩 */}
                    {formData.colors.length > 0 && (
                      <div className="flex gap-[4px] items-center">
                        {formData.colors.slice(0, 3).map((color, index) => (
                          <div key={index} className="bg-[#7b9c00] relative rounded-[1.67772e+07px] shrink-0 size-[24px]" style={{ backgroundColor: color }}>
                            <div
                              aria-hidden="true"
                              className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 설명 - 있을 경우만 표시 */}
                  {formData.description && (
                    <div className="px-[16px] pb-[16px]">
                      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] leading-relaxed">
                        {formData.description}
                      </p>
                    </div>
                  )}
                </div>

                </div>
                </div>

                {/* 등록/수정 버튼 - 항상 하단에 고정 */}
                <div className="bg-white p-6 pt-4 border-t border-gray-100 flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-br from-[#FFD2D2] to-[#FF9999] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[16px] py-4 rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    {editingWallpaper ? "수정하기" : "등록하기"}
                  </button>
                </div>
              </div>
            ) : (
              // 작성 화면
              <div className="p-6 overflow-y-auto max-h-[90vh]">
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[18px] text-[#5c4033]">
                  {editingWallpaper ? "배경화면 수정" : "새 배경화면 추가"}
                </h3>

                {/* 제목 */}
                <div>
                  <label className="block font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033] mb-1.5">
                    제목 *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-[#e5fed9] rounded-[12px] px-3 py-2 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] focus:outline-none focus:border-[#8faf3e]"
                    placeholder="배경화면 제목"
                    required
                  />
                </div>

                {/* 설명 */}
                <div>
                  <label className="block font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033] mb-1.5">
                    설명
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-[#e5fed9] rounded-[12px] px-3 py-2 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] focus:outline-none focus:border-[#8faf3e] resize-none"
                    rows={2}
                    placeholder="배경화면 설명"
                  />
                </div>

                {/* 이미지 업로드 */}
                <div>
                  <label className="block font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033] mb-2">
                    이미지 업로드
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {(["mobile", "tablet", "desktop"] as DeviceType[]).map((device) => (
                      <div key={device} className="space-y-1.5">
                        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] text-[#5c4033]">
                          {device === "mobile" && "📱 모바일"}
                          {device === "tablet" && "💻 태블릿"}
                          {device === "desktop" && "🖥️ PC"}
                        </p>
                        <div className="border-2 border-dashed border-[#e5fed9] rounded-[12px] p-3 min-h-[120px] flex items-center justify-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(device, e)}
                            className="hidden"
                            id={`upload-${device}`}
                          />
                          <label
                            htmlFor={`upload-${device}`}
                            className="flex flex-col items-center justify-center cursor-pointer w-full"
                          >
                            {formData.images[device].preview ? (
                              <div className="w-full space-y-2">
                                <img
                                  src={formData.images[device].preview}
                                  alt="Preview"
                                  className="w-full h-24 object-cover rounded-[8px]"
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setFormData({
                                      ...formData,
                                      images: {
                                        ...formData.images,
                                        [device]: { file: null, preview: "" },
                                      },
                                    });
                                  }}
                                  className="w-full bg-[#ff9999] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[10px] px-2 py-1.5 rounded-[6px] hover:bg-[#ff7777] transition-colors"
                                >
                                  제거
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="text-[24px] mb-1">📷</div>
                                <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[10px] text-[#5c4033] text-center">
                                  클릭하여 업로드
                                </p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 색상 팔레트 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033]">
                      색상 팔레트 (3개 자동 추출)
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleExtractColors}
                        className="bg-[#8faf3e] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] px-3 py-1.5 rounded-[8px] hover:bg-[#7a9535] transition-colors"
                      >
                        🎨 자동 추출
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowEyedropper(!showEyedropper);
                          setShowColorPicker(false);
                        }}
                        className="bg-[#ff9999] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] px-3 py-1.5 rounded-[8px] hover:bg-[#ff7777] transition-colors"
                      >
                        💧 스포이드
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowColorPicker(!showColorPicker);
                          setShowEyedropper(false);
                        }}
                        className="bg-[#5c4033] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] px-3 py-1.5 rounded-[8px] hover:bg-[#4a3429] transition-colors"
                      >
                        + 색상 추가
                      </button>
                    </div>
                  </div>

                  {showEyedropper && (
                    <div className="mb-4">
                      <div className="p-4 bg-[#fff5f0] rounded-[12px] border-2 border-[#ff9999] mb-3">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033]">
                              💧 이미지를 클릭하여 색상 추출
                            </p>
                            {hoveredColor && (
                              <div className="flex items-center gap-1">
                                <div
                                  className="w-5 h-5 rounded border-2 border-white shadow-sm"
                                  style={{ backgroundColor: hoveredColor }}
                                />
                                <span className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[10px] text-[#5c4033]">
                                  {hoveredColor}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[11px] text-[#ff9999]">
                            {formData.colors.length}/3
                          </span>
                        </div>
                        {(formData.images.mobile.preview || formData.images.tablet.preview || formData.images.desktop.preview) ? (
                          <div className="w-full rounded-[8px] border-2 border-[#8faf3e] bg-white">
                            <canvas
                              ref={eyedropperCanvasRef}
                              onClick={handleImageClick}
                              onMouseMove={handleImageMove}
                              onMouseLeave={() => setHoveredColor("")}
                              className="cursor-crosshair mx-auto block w-full"
                              style={{ maxWidth: '100%', height: 'auto', maxHeight: '250px', objectFit: 'contain' }}
                            />
                          </div>
                        ) : (
                          <p className="text-center font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033] opacity-50">
                            먼저 이미지를 업로드해주세요
                          </p>
                        )}
                      </div>

                      {/* 현재 선택된 색상 미리보기 */}
                      <div className="p-3 bg-white rounded-[10px] border border-[#ff9999]">
                        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] text-[#5c4033] mb-2">
                          선택된 색상 ({formData.colors.length}/3개)
                        </p>
                        {formData.colors.length > 0 ? (
                          <div className="flex gap-2">
                            {formData.colors.map((color, index) => (
                              <div key={index} className="flex-1 text-center">
                                <div
                                  className="w-full h-12 rounded-[8px] border-2 border-gray-200 mb-1"
                                  style={{ backgroundColor: color }}
                                />
                                <p className="text-[10px] font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[#5c4033]">
                                  {color}
                                </p>
                              </div>
                            ))}
                            {/* 빈 슬롯 표시 */}
                            {Array.from({ length: 3 - formData.colors.length }).map((_, index) => (
                              <div key={`empty-${index}`} className="flex-1 text-center">
                                <div className="w-full h-12 rounded-[8px] border-2 border-dashed border-gray-300 bg-gray-50 mb-1 flex items-center justify-center">
                                  <span className="text-gray-400 text-[20px]">+</span>
                                </div>
                                <p className="text-[10px] font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-gray-400">
                                  빈 슬롯
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            {Array.from({ length: 3 }).map((_, index) => (
                              <div key={index} className="flex-1 text-center">
                                <div className="w-full h-12 rounded-[8px] border-2 border-dashed border-gray-300 bg-gray-50 mb-1 flex items-center justify-center">
                                  <span className="text-gray-400 text-[20px]">+</span>
                                </div>
                                <p className="text-[10px] font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-gray-400">
                                  빈 슬롯
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {showColorPicker && (
                    <div className="mb-4 p-4 bg-[#f9f9f9] rounded-[12px]">
                      <ChromePicker
                        color={selectedColor}
                        onChange={(color) => setSelectedColor(color.hex)}
                        className="mx-auto"
                      />
                      <button
                        type="button"
                        onClick={handleAddColor}
                        className="mt-3 w-full bg-[#8faf3e] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] px-3 py-2 rounded-[8px] hover:bg-[#7a9535] transition-colors"
                      >
                        색상 추가
                      </button>
                    </div>
                  )}

                  {/* 현재 색상 팔레트 - 항상 표시 */}
                  <div className="p-3 bg-white rounded-[10px] border border-[#e5fed9]">
                    <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] text-[#5c4033] mb-2 opacity-70">
                      현재 팔레트 ({formData.colors.length}/3개)
                    </p>
                    {formData.colors.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {formData.colors.map((color, index) => (
                          <div key={index} className="relative group">
                            <div
                              className="w-12 h-12 rounded-[8px] border-2 border-gray-200 cursor-pointer"
                              style={{ backgroundColor: color }}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveColor(index)}
                              className="absolute -top-2 -right-2 bg-[#ff9999] text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px]"
                            >
                              ×
                            </button>
                            <p className="text-[10px] text-center mt-1 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[#5c4033]">
                              {color}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] text-[#5c4033] opacity-40 py-2">
                        색상을 추가해주세요
                      </p>
                    )}
                  </div>
                </div>

                {/* 버튼들 */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-[#f5f5f5] text-[#5c4033] font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[16px] px-6 py-3 rounded-[12px] hover:bg-[#e5e5e5] transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-br from-[#FFD2D2] to-[#FF9999] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[16px] px-6 py-3 rounded-[12px] shadow-md hover:shadow-lg transition-all hover:scale-105"
                  >
                    {editingWallpaper ? "수정하기" : "저장하기"}
                  </button>
                </div>
              </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
