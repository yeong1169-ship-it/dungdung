import svgPaths from "../imports/svg-ouo06p6q1g";
import bottomNavSvgPaths from "../imports/svg-tgq24q0gmi";
import { useState } from "react";

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="absolute flex items-center justify-center left-[16px] size-[24px] top-[110px] cursor-pointer hover:opacity-70 transition-opacity"
    >
      <div className="flex-none rotate-90">
        <div className="relative size-[24px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g>
              <path d={svgPaths.p15bea900} stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </div>
    </button>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="absolute right-[16px] size-[24px] top-[110px] cursor-pointer hover:opacity-70 transition-opacity"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.pd905500} stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </button>
  );
}

function HeartIcon({ isLiked }: { isLiked: boolean }) {
  return (
    <div className="relative size-[24px]">
      <div className="absolute inset-[16.6%_8.34%_12.5%_8.33%]">
        <div className="absolute inset-[-5.88%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 20">
            <path 
              d={svgPaths.p3eb21b80} 
              fill={isLiked ? "#5C4033" : "transparent"}
              stroke="var(--stroke-0, #5C4033)" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <div className="relative size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d="M12 15V3" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2d557600} stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2a881c00} stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={bottomNavSvgPaths.p2bbf6680} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={bottomNavSvgPaths.p2ea10f40} id="Vector_2" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={bottomNavSvgPaths.p341e1d00} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M14 19L17 22V16.5" id="Vector_2" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M17 22L20 19" id="Vector_3" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={bottomNavSvgPaths.p1b53d300} id="Vector_4" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={bottomNavSvgPaths.pfbeaf00} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M8 12H8.01" id="Vector_2" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 12H12.01" id="Vector_3" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 12H16.01" id="Vector_4" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={bottomNavSvgPaths.p1219e180} id="Vector" stroke="var(--stroke-0, #8FAF3E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 6H6" id="Vector_2" stroke="var(--stroke-0, #8FAF3E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 10H6" id="Vector_3" stroke="var(--stroke-0, #8FAF3E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 14H6" id="Vector_4" stroke="var(--stroke-0, #8FAF3E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 18H6" id="Vector_5" stroke="var(--stroke-0, #8FAF3E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={bottomNavSvgPaths.p20731300} id="Vector_6" stroke="var(--stroke-0, #8FAF3E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3 6H21" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function BottomNav({ onNavigate }: { onNavigate: (page: "home" | "download" | "talk" | "shop" | "collection" | "downloadDetail" | "photoDetail") => void }) {
  return (
    <div className="bg-[rgba(255,249,240,0.91)] content-stretch flex flex-col h-[68px] items-center justify-center w-full max-w-[430px] z-50 backdrop-blur-sm" data-name="BottomNav" style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0 w-full px-[24px]">
        <button onClick={() => onNavigate("home")} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity">
          <Icon1 />
          <p className="font-['Pretendard',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[10px] text-center w-[min-content]" style={{ fontWeight: 400 }}>Home</p>
        </button>
        <button onClick={() => onNavigate("download")} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity">
          <Icon2 />
          <p className="font-['Pretendard',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[10px] w-[min-content]" style={{ fontWeight: 400 }}>Download</p>
        </button>
        <button onClick={() => onNavigate("talk")} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity">
          <Icon3 />
          <p className="font-['Pretendard',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[10px] text-center w-[min-content]" style={{ fontWeight: 400 }}>Talk</p>
        </button>
        <div className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px]">
          <Icon4 />
          <p className="font-['Pretendard',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#8faf3e] text-[10px] w-[min-content]" style={{ fontWeight: 400 }}>Collection</p>
        </div>
        <button onClick={() => onNavigate("shop")} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity">
          <Icon5 />
          <p className="font-['Pretendard',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[10px] text-center w-[min-content]" style={{ fontWeight: 400 }}>Shop</p>
        </button>
      </div>
    </div>
  );
}

export default function PhotoDetail({
  onBack,
  onNavigate,
  image,
  onDelete
}: {
  onBack: () => void;
  onNavigate: (page: "home" | "download" | "talk" | "shop" | "collection" | "downloadDetail" | "photoDetail") => void;
  image: { id: number; imageUrl: string; text: string; savedDate: Date } | null;
  onDelete: (id: number) => void;
}) {
  const [isLiked, setIsLiked] = useState(true); // 컬렉션에 있는 이미지는 기본적으로 좋아요 상태

  const handleDelete = () => {
    // 삭제 확인 후 뒤로가기
    if (confirm("이 사진을 삭제하시겠습니까?")) {
      if (image) {
        onDelete(image.id);
      }
      onBack();
    }
  };

  const handleDownload = async () => {
    if (image) {
      try {
        // 이미지를 blob으로 가져오기
        const response = await fetch(image.imageUrl);
        const blob = await response.blob();

        // blob URL 생성
        const blobUrl = window.URL.createObjectURL(blob);

        // 다운로드 링크 생성 및 클릭
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `dungsil_${image.savedDate.toISOString().split('T')[0]}.png`;
        document.body.appendChild(link);
        link.click();

        // 정리
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error('이미지 다운로드 실패:', error);
        alert('이미지 다운로드에 실패했습니다.');
      }
    }
  };

  if (!image) {
    return null;
  }

  const date = new Date(image.savedDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const dateString = `${year}년 ${month}월`;

  return (
    <div className="flex justify-center items-start min-h-[100dvh] bg-[#fff9f0] w-full overflow-x-hidden overflow-y-auto">
      <div className="bg-[#fff9f0] relative w-full max-w-[430px] min-h-[100dvh] pb-[68px]" style={{ touchAction: "pan-y" }}>
        {/* 상단 배경 */}
        <div className="absolute bg-[rgba(92,64,51,0.1)] h-[92px] left-0 top-0 w-full" />
        <p className="absolute font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[15.125px] left-[calc(50%-63.5px)] not-italic text-[#5c4033] text-[18px] text-nowrap top-[63px] whitespace-pre">둥실이 추억 앨범</p>
        
        {/* 구분선 */}
        <div className="absolute h-0 left-0 top-[92px] w-[375px]">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 1">
              <line stroke="var(--stroke-0, #E5E5E5)" x2="375" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>

        {/* 날짜 */}
        <p className="absolute font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[20px] left-[calc(50%-43.5px)] not-italic text-[#5c4033] text-[16px] text-nowrap top-[110px] whitespace-pre">{dateString}</p>

        {/* 뒤로가기 버튼 */}
        <BackButton onClick={onBack} />

        {/* 삭제 버튼 */}
        <DeleteButton onClick={handleDelete} />

        {/* 사진 */}
        <div className="absolute h-[344px] left-[16px] right-[16px] rounded-[10px] top-[146px] overflow-hidden">
          <img
            src={image.imageUrl}
            alt="둥실이가 만든 이미지"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 하트 버튼 */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute left-[16px] size-[24px] top-[501px] cursor-pointer hover:opacity-70 transition-opacity"
        >
          <HeartIcon isLiked={isLiked} />
        </button>

        {/* 다운로드 버튼 */}
        <button
          onClick={handleDownload}
          className="absolute right-[16px] size-[24px] top-[501px] cursor-pointer hover:opacity-70 transition-opacity"
        >
          <DownloadIcon />
        </button>

        {/* 텍스트 설명 */}
        <p className="absolute font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[20px] left-[18px] not-italic text-[#5c4033] text-[14px] top-[536px] w-[343px] whitespace-pre-wrap break-words">
          {image.text}
        </p>

        {/* 하단 네비게이션 */}
        <BottomNav onNavigate={onNavigate} />
      </div>
    </div>
  );
}