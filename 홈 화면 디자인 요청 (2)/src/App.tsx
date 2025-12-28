import { useState, useEffect } from "react";
import svgPaths from "./imports/svg-tgq24q0gmi";
import imgBackgroundRemoved17637192152061 from "figma:asset/bc28cd473dc33452fac860014ff623f17e384d50.png";
import imgChatGptImage202511210654213 from "figma:asset/4f56d3d343efc0845799c9076b647eefe17bd0fd.png";
import imgBackgroundRemoved17637192322463 from "figma:asset/27d9fe2f99ab028b38109bd0b59e833c199f2107.png";
import imgImg45651 from "figma:asset/df40fff759569b6cc2ec4c575c437a5dcb7f84fd.png";
import imgImg4999 from "figma:asset/54a43d0beca06b830973d9057e46e7ac62f601bb.png";
import imgImg4979 from "figma:asset/225ce0cfd97b22871865e5e8d58354686bc3f9ce.png";
import imgImg5001 from "figma:asset/146af42f75761abc257c53639d24feabe14f76e5.png";
import imgImg4997 from "figma:asset/10bbc4945e73df70c021128cd75157b754e50d2b.png";
import imgImg4996 from "figma:asset/bdd2fb2a65c87ab36535d72154ce7b87b95995b2.png";
import imgImg5002 from "figma:asset/32c2ed77107863208474c229bba11b2b12537bf5.png";
import imgEyesClosed from "figma:asset/7bbd47a6d80b486daf9b810b463350511c78079b.png";
import { toast, Toaster } from "sonner@2.0.3";
import { motion } from "framer-motion";
import Download from "./pages/Download";
import Talk from "./pages/Talk";
import DownloadDetail from "./pages/DownloadDetail";
import Shop from "./pages/Shop";
import Collection from "./pages/Collection";
import PhotoDetail from "./pages/PhotoDetail";
import { DungsilInfo } from "./components/DungsilInfo";
import { LoginModal } from "./components/LoginModal";

// 명언 리스트
const quotes = [
  {
    text: "오랫동안 꿈을 그리는 사람은\n마침내 그 꿈을 닮아간다.",
    author: "앙드레 말로"
  },
  {
    text: "시작이 반이다.\n늘부터 시작해보자!",
    author: "한국 속담"
  },
  {
    text: "작은 걸음도 걸음이다.\n천천히 나아가면 돼.",
    author: "둥실이"
  },
  {
    text: "완벽하지 않아도 괜찮아.\n지금 이 순간을 즐겨봐!",
    author: "둥실이"
  },
  {
    text: "실패는 성공의 어머니다.\n다시 도전하면 돼!",
    author: "토머스 에디슨"
  },
  {
    text: "포기하지 마.\n넘어져도 다시 일어나면 돼!",
    author: "둥실이"
  }
];

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

function QuoteCard({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[10px] items-center p-[5px] right-0 rounded-[1.67772e+07px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-0 cursor-pointer" 
      data-name="QuoteCard"
    >
      <Icon />
    </button>
  );
}

function Frame1({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="content-stretch flex gap-[22px] h-[29.75px] items-center justify-center relative shrink-0 w-full">
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#8faf3e] text-[18px] text-center text-nowrap whitespace-pre">오늘 둥실이의 한마디</p>
      <QuoteCard onClick={onRefresh} />
    </div>
  );
}

function Frame2({ quote }: { quote: { text: string; author: string } }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame1 onRefresh={() => {}} />
      <div className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#5c4033] text-[16px] text-center w-full whitespace-pre-line">
        {quote.text}
      </div>
    </div>
  );
}

function Frame3({ quote }: { quote: { text: string; author: string } }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-full">
      <Frame2 quote={quote} />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21px] not-italic opacity-70 relative shrink-0 text-[#5c4033] text-[13px] text-center w-full">-{quote.author}-</p>
    </div>
  );
}

function Icon1({ isLiked }: { isLiked?: boolean }) {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path 
            d={svgPaths.p3cca6280} 
            fill={isLiked ? "#FFF9F0" : "transparent"}
            stroke={isLiked ? "#FFF9F0" : "#5C4033"}
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}

