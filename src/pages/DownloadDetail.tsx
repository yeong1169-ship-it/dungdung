import svgPaths from "../imports/svg-pfh6yan6lz";
import img1 from "figma:asset/348e3a8eec568e3fbe96c6fc94e60e5aa5b4f94d.png";
import { useState, useEffect } from "react";

// API 서버 기본 URL (이미지 경로 생성용)
const API_SERVER_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001';

// 이미지 URL 생성 함수
const getImageUrl = (path: string | undefined) => {
  if (!path) return img1;
  if (path.startsWith('http')) return path; // 이미 전체 URL인 경우
  return `${API_SERVER_URL}${path}`; // 상대 경로인 경우 서버 URL 추가
};

function Frame({ title, date }: { title: string; date: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start leading-[15.125px] relative shrink-0 w-full">
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] relative shrink-0 text-[#5c4033] text-[18px] w-full">{title}</p>
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] relative shrink-0 text-[14px] text-[rgba(92,64,51,0.8)] w-full">{date}</p>
    </div>
  );
}

function Frame3({ title, date, description }: { title: string; date: string; description: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start not-italic relative shrink-0 w-full">
      <Frame title={title} date={date} />
      {description && (
        <div className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[15.125px] relative shrink-0 text-[#5c4033] text-[14px] w-full whitespace-pre-line">
          {description}
        </div>
      )}
    </div>
  );
}

function LucideSmartphone() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="lucide/smartphone">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="lucide/smartphone">
          <path d={svgPaths.p2531ce00} id="Vector" stroke="var(--stroke-0, #8FAF3E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-[52px]">
      <LucideSmartphone />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[16px] text-center w-[min-content]">Mobile</p>
    </div>
  );
}

function Frame9({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`box-border content-stretch flex flex-col gap-px items-center justify-center px-0 py-[16px] relative rounded-[10px] shrink-0 flex-1 min-w-0 cursor-pointer transition-all ${
        isSelected
          ? 'bg-[rgba(143,175,62,0.15)]'
          : 'bg-white hover:bg-[rgba(143,175,62,0.05)]'
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute border-solid inset-0 pointer-events-none rounded-[10px] ${
          isSelected
            ? 'border-2 border-[#8FAF3E]'
            : 'border border-[rgba(92,64,51,0.2)]'
        }`}
      />
      <Frame5 />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[14px] text-[rgba(92,64,51,0.6)] text-center w-[min-content]">1242 X 2688</p>
    </div>
  );
}

function LucideTablet() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="lucide/tablet">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="lucide/tablet">
          <path d={svgPaths.pee36412} id="Vector" stroke="var(--stroke-0, #8FAF3E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-[52px]">
      <LucideTablet />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[16px] text-center w-[min-content]">Tablet</p>
    </div>
  );
}

function Frame7({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`box-border content-stretch flex flex-col gap-px items-center justify-center px-0 py-[16px] relative rounded-[10px] shrink-0 flex-1 min-w-0 cursor-pointer transition-all ${
        isSelected
          ? 'bg-[rgba(143,175,62,0.15)]'
          : 'bg-white hover:bg-[rgba(143,175,62,0.05)]'
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute border-solid inset-0 pointer-events-none rounded-[10px] ${
          isSelected
            ? 'border-2 border-[#8FAF3E]'
            : 'border border-[rgba(92,64,51,0.2)]'
        }`}
      />
      <Frame6 />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[14px] text-[rgba(92,64,51,0.6)] text-center w-[min-content]">1688 X 2388</p>
    </div>
  );
}

function LucideMonitor() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="lucide/monitor">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="lucide/monitor">
          <path d={svgPaths.p1d18eb00} id="Vector" stroke="var(--stroke-0, #8FAF3E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-[52px]">
      <LucideMonitor />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[16px] text-center w-[min-content]">PC</p>
    </div>
  );
}

