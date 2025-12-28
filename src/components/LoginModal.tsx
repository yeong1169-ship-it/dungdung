import { useState } from "react";
import { toast } from "sonner@2.0.3";

function InstagramIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_instagram)">
          <path d="M14.1667 1.66666H5.83333C3.53214 1.66666 1.66666 3.53214 1.66666 5.83333V14.1667C1.66666 16.4679 3.53214 18.3333 5.83333 18.3333H14.1667C16.4679 18.3333 18.3333 16.4679 18.3333 14.1667V5.83333C18.3333 3.53214 16.4679 1.66666 14.1667 1.66666Z" stroke="var(--stroke-0, #FFF9F0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M13.3333 9.47501C13.4362 10.1685 13.3176 10.8769 12.9948 11.4992C12.6721 12.1215 12.161 12.6262 11.5347 12.9414C10.9084 13.2566 10.1987 13.3663 9.50641 13.255C8.81415 13.1436 8.17465 12.8167 7.67895 12.321C7.18325 11.8253 6.85636 11.1858 6.745 10.4935C6.63363 9.80127 6.7433 9.09159 7.05852 8.46527C7.37373 7.83895 7.87841 7.32783 8.50074 7.00509C9.12307 6.68235 9.83142 6.56378 10.5249 6.66668C11.2324 6.77158 11.8874 7.10123 12.393 7.60682C12.8986 8.11241 13.2282 8.76742 13.3331 9.47501Z" stroke="var(--stroke-0, #FFF9F0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M14.5833 5.41666H14.5917" stroke="var(--stroke-0, #FFF9F0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_instagram">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export function LoginModal({ isOpen, onClose, onLogin }: { isOpen: boolean; onClose: () => void; onLogin: (nickname: string) => void }) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim() && password.trim()) {
      onLogin(nickname);
      toast("로그인되었습니다! 🦦", {
        style: {
          background: '#fff9f0',
          color: '#5c4033',
          border: '1px solid rgba(143, 175, 62, 0.3)',
          fontFamily: 'Hakgyoansim_Dunggeunmiso_OTF:R, sans-serif',
        }
      });
      setNickname("");
      setPassword("");
      onClose();
    }
  };
  
  const handleInstagramLogin = () => {
    // 인스타그램 간편 로그인 (실제로는 OAuth 연동이 필요하지만, 여기서는 시뮬레이션)
    onLogin("Instagram User");
    toast("인스타그램으로 로그인되었습니다! 🦦", {
      style: {
        background: '#fff9f0',
        color: '#5c4033',
        border: '1px solid rgba(143, 175, 62, 0.3)',
        fontFamily: 'Hakgyoansim_Dunggeunmiso_OTF:R, sans-serif',
      }
    });
    onClose();
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
        <div className="flex flex-col gap-5">
          <h3 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[20px] text-[#5c4033] text-center">
            로그인
          </h3>
          
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] text-center leading-[22px]">
            로그인하면 좋아요한 문장과<br />
            사진을 저장할 수 있어요!
          </p>
          
          {/* 인스타그램 간편 로그인 */}
          <button
            onClick={handleInstagramLogin}
            className="w-full rounded-[12px] py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #FFD2D2 0%, #FF9999 100%)' }}
          >
            <InstagramIcon />
            <span className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#fff9f0]">
              인스타그램으로 계속하기
            </span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-[rgba(92,64,51,0.2)]" />
            <span className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033] opacity-60">
              또는
            </span>
            <div className="flex-1 h-[1px] bg-[rgba(92,64,51,0.2)]" />
          </div>
          
          {/* 닉네임/비밀번호 로그인 */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임"
              className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] border border-[rgba(92,64,51,0.2)] rounded-[12px] px-4 py-3 bg-white focus:outline-none focus:border-[#8faf3e] transition-colors"
            />
            
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] border border-[rgba(92,64,51,0.2)] rounded-[12px] px-4 py-3 bg-white focus:outline-none focus:border-[#8faf3e] transition-colors"
            />
            
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] bg-white border border-[rgba(92,64,51,0.2)] rounded-[12px] py-3 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-white bg-[#8faf3e] rounded-[12px] py-3 hover:opacity-90 transition-opacity"
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