function LikeButton({ onClick, isLiked, setIsLiked, isLoggedIn }: { onClick: () => void; isLiked: boolean; setIsLiked: (value: boolean) => void; isLoggedIn: boolean }) {
  const handleClick = () => {
    if (!isLoggedIn) {
      onClick(); // 로그인 안 됐으면 로그인 모달 열기
      return;
    }
    setIsLiked(!isLiked);
    onClick();
  };
  
  return (
    <button 
      onClick={handleClick}
      className="relative box-border content-stretch flex gap-[10px] items-center justify-center px-[19px] py-[7px] rounded-[19px] shrink-0 hover:scale-105 transition-transform cursor-pointer overflow-hidden"
      style={{
        backgroundColor: isLiked ? 'transparent' : 'transparent',
        border: isLiked ? 'none' : '1px solid #5C4033'
      }}
    >
      {/* 핑크 그라데이션 배경 - 눌렀을 때만 표시 */}
      {isLiked && <div className="absolute inset-0 bg-gradient-to-br from-[#FFD2D2] to-[#FF9999]" />}
      {isLiked && <div aria-hidden="true" className="absolute border border-[#ffa7a7] border-solid inset-0 pointer-events-none rounded-[19px] shadow-[3px_4px_6px_0px_rgba(0,0,0,0.09)]" />}
      <Icon1 isLiked={isLiked} />
      <p 
        className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre z-10"
        style={{ color: isLiked ? '#fff9f0' : '#5C4033' }}
      >
        좋아요
      </p>
    </button>
  );
}

function Frame5({ quote, onLike, isLiked, setIsLiked, isLoggedIn }: { quote: { text: string; author: string }; onLike: () => void; isLiked: boolean; setIsLiked: (value: boolean) => void; isLoggedIn: boolean }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[10px] items-center relative w-full">
        <Frame3 quote={quote} />
        <LikeButton onClick={onLike} isLiked={isLiked} setIsLiked={setIsLiked} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}

function Frame4({ quote, onRefresh, onLike, isLiked, setIsLiked, isLoggedIn }: { quote: { text: string; author: string }; onRefresh: () => void; onLike: () => void; isLiked: boolean; setIsLiked: (value: boolean) => void; isLoggedIn: boolean }) {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] box-border content-stretch flex flex-col gap-[8px] h-[190px] items-center left-1/2 -translate-x-1/2 px-[21px] py-[17px] rounded-[24px] top-[431px] w-[86.4%] max-w-[324px]">
      <div aria-hidden="true" className="absolute border border-[rgba(229,254,219,0.73)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex gap-[22px] h-[29.75px] items-center justify-center relative shrink-0 w-full">
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#8faf3e] text-[18px] text-center text-nowrap whitespace-pre">오늘 둥실이의 한마디</p>
        <QuoteCard onClick={onRefresh} />
      </div>
      <div className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#5c4033] text-[16px] text-center w-full whitespace-pre-line">
        {quote.text}
      </div>
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21px] not-italic opacity-70 relative shrink-0 text-[#5c4033] text-[13px] text-center w-full">-{quote.author}-</p>
      <LikeButton onClick={onLike} isLiked={isLiked} setIsLiked={setIsLiked} isLoggedIn={isLoggedIn} />
    </div>
  );
}

function Component() {
  return null;
}

function Group() {
  return (
    <div className="h-[17.242px] relative w-[21.634px] left-[-6px] mx-[-22px] my-[-8px] mt-[-7px] mr-[-22px] mb-[-8px] ml-[--1px] ml-[-7px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 18">
        <g id="Group 11">
          <ellipse cx="10.7764" cy="11.3155" fill="var(--fill-0, #FF9999)" id="Ellipse 3" rx="7.54342" ry="5.92697" />
          <ellipse cx="3.12242" cy="3.80264" fill="var(--fill-0, #FF9999)" id="Ellipse 4" rx="2.69408" ry="2.15526" transform="rotate(-13.4841 3.12242 3.80264)" />
          <ellipse cx="10.2378" cy="2.15526" fill="var(--fill-0, #FF9999)" id="Ellipse 5" rx="2.69408" ry="2.15526" />
          <ellipse cx="18.3606" cy="4.03272" fill="var(--fill-0, #FF9999)" id="Ellipse 6" rx="2.69408" ry="2.15526" transform="rotate(20.2629 18.3606 4.03272)" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="h-[14.39px] relative w-[18.055px] mx-[-22px] my-[0px] mt-[-5px] mr-[-22px] mb-[0px] ml-[-19px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 15">
        <g id="Group 12">
          <ellipse cx="8.99302" cy="9.44357" fill="var(--fill-0, #FF9999)" id="Ellipse 3" rx="6.29542" ry="4.9464" />
          <ellipse cx="2.6058" cy="3.17289" fill="var(--fill-0, #FF9999)" id="Ellipse 4" rx="2.24837" ry="1.79869" transform="rotate(-13.4841 2.6058 3.17289)" />
          <ellipse cx="8.54373" cy="1.79869" fill="var(--fill-0, #FF9999)" id="Ellipse 5" rx="2.24837" ry="1.79869" />
          <ellipse cx="15.3224" cy="3.36579" fill="var(--fill-0, #FF9999)" id="Ellipse 6" rx="2.24837" ry="1.79869" transform="rotate(20.2629 15.3224 3.36579)" />
        </g>
      </svg>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] items-center justify-between leading-[24px] not-italic relative shrink-0 text-[#5c4033] text-[16px] text-nowrap w-[77px] whitespace-pre">
      <p className="relative shrink-0 mt-[0px] mr-[0px] mb-[0px] ml-[1px]">{`이름: `}</p>
      <p className="relative shrink-0">둥실이</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame17 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] items-center justify-between leading-[24px] not-italic relative shrink-0 text-[#5c4033] text-[16px] text-nowrap w-[65px] whitespace-pre">
      <p className="relative shrink-0">{`정체: `}</p>
      <p className="relative shrink-0">수달</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0">
      <Frame20 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#5c4033] text-[16px] w-[213px]">
      <p className="relative shrink-0 text-nowrap whitespace-pre">{`좋아하는 것: `}</p>
      <p className="relative shrink-0 w-[129px]">바다에 둥실 떠 있기, 꾸준히 하는 것</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Frame25 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] items-start justify-between leading-[24px] not-italic relative shrink-0 text-[#5c4033] text-[16px] w-[196px]">
      <p className="relative shrink-0 text-nowrap whitespace-pre">{`싫어하는 것: `}</p>
      <p className="relative shrink-0 w-[115px]">무조건적인 위로, 완벽주의</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0">
      <Frame29 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(50%-32px)] top-[1047px] w-[213px] mt-[0px] mr-[0px] mb-[0px] ml-[-75px]">
      <Frame12 />
      <Frame13 />
      <Frame14 />
      <Frame16 />
    </div>
  );
}

