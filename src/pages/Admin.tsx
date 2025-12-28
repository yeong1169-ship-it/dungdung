import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminQuotes from "./AdminQuotes";
import AdminWallpapers from "./AdminWallpapers";
import AdminSettings from "./AdminSettings";
import AdminPhones from "./AdminPhones";

type AdminPage = "dashboard" | "quotes" | "wallpapers" | "phones" | "settings";

export default function Admin() {
  const [currentPage, setCurrentPage] = useState<AdminPage>("dashboard");

  return (
    <div className="min-h-screen bg-[#fff9f0]">
      <div className="w-full min-w-[375px] max-w-[450px] mx-auto">
        {/* 상단 헤더 */}
        <header className="bg-white border-b border-[#e5fed9] shadow-sm sticky top-0 z-10">
          <div className="px-4 py-3">
            <h1 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[20px] text-[#8faf3e] text-center">
              둥실이 관리자
            </h1>
          </div>
        </header>

        {/* 상단 고정 네비게이션 (헤더 바로 아래) */}
        <nav className="sticky top-[57px] bg-white border-b border-[#e5fed9] shadow-sm z-20">
          <div className="flex overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className={`flex-1 min-w-[80px] px-4 py-3 transition-colors border-b-2 ${
              currentPage === "dashboard"
                ? "border-[#8faf3e] text-[#8faf3e]"
                : "border-transparent text-[#5c4033] opacity-50"
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-[20px]">📊</span>
              <span className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] whitespace-nowrap">
                대시보드
              </span>
            </div>
          </button>
          <button
            onClick={() => setCurrentPage("quotes")}
            className={`flex-1 min-w-[80px] px-4 py-3 transition-colors border-b-2 ${
              currentPage === "quotes"
                ? "border-[#8faf3e] text-[#8faf3e]"
                : "border-transparent text-[#5c4033] opacity-50"
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-[20px]">💬</span>
              <span className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] whitespace-nowrap">
                명언
              </span>
            </div>
          </button>
          <button
            onClick={() => setCurrentPage("wallpapers")}
            className={`flex-1 min-w-[80px] px-4 py-3 transition-colors border-b-2 ${
              currentPage === "wallpapers"
                ? "border-[#8faf3e] text-[#8faf3e]"
                : "border-transparent text-[#5c4033] opacity-50"
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-[20px]">🖼️</span>
              <span className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] whitespace-nowrap">
                배경화면
              </span>
            </div>
          </button>
          <button
            onClick={() => setCurrentPage("phones")}
            className={`flex-1 min-w-[80px] px-4 py-3 transition-colors border-b-2 ${
              currentPage === "phones"
                ? "border-[#8faf3e] text-[#8faf3e]"
                : "border-transparent text-[#5c4033] opacity-50"
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-[20px]">📱</span>
              <span className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] whitespace-nowrap">
                소식받기
              </span>
            </div>
          </button>
          <button
            onClick={() => setCurrentPage("settings")}
            className={`flex-1 min-w-[80px] px-4 py-3 transition-colors border-b-2 ${
              currentPage === "settings"
                ? "border-[#8faf3e] text-[#8faf3e]"
                : "border-transparent text-[#5c4033] opacity-50"
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-[20px]">⚙️</span>
              <span className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] whitespace-nowrap">
                설정
              </span>
            </div>
          </button>
          </div>
        </nav>

        {/* 메인 콘텐츠 영역 */}
        <main className="px-4 pt-4 pb-6">
          {currentPage === "dashboard" && <AdminDashboard />}
          {currentPage === "quotes" && <AdminQuotes />}
          {currentPage === "wallpapers" && <AdminWallpapers />}
          {currentPage === "phones" && <AdminPhones />}
          {currentPage === "settings" && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}
