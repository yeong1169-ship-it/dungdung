import svgPaths from "../imports/svg-pfh6yan6lz";
import img1 from "figma:asset/348e3a8eec568e3fbe96c6fc94e60e5aa5b4f94d.png";
import { useState } from "react";

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start leading-[15.125px] relative shrink-0 w-full">
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] relative shrink-0 text-[#5c4033] text-[18px] w-full">가을의 산책</p>
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] relative shrink-0 text-[14px] text-[rgba(92,64,51,0.8)] w-full">2025. 11. 27</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start not-italic relative shrink-0 w-full">
      <Frame />
      <div className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[15.125px] relative shrink-0 text-[#5c4033] text-[14px] w-full">
        <p className="mb-0">오늘 가을 산책 다녀왔어! 산들산들 바람이 살랑이는 게</p>
        <p>너무 기분 좋았어!</p>
      </div>
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

function Frame4() {
  return (
    <button className="bg-[#8faf3e] relative rounded-[10px] shrink-0 w-full hover:bg-[#7b9c00] transition-colors cursor-pointer">
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

function Frame11({ selectedSize, onSelectSize }: { selectedSize: 'mobile' | 'tablet' | 'pc'; onSelectSize: (size: 'mobile' | 'tablet' | 'pc') => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame10 selectedSize={selectedSize} onSelectSize={onSelectSize} />
      <Frame4 />
    </div>
  );
}

function Frame12({ selectedSize, onSelectSize }: { selectedSize: 'mobile' | 'tablet' | 'pc'; onSelectSize: (size: 'mobile' | 'tablet' | 'pc') => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 398 1">
            <path d="M0 0.5H398" id="Line 2" stroke="var(--stroke-0, #5C4033)" strokeOpacity="0.2" />
          </svg>
        </div>
      </div>
      <Frame11 selectedSize={selectedSize} onSelectSize={onSelectSize} />
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

function Frame13({ selectedSize, onSelectSize }: { selectedSize: 'mobile' | 'tablet' | 'pc'; onSelectSize: (size: 'mobile' | 'tablet' | 'pc') => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start px-[16px] pt-[24px] w-full">
      <Frame3 />
      <Frame12 selectedSize={selectedSize} onSelectSize={onSelectSize} />
    </div>
  );
}

function Rectangle() {
  return (
    <div className="h-[169px] w-[164px]">
      <div className="bg-[#d9d9d9] size-full rounded-[8px]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start leading-[15.125px] px-[16px] not-italic w-full">
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] relative shrink-0 text-[#5c4033] text-[16px] w-full">배경화면 제목</p>
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] relative shrink-0 text-[12px] text-[rgba(92,64,51,0.8)] w-full">2000. 00. 00</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white h-[243px] overflow-clip relative rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 w-[164px] cursor-pointer">
      <Rectangle />
      <div className="pt-[16px]">
        <Frame1 />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center overflow-x-auto overflow-y-clip pb-[8px] pt-0 px-0 relative shrink-0 w-full">
      {[...Array(3).keys()].map((_, i) => (
        <Frame2 key={i} />
      ))}
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start px-[16px] pt-[24px] w-full">
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[15.125px] not-italic relative shrink-0 text-[#5c4033] text-[14px] w-full">관련 배경화면</p>
      <Frame14 />
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

export default function DownloadDetail({ onBack }: { onBack: () => void }) {
  const [selectedSize, setSelectedSize] = useState<'mobile' | 'tablet' | 'pc'>('mobile');

  return (
    <div className="flex justify-center items-start min-h-[100dvh] bg-[#fff9f0] w-full overflow-x-hidden overflow-y-auto">
      <div className="bg-[#fff9f0] relative w-full max-w-[430px] min-h-[100dvh] pb-[30px]" style={{ margin: '0 auto', touchAction: 'pan-y' }}>
        {/* 상단 이미지 */}
        <div className="relative w-full aspect-[430/526] overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[155.24%] left-[-0.03%] max-w-none top-[-38.67%] w-[100.05%]" src={img1} />
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
        <Frame13 selectedSize={selectedSize} onSelectSize={setSelectedSize} />
        <Frame15 />

        {/* 하단 푸터 */}
        <div className="bg-[rgba(124,102,89,0.8)] h-[174px] w-full mt-[30px]">
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21.125px] not-italic text-[#fff9f0] text-[13px] text-center pt-[42px] whitespace-pre">{`둥실월드 ⓒ 2025 · Font: 학교안심 둥근미소`}</p>
        </div>
      </div>
    </div>
  );
}