import svgPaths from "./svg-heeqbqbi5k";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p167c8100} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p6414df0} id="Vector_2" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative rounded-[30px] size-full">
      <div aria-hidden="true" className="absolute border border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[15px] py-[7px] relative size-full">
          <Icon />
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#5c4033] text-[14px] text-center text-nowrap whitespace-pre">소식 받기</p>
        </div>
      </div>
    </div>
  );
}