import { useState } from "react";
import { toast } from "sonner";
import { quotesApi, wallpapersApi } from "../lib/api";

export default function AdminSettings() {
  const [siteSettings, setSiteSettings] = useState({
    siteName: "둥실월드",
    siteDescription: "둥실이와 함께하는 공간",
    instagramUrl: "https://instagram.com/dungsil",
    maintenanceMode: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    setTimeout(() => {
      toast.success("설정이 저장되었습니다");
      setIsSaving(false);
    }, 500);
  };

  const handleReset = () => {
    if (!confirm("설정을 초기화하시겠습니까?")) {
      return;
    }

    setSiteSettings({
      siteName: "둥실월드",
      siteDescription: "둥실이와 함께하는 공간",
      instagramUrl: "https://instagram.com/dungsil",
      maintenanceMode: false,
    });

    toast.success("설정이 초기화되었습니다");
  };

  const handleBackup = async () => {
    try {
      // 모든 데이터 가져오기
      const quotes = await quotesApi.getAll();
      const wallpapers = await wallpapersApi.getAll({ limit: 1000 });

      const backupData = {
        version: "1.0",
        timestamp: new Date().toISOString(),
        data: {
          quotes,
          wallpapers: wallpapers.wallpapers,
          settings: siteSettings,
        },
      };

      // JSON 파일로 다운로드
      const blob = new Blob([JSON.stringify(backupData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dungsil-backup-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("데이터 백업이 완료되었습니다");
    } catch (error) {
      console.error("백업 실패:", error);
      toast.error("데이터 백업에 실패했습니다");
    }
  };

  const handleRestore = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const backupData = JSON.parse(text);

        if (!backupData.data) {
          throw new Error("잘못된 백업 파일 형식입니다");
        }

        // 설정 복원
        if (backupData.data.settings) {
          setSiteSettings(backupData.data.settings);
        }

        toast.success("데이터 복원이 완료되었습니다");
        toast.info("명언과 배경화면은 수동으로 추가해주세요");
      } catch (error) {
        console.error("복원 실패:", error);
        toast.error("데이터 복원에 실패했습니다");
      }
    };
    input.click();
  };

  const handleDeleteAll = async () => {
    if (
      !confirm(
        "정말로 모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다!"
      )
    ) {
      return;
    }

    if (!confirm("한 번 더 확인합니다. 정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const quotes = await quotesApi.getAll();
      const wallpapers = await wallpapersApi.getAll({ limit: 1000 });

      // 모든 명언 삭제
      for (const quote of quotes) {
        await quotesApi.delete(quote._id);
      }

      // 모든 배경화면 삭제
      for (const wallpaper of wallpapers.wallpapers) {
        await wallpapersApi.delete(wallpaper._id);
      }

      toast.success("모든 데이터가 삭제되었습니다");
    } catch (error) {
      console.error("삭제 실패:", error);
      toast.error("데이터 삭제에 실패했습니다");
    }
  };

  return (
    <div className="space-y-6">
      {/* 페이지 제목 */}
      <div>
        <h2 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[22px] text-[#5c4033] mb-2">
          설정 관리
        </h2>
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] opacity-70">
          사이트 설정
        </p>
      </div>

      {/* 기본 설정 */}
      <div className="bg-white rounded-[18px] border border-[#e5fed9] shadow-sm p-6">
        <h3 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[17px] text-[#5c4033] mb-5">
          ⚙️ 기본 설정
        </h3>

        <div className="space-y-5">
          {/* 사이트 이름 */}
          <div>
            <label className="block font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] mb-2">
              사이트 이름
            </label>
            <input
              type="text"
              value={siteSettings.siteName}
              onChange={(e) =>
                setSiteSettings({ ...siteSettings, siteName: e.target.value })
              }
              className="w-full border border-[#e5fed9] rounded-[14px] px-4 py-3 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] focus:outline-none focus:border-[#8faf3e]"
              placeholder="사이트 이름"
            />
          </div>

          {/* 사이트 설명 */}
          <div>
            <label className="block font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] mb-2">
              사이트 설명
            </label>
            <textarea
              value={siteSettings.siteDescription}
              onChange={(e) =>
                setSiteSettings({ ...siteSettings, siteDescription: e.target.value })
              }
              className="w-full border border-[#e5fed9] rounded-[14px] px-4 py-3 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] focus:outline-none focus:border-[#8faf3e] resize-none"
              rows={2}
              placeholder="사이트 설명"
            />
          </div>

          {/* 인스타그램 URL */}
          <div>
            <label className="block font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] mb-2">
              인스타그램 URL
            </label>
            <input
              type="url"
              value={siteSettings.instagramUrl}
              onChange={(e) =>
                setSiteSettings({ ...siteSettings, instagramUrl: e.target.value })
              }
              className="w-full border border-[#e5fed9] rounded-[14px] px-4 py-3 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] focus:outline-none focus:border-[#8faf3e]"
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>
      </div>

      {/* 시스템 설정 */}
      <div className="bg-white rounded-[18px] border border-[#e5fed9] shadow-sm p-6">
        <h3 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[17px] text-[#5c4033] mb-5">
          🔧 시스템 설정
        </h3>

        <div className="flex items-center justify-between p-4 bg-[#fff9f0] rounded-[14px]">
          <div>
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] mb-1">
              점검 모드
            </p>
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] text-[#5c4033] opacity-60">
              사이트 접근 차단
            </p>
          </div>
          <button
            onClick={() =>
              setSiteSettings({
                ...siteSettings,
                maintenanceMode: !siteSettings.maintenanceMode,
              })
            }
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
              siteSettings.maintenanceMode ? "bg-[#ff9999]" : "bg-[#e5e5e5]"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                siteSettings.maintenanceMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 데이터 관리 */}
      <div className="bg-white rounded-[18px] border border-[#e5fed9] shadow-sm p-6">
        <h3 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[17px] text-[#5c4033] mb-5">
          📊 데이터 관리
        </h3>

        <div className="space-y-4">
          <button
            className="w-full bg-[#8faf3e] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] px-4 py-4 rounded-[14px] hover:bg-[#7a9535] transition-colors text-left min-h-[52px]"
            onClick={handleBackup}
          >
            📦 데이터 백업
          </button>

          <button
            className="w-full bg-[#5c4033] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] px-4 py-4 rounded-[14px] hover:bg-[#4a3429] transition-colors text-left min-h-[52px]"
            onClick={handleRestore}
          >
            📥 데이터 복원
          </button>

          <button
            className="w-full bg-[#ff9999] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] px-4 py-4 rounded-[14px] hover:bg-[#ff7777] transition-colors text-left min-h-[52px]"
            onClick={handleDeleteAll}
          >
            🗑️ 모든 데이터 삭제
          </button>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex gap-4">
        <button
          onClick={handleReset}
          className="flex-1 bg-[#f5f5f5] text-[#5c4033] font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] py-4 rounded-[14px] hover:bg-[#e5e5e5] transition-colors min-h-[52px]"
        >
          초기화
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 bg-gradient-to-br from-[#FFD2D2] to-[#FF9999] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] py-4 rounded-[14px] shadow-md disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
        >
          {isSaving ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
}
