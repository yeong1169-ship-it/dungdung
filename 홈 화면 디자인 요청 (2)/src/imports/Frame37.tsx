import svgPaths from "./svg-ozx890nxwd";

function Component() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="인스타">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_937)" id="ì¸ì¤í">
          <path d={svgPaths.p4b98700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p29b16f80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M14.5833 5.41667H14.5917" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_937">
            <rect fill="white" height="20" width="20" />
          </clipPath>
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
          <Component />
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#fff9f0] text-[14px] text-center text-nowrap whitespace-pre">인스타그램 팔로우</p>
        </div>
      </div>
    </div>
  );
}