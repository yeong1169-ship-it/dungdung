import svgPaths from "./svg-2gak26ei1l";
import imgImg45652 from "figma:asset/df40fff759569b6cc2ec4c575c437a5dcb7f84fd.png";
import { imgImg45651 } from "./svg-vjo5j";

function LucideMenu() {
  return (
    <div className="absolute left-[calc(75%+51.75px)] size-[24px] top-[59px]" data-name="lucide/menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="lucide/menu">
          <path d="M4 5H20M4 12H20M4 19H20" id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Mask group">
      <div className="[grid-area:1_/_1] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1px] mask-size-[32px_32px] ml-[-1px] mt-[-1px] relative size-[34px]" data-name="IMG_4565 1" style={{ maskImage: `url('${imgImg45651}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImg45652} />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[10px] relative rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px]" />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#5c4033] text-[16px] text-nowrap whitespace-pre">안녕! 오늘 어떤 하루였어?</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full">
      <MaskGroup />
      <Frame1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <div className="h-[13px] relative shrink-0 w-[10px]" data-name="Vector">
        <div className="absolute inset-[-5.77%_-7.5%]" style={{ "--stroke-0": "rgba(92, 64, 51, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 15">
            <path d={svgPaths.pd799400} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#5c4033] text-[12px] text-nowrap whitespace-pre">저장</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-end justify-center left-[16px] top-[122px]">
      <Frame2 />
      <Frame />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-[#8faf3e] box-border content-stretch flex gap-[10px] items-center justify-center left-[calc(25%+19.25px)] px-[16px] py-[10px] rounded-bl-[10px] rounded-tl-[10px] rounded-tr-[10px] top-[209px]">
      <div aria-hidden="true" className="absolute border border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none rounded-bl-[10px] rounded-tl-[10px] rounded-tr-[10px]" />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#fff9f0] text-[16px] text-nowrap whitespace-pre">나는 오늘 정말 재밌는 일이 있었어!</p>
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 bg-[rgba(92,64,51,0.08)] grow h-[48px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#5c4033] border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] w-full" />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_13_257)" id="Icon">
          <path d={svgPaths.p144cdc80} id="Vector" stroke="var(--stroke-0, #FFF9F0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17ab8800} id="Vector_2" stroke="var(--stroke-0, #FFF9F0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_13_257">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#5c4033] relative rounded-[1.67772e+07px] shrink-0 size-[48px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[48px] items-center relative shrink-0 w-full" data-name="Container">
      <Container />
      <Button />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 p-[16px] top-[732px] w-[375px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none" />
      <Container1 />
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

export default function Component() {
  return (
    <div className="bg-[#fff9f0] relative size-full" data-name="톡">
      <div className="absolute bg-[rgba(92,64,51,0.1)] h-[92px] left-0 top-0 w-[375px]" />
      <p className="absolute font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[15.125px] left-[calc(25%+69.25px)] not-italic text-[#5c4033] text-[18px] text-nowrap top-[63px] whitespace-pre">둥실이</p>
      <LucideMenu />
      <Frame3 />
      <Frame4 />
      <div className="absolute h-0 left-0 top-[92px] w-[375px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 1">
            <line id="Line 1" stroke="var(--stroke-0, #E5E5E5)" x2="375" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Container2 />
      <div className="absolute flex items-center justify-center left-[16px] size-[24.03px] top-[59.18px]" style={{ "--transform-inner-width": "24", "--transform-inner-height": "24" } as React.CSSProperties}>
        <div className="flex-none rotate-[89.928deg]">
          <LucideChevronDown />
        </div>
      </div>
    </div>
  );
}