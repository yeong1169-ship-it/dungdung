import svgPaths from "../imports/svg-uc9kxffmkk";
import imgImage3 from "figma:asset/bdd2fb2a65c87ab36535d72154ce7b87b95995b2.png";

function EEEE() {
  return (
    <div className="absolute contents inset-[0_0.21%_0.2%_0]" data-name="메모보드">
      <div className="absolute inset-[0_0.21%_0.2%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 286 401">
          <path d={svgPaths.p1c6ccb00} fill="var(--fill-0, #5C4033)" id="Rectangle 24" />
        </svg>
      </div>
      <div className="absolute inset-[5.37%_5.36%_7.84%_5.15%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 257 349">
          <path d={svgPaths.p5bc8280} fill="var(--fill-0, white)" id="Rectangle 25" />
        </svg>
      </div>
      <div className="absolute inset-[1.04%_26.61%_91.92%_26.41%]" data-name="Union">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 135 29">
          <path d={svgPaths.p1007a340} fill="var(--fill-0, #B1B1B1)" id="Union" />
        </svg>
      </div>
      <div className="absolute inset-[0_29.91%_96.04%_29.7%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 16">
          <path d={svgPaths.p34d8ad80} fill="var(--fill-0, #727272)" id="Rectangle 26" />
        </svg>
      </div>
      <div className="absolute inset-[0.57%_29.91%_97.74%_29.7%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 7">
          <path d={svgPaths.p34cbe9b0} fill="var(--fill-0, #C4C4C4)" id="Rectangle 27" />
        </svg>
      </div>
      <div className="absolute inset-[3.39%_66.14%_92.23%_26.14%]" data-name="Subtract">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 18">
          <path d={svgPaths.p6e03300} fill="var(--fill-0, #A68170)" id="Subtract" />
        </svg>
      </div>
      <div className="absolute inset-[3.39%_26.34%_92.23%_66.13%]" data-name="Subtract_2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 18">
          <path d={svgPaths.p2817e980} fill="var(--fill-0, #A68170)" id="Subtract_2" />
        </svg>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[401.18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <EEEE />
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[401.18px] items-start left-1/2 -translate-x-1/2 top-[1001px] w-[286.398px]" data-name="Component2">
      <Icon5 />
    </div>
  );
}

function Image8() {
  return (
    <div className="h-[433.585px] relative shrink-0 w-full mt-[0px] mr-[0px] mb-[0px] ml-[-11px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full scale-[1.8]" src={imgImage3} />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col h-[300px] items-start left-[calc(50%-90px)] overflow-visible top-[1230px] w-[200px] z-10 mt-[0px] mr-[0px] mb-[-30px] ml-[0px]" data-name="Container">
      <Image8 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[1300px] w-[280px]" data-name="Frame18">
    </div>
  );
}

export function DungsilInfo() {
  return (
    <>
      <p className="absolute font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[24px] left-[calc(50%-2.3px)] not-italic text-[#8faf3e] text-[24px] text-center text-nowrap top-[949px] translate-x-[-50%]">둥실이 소개</p>
      <Component2 />
      <Container19 />
      <Frame1 />
    </>
  );
}