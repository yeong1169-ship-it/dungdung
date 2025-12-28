import { useState, useEffect } from "react";
import svgPaths from "../imports/svg-tf70uqh19l";
import img1 from "figma:asset/348e3a8eec568e3fbe96c6fc94e60e5aa5b4f94d.png";
import { wallpapersApi } from "../lib/api";

// API 서버 기본 URL (이미지 경로 생성용)
const API_SERVER_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001';

// 이미지 URL 생성 함수
const getImageUrl = (path: string | undefined) => {
  if (!path) return img1;
  if (path.startsWith('http')) return path; // 이미 전체 URL인 경우
  return `${API_SERVER_URL}${path}`; // 상대 경로인 경우 서버 URL 추가
};

function Icon() {
  return (
    <div className="relative size-[20px]" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Icon">
          <path
            d={svgPaths.p36376fc0}
            id="Vector"
            stroke="var(--stroke-0, #5C4033)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
          <path
            d={svgPaths.pcddfd00}
            id="Vector_2"
            stroke="var(--stroke-0, #5C4033)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <Icon />
    </div>
  );
}

function TextInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div
      className="absolute bg-[rgba(92,64,51,0.08)] left-[16px] right-[16px] rounded-[1.67772e+07px] top-[60px]"
      data-name="Text Input"
    >
      <div className="box-border content-stretch flex gap-[10px] items-center justify-between overflow-clip px-[21px] py-[14px] relative rounded-[inherit] w-full">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="flex-1 bg-transparent border-none outline-none font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] placeholder:text-[rgba(92,64,51,0.5)]"
        />
        <Frame />
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#5c4033] border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]"
      />
    </div>
  );
}

// 그리드 뷰 카드
function GridCard({ title, date, image, onClick }: { title: string; date: string; image?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white overflow-clip rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] w-full cursor-pointer flex flex-col"
    >
      <div className="w-full aspect-[193/170] overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="bg-[#d9d9d9] size-full" />
        )}
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start px-[16px] pt-[16px] pb-[16px] not-italic w-full">
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] font-bold relative shrink-0 text-[#5c4033] text-[16px] text-left whitespace-nowrap text-ellipsis max-w-full overflow-hidden">
          {title}
        </p>
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] relative shrink-0 text-[12px] text-[rgba(92,64,51,0.8)]">
          {date}
        </p>
      </div>
    </button>
  );
}