function BackgroundRemoved() {
  return (
    <div className="relative shrink-0 size-[78px]" data-name="background-removed-1763719215206 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border relative size-[78px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBackgroundRemoved17637192152061} />
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6px] items-center not-italic relative text-[#5c4033] text-center w-full">
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[24px] relative shrink-0 text-[16px] w-full">솔직함</p>
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[15.125px] opacity-80 relative shrink-0 text-[12px] w-full">
          {`실패도, 좌절도 숨기지 않아요 `}
          <br aria-hidden="true" />
          완벽한 척하지 않고 불안전한 과정을 그대로 보여줘요
        </p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-[rgba(255,255,255,0.97)] relative rounded-[24px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#efffc5] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center px-[21px] py-[19px] relative w-full">
          <BackgroundRemoved />
          <Frame19 />
        </div>
      </div>
    </div>
  );
}

function ChatGptImage() {
  return (
    <div className="relative shrink-0 size-[78px]" data-name="ChatGPT Image 2025년 11월 21일 오후 06_54_21 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border relative size-[78px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgChatGptImage202511210654213} />
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6px] items-center not-italic relative text-[#5c4033] text-center w-full">
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[24px] relative shrink-0 text-[16px] w-full">회복력</p>
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[15.125px] opacity-80 relative shrink-0 text-[12px] w-full">
          포기해도 결국 다시 일어나요 넘어지고 좌절해도 괜찮아요
          <br aria-hidden="true" />
          파도처럼 오르락내리락하면서도 결국 앞으로 나아가요
        </p>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[rgba(255,255,255,0.97)] relative rounded-[24px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#efffc5] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center px-[21px] py-[19px] relative w-full">
          <ChatGptImage />
          <Frame30 />
        </div>
      </div>
    </div>
  );
}

function BackgroundRemoved1() {
  return (
    <div className="relative shrink-0 size-[78px]" data-name="background-removed-1763719232246 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border relative size-[78px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBackgroundRemoved17637192322463} />
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6px] items-center not-italic relative text-[#5c4033] text-center w-full">
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[24px] relative shrink-0 text-[16px] w-full">도전적</p>
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[15.125px] opacity-80 relative shrink-0 text-[12px] w-full">
          정말 많은 걸 하고 싶어 해요
          <br aria-hidden="true" />
          방법을 몰라도 일단 시작해요 실패할 수도 있지만 겁내지 않고 도전해요
        </p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[rgba(255,255,255,0.97)] relative rounded-[24px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#efffc5] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center px-[21px] py-[19px] relative w-full">
          <BackgroundRemoved1 />
          <Frame31 />
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[17px] items-start left-[4.27%] right-[4.27%] top-[2344px]">
      <Frame21 />
      <Frame22 />
      <Frame23 />
    </div>
  );
}

function Img() {
  return (
    <div className="relative shrink-0 size-[96px]" data-name="IMG_4565 1">
      <div className="absolute inset-0 rounded-[690px]" data-name="IMG_4565 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[690px] size-full" src={imgImg45651} />
      </div>
    </div>
  );
}

function CtaCard() {
  return (
    <div className="h-[4px] w-[74px] bg-gradient-to-br from-[#FFD2D2] to-[#FF9999] rounded-full" />
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center not-italic relative shrink-0 text-[#5c4033] text-center w-full">
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[24px] relative shrink-0 text-[16px] w-full">혼자 고민하고 있어?</p>
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[15.125px] opacity-80 relative shrink-0 text-[12px] w-full">
        혼자 고민하지 말고 일단 시작해보자! 둥실이가 함께 할게
        <br aria-hidden="true" />
        매주 금요일 저녁 7시에 만나!
      </p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <Img />
      <CtaCard />
      <Frame32 />
    </div>
  );
}

function Component1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="인스타">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_438)" id="ì¸ì¤í">
          <path d={svgPaths.p4b98700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p29b16f80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M14.5833 5.41667H14.5917" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_438">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <a 
      href="https://www.instagram.com/dungdung_otter/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="relative box-border content-stretch flex gap-[10px] items-center justify-center px-[19px] py-[7px] rounded-[19px] shrink-0 overflow-hidden cursor-pointer"
    >
      {/* 핑크 그라데이션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD2D2] to-[#FF9999]" />
      <div aria-hidden="true" className="absolute border border-[#ffa7a7] border-solid inset-0 pointer-events-none rounded-[19px] shadow-[3px_4px_6px_0px_rgba(0,0,0,0.09)]" />
      <Component1 />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#fff9f0] text-[14px] text-center text-nowrap whitespace-pre z-10">인스타그램 팔로우</p>
    </a>
  );
}

function Frame27() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[30px] items-center relative w-full">
        <Frame26 />
        <Frame15 />
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.97)] box-border content-stretch flex flex-col gap-[10px] items-center left-[4%] right-[4%] px-[21px] py-[19px] rounded-[24px] top-[3019px]">
      <div aria-hidden="true" className="absolute border border-[#efffc5] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Frame27 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute left-1/2 top-[1449px] -translate-x-1/2 w-full max-w-[430px] aspect-[430/827]" data-name="Frame28">
      {/* 배경 이미지와 그라데이션 그룹 */}
      <div className="absolute inset-0">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[144.52%] left-[-0.03%] max-w-none top-[-3.05%] w-[100.06%]" src={imgImg5002} />
          </div>
        </div>
        
        {/* 상단 그라데이션 */}
        <div className="absolute bg-gradient-to-b from-[#fff9f0] from-[21.684%] h-[27.2%] left-0 to-[rgba(255,249,240,0)] top-0 w-full" />
        
        {/* 하단 그라데이션 */}
        <div className="absolute flex h-[27.2%] items-center justify-center left-0 top-[72.9%] w-full">
          <div className="flex-none rotate-[180deg] w-full h-full">
            <div className="bg-gradient-to-b from-[#fff9f0] from-[21.684%] h-full to-[rgba(255,249,240,0)] w-full" />
          </div>
        </div>
      </div>
      
      {/* 텍스트 컨텐츠 */}
      <div className="absolute content-stretch flex flex-col gap-[34px] items-center left-1/2 -translate-x-1/2 not-italic text-center top-[23.6%] w-[315px]">
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
    </div>
  );
}

function Icon2({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p2bbf6680} id="Vector" stroke={isActive ? "#8FAF3E" : "#5C4033"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2ea10f40} id="Vector_2" stroke={isActive ? "#8FAF3E" : "#5C4033"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame10({ onClick, isActive }: { onClick: () => void; isActive: boolean }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer">
      <Icon2 isActive={isActive} />
      <p className={`font-['Pretendard:SemiBold',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[10px] text-center w-[min-content] ${isActive ? 'text-[#8faf3e]' : 'text-[#5c4033]'}`}>Home</p>
    </button>
  );
}

function Icon3({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p341e1d00} id="Vector" stroke={isActive ? "#8FAF3E" : "#5C4033"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M14 19L17 22V16.5" id="Vector_2" stroke={isActive ? "#8FAF3E" : "#5C4033"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M17 22L20 19" id="Vector_3" stroke={isActive ? "#8FAF3E" : "#5C4033"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1b53d300} id="Vector_4" stroke={isActive ? "#8FAF3E" : "#5C4033"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame9({ onClick, isActive }: { onClick: () => void; isActive: boolean }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer">
      <Icon3 isActive={isActive} />
      <p className={`font-['Pretendard:SemiBold',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[10px] w-[min-content] ${isActive ? 'text-[#8faf3e]' : 'text-[#5c4033]'}`}>Download</p>
    </button>
  );
}

function Icon4({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pfbeaf00} id="Vector" stroke={isActive ? "#8FAF3E" : "#5C4033"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M8 12H8.01" id="Vector_2" stroke={isActive ? "#8FAF3E" : "#5C4033"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 12H12.01" id="Vector_3" stroke={isActive ? "#8FAF3E" : "#5C4033"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 12H16.01" id="Vector_4" stroke={isActive ? "#8FAF3E" : "#5C4033"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame8({ onClick, isActive }: { onClick: () => void; isActive: boolean }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer">
      <Icon4 isActive={isActive} />
      <p className={`font-['Pretendard:SemiBold',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[10px] text-center w-[min-content] ${isActive ? 'text-[#8faf3e]' : 'text-[#5c4033]'}`}>Talk</p>
    </button>
  );
}

function Icon5({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1219e180} id="Vector" stroke={isActive ? "#8FAF3E" : "var(--stroke-0, #5C4033)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 6H6" id="Vector_2" stroke={isActive ? "#8FAF3E" : "var(--stroke-0, #5C4033)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 10H6" id="Vector_3" stroke={isActive ? "#8FAF3E" : "var(--stroke-0, #5C4033)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 14H6" id="Vector_4" stroke={isActive ? "#8FAF3E" : "var(--stroke-0, #5C4033)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 18H6" id="Vector_5" stroke={isActive ? "#8FAF3E" : "var(--stroke-0, #5C4033)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p20731300} id="Vector_6" stroke={isActive ? "#8FAF3E" : "var(--stroke-0, #5C4033)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame7({ onClick, isActive }: { onClick: () => void; isActive: boolean }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer">
      <Icon5 isActive={isActive} />
      <p className={`font-['Pretendard:SemiBold',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[10px] w-[min-content] ${isActive ? 'text-[#8faf3e]' : 'text-[#5c4033]'}`}>Collection</p>
    </button>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p8aac400} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3.10254 6.03418H20.8965" id="Vector_2" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p24f06100} id="Vector_3" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame6({ onClick, isActive }: { onClick: () => void; isActive: boolean }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer">
      <Icon6 />
      <p className={`font-['Pretendard:SemiBold',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[10px] text-center w-[min-content] ${isActive ? 'text-[#8faf3e]' : 'text-[#5c4033]'}`}>Shop</p>
    </button>
  );
}

function Frame11({ onNavigate, currentPage }: { onNavigate: (page: "home" | "download" | "talk" | "shop" | "collection" | "downloadDetail" | "photoDetail") => void; currentPage: string }) {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 p-[0px]">
      <Frame10 onClick={() => onNavigate("home")} isActive={currentPage === "home"} />
      <Frame9 onClick={() => onNavigate("download")} isActive={currentPage === "download" || currentPage === "downloadDetail"} />
      <Frame8 onClick={() => onNavigate("talk")} isActive={currentPage === "talk"} />
      <Frame7 onClick={() => onNavigate("collection")} isActive={currentPage === "collection"} />
      <Frame6 onClick={() => onNavigate("shop")} isActive={currentPage === "shop"} />
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "download" | "talk" | "shop" | "collection" | "downloadDetail" | "photoDetail">("home");
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isEyesClosed, setIsEyesClosed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [savedQuotes, setSavedQuotes] = useState<Array<{ id: number; quote: string; date: string; category: string; author: string }>>([
    // 테스트용 명언 데이터
    { id: 101, quote: "\"오랫동안 꿈을 그리는 사람은\n마침내 그 꿈을 닮아간다.\"", date: "2024. 12. 18", category: "오늘 둥실이의 한마디", author: "앙드레 말로" },
    { id: 102, quote: "\"작은 걸음도 걸음이다.\n천천히 나아가면 돼.\"", date: "2024. 12. 17", category: "오늘 둥실이의 한마디", author: "둥실이" },
    { id: 103, quote: "\"오늘도 파이팅!\"", date: "2024. 12. 16", category: "둥실이와의 채팅", author: "둥실이" },
    { id: 104, quote: "\"괜찮아, 천천히 가도 돼\"", date: "2024. 12. 15", category: "둥실이와의 채팅", author: "둥실이" },
  ]);
  const [savedImages, setSavedImages] = useState<Array<{ id: number; imageUrl: string; savedDate: Date }>>([
    // 테스트용 이미지 데이터 (회색 플레이스홀더)
    { id: 1, imageUrl: "https://via.placeholder.com/200x200/9E9E9E/FFFFFF?text=Image+1", savedDate: new Date('2024-12-18') },
    { id: 2, imageUrl: "https://via.placeholder.com/200x200/9E9E9E/FFFFFF?text=Image+2", savedDate: new Date('2024-12-18') },
    { id: 3, imageUrl: "https://via.placeholder.com/200x200/9E9E9E/FFFFFF?text=Image+3", savedDate: new Date('2024-12-15') },
    { id: 4, imageUrl: "https://via.placeholder.com/200x200/9E9E9E/FFFFFF?text=Image+4", savedDate: new Date('2024-12-15') },
    { id: 5, imageUrl: "https://via.placeholder.com/200x200/9E9E9E/FFFFFF?text=Image+5", savedDate: new Date('2024-11-20') },
    { id: 6, imageUrl: "https://via.placeholder.com/200x200/9E9E9E/FFFFFF?text=Image+6", savedDate: new Date('2024-11-20') },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 테스트를 위해 true로 설정
  const [userNickname, setUserNickname] = useState("테스트유저");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // viewport 메타 태그 설정
  useEffect(() => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=no');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }
  }, []);

  // 눈 깜빡이는 효과
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsEyesClosed(true);
      setTimeout(() => {
        setIsEyesClosed(false);
      }, 200); // 0.2초 동안 ��� 감기
    }, 3000); // 3초마다 깜빡임

    return () => clearInterval(blinkInterval);
  }, []);

  // 명언이 바뀌거나 savedQuotes가 변경될 때마다 좋아요 상태 업데이트
  useEffect(() => {
    const currentQuoteText = `"${quotes[currentQuoteIndex].text}"`;
    const isQuoteSaved = savedQuotes.some(q => q.quote === currentQuoteText);
    setIsLiked(isQuoteSaved);
  }, [currentQuoteIndex, savedQuotes]);

  // 명언 새로고침
  const handleRefreshQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuoteIndex && quotes.length > 1);
    setCurrentQuoteIndex(newIndex);
  };

  // 좋아요 버튼 클릭
  const handleLike = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    
    if (!isLiked) {
      // 좋아요를 누를 때 - 현재 문장을 savedQuotes에 추가
      const newQuote = {
        id: Date.now(),
        quote: `"${currentQuote.text}"`,
        date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '. ').replace(/\.$/, ''),
        category: '오늘 둥실이의 한마디',
        author: currentQuote.author
      };
      setSavedQuotes([newQuote, ...savedQuotes]);
      
      toast.success("컬렉션 저장되었어요!", {
        description: "둥실이의 한마디를 저장했어요 💚",
        duration: 1500,
        style: {
          background: "rgba(255, 255, 255, 0.97)",
          border: "1px solid #efffc5",
          borderRadius: "24px",
          boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
          fontFamily: "'Hakgyoansim Dunggeunmiso OTF:R', sans-serif",
          color: "#5c4033",
        },
      });
    } else {
      // 좋아요를 취소할 때 - savedQuotes에서 ��재 문장 제거
      const quoteText = `"${currentQuote.text}"`;
      setSavedQuotes(savedQuotes.filter(q => q.quote !== quoteText));
      
      toast("저장이 취소되었어요", {
        description: "컬렉션에서 삭제했어요",
        duration: 1500,
        style: {
          background: "rgba(255, 255, 255, 0.97)",
          border: "1px solid #ffcaca",
          borderRadius: "24px",
          boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
          fontFamily: "'Hakgyoansim Dunggeunmiso OTF:R', sans-serif",
          color: "#5c4033",
        },
      });
    }
  };

  const handleLogin = (nickname: string) => {
    setIsLoggedIn(true);
    setUserNickname(nickname);
  };

  const currentQuote = quotes[currentQuoteIndex];

  // 다운로드 상세 페이지면 DownloadDetail 컴포넌트 렌더링
  if (currentPage === "downloadDetail") {
    return <DownloadDetail onBack={() => setCurrentPage("download")} />;
  }

  // 다운로드 페이지면 Download 컴포넌트 렌더링
  if (currentPage === "download") {
    return <Download onNavigate={setCurrentPage} />;
  }

  // 톡 페이지면 Talk 컴포넌트 렌더링
  if (currentPage === "talk") {
    return <Talk 
      onNavigate={setCurrentPage} 
      savedQuotes={savedQuotes} 
      onSaveQuote={(quote) => setSavedQuotes([quote, ...savedQuotes])} 
      onDeleteQuote={(id) => setSavedQuotes(savedQuotes.filter(q => q.id !== id))} 
      savedImages={savedImages}
      onSaveImage={(image) => setSavedImages([image, ...savedImages])}
      onDeleteImage={(id) => setSavedImages(savedImages.filter(img => img.id !== id))}
      isLoggedIn={isLoggedIn}
      onLoginRequest={() => setIsLoginModalOpen(true)}
    />;
  }

  // 샵 페이지면 Shop 컴포넌트 렌더링
  if (currentPage === "shop") {
    return <Shop onNavigate={setCurrentPage} />;
  }

  // 컬렉션 페이지면 Collection 컴포넌트 렌더링
  if (currentPage === "collection") {
    return <Collection 
      onNavigate={setCurrentPage} 
      savedQuotes={savedQuotes} 
      onDeleteQuote={(id) => setSavedQuotes(savedQuotes.filter(q => q.id !== id))} 
      savedImages={savedImages}
      onDeleteImage={(id) => setSavedImages(savedImages.filter(img => img.id !== id))}
      isLoggedIn={isLoggedIn}
    />;
  }

  // 사진 상세 페이지면 PhotoDetail 컴포넌트 렌더링
  if (currentPage === "photoDetail") {
    return <PhotoDetail onBack={() => setCurrentPage("collection")} onNavigate={setCurrentPage} />;
  }

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(255, 255, 255, 0.97)",
            border: "1px solid #efffc5",
            borderRadius: "24px",
            fontFamily: "'Hakgyoansim Dunggeunmiso OTF:R', sans-serif",
            color: "#5c4033",
          },
        }}
      />
      <div className="flex justify-center items-start min-h-[100dvh] bg-[#fff9f0] w-full overflow-x-hidden overflow-y-auto">
        <div className="bg-[#fff9f0] relative w-full max-w-[430px] h-[3638px] pb-[68px] overflow-x-hidden" data-name="홈" style={{ margin: '0 auto', touchAction: 'pan-y' }}>
          {/* 하단 고정 네비게이션 */}
          <div className="bg-[rgba(255,249,240,0.91)] content-stretch flex flex-col h-[68px] items-center justify-center w-full max-w-[430px] z-50 backdrop-blur-sm" data-name="BottomNav" style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
            <div aria-hidden="true" className="absolute border-t border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none shadow-[0px_-2px_8px_0px_rgba(0,0,0,0.08)]" />
            <Frame11 onNavigate={setCurrentPage} currentPage={currentPage} />
          </div>
          <div className="absolute h-[849px] left-0 top-0 w-full" data-name="IMG_4999">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-full left-1/2 -translate-x-1/2 object-cover w-full" src={imgImg4999} />
            </div>
          </div>
          <div className="absolute h-[48px] left-[calc(75%+160.75px)] top-[1px] w-[52px]" data-name="IMG_4979">
            <motion.div 
              className="absolute inset-0 overflow-hidden pointer-events-none"
              animate={{ x: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img alt="" className="absolute h-[2158.33%] left-[-536.61%] max-w-none top-[-93.75%] w-[717.44%]" src={imgImg4979} />
            </motion.div>
          </div>
          <motion.div 
            className="absolute flex h-[82.85px] items-center justify-center left-[calc(75%-3.73px)] top-[203.58px] w-[85.968px]" 
            style={{ "--transform-inner-width": "69", "--transform-inner-height": "64" } as React.CSSProperties}
            animate={{ x: [-3, 3, -3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex-none rotate-[18.836deg]">
              <div className="h-[64px] relative w-[69px]" data-name="IMG_4979">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[2158.33%] left-[-536.61%] max-w-none top-[-93.75%] w-[717.44%]" src={imgImg4979} />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="absolute flex h-[82.85px] items-center justify-center left-[calc(50%+0.5px)] top-[704px] w-[85.968px]" 
            style={{ "--transform-inner-width": "69", "--transform-inner-height": "64" } as React.CSSProperties}
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="flex-none rotate-[18.836deg]">
              <div className="h-[64px] relative w-[69px]" data-name="IMG_4979">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[2158.33%] left-[-536.61%] max-w-none top-[-93.75%] w-[717.44%]" src={imgImg4979} />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="absolute flex h-[72.095px] items-center justify-center left-[4.3%] top-[754px] w-[74.986px]" 
            style={{ "--transform-inner-width": "60.25", "--transform-inner-height": "55.609375" } as React.CSSProperties}
            animate={{ x: [-2.5, 2.5, -2.5] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          >
            <div className="flex-none rotate-[18.836deg]">
              <div className="h-[55.62px] relative w-[60.255px]" data-name="IMG_4979">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[2158.33%] left-[-536.61%] max-w-none top-[-93.75%] w-[717.44%]" src={imgImg4979} />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="absolute flex h-[47.229px] items-center justify-center left-[calc(75%+34.75px)] top-[631px] w-[49.122px]" 
            style={{ "--transform-inner-width": "39.46875", "--transform-inner-height": "36.421875" } as React.CSSProperties}
            animate={{ x: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            <div className="flex-none rotate-[18.836deg]">
              <div className="h-[36.436px] relative w-[39.472px]" data-name="IMG_4979">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[2158.33%] left-[-536.61%] max-w-none top-[-93.75%] w-[717.44%]" src={imgImg4979} />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="absolute flex h-[70.728px] items-center justify-center left-[6.5%] top-[16px] w-[73.564px]" 
            style={{ "--transform-inner-width": "59.109375", "--transform-inner-height": "54.5625" } as React.CSSProperties}
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="flex-none rotate-[18.836deg]">
              <div className="h-[54.566px] relative w-[59.113px]" data-name="IMG_4979">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[2158.33%] left-[-536.61%] max-w-none top-[-93.75%] w-[717.44%]" src={imgImg4979} />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="absolute flex h-[47.128px] items-center justify-center left-[4.3%] top-[191.23px] w-[49.017px]" 
            style={{ "--transform-inner-width": "39.375", "--transform-inner-height": "36.34375" } as React.CSSProperties}
            animate={{ x: [-1.8, 1.8, -1.8] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <div className="flex-none rotate-[18.836deg]">
              <div className="h-[36.358px] relative w-[39.388px]" data-name="IMG_4979">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[2158.33%] left-[-536.61%] max-w-none top-[-93.75%] w-[717.44%]" src={imgImg4979} />
                </div>
              </div>
            </div>
          </motion.div>
          <div className="absolute h-[286px] left-[-11.6%] opacity-70 top-0 w-[56%]" data-name="IMG_5001">
            <motion.div 
              className="absolute inset-0 overflow-hidden pointer-events-none"
              animate={{ x: [-8, 8, -8] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              <img alt="" className="absolute h-[364.11%] left-0 max-w-none top-[-0.06%] w-[155.6%]" src={imgImg5001} />
            </motion.div>
          </div>
          <div className="absolute h-[252px] left-[calc(28%+50px)] opacity-70 top-[547px] w-[67.7%] overflow-hidden" data-name="IMG_5001">
            <motion.div 
              className="absolute inset-0 overflow-hidden pointer-events-none"
              animate={{ x: [-8, 8, -8] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            >
              <img alt="" className="absolute h-full left-1/2 -translate-x-1/2 object-cover w-full" src={imgImg5001} />
            </motion.div>
          </div>
          <div className="absolute font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[50px] left-1/2 not-italic text-[#fff9f0] text-[36px] text-center text-nowrap top-[87px] translate-x-[-50%] whitespace-pre"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <p className="mb-0">{`안녕! `}</p>
            <p>나는 둥실이야</p>
          </div>
          <div className="absolute flex h-[349px] items-center justify-center left-0 top-[501px] w-full">
            <div className="flex-none rotate-[180deg] w-full">
              <div className="h-[349px] relative w-full">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 430 349">
                  <path d="M0 0H430V349H0V0Z" fill="url(#paint0_linear_1_486)" id="Rectangle 51" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_486" x1="215" x2="215" y1="317" y2="0">
                      <stop offset="0.266109" stopColor="#FFF9F0" stopOpacity="0" />
                      <stop offset="0.849185" stopColor="#FFF9F0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          {/* 둥실이 캐릭터 이미지 - 눈 깜빡임 효과 */}
          <div 
            className="absolute h-[688px] left-1/2 -translate-x-1/2 top-[153px] w-[84.4%] max-w-[363px]" 
            data-name="IMG_4997"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-full left-1/2 -translate-x-1/2 object-cover w-full" src={isEyesClosed ? imgEyesClosed : imgImg4997} />
            </div>
          </div>
          <Frame4 quote={currentQuote} onRefresh={handleRefreshQuote} onLike={handleLike} isLiked={isLiked} setIsLiked={setIsLiked} isLoggedIn={isLoggedIn} />
          <DungsilInfo />
          <div className="absolute bg-[rgba(124,102,89,0.8)] h-[174px] left-0 right-0 top-[3464px]" />
          <p className="absolute font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21.125px] left-1/2 not-italic text-[#fff9f0] text-[13px] text-center text-nowrap top-[3506px] translate-x-[-50%] whitespace-pre">{`둥실월드  2025 · Font: 학교안심 둥근미소`}</p>
          <p className="absolute font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[24px] left-1/2 not-italic text-[#8faf3e] text-[24px] text-center text-nowrap top-[2290px] translate-x-[-50%] whitespace-pre">둥실이의 대표 성격 3가지</p>
          <Component />
          
          {/* 둥실이 소개 발바닥 그룹 */}
          <div className="absolute left-[calc(50%+3.903px)] top-[949px] w-[116.406px] h-[26.688px]">
            <motion.div 
              className="absolute flex h-[26.688px] items-center justify-center left-[71.5px] top-[6px] w-[27.641px]" 
              style={{ "--transform-inner-width": "21.625", "--transform-inner-height": "17.234375" } as React.CSSProperties}
              initial={{ opacity: 0 }}
              whileInView={{ 
                opacity: 1
              }}
              viewport={{ once: false, amount: 0.3, margin: "100px" }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.5
              }}
            >
              <div className="flex-none rotate-[36.171deg]">
                <Group />
              </div>
            </motion.div>
            <motion.div 
              className="absolute flex h-[18.459px] items-center justify-center left-[99px] top-[-9px] w-[21.087px]" 
              style={{ "--transform-inner-width": "18.046875", "--transform-inner-height": "14.375" } as React.CSSProperties}
              initial={{ opacity: 0 }}
              whileInView={{ 
                opacity: 1
              }}
              viewport={{ once: false, amount: 0.3, margin: "100px" }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 1.0
              }}
            >
              <div className="flex-none rotate-[345.473deg]">
                <Group1 />
              </div>
            </motion.div>
          </div>
          
          <Frame18 />
          <Frame24 />
          <Frame33 />

          <div className="absolute flex h-[196px] items-center justify-center left-0 top-[2005px] w-full">
            <div className="flex-none rotate-[180deg]">
              <div className="bg-gradient-to-b from-[#fff9f0] from-[21.684%] h-[196px] to-[rgba(255,249,240,0)] w-full" />
            </div>
          </div>
          <Frame28 />
        </div>
      </div>
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin} 
      />
    </>
  );
}