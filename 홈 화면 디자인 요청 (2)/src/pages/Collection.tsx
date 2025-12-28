import { useState } from "react";
import svgPaths from "../imports/svg-60q691j8ff";
import bottomNavSvgPaths from "../imports/svg-tgq24q0gmi";
import trashSvgPaths from "../imports/svg-ddcxgybt91";

function PhotoIcon({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19d57600} id="Vector" stroke={isActive ? "var(--stroke-0, #FFF9F0)" : "var(--stroke-0, #5C4033)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2fe1fe40} id="Vector_2" stroke={isActive ? "var(--stroke-0, #FFF9F0)" : "var(--stroke-0, #5C4033)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p25c2200} id="Vector_3" stroke={isActive ? "var(--stroke-0, #FFF9F0)" : "var(--stroke-0, #5C4033)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function QuoteIcon({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p30e43c00} id="Vector" stroke={isActive ? "var(--stroke-0, #FFF9F0)" : "var(--stroke-0, #5C4033)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pa5f680} id="Vector_2" stroke={isActive ? "var(--stroke-0, #FFF9F0)" : "var(--stroke-0, #5C4033)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function TabButton({ isActive, onClick, icon, label }: { isActive: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className="relative box-border content-stretch flex gap-[10px] items-center justify-center p-[16px] flex-1 cursor-pointer hover:opacity-80 transition-opacity"
    >
      {/* 배경 */}
      <div className={`absolute inset-0 ${isActive ? 'bg-[#5c4033]' : 'bg-[#fff9f0]'}`} />
      
      {/* 외각선 */}
      <div aria-hidden="true" className="absolute border border-[#5c4033] border-solid inset-0 pointer-events-none" />
      
      {/* 컨텐츠 */}
      <div className="relative flex gap-[10px] items-center justify-center">
        {icon}
        <p className={`font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[20px] not-italic shrink-0 ${isActive ? 'text-[#fff9f0]' : 'text-[#5c4033]'} text-[14px] text-nowrap whitespace-pre`}>{label}</p>
      </div>
    </button>
  );
}

function TabBar({ activeTab, onTabChange }: { activeTab: "photo" | "quote"; onTabChange: (tab: "photo" | "quote") => void }) {
  return (
    <div className="absolute h-[52px] left-0 top-[63px] w-full">
      <div className="flex w-full">
        <TabButton 
          isActive={activeTab === "photo"} 
          onClick={() => onTabChange("photo")} 
          icon={<PhotoIcon isActive={activeTab === "photo"} />} 
          label="사진" 
        />
        <TabButton 
          isActive={activeTab === "quote"} 
          onClick={() => onTabChange("quote")} 
          icon={<QuoteIcon isActive={activeTab === "quote"} />} 
          label="문장" 
        />
      </div>
    </div>
  );
}

function FilterButton({ isActive, onClick, label }: { isActive: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`${isActive ? 'bg-[#8faf3e]' : 'bg-white'} box-border content-stretch flex gap-[10px] items-center justify-center px-[14px] py-[8px] relative rounded-[30px] shrink-0 cursor-pointer hover:opacity-80 transition-opacity`}
    >
      <div aria-hidden="true" className="absolute border border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <p className={`font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[15px] not-italic relative shrink-0 ${isActive ? 'text-[#fff9f0]' : 'text-[#5c4033]'} text-[14px] text-center text-nowrap whitespace-pre`}>{label}</p>
    </button>
  );
}

