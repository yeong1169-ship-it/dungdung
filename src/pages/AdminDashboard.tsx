import { useState, useEffect } from "react";
import { quotesApi, wallpapersApi, type Quote, type Wallpaper } from "../lib/api";

interface Stats {
  totalQuotes: number;
  totalWallpapers: number;
  totalViews: number;
  totalDownloads: number;
  topQuote: Quote | null;
  recentQuotes: Quote[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalQuotes: 0,
    totalWallpapers: 0,
    totalViews: 0,
    totalDownloads: 0,
    topQuote: null,
    recentQuotes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);

      const quotes = await quotesApi.getAll({ limit: 100 });

      let wallpapers: Wallpaper[] = [];
      try {
        const wallpaperData = await wallpapersApi.getAll({ limit: 100 });
        wallpapers = wallpaperData.wallpapers;
      } catch (error) {
        console.log("배경화면 데이터를 가져올 수 없습니다:", error);
      }

      const totalViews = wallpapers.reduce((sum, w) => sum + w.views, 0);
      const totalDownloads = wallpapers.reduce((sum, w) => sum + w.downloads, 0);

      const sortedQuotes = [...quotes].sort((a, b) => b.likes - a.likes);
      const topQuote = sortedQuotes[0] || null;

      const recentQuotes = [...quotes]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      setStats({
        totalQuotes: quotes.length,
        totalWallpapers: wallpapers.length,
        totalViews,
        totalDownloads,
        topQuote,
        recentQuotes,
      });
    } catch (error) {
      console.error("통계 로딩 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[#5c4033]">
          로딩 중...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 페이지 제목 */}
      <div>
        <h2 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[22px] text-[#5c4033] mb-2">
          대시보드
        </h2>
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] opacity-70">
          전체 통계
        </p>
      </div>

      {/* 통계 카드들 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 총 명언 수 */}
        <div className="bg-white rounded-[18px] border border-[#e5fed9] shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033] opacity-60">
              총 명언
            </p>
            <span className="text-[20px]">💬</span>
          </div>
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[26px] text-[#8faf3e]">
            {stats.totalQuotes}
          </p>
        </div>

        {/* 총 배경화면 수 */}
        <div className="bg-white rounded-[18px] border border-[#e5fed9] shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033] opacity-60">
              배경화면
            </p>
            <span className="text-[20px]">🖼️</span>
          </div>
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[26px] text-[#8faf3e]">
            {stats.totalWallpapers}
          </p>
        </div>

        {/* 총 조회수 */}
        <div className="bg-white rounded-[18px] border border-[#e5fed9] shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033] opacity-60">
              조회수
            </p>
            <span className="text-[20px]">👁️</span>
          </div>
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[26px] text-[#8faf3e]">
            {stats.totalViews.toLocaleString()}
          </p>
        </div>

        {/* 총 다운로드 */}
        <div className="bg-white rounded-[18px] border border-[#e5fed9] shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033] opacity-60">
              다운로드
            </p>
            <span className="text-[20px]">📥</span>
          </div>
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[26px] text-[#8faf3e]">
            {stats.totalDownloads.toLocaleString()}
          </p>
        </div>
      </div>

      {/* 인기 명언 */}
      {stats.topQuote && (
        <div className="bg-white rounded-[18px] border border-[#e5fed9] shadow-sm p-6">
          <h3 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[17px] text-[#5c4033] mb-5">
            🏆 가장 인기있는 명언
          </h3>
          <div className="bg-[#fff9f0] rounded-[14px] p-5">
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] mb-4 leading-relaxed">
              "{stats.topQuote.text}"
            </p>
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033] opacity-60 mb-3">
              - {stats.topQuote.author}
            </p>
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#8faf3e]">
              ❤️ {stats.topQuote.likes}
            </p>
          </div>
        </div>
      )}

      {/* 최근 명언 */}
      <div className="bg-white rounded-[18px] border border-[#e5fed9] shadow-sm p-6">
        <h3 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[17px] text-[#5c4033] mb-5">
          📝 최근 추가된 명언
        </h3>
        <div className="space-y-4">
          {stats.recentQuotes.length === 0 ? (
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] opacity-50 text-center py-8">
              아직 명언이 없습니다
            </p>
          ) : (
            stats.recentQuotes.map((quote) => (
              <div
                key={quote._id}
                className="bg-[#fff9f0] rounded-[12px] p-5"
              >
                <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] mb-4 leading-relaxed line-clamp-2">
                  "{quote.text}"
                </p>
                <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] text-[#5c4033] opacity-60 mb-3">
                  - {quote.author}
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] text-[#8faf3e]">
                    ❤️ {quote.likes}
                  </span>
                  <span className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] text-[#5c4033] opacity-40">
                    {new Date(quote.createdAt).toLocaleDateString('ko-KR', {
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