function Frame8({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`box-border content-stretch flex flex-col gap-px items-center justify-center px-0 py-[16px] relative rounded-[10px] shrink-0 flex-1 min-w-0 cursor-pointer transition-all ${
        isSelected
          ? 'bg-[rgba(143,175,62,0.15)]'
          : 'bg-white hover:bg-[rgba(143,175,62,0.05)]'
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute border-solid inset-0 pointer-events-none rounded-[10px] ${
          isSelected
            ? 'border-2 border-[#8FAF3E]'
            : 'border border-[rgba(92,64,51,0.2)]'
        }`}
      />
      <Frame16 />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[14px] text-[rgba(92,64,51,0.6)] text-center w-[min-content]">1920 X 1080</p>
    </div>
  );
}

function Frame10({ selectedSize, onSelectSize }: { selectedSize: 'mobile' | 'tablet' | 'pc'; onSelectSize: (size: 'mobile' | 'tablet' | 'pc') => void }) {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <Frame9 isSelected={selectedSize === 'mobile'} onClick={() => onSelectSize('mobile')} />
      <Frame7 isSelected={selectedSize === 'tablet'} onClick={() => onSelectSize('tablet')} />
      <Frame8 isSelected={selectedSize === 'pc'} onClick={() => onSelectSize('pc')} />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 10V2" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p23ad1400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p184fd300} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Frame4({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-[#8faf3e] relative rounded-[10px] shrink-0 w-full hover:bg-[#7b9c00] transition-colors cursor-pointer">
      <div aria-hidden="true" className="absolute border border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[14px] relative w-full">
          <Icon />
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#fff9f0] text-[16px] text-nowrap whitespace-pre">다운로드</p>
        </div>
      </div>
    </button>
  );
}

function Frame11({ selectedSize, onSelectSize, onDownload }: { selectedSize: 'mobile' | 'tablet' | 'pc'; onSelectSize: (size: 'mobile' | 'tablet' | 'pc') => void; onDownload: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame10 selectedSize={selectedSize} onSelectSize={onSelectSize} />
      <Frame4 onClick={onDownload} />
    </div>
  );
}

function Frame12({ selectedSize, onSelectSize, onDownload }: { selectedSize: 'mobile' | 'tablet' | 'pc'; onSelectSize: (size: 'mobile' | 'tablet' | 'pc') => void; onDownload: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 398 1">
            <path d="M0 0.5H398" id="Line 2" stroke="var(--stroke-0, #5C4033)" strokeOpacity="0.2" />
          </svg>
        </div>
      </div>
      <Frame11 selectedSize={selectedSize} onSelectSize={onSelectSize} onDownload={onDownload} />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 398 1">
            <line id="Line 3" stroke="var(--stroke-0, #5C4033)" strokeOpacity="0.2" x2="398" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame13({ title, date, description, selectedSize, onSelectSize, onDownload }: { title: string; date: string; description: string; selectedSize: 'mobile' | 'tablet' | 'pc'; onSelectSize: (size: 'mobile' | 'tablet' | 'pc') => void; onDownload: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start px-[16px] pt-[24px] w-full">
      <Frame3 title={title} date={date} description={description} />
      <Frame12 selectedSize={selectedSize} onSelectSize={onSelectSize} onDownload={onDownload} />
    </div>
  );
}

function RelatedWallpaperCard({ title, date, image, onClick }: { title: string; date: string; image?: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-white h-[243px] overflow-clip relative rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 w-[164px] cursor-pointer hover:shadow-lg transition-shadow">
      <div className="h-[169px] w-[164px]">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover rounded-t-[8px]" />
        ) : (
          <div className="bg-[#d9d9d9] size-full rounded-[8px]" />
        )}
      </div>
      <div className="pt-[16px]">
        <div className="content-stretch flex flex-col gap-[10px] items-start leading-[15.125px] px-[16px] not-italic w-full">
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] relative shrink-0 text-[#5c4033] text-[16px] text-left w-full truncate">{title}</p>
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] relative shrink-0 text-[12px] text-left text-[rgba(92,64,51,0.8)] w-full">{date}</p>
        </div>
      </div>
    </button>
  );
}