function TrashIcon() {
  return (
    <div className="relative size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame 100">
          <path d={trashSvgPaths.p2aa76000} id="Vector" stroke="#5C4033" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function QuoteCard({ quote, date, category, author, onDelete }: { quote: string; date: string; category: string; author: string; onDelete: () => void }) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[17px] rounded-[20px] w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="relative shrink-0 w-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[10px] items-start justify-center relative w-full">
          <div className="content-stretch flex flex-col font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] gap-[6px] items-start leading-[22px] not-italic relative shrink-0 tracking-[-0.1504px] w-full">
            <div className="content-stretch flex items-center justify-between relative shrink-0 text-[12px] text-[rgba(70,25,1,0.8)] w-full">
              <p className="relative shrink-0">{category}</p>
              <p className="relative shrink-0 text-nowrap whitespace-pre">{date}</p>
            </div>
            <p className="relative shrink-0 text-[#461901] text-[16px] w-full">{quote}</p>
            <div className="w-full flex justify-end">
              <button onClick={onDelete} className="cursor-pointer hover:opacity-70 transition-opacity">
                <TrashIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotosView({ savedImages, onPhotoClick, onDeleteImage }: { savedImages: Array<{ id: number; imageUrl: string; savedDate: Date }>; onPhotoClick: () => void; onDeleteImage: (id: number) => void }) {
  // 이미지를 년/월로 그룹화
  const groupedImages = savedImages.reduce((acc, image) => {
    const date = new Date(image.savedDate);
    const yearMonth = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월`;
    
    if (!acc[yearMonth]) {
      acc[yearMonth] = [];
    }
    acc[yearMonth].push(image);
    
    return acc;
  }, {} as Record<string, typeof savedImages>);

  // 최신순으로 정렬 (년월 키를 날짜로 변환하여 정렬)
  const sortedYearMonths = Object.keys(groupedImages).sort((a, b) => {
    const dateA = new Date(a.replace('년 ', '-').replace('월', ''));
    const dateB = new Date(b.replace('년 ', '-').replace('월', ''));
    return dateB.getTime() - dateA.getTime();
  });

  if (savedImages.length === 0) {
    return (
      <div className="w-full px-[16px] pt-[130px] pb-[100px]">
        <div className="text-center py-[80px]">
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[#5c4033] opacity-60 text-[14px]">
            아직 저장된 이미지가 없어요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-[16px] pt-[130px] pb-[100px]">
      {sortedYearMonths.map((yearMonth) => (
        <div key={yearMonth} className="mb-[32px]">
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[20px] not-italic text-[#5c4033] text-[16px] text-nowrap mb-[16px] whitespace-pre">{yearMonth}</p>
          
          {/* 사진 그리드 */}
          <div className="grid grid-cols-2 gap-[8px]">
            {groupedImages[yearMonth].map((image) => (
              <div key={image.id} className="relative group">
                <div className="relative h-[168px] rounded-[10px] w-full overflow-hidden bg-[#E0E0E0] cursor-pointer hover:opacity-80 transition-opacity">
                  <img 
                    src={image.imageUrl} 
                    alt="저장된 이미지" 
                    className="w-full h-full object-cover"
                    onClick={onPhotoClick}
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteImage(image.id);
                  }}
                  className="absolute top-[8px] right-[8px] bg-white/90 rounded-full p-[6px] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white shadow-md"
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function QuotesView({ savedQuotes, onDeleteQuote }: { savedQuotes: Array<{ id: number; quote: string; date: string; category: string; author: string }>; onDeleteQuote: (id: number) => void }) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "daily" | "chat">("all");

  const filteredQuotes = savedQuotes.filter(q => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "daily") return q.category === "오늘 둥실이의 한마디";
    if (selectedFilter === "chat") return q.category === "둥실이와의 채팅";
    return true;
  });

  return (
    <div className="w-full px-[16px] pt-[127px] pb-[100px]">
      {/* 필터 버튼 */}
      <div className="content-stretch flex gap-[6px] items-center mb-[16px] overflow-x-auto">
        <FilterButton isActive={selectedFilter === "all"} onClick={() => setSelectedFilter("all")} label="전체" />
        <FilterButton isActive={selectedFilter === "daily"} onClick={() => setSelectedFilter("daily")} label="오늘의 둥실이의 한마디" />
        <FilterButton isActive={selectedFilter === "chat"} onClick={() => setSelectedFilter("chat")} label="둥실이와의 채팅" />
      </div>

      {/* 명언 카드들 */}
      <div className="flex flex-col gap-[16px]">
        {filteredQuotes.length === 0 ? (
          <div className="text-center py-[40px]">
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[#5c4033] opacity-60 text-[14px]">
              저장된 문장이 없어요
            </p>
          </div>
        ) : (
          filteredQuotes.map(q => (
            <QuoteCard key={q.id} quote={q.quote} date={q.date} category={q.category} author={q.author} onDelete={() => onDeleteQuote(q.id)} />
          ))
        )}
      </div>
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
          <p className="font-['Pretendard:SemiBold',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[10px] text-center w-[min-content]">Home</p>
        </button>
        <button onClick={() => onNavigate("download")} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity">
          <Icon2 />
          <p className="font-['Pretendard:SemiBold',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[10px] w-[min-content]">Download</p>
        </button>
        <button onClick={() => onNavigate("talk")} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity">
          <Icon3 />
          <p className="font-['Pretendard:SemiBold',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[10px] text-center w-[min-content]">Talk</p>
        </button>
        <div className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px]">
          <Icon4 />
          <p className="font-['Pretendard:SemiBold',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#8faf3e] text-[10px] w-[min-content]">Collection</p>
        </div>
        <button onClick={() => onNavigate("shop")} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity">
          <Icon5 />
          <p className="font-['Pretendard:SemiBold',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[10px] text-center w-[min-content]">Shop</p>
        </button>
      </div>
    </div>
  );
}

export default function CollectionPage({ 
  onNavigate, 
  savedQuotes, 
  onDeleteQuote,
  savedImages,
  onDeleteImage,
  isLoggedIn
}: { 
  onNavigate: (page: "home" | "download" | "talk" | "shop" | "collection" | "downloadDetail" | "photoDetail") => void;
  savedQuotes: Array<{ id: number; quote: string; date: string; category: string; author: string }>;
  onDeleteQuote: (id: number) => void;
  savedImages: Array<{ id: number; imageUrl: string; savedDate: Date }>;
  onDeleteImage: (id: number) => void;
  isLoggedIn: boolean;
}) {
  const [activeTab, setActiveTab] = useState<"photo" | "quote">("photo");

  const handlePhotoClick = () => {
    onNavigate("photoDetail");
  };

  // 로그인 안 되어 있으면 잠금 화면 표시
  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-start min-h-[100dvh] bg-[#fff9f0] w-full overflow-x-hidden overflow-y-auto">
        <div className="bg-[#fff9f0] relative w-full max-w-[430px] min-h-[100dvh] pb-[68px]" style={{ touchAction: "pan-y" }}>
          {/* 상단 헤더 */}
          <div className="absolute bg-[rgba(92,64,51,0.1)] h-[63px] left-0 top-0 w-full" />
          <p className="absolute font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[15.125px] left-[calc(50%-63.5px)] not-italic text-[#5c4033] text-[18px] text-nowrap top-[24px] whitespace-pre">둥실이 추억 앨범</p>
          
          {/* 구분선 */}
          <div className="absolute h-0 left-0 top-[63px] w-full">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 1">
                <line id="Line 1" stroke="var(--stroke-0, #E5E5E5)" x2="375" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>

          {/* 잠금 화면 */}
          <div className="flex flex-col items-center justify-center pt-[200px] px-[40px]">
            {/* 자물쇠 아이콘 */}
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="mb-6">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[20px] text-[#5c4033] text-center mb-3">
              로그인이 필요해요
            </p>
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] text-center opacity-70 leading-[22px]">
              좋아요한 문장과 사진을 보려면<br />
              로그인을 해주세요!
            </p>
          </div>

          {/* 하단 네비게이션 */}
          <BottomNav onNavigate={onNavigate} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-[100dvh] bg-[#fff9f0] w-full overflow-x-hidden overflow-y-auto">
      <div className="bg-[#fff9f0] relative w-full max-w-[430px] min-h-[100dvh] pb-[68px]" style={{ touchAction: "pan-y" }}>
        {/* 상단 헤더 */}
        <div className="absolute bg-[rgba(92,64,51,0.1)] h-[63px] left-0 top-0 w-full" />
        <p className="absolute font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[15.125px] left-[calc(50%-63.5px)] not-italic text-[#5c4033] text-[18px] text-nowrap top-[24px] whitespace-pre">둥실이 추억 앨범</p>
        
        {/* 구분선 */}
        <div className="absolute h-0 left-0 top-[63px] w-full">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 1">
              <line id="Line 1" stroke="var(--stroke-0, #E5E5E5)" x2="375" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>

        {/* 탭 바 */}
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 컨텐츠 */}
        {activeTab === "photo" ? <PhotosView savedImages={savedImages} onPhotoClick={handlePhotoClick} onDeleteImage={onDeleteImage} /> : <QuotesView savedQuotes={savedQuotes} onDeleteQuote={onDeleteQuote} />}

        {/* 하단 네비게이션 */}
        <BottomNav onNavigate={onNavigate} />
      </div>
    </div>
  );
}