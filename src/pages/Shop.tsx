import svgPaths from "../imports/svg-vb8sao2nvh";
import imgBd214Ef9489A43Df89DcA59F2C19B8601 from "figma:asset/ee12e18bfec8f66663acb9b140f6ce66a08a31f2.png";
import img2 from "figma:asset/de9aad2ca57a631d7e4bc71fddacd5628a5130bc.png";
import imgB43876688B5A4Ba5855C989890B7A56B1 from "figma:asset/2824c662039bd9f824e7e89fd9c5326c46818c75.png";
import imgImg49951 from "figma:asset/1fffc2e0853567b6893d5e789b541250a761f038.png";
import bottomNavSvgPaths from "../imports/svg-tgq24q0gmi";
import bellIconSvgPaths from "../imports/svg-heeqbqbi5k";
import { useState } from "react";
import { toast, Toaster } from "sonner@2.0.3";

function InstagramIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="인스타">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_14_468)" id="인스타">
          <path d={svgPaths.p4b98700} id="Vector" stroke="var(--stroke-0, #FFF9F0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p29b16f80} id="Vector_2" stroke="var(--stroke-0, #FFF9F0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M14.5833 5.41667H14.5917" id="Vector_3" stroke="var(--stroke-0, #FFF9F0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_14_468">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InstagramButton() {
  return (
    <a 
      href="https://www.instagram.com/dungdung_otter/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="relative rounded-[19px] shrink-0 hover:opacity-90 transition-opacity cursor-pointer block"
      style={{ background: 'linear-gradient(135deg, #FFD2D2 0%, #FF9999 100%)' }}
    >
      <div aria-hidden="true" className="absolute border border-[#ffa7a7] border-solid inset-0 pointer-events-none rounded-[19px] shadow-[3px_4px_6px_0px_rgba(0,0,0,0.09)]" />
      <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[19px] py-[7px] relative">
        <InstagramIcon />
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#fff9f0] text-[14px] text-center text-nowrap whitespace-pre">인스타그램 팔로우</p>
      </div>
    </a>
  );
}

function BellIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon" transform="translate(2, 1.5) scale(1.15)">
          <path d={bellIconSvgPaths.p6414df0} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={bellIconSvgPaths.p167c8100} id="Vector_2" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function NewsButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[15px] py-[7px] relative rounded-[30px] shrink-0 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div aria-hidden="true" className="absolute border border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <BellIcon />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#5c4033] text-[14px] text-center text-nowrap whitespace-pre">소식 받기</p>
    </button>
  );
}

function ButtonGroup({ onNewsClick }: { onNewsClick: () => void }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[28px] py-0 relative w-full">
          <InstagramButton />
          <NewsButton onClick={onNewsClick} />
        </div>
      </div>
    </div>
  );
}

function TextSection() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center leading-[24px] not-italic relative shrink-0 text-[#5c4033] text-center w-[242px]">
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] font-bold relative shrink-0 text-[18px] w-full">출시 소식이 궁금하신가요?</p>
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] relative shrink-0 text-[14px] w-full">인스타그램에서 가장 먼저 소식을 받아보세요!</p>
    </div>
  );
}

function CallToAction({ onNewsClick }: { onNewsClick: () => void }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-1/2 top-[946px] translate-x-[-50%] w-[343px] mb-[30px]">
      <TextSection />
      <ButtonGroup onNewsClick={onNewsClick} />
    </div>
  );
}

function PhoneModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [phone, setPhone] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      // 전화번호를 localStorage에 저장
      const phoneNumbers = JSON.parse(localStorage.getItem('phoneNumbers') || '[]');
      const newEntry = {
        id: Date.now(),
        phone: phone,
        date: new Date().toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      phoneNumbers.push(newEntry);
      localStorage.setItem('phoneNumbers', JSON.stringify(phoneNumbers));

      toast("소식 받기 완료!", {
        style: {
          background: '#fff9f0',
          color: '#5c4033',
          border: '1px solid rgba(143, 175, 62, 0.3)',
          fontFamily: 'Hakgyoansim_Dunggeunmiso_OTF:R, sans-serif',
        }
      });
      setPhone("");
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100] px-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#fff9f0] rounded-[20px] p-6 w-full max-w-[343px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          <h3 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[20px] text-[#5c4033] text-center">
            출시 소식 알림 신청
          </h3>
          
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] text-center leading-[22px]">
            휴대폰 번호를 남겨주시면<br />
            둥실이 굿즈 출시 소식을 알려드려요!
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="010-0000-0000"
              className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] border border-[rgba(92,64,51,0.2)] rounded-[12px] px-4 py-3 bg-white focus:outline-none focus:border-[#8faf3e] transition-colors"
              maxLength={11}
            />
            
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] text-[#8faf3e] text-center leading-[16px]">
              출시 소식을 알려주기 위함으로,<br />
              다른 용도로는 절대 사용하지 않습니다
            </p>
            
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] bg-white border border-[rgba(92,64,51,0.2)] rounded-[12px] py-3 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-white rounded-[12px] py-3 hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #FFD2D2 0%, #FF9999 100%)' }}
              >
                신청하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function GoodsImages() {
  return (
    <div className="absolute left-0 top-[329px] w-full bottom-[68px] overflow-hidden">
      <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-533.2px - 100px));
          }
        }
        @keyframes float1 {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes float2 {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes float3 {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
      
      <div className="flex gap-[100px] h-full items-center" style={{ animation: 'scrollLeft 20s linear infinite' }}>
        {/* 첫 번째 세트 */}
        <div className="flex shrink-0 relative h-[421.973px]" style={{ width: '533.2px' }}>
          {/* 인형 - 왼쪽 */}
          <div className="absolute flex h-[356.474px] items-center justify-center" style={{ left: '-53.54px', top: '-0.02px', width: '299.688px', animation: 'float1 3s ease-in-out infinite' }}>
            <div className="flex-none rotate-[9.658deg]">
              <div className="h-[319.107px] relative w-[249.692px]">
                <img alt="둥실이 인형" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img2} />
              </div>
            </div>
          </div>
          
          {/* 키링 - 오른쪽 상단 */}
          <div className="absolute flex h-[374.412px] items-center justify-center" style={{ left: '167.41px', top: '27.57px', width: '322.848px', animation: 'float2 3.5s ease-in-out infinite 0.5s' }}>
            <div className="flex-none rotate-[346.364deg]">
              <div className="h-[323.731px] relative w-[253.678px]">
                <img alt="둥실이 키링" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBd214Ef9489A43Df89DcA59F2C19B8601} />
              </div>
            </div>
          </div>
          
          {/* 파우치 - 오른쪽 */}
          <div className="absolute flex items-center justify-center size-[240.261px]" style={{ left: '390px', top: '-9.44px', animation: 'float3 3.2s ease-in-out infinite 1s' }}>
            <div className="flex-none rotate-[345.802deg]">
              <div className="relative size-[197.79px]">
                <img alt="둥실이 파우치" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgB43876688B5A4Ba5855C989890B7A56B1} />
              </div>
            </div>
          </div>
        </div>
        
        {/* 두 번째 세트 (무한 스크롤용) */}
        <div className="flex shrink-0 relative h-[421.973px]" style={{ width: '533.2px' }}>
          {/* 인형 - 왼쪽 */}
          <div className="absolute flex h-[356.474px] items-center justify-center" style={{ left: '-53.54px', top: '-0.02px', width: '299.688px', animation: 'float1 3s ease-in-out infinite' }}>
            <div className="flex-none rotate-[9.658deg]">
              <div className="h-[319.107px] relative w-[249.692px]">
                <img alt="둥실이 인형" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img2} />
              </div>
            </div>
          </div>
          
          {/* 키링 - 오른쪽 상단 */}
          <div className="absolute flex h-[374.412px] items-center justify-center" style={{ left: '167.41px', top: '27.57px', width: '322.848px', animation: 'float2 3.5s ease-in-out infinite 0.5s' }}>
            <div className="flex-none rotate-[346.364deg]">
              <div className="h-[323.731px] relative w-[253.678px]">
                <img alt="둥실이 키링" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBd214Ef9489A43Df89DcA59F2C19B8601} />
              </div>
            </div>
          </div>
          
          {/* 파우치 - 오른쪽 */}
          <div className="absolute flex items-center justify-center size-[240.261px]" style={{ left: '390px', top: '-9.44px', animation: 'float3 3.2s ease-in-out infinite 1s' }}>
            <div className="flex-none rotate-[345.802deg]">
              <div className="relative size-[197.79px]">
                <img alt="둥실이 파우치" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgB43876688B5A4Ba5855C989890B7A56B1} />
              </div>
            </div>
          </div>
        </div>
        
        {/* 세 번째 세트 (부드러운 무한 스크롤용) */}
        <div className="flex shrink-0 relative h-[421.973px]" style={{ width: '533.2px' }}>
          {/* 인형 - 왼쪽 */}
          <div className="absolute flex h-[356.474px] items-center justify-center" style={{ left: '-53.54px', top: '-0.02px', width: '299.688px', animation: 'float1 3s ease-in-out infinite' }}>
            <div className="flex-none rotate-[9.658deg]">
              <div className="h-[319.107px] relative w-[249.692px]">
                <img alt="둥실이 인형" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img2} />
              </div>
            </div>
          </div>
          
          {/* 키링 - 오른쪽 상단 */}
          <div className="absolute flex h-[374.412px] items-center justify-center" style={{ left: '167.41px', top: '27.57px', width: '322.848px', animation: 'float2 3.5s ease-in-out infinite 0.5s' }}>
            <div className="flex-none rotate-[346.364deg]">
              <div className="h-[323.731px] relative w-[253.678px]">
                <img alt="둥실이 키링" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBd214Ef9489A43Df89DcA59F2C19B8601} />
              </div>
            </div>
          </div>
          
          {/* 파우치 - 오른쪽 */}
          <div className="absolute flex items-center justify-center size-[240.261px]" style={{ left: '390px', top: '-9.44px', animation: 'float3 3.2s ease-in-out infinite 1s' }}>
            <div className="flex-none rotate-[345.802deg]">
              <div className="relative size-[197.79px]">
                <img alt="둥실이 파우치" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgB43876688B5A4Ba5855C989890B7A56B1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={bottomNavSvgPaths.p2bbf6680} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={bottomNavSvgPaths.p2ea10f40} id="Vector_2" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={bottomNavSvgPaths.p341e1d00} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M14 19L17 22V16.5" id="Vector_2" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M17 22L20 19" id="Vector_3" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={bottomNavSvgPaths.p1b53d300} id="Vector_4" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={bottomNavSvgPaths.pfbeaf00} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M8 12H8.01" id="Vector_2" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 12H12.01" id="Vector_3" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 12H16.01" id="Vector_4" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={bottomNavSvgPaths.p1219e180} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 6H6" id="Vector_2" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 10H6" id="Vector_3" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 14H6" id="Vector_4" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2 18H6" id="Vector_5" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={bottomNavSvgPaths.p20731300} id="Vector_6" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="var(--stroke-0, #8FAF3E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3 6H21" stroke="var(--stroke-0, #8FAF3E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="var(--stroke-0, #8FAF3E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function BottomNav({ onNavigate }: { onNavigate: (page: "home" | "download" | "talk" | "shop" | "collection" | "downloadDetail") => void }) {
  return (
    <div className="bg-[rgba(255,249,240,0.91)] content-stretch flex flex-col h-[68px] items-center justify-center w-full z-50 backdrop-blur-sm" data-name="BottomNav" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0 w-full px-[24px]">
        <button onClick={() => onNavigate("home")} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity">
          <Icon1 />
          <p className="font-['Pretendard',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[10px] text-center w-[min-content]" style={{ fontWeight: 400 }}>Home</p>
        </button>
        <button onClick={() => onNavigate("download")} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity">
          <Icon2 />
          <p className="font-['Pretendard',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[10px] text-center w-[min-content]" style={{ fontWeight: 400 }}>Download</p>
        </button>
        <button onClick={() => onNavigate("talk")} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity">
          <Icon3 />
          <p className="font-['Pretendard',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[10px] text-center w-[min-content]" style={{ fontWeight: 400 }}>Talk</p>
        </button>
        <button onClick={() => onNavigate("collection")} className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px] cursor-pointer hover:opacity-70 transition-opacity">
          <Icon4 />
          <p className="font-['Pretendard',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#5c4033] text-[10px] text-center w-[min-content]" style={{ fontWeight: 400 }}>Collection</p>
        </button>
        <div className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 w-[47px]">
          <Icon5 />
          <p className="font-['Pretendard',sans-serif] leading-[15px] min-w-full not-italic relative shrink-0 text-[#8faf3e] text-[10px] text-center w-[min-content]" style={{ fontWeight: 400 }}>Shop</p>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage({ onNavigate }: { onNavigate: (page: "home" | "download" | "talk" | "shop" | "collection" | "downloadDetail") => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: '120px',
          }
        }}
      />
      <div className="flex justify-center items-start min-h-[100dvh] bg-[#fff9f0] w-full overflow-x-hidden overflow-y-auto">
        <div className="bg-[#fff9f0] relative w-full min-h-[1250px] pb-[98px]" data-name="샵" style={{ touchAction: "pan-y" }}>
        
        {/* 상점 이미지 */}
        <div className="absolute flex h-[401.071px] items-center justify-center left-1/2 -translate-x-1/2 top-[72.46px] w-[310.006px]" style={{ "--transform-inner-width": "306", "--transform-inner-height": "398" } as React.CSSProperties}>
          <div className="flex-none rotate-[0.579deg]">
            <div className="h-[398px] relative w-[306px] rotate-[1deg]" data-name="IMG_4995 1">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="둥실이 상점" className="absolute h-[213.52%] left-0 max-w-none top-[-32.39%] w-full" src={imgImg49951} />
              </div>
            </div>
          </div>
        </div>
        
        {/* 준비 중 텍스트 */}
        <p className="absolute font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] font-bold leading-[24px] left-[calc(50%+0.5px)] not-italic text-[#5c4033] text-[24px] text-center text-nowrap top-[485px] translate-x-[-50%] whitespace-pre">준비 중이예요!</p>
        
        <GoodsImages />
        <CallToAction onNewsClick={() => setIsModalOpen(true)} />

        <BottomNav onNavigate={onNavigate} />

        <PhoneModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
    </>
  );
}