function Frame15({ relatedWallpapers, onNavigate }: { relatedWallpapers: any[]; onNavigate: (wallpaperId: string) => void }) {
  if (relatedWallpapers.length === 0) return null;

  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start px-[16px] pt-[24px] w-full">
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[15.125px] not-italic relative shrink-0 text-[#5c4033] text-[14px] w-full">관련 배경화면</p>
      <div className="box-border content-stretch flex gap-[8px] items-center overflow-x-auto overflow-y-clip pb-[8px] pt-0 px-0 relative shrink-0 w-full">
        {relatedWallpapers.map((wp) => (
          <RelatedWallpaperCard
            key={wp._id || wp.id}
            title={wp.title}
            date={new Date(wp.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }).replace(/\. /g, '. ').replace(/\.$/, '')}
            image={getImageUrl(wp.imageUrl || wp.mobileImage)}
            onClick={() => onNavigate(wp._id || wp.id)}
          />
        ))}
      </div>
    </div>
  );
}

function LucideChevronDown() {
  return (
    <div className="relative size-[24px]" data-name="lucide/chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="lucide/chevron-down">
          <path d={svgPaths.p15bea900} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

export default function DownloadDetail({ wallpaperId, onBack }: { wallpaperId: string | null; onBack: () => void }) {
  const [selectedSize, setSelectedSize] = useState<'mobile' | 'tablet' | 'pc'>('mobile');
  const [wallpaper, setWallpaper] = useState<any>(null);
  const [relatedWallpapers, setRelatedWallpapers] = useState<any[]>([]);

  useEffect(() => {
    if (wallpaperId) {
      const savedWallpapers = localStorage.getItem('dungsil_wallpapers');
      if (savedWallpapers) {
        const wallpapers = JSON.parse(savedWallpapers);
        const found = wallpapers.find((w: any) => w.id === wallpaperId || w._id === wallpaperId);
        setWallpaper(found);

        // 현재 배경화면을 제외한 다른 배경화면들을 관련 배경화면으로 설정 (최대 3개)
        const related = wallpapers
          .filter((w: any) => (w.id !== wallpaperId && w._id !== wallpaperId))
          .slice(0, 3);
        setRelatedWallpapers(related);
      }
    }
  }, [wallpaperId]);

  const handleDownload = async () => {
    if (!wallpaper) return;

    // 선택된 크기에 맞는 이미지 가져오기
    const imageUrl = selectedSize === 'mobile'
      ? (wallpaper.mobileImage || wallpaper.imageUrl)
      : selectedSize === 'tablet'
      ? (wallpaper.tabletImage || wallpaper.mobileImage || wallpaper.imageUrl)
      : (wallpaper.desktopImage || wallpaper.tabletImage || wallpaper.mobileImage || wallpaper.imageUrl);

    if (!imageUrl) {
      alert('다운로드할 이미지가 없습니다.');
      return;
    }

    const fullImageUrl = getImageUrl(imageUrl);

    // 모바일 브라우저 감지
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    // iOS: 새 탭에서 이미지 직접 열기 (가장 확실한 방법)
    if (isIOS) {
      // 새 창에서 이미지 열기
      window.open(fullImageUrl, '_blank');

      // 안내 메시지
      setTimeout(() => {
        alert('📱 이미지 저장 방법:\n\n1. 새 탭에서 이미지가 열립니다\n2. 이미지를 길게 누르세요\n3. "이미지 저장" 또는 "사진 앨범에 추가"를 선택하세요');
      }, 500);
      return;
    }

    try {
      // Android 또는 PC: Blob 다운로드
      const response = await fetch(fullImageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${wallpaper.title}_${selectedSize}.png`;
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);

      // Android 안내 (일부 브라우저에서 다운로드가 안 될 수 있음)
      if (isAndroid) {
        setTimeout(() => {
          // 다운로드가 시작되지 않았다면 새 탭에서 열기
          const checkDownload = confirm('다운로드가 시작되지 않았나요?\n\n"확인"을 누르면 새 탭에서 이미지를 엽니다.');
          if (checkDownload) {
            window.open(fullImageUrl, '_blank');
            alert('이미지를 길게 눌러서 저장하세요.');
          }
        }, 2000);
      }

      // 다운로드 카운트 증가 API 호출 (선택사항)
      // await wallpapersApi.download(wallpaper._id);
    } catch (error) {
      console.error('다운로드 실패:', error);
      // 실패 시 새 탭에서 열기
      window.open(fullImageUrl, '_blank');
      alert('이미지를 길게 눌러서 저장하세요.');
    }
  };

  const handleRelatedWallpaperClick = (relatedWallpaperId: string) => {
    // 페이지 스크롤을 맨 위로
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // wallpaperId 업데이트 (useEffect에서 자동으로 데이터 로드됨)
    const savedWallpapers = localStorage.getItem('dungsil_wallpapers');
    if (savedWallpapers) {
      const wallpapers = JSON.parse(savedWallpapers);
      const found = wallpapers.find((w: any) => w.id === relatedWallpaperId || w._id === relatedWallpaperId);
      setWallpaper(found);

      // 관련 배경화면도 업데이트
      const related = wallpapers
        .filter((w: any) => (w.id !== relatedWallpaperId && w._id !== relatedWallpaperId))
        .slice(0, 3);
      setRelatedWallpapers(related);
    }
  };

  if (!wallpaper) {
    return (
      <div className="flex justify-center items-center min-h-[100dvh] bg-[#fff9f0]">
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033]">
          배경화면을 찾을 수 없습니다
        </p>
      </div>
    );
  }

  const formattedDate = new Date(wallpaper.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\. /g, '. ').replace(/\.$/, '');

  // 선택된 크기에 맞는 이미지 가져오기 (전체 URL로 변환)
  const currentImagePath = selectedSize === 'mobile'
    ? (wallpaper.mobileImage || wallpaper.imageUrl)
    : selectedSize === 'tablet'
    ? (wallpaper.tabletImage || wallpaper.mobileImage || wallpaper.imageUrl)
    : (wallpaper.desktopImage || wallpaper.tabletImage || wallpaper.mobileImage || wallpaper.imageUrl);
  const currentImage = getImageUrl(currentImagePath);

  return (
    <div className="flex justify-center items-start min-h-[100dvh] bg-[#fff9f0] w-full overflow-x-hidden overflow-y-auto">
      <div className="bg-[#fff9f0] relative w-full min-h-[100dvh] pb-[30px]" style={{ margin: '0 auto', touchAction: 'pan-y' }}>
        {/* 상단 이미지 */}
        <div className="relative w-full aspect-[430/526] overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {currentImage ? (
              <img alt={wallpaper.title} className="absolute h-full w-full object-cover" src={currentImage} />
            ) : (
              <img alt="" className="absolute h-[155.24%] left-[-0.03%] max-w-none top-[-38.67%] w-[100.05%]" src={img1} />
            )}
          </div>

          {/* 뒤로가기 버튼 */}
          <button
            onClick={onBack}
            className="absolute flex items-center justify-center left-[16px] size-[24.03px] top-[55px] cursor-pointer hover:opacity-70 transition-opacity z-10"
          >
            <div className="flex-none rotate-[89.928deg]">
              <LucideChevronDown />
            </div>
          </button>
        </div>

        {/* 컨텐츠 */}
        <Frame13
          title={wallpaper.title}
          date={formattedDate}
          description={wallpaper.description || ''}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          onDownload={handleDownload}
        />
        <Frame15 relatedWallpapers={relatedWallpapers} onNavigate={handleRelatedWallpaperClick} />

        {/* 하단 푸터 */}
        <div className="bg-[rgba(124,102,89,0.8)] h-[174px] w-full mt-[30px]">
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21.125px] not-italic text-[#fff9f0] text-[13px] text-center pt-[42px] whitespace-pre">{`둥실월드 ⓒ 2025 · Font: 학교안심 둥근미소`}</p>
        </div>
      </div>
    </div>
  );
}