import svgPaths from "./svg-fj64rgzgdx";

function Icon() {
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

export default function Frame() {
  return (
    <div className="relative rounded-[19px] size-full">
      <div aria-hidden="true" className="absolute border border-[#ffa7a7] border-solid inset-0 pointer-events-none rounded-[19px] shadow-[3px_4px_6px_0px_rgba(0,0,0,0.09)]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[19px] py-[7px] relative size-full">
          <Icon />
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#fff9f0] text-[14px] text-center text-nowrap whitespace-pre">좋아요</p>
        </div>
      </div>
    </div>
  );
}