// 리스트 뷰 카드
function ListCard({ title, date, image, colors, onClick }: { title: string; date: string; image?: string; colors?: string[]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white overflow-clip rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] w-full cursor-pointer flex flex-col"
    >
      {/* 이미지 영역 - 비율 유지 */}
      <div className="w-full aspect-[398/488] overflow-hidden rounded-t-[10px] relative">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="bg-[#d9d9d9] size-full" />
        )}

        {/* 컬러 팔레트 오버레이 - 이미지 우측 하단 */}
        {colors && colors.length > 0 && (
          <div className="absolute right-4 bottom-4 flex gap-[4px] items-center">
            {colors.slice(0, 3).map((color, index) => (
              <div key={index} className="relative rounded-[1.67772e+07px] shrink-0 size-[24px]" style={{ backgroundColor: color }}>
                <div
                  aria-hidden="true"
                  className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 하단 컨텐츠 영역 */}
      <div className="flex items-end justify-between px-[16px] pt-[16px] pb-[16px] w-full">
        {/* 왼쪽: 제목과 날짜 */}
        <div className="flex flex-col gap-[14px] items-start">
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] font-bold text-[#5c4033] text-[18px] text-left whitespace-nowrap text-ellipsis max-w-[7em] overflow-hidden">
            {title}
          </p>
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[rgba(92,64,51,0.8)] text-left">
            {date}
          </p>
        </div>
      </div>
    </button>
  );
}

function LucideChevronDown() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g>
          <path
            d="M6 9L12 15L18 9"
            stroke="var(--stroke-0, #5C4033)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

// 그리드 뷰 아이콘
function GridViewIcon({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative shrink-0 size-[17px] hover:opacity-70 transition-opacity cursor-pointer"
    >
      <div className="absolute border-[#5c4033] border-[1.5px] border-solid left-0 rounded-[2px] size-[8px] top-0" />
      <div className="absolute border-[#5c4033] border-[1.5px] border-solid left-0 rounded-[2px] size-[8px] top-[9px]" />
      <div className="absolute border-[#5c4033] border-[1.5px] border-solid left-[9px] rounded-[2px] size-[8px] top-0" />
      <div className="absolute border-[#5c4033] border-[1.5px] border-solid left-[9px] rounded-[2px] size-[8px] top-[9px]" />
    </button>
  );
}

// 리스트 뷰 아이콘
function ListViewIcon({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative shrink-0 size-[17px] hover:opacity-70 transition-opacity cursor-pointer"
    >
      <div className="absolute border-[#5c4033] border-[1.5px] border-solid left-0 rounded-[2px] size-[17px] top-0" />
    </button>
  );
}

export default function Download({
  onNavigate,
}: {
  onNavigate: (
    page:
      | "home"
      | "download"
      | "talk"
      | "shop"
      | "collection"
      | "downloadDetail",
    wallpaperId?: string
  ) => void;
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    "list",
  );
  const [sortOption, setSortOption] = useState<
    "인기순" | "최신순" | "오래된 순"
  >("인기순");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  // API에서 배경화면 데이터 로드
  useEffect(() => {
    const loadWallpapers = async () => {
      try {
        const data = await wallpapersApi.getAll({ limit: 100 });
        setWallpapers(data.wallpapers);
        // localStorage에 저장하여 상세 페이지에서 사용할 수 있도록 함
        localStorage.setItem('dungsil_wallpapers', JSON.stringify(data.wallpapers));
      } catch (error) {
        console.error('배경화면 로딩 실패:', error);
      }
    };
    loadWallpapers();
  }, []);

  // 검색 필터링된 배경화면 데이터
  const filteredWallpapers = wallpapers.filter(wallpaper => {
    if (!searchText.trim()) return true; // 검색어가 없으면 모두 표시

    const searchLower = searchText.toLowerCase();
    const title = (wallpaper.title || '').toLowerCase();
    const category = (wallpaper.category || '').toLowerCase();
    const tags = (wallpaper.tags || []).join(' ').toLowerCase();

    return title.includes(searchLower) ||
           category.includes(searchLower) ||
           tags.includes(searchLower);
  });

  // 정렬된 배경화면 데이터
  const sortedWallpapers = [...filteredWallpapers].sort((a, b) => {
    if (sortOption === "인기순") {
      // 다운로드 수가 많은 순 (내림차순)
      return (b.downloads || 0) - (a.downloads || 0);
    } else if (sortOption === "최신순") {
      // 최근에 생성된 순 (내림차순)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // 오래된 순 (오름차순)
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  // 그리드 뷰 카드 데이터 - 정렬된 데이터 사용
  const gridCards = sortedWallpapers.map(wp => ({
    id: wp._id,
    title: wp.title,
    date: new Date(wp.createdAt).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '. ').replace(/\.$/, '')
  }));

  // 리스트 뷰 카드 데이터 - 정렬된 데이터 사용
  const listCards = sortedWallpapers.map(wp => ({
    id: wp._id,
    title: wp.title,
    date: new Date(wp.createdAt).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '. ').replace(/\.$/, ''),
    image: getImageUrl(wp.imageUrl || wp.mobileImage),
    colors: wp.colors || []
  }));

  // 현재 뷰에 따른 카드 개수 (검색 필터링 적용)
  const currentCardCount = filteredWallpapers.length;

  const toggleView = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectSortOption = (
    option: "인기순" | "최신순" | "오래된 순",
  ) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex justify-center items-start min-h-[100dvh] bg-[#fff9f0] w-full overflow-x-hidden overflow-y-auto">
      <div
        className="bg-[#fff9f0] relative w-full min-h-[100dvh] pb-[68px]"
        style={{ margin: "0 auto", touchAction: "pan-y" }}
      >
        {/* 검색창 */}
        <TextInput value={searchText} onChange={setSearchText} />

        {/* 필터 및  전환 */}
        <div className="absolute content-stretch flex gap-[22px] items-center left-[16px] right-[16px] top-[125px] z-10">
          <div className="content-stretch flex items-center justify-between relative w-full">
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#5c4033] text-[14px] text-center text-nowrap whitespace-pre">
              {currentCardCount}개
            </p>

            {/* 정렬 드롭다운 */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="content-stretch flex gap-[6px] items-center relative shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
              >
                <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#5c4033] text-[14px] text-center text-nowrap whitespace-pre">
                  {sortOption}{" "}
                </p>
                <LucideChevronDown />
              </button>

              {/* 드롭다운 메뉴 */}
              {isDropdownOpen && (
                <div className="absolute top-[32px] right-0 bg-white rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] overflow-hidden min-w-[110px] z-20">
                  <button
                    onClick={() => selectSortOption("인기순")}
                    className="w-full px-[18px] py-[12px] text-left font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] hover:bg-[#efffc5] transition-colors cursor-pointer"
                  >
                    인기순
                  </button>
                  <button
                    onClick={() => selectSortOption("최신순")}
                    className="w-full px-[18px] py-[12px] text-left font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] hover:bg-[#efffc5] transition-colors cursor-pointer"
                  >
                    최신순
                  </button>
                  <button
                    onClick={() =>
                      selectSortOption("오래된 순")
                    }
                    className="w-full px-[18px] py-[12px] text-left font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] hover:bg-[#efffc5] transition-colors cursor-pointer"
                  >
                    오래된 순
                  </button>
                </div>
              )}
            </div>
          </div>
          {viewMode === "grid" ? (
            <ListViewIcon onClick={toggleView} />
          ) : (
            <GridViewIcon onClick={toggleView} />
          )}
        </div>

        {/* 컨텐츠 영역 */}
        {viewMode === "grid" ? (
          // 그리드 뷰 (2x2) - 검색창과 동일한 너비, 카드 간격 12px
          <div className="px-[16px] pt-[155px]">
            {gridCards.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] opacity-50">
                  등록된 배경화면이 없습니다
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-[12px]">
                {gridCards.map((card) => {
                  const wallpaper = sortedWallpapers.find(w => w._id === card.id);
                  return (
                    <GridCard
                      key={card.id}
                      title={card.title}
                      date={card.date}
                      image={getImageUrl(wallpaper?.imageUrl || wallpaper?.mobileImage)}
                      onClick={() => onNavigate("downloadDetail", card.id)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          // 리스트 뷰 (세로 스크롤)
          <div className="flex flex-col gap-[14px] px-[16px] pt-[155px]">
            {listCards.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] opacity-50">
                  등록된 배경화면이 없습니다
                </p>
              </div>
            ) : (
              listCards.map((card) => (
                <ListCard
                  key={card.id}
                  title={card.title}
                  date={card.date}
                  image={card.image}
                  colors={card.colors}
                  onClick={() => onNavigate("downloadDetail", card.id)}
                />
              ))
            )}
          </div>
        )}

        {/* 하단 푸터 */}
        <div className="bg-[rgba(124,102,89,0.8)] h-[174px] w-full mt-[30px]">
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21.125px] not-italic text-[#fff9f0] text-[13px] text-center pt-[42px] whitespace-pre">{`둥실월드  2025 · Font: 학교안심 둥근미소`}</p>
        </div>

        {/* 하단 네비게이션 */}
        <div
          className="bg-[rgba(255,249,240,0.91)] content-stretch flex flex-col h-[68px] items-center justify-center w-full z-50 backdrop-blur-sm"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute border-t border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none shadow-[0px_-2px_8px_0px_rgba(0,0,0,0.08)]"
          />
          <div className="absolute content-stretch flex gap-[24px] items-center left-1/2 shrink-0 translate-x-[-50%]">
            {/* Home */}
            <button
              onClick={() => onNavigate("home")}
              className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity"
            >
              <div className="relative shrink-0 size-[24px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path
                      d={svgPaths.p2bbf6680}
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d={svgPaths.p2ea10f40}
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </div>
              <p className="font-['Pretendard',sans-serif] leading-[15px] not-italic text-[#5c4033] text-[10px] text-center" style={{ fontWeight: 400 }}>
                Home
              </p>
            </button>

            {/* Download - Active */}
            <div className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px]">
              <div className="relative shrink-0 size-[24px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path
                      d={svgPaths.p341e1d00}
                      stroke="var(--stroke-0, #8FAF3E)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M14 19L17 22V16.5"
                      stroke="var(--stroke-0, #8FAF3E)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M17 22L20 19"
                      stroke="var(--stroke-0, #8FAF3E)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d={svgPaths.p1b53d300}
                      stroke="var(--stroke-0, #8FAF3E)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </div>
              <p className="font-['Pretendard',sans-serif] leading-[15px] not-italic text-[#8faf3e] text-[10px]" style={{ fontWeight: 400 }}>
                Download
              </p>
            </div>

            {/* Talk */}
            <button
              onClick={() => onNavigate("talk")}
              className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity"
            >
              <div className="relative shrink-0 size-[24px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path
                      d={svgPaths.pfbeaf00}
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 12H8.01"
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 12H12.01"
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 12H16.01"
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </div>
              <p className="font-['Pretendard',sans-serif] leading-[15px] not-italic text-[#5c4033] text-[10px] text-center" style={{ fontWeight: 400 }}>
                Talk
              </p>
            </button>

            {/* Collection */}
            <button
              onClick={() => onNavigate("collection")}
              className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity"
            >
              <div className="relative shrink-0 size-[24px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path
                      d={svgPaths.p1219e180}
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M2 6H6"
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M2 10H6"
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M2 14H6"
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M2 18H6"
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d={svgPaths.p20731300}
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </div>
              <p className="font-['Pretendard',sans-serif] leading-[15px] not-italic text-[#5c4033] text-[10px]" style={{ fontWeight: 400 }}>
                Collection
              </p>
            </button>

            {/* Shop */}
            <button
              onClick={() => onNavigate("shop")}
              className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity"
            >
              <div className="relative shrink-0 size-[24px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path
                      d={svgPaths.p8aac400}
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M3.10254 6.03418H20.8965"
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d={svgPaths.p24f06100}
                      stroke="var(--stroke-0, #5C4033)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </div>
              <p className="font-['Pretendard',sans-serif] leading-[15px] not-italic text-[#5c4033] text-[10px] text-center" style={{ fontWeight: 400 }}>
                Shop
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}