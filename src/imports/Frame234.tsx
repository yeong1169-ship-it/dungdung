import imgImg5002 from "figma:asset/32c2ed77107863208474c229bba11b2b12537bf5.png";

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[30px] items-center left-[30px] not-italic text-center top-[170px] w-[315px]">
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[24px] relative shrink-0 text-[#fff9f0] text-[24px] w-full">둥실이 이름 유래</p>
      <div className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] relative shrink-0 text-[#5c4033] text-[16px] w-full">
        <p className="mb-0">
          둥실둥실에서 유래되었어요!
          <br aria-hidden="true" />
          바다에 몸을 맡기고 둥실둥실 떠다니는 모습처럼
          <br aria-hidden="true" />
          {`억지로 애쓰지 않고, 파도에 몸을 맡기듯 자연스럽게 `}
        </p>
        <p>
          {`흘러가며 그 과정에서 답을 찾는 `}
          <br aria-hidden="true" />
          그런 성장 방식을 담고 있어요.
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[721px] left-0 top-0 w-[375px]" data-name="Container">
      <div className="absolute h-[721px] left-0 top-0 w-[375px]" data-name="IMG_5002">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[144.52%] left-[-0.03%] max-w-none top-[-3.05%] w-[100.06%]" src={imgImg5002} />
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute h-[721px] left-0 top-0 w-[375px]" data-name="IMG_5002">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[144.52%] left-[-0.03%] max-w-none top-[-3.05%] w-[100.06%]" src={imgImg5002} />
        </div>
      </div>
      <div className="absolute bg-gradient-to-b from-[#fff9f0] from-[21.684%] h-[196px] left-0 to-[rgba(255,249,240,0)] top-0 w-[375px]" />
      <div className="absolute flex h-[196px] items-center justify-center left-0 top-[526px] w-[375px]">
        <div className="flex-none rotate-[180deg]">
          <div className="bg-gradient-to-b from-[#fff9f0] from-[21.684%] h-[196px] to-[rgba(255,249,240,0)] w-[375px]" />
        </div>
      </div>
      <Frame />
      <Container />
      <div className="absolute bg-gradient-to-b from-[#fff9f0] from-[21.684%] h-[196px] left-0 to-[rgba(255,249,240,0)] top-0 w-[375px]" />
      <div className="absolute flex h-[196px] items-center justify-center left-0 top-[526px] w-[375px]">
        <div className="flex-none rotate-[180deg]">
          <div className="bg-gradient-to-b from-[#fff9f0] from-[21.684%] h-[196px] to-[rgba(255,249,240,0)] w-[375px]" />
        </div>
      </div>
      <Frame />
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="relative size-full">
      <Group />
    </div>
  );
}