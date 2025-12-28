import img1 from "figma:asset/348e3a8eec568e3fbe96c6fc94e60e5aa5b4f94d.png";

function Component() {
  return (
    <div className="absolute h-[421px] left-0 top-0 w-[343px]" data-name="가을의 산책 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[176.72%] left-[-0.03%] max-w-none top-[-54.39%] w-[100.05%]" src={img1} />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[14px] items-start leading-[15.125px] left-[22px] not-italic top-[443px] w-[106px]">
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] relative shrink-0 text-[#5c4033] text-[18px] w-full">가을의 산책</p>
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] relative shrink-0 text-[14px] text-[rgba(92,64,51,0.8)] w-full">2025. 11. 27</p>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#7b9c00] relative rounded-[1.67772e+07px] shrink-0 size-[24px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[24px]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#adcb59] relative rounded-[1.67772e+07px] shrink-0 size-[24px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[24px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="basis-0 bg-[#f2d67c] grow h-[24px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] w-full" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[24px] items-start left-[247px] top-[381px] w-[80px]" data-name="Container">
      <Container />
      <Container1 />
      <Container2 />
    </div>
  );
}

export default function Component1() {
  return (
    <div className="bg-white overflow-clip relative rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-full" data-name="Component 3">
      <Component />
      <Frame />
      <Container3 />
    </div>
  );
}