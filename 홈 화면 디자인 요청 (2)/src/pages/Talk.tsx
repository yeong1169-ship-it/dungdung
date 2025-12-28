import { useState, useRef, useEffect } from "react";
import svgPaths from "../imports/svg-2gak26ei1l";
import imgImg45652 from "figma:asset/df40fff759569b6cc2ec4c575c437a5dcb7f84fd.png";
import { imgImg45651 } from "../imports/svg-vjo5j";

function MaskGroup() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Mask group">
      <div className="[grid-area:1_/_1] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1px] mask-size-[32px_32px] ml-[-1px] mt-[-1px] relative size-[34px]" data-name="IMG_4565 1" style={{ maskImage: `url('${imgImg45651}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImg45652} />
      </div>
    </div>
  );
}

function DungsilMessage({ text }: { text: string }) {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[10px] relative rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px]" />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#5c4033] text-[16px]">{text}</p>
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="bg-[#8faf3e] box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[10px] rounded-bl-[10px] rounded-tl-[10px] rounded-tr-[10px]">
      <div aria-hidden="true" className="absolute border border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none rounded-bl-[10px] rounded-tl-[10px] rounded-tr-[10px]" />
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#fff9f0] text-[16px]">{text}</p>
    </div>
  );
}

function SaveButton({ isSaved, onClick }: { isSaved: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex gap-[6px] items-center relative shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
      <div className="h-[13px] relative shrink-0 w-[10px]" data-name="Vector">
        <div className="absolute inset-[-5.77%_-7.5%]" style={{ "--stroke-0": "rgba(92, 64, 51, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill={isSaved ? "#5C4033" : "none"} preserveAspectRatio="none" viewBox="0 0 12 15">
            <path d={svgPaths.pd799400} id="Vector" stroke="var(--stroke-0, #5C4033)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#5c4033] text-[12px] text-nowrap whitespace-pre">저장</p>
    </button>
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

interface Message {
  id: number;
  text: string;
  sender: "dungsil" | "user";
  isSaved?: boolean;
  imageUrl?: string;
}

export default function Talk({ 
  onNavigate, 
  savedQuotes,
  onSaveQuote,
  onDeleteQuote,
  savedImages,
  onSaveImage,
  onDeleteImage,
  isLoggedIn,
  onLoginRequest
}: { 
  onNavigate: (page: "home" | "download" | "talk" | "shop" | "downloadDetail") => void;
  savedQuotes: Array<{ id: number; quote: string; date: string; category: string; author: string }>;
  onSaveQuote: (quote: { id: number; quote: string; date: string; category: string; author: string }) => void;
  onDeleteQuote: (id: number) => void;
  savedImages: Array<{ id: number; imageUrl: string; savedDate: Date }>;
  onSaveImage: (image: { id: number; imageUrl: string; savedDate: Date }) => void;
  onDeleteImage: (id: number) => void;
  isLoggedIn: boolean;
  onLoginRequest: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "안녕! 오늘 어떤 하루였어?", sender: "dungsil", isSaved: false }
  ]);
  const [inputText, setInputText] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // savedQuotes와 savedImages가 변경될 때마다 메시지의 isSaved 상태를 동기화
  useEffect(() => {
    setMessages(prevMessages => prevMessages.map(msg => {
      if (msg.sender === "dungsil") {
        if (msg.imageUrl) {
          // 이미지 메시지인 경우
          const isInCollection = savedImages.some(img => img.imageUrl === msg.imageUrl);
          return { ...msg, isSaved: isInCollection };
        } else {
          // 텍스트 메시지인 경우
          const isInCollection = savedQuotes.some(q => 
            q.quote === `"${msg.text}"` && q.category === "둥실이와의 채팅"
          );
          return { ...msg, isSaved: isInCollection };
        }
      }
      return msg;
    }));
  }, [savedQuotes, savedImages]);

  const handleSaveToggle = (messageId: number) => {
    if (!isLoggedIn) {
      onLoginRequest();
      return;
    }
    
    const message = messages.find(msg => msg.id === messageId);
    if (!message || message.sender !== "dungsil") return;

    if (message.imageUrl) {
      // 이미지 메시지인 경우
      const existingImage = savedImages.find(img => img.imageUrl === message.imageUrl);
      
      if (existingImage) {
        // 이미 저장된 경우 - 삭제
        onDeleteImage(existingImage.id);
        showNotification("저장이 취소되었습니다");
      } else {
        // 저장되지 않은 경우 - 추가
        const newImage = {
          id: Date.now(),
          imageUrl: message.imageUrl,
          savedDate: new Date()
        };
        onSaveImage(newImage);
        showNotification("저장되었습니다");
      }
    } else {
      // 텍스트 메시지인 경우
      const quoteText = `"${message.text}"`;
      const existingQuote = savedQuotes.find(q => 
        q.quote === quoteText && q.category === "둥실이와의 채팅"
      );

      if (existingQuote) {
        // 이미 저장된 경우 - 삭제
        onDeleteQuote(existingQuote.id);
        showNotification("저장이 취소되었습니다");
      } else {
        // 저장되지 않은 경우 - 추가
        const newQuote = {
          id: Date.now(),
          quote: quoteText,
          date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '. ').replace(/\.$/, ''),
          category: '둥실이와의 채팅',
          author: '둥실이'
        };
        onSaveQuote(newQuote);
        showNotification("저장되었습니다");
      }
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user"
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // 사용자가 "이미지", "그림", "사진" 등을 요청하면 둥실이가 이미지를 생성
    const lowerText = inputText.toLowerCase();
    if (lowerText.includes("이미지") || lowerText.includes("그림") || lowerText.includes("사진") || lowerText.includes("만들어")) {
      setTimeout(() => {
        const dungsilImageMessage: Message = {
          id: Date.now() + 1,
          text: "이미지를 만들었어! 어때?",
          sender: "dungsil",
          isSaved: false,
          imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=500&fit=crop"
        };
        setMessages(prev => [...prev, dungsilImageMessage]);
      }, 1000);
    }
    
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex justify-center items-start min-h-[100dvh] bg-[#fff9f0] w-full overflow-x-hidden overflow-y-auto">
      <div className="bg-[#fff9f0] relative w-full max-w-[430px] min-h-[100dvh]" data-name="톡" style={{ touchAction: "pan-y" }}>
        
        {/* 상단 헤더 배경 */}
        <div className="absolute bg-[rgba(92,64,51,0.1)] h-[63px] left-0 top-0 w-full" />
        
        {/* 제목 */}
        <p className="absolute font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] leading-[15.125px] left-[calc(50%-18.5px)] not-italic text-[#5c4033] text-[18px] text-nowrap top-[24px] whitespace-pre">둥실이</p>
        
        {/* 뒤로가기 버튼 */}
        <button 
          onClick={() => onNavigate("home")}
          className="absolute flex items-center justify-center left-[16px] size-[24.03px] top-[20px] cursor-pointer hover:opacity-70 transition-opacity" 
          style={{ "--transform-inner-width": "24", "--transform-inner-height": "24" } as React.CSSProperties}
        >
          <div className="flex-none rotate-[89.928deg]">
            <LucideChevronDown />
          </div>
        </button>
        
        {/* 구분선 */}
        <div className="absolute h-0 left-0 top-[63px] w-full">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 1">
              <line id="Line 1" stroke="var(--stroke-0, #E5E5E5)" x2="375" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="w-full pt-[93px] pb-[100px] px-[16px] min-h-[100dvh]">
          <div className="flex flex-col gap-[16px]">
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.sender === "dungsil" ? (
                  <div className="content-stretch flex gap-[6px] items-end relative shrink-0">
                    <MaskGroup />
                    <div className="flex flex-col gap-[6px] items-end">
                      {msg.imageUrl ? (
                        <div className="flex flex-col gap-[6px]">
                          <DungsilMessage text={msg.text} />
                          <img 
                            src={msg.imageUrl} 
                            alt="둥실이가 만든 이미지" 
                            className="rounded-[10px] w-[250px] h-[250px] object-cover"
                          />
                        </div>
                      ) : (
                        <DungsilMessage text={msg.text} />
                      )}
                      <SaveButton isSaved={msg.isSaved || false} onClick={() => handleSaveToggle(msg.id)} />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <UserMessage text={msg.text} />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 입력창 */}
        <div className="absolute box-border content-stretch flex flex-col items-start left-0 right-0 bottom-0 p-[16px] bg-[#fff9f0]" data-name="Container">
          <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(92,64,51,0.2)] border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex gap-[8px] h-[48px] items-center relative shrink-0 w-full" data-name="Container">
            <div className="basis-0 bg-[rgba(92,64,51,0.08)] grow h-[48px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#5c4033] border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]" />
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-full bg-transparent border-none outline-none px-[20px] font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033]"
              />
            </div>
            <button 
              onClick={handleSendMessage}
              className="bg-[#5c4033] relative rounded-[1.67772e+07px] shrink-0 size-[48px] cursor-pointer hover:opacity-80 transition-opacity" 
              data-name="Button"
            >
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
                <Icon />
              </div>
            </button>
          </div>
        </div>

        {/* 알림창 */}
        {notification && (
          <div className="fixed top-[120px] left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-white rounded-[12px] shadow-[0px_4px_16px_rgba(0,0,0,0.15)] px-[24px] py-[14px]">
              <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] text-nowrap">{notification}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}