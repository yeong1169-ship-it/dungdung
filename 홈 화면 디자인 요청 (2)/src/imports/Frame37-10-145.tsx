import svgPaths from "./svg-lzt3cd0q8b";

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p34c365ef} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2 2V5.33333H5.33333" id="Vector_2" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p5cd1040} id="Vector_3" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1d81dd80} id="Vector_4" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function QuoteCard() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[10px] items-center p-[5px] right-0 rounded-[1.67772e+07px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-0" data-name="QuoteCard">
      <Icon />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[22px] h-[29.75px] items-center justify-center relative shrink-0 w-full">
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#8faf3e] text-[18px] text-center text-nowrap whitespace-pre">오늘 둥실이의 한마디</p>
      <QuoteCard />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame1 />
      <div className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#5c4033] text-[16px] text-center w-full">
        <p className="mb-0">오랫동안 꿈을 그리는 사람은</p>
        <p>마침내 그 꿈을 닮아간다.</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-full">
      <Frame2 />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21px] not-italic opacity-70 relative shrink-0 text-[#5c4033] text-[13px] text-center w-full">-앙드레 말로-</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <g filter="url(#filter0_i_1_558)" id="Vector">
            <path d={svgPaths.p3cca6280} fill="var(--fill-0, #FFF9F0)" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="15.1799" id="filter0_i_1_558" width="17.6667" x="1.66699" y="3.32031">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_558" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[19px] py-[7px] relative rounded-[19px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#ffa7a7] border-solid inset-0 pointer-events-none rounded-[19px] shadow-[3px_4px_6px_0px_rgba(0,0,0,0.09)]" />
      <Icon1 />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#fff9f0] text-[14px] text-center text-nowrap whitespace-pre">좋아요</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[10px] items-center relative w-full">
        <Frame3 />
        <Frame />
      </div>
    </div>
  );
}

export default function Frame4() {
  return (
    <div className="relative rounded-[24px] size-full">
      <div aria-hidden="true" className="absolute border border-[rgba(229,254,219,0.73)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center px-[21px] py-[17px] relative size-full">
          <Frame5 />
        </div>
      </div>
    </div>
  );
}