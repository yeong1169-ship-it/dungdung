import { useState, useEffect } from "react";
import { toast } from "sonner";
import { quotesApi, type Quote } from "../lib/api";

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [formData, setFormData] = useState({
    text: "",
    author: "",
    category: "오늘 둥실이의 한마디",
  });

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      setLoading(true);
      const data = await quotesApi.getAll({ limit: 100 });
      setQuotes(data);
    } catch (error) {
      console.error("명언 로딩 실패:", error);
      toast.error("명언을 불러오는데 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.text.trim() || !formData.author.trim()) {
      toast.error("명언과 작가를 모두 입력해주세요");
      return;
    }

    try {
      if (editingQuote) {
        // 수정
        await quotesApi.update(editingQuote._id, formData);
        toast.success("명언이 수정되었습니다");
      } else {
        // 추가
        await quotesApi.create(formData);
        toast.success("새 명언이 추가되었습니다");
      }

      setFormData({ text: "", author: "", category: "오늘 둥실이의 한마디" });
      setIsAddModalOpen(false);
      setEditingQuote(null);
      loadQuotes();
    } catch (error) {
      console.error("명언 저장 실패:", error);
      toast.error("명언 저장에 실패했습니다");
    }
  };

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote);
    setFormData({
      text: quote.text,
      author: quote.author,
      category: quote.category,
    });
    setIsAddModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말로 이 명언을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await quotesApi.delete(id);
      toast.success("명언이 삭제되었습니다");
      loadQuotes();
    } catch (error) {
      console.error("명언 삭제 실패:", error);
      toast.error("명언 삭제에 실패했습니다");
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingQuote(null);
    setFormData({ text: "", author: "", category: "오늘 둥실이의 한마디" });
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
    <div className="space-y-6 relative">
      {/* 페이지 제목 및 추가 버튼 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[22px] text-[#5c4033] mb-2">
            명언 관리
          </h2>
          <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] opacity-70">
            총 {quotes.length}개
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-br from-[#FFD2D2] to-[#FF9999] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] px-6 py-4 rounded-[14px] shadow-md whitespace-nowrap min-h-[52px]"
        >
          + 추가
        </button>
      </div>

      {/* 명언 목록 */}
      <div className="space-y-5">
        {quotes.length === 0 ? (
          <div className="bg-white rounded-[24px] border-2 border-[#e5fed9] shadow-sm p-10 text-center">
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] opacity-50">
              아직 명언이 없습니다
            </p>
          </div>
        ) : (
          quotes.map((quote) => (
            <div
              key={quote._id}
              className="bg-white rounded-[24px] border-2 border-[#e5fed9] shadow-sm"
            >
              {/* 16px padding 시작 */}
              <div className="p-4">
                {/* 명언 텍스트 */}
                <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] leading-relaxed mb-6">
                  "{quote.text}"
                </p>

                {/* 우측 영역: 작가와 날짜 */}
                <div className="flex items-start justify-between mb-4">
                  {/* 좋아요 - 좌측 */}
                  <span className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#8faf3e]">
                    ❤️ {quote.likes}
                  </span>

                  {/* 우측 영역: 작가 위, 날짜 아래 */}
                  <div className="text-right">
                    <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] text-[#5c4033] opacity-60 mb-1">
                      - {quote.author}
                    </p>
                    <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[11px] text-[#5c4033] opacity-40">
                      {new Date(quote.createdAt).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* 버튼들 - 둥글게 */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(quote)}
                    className="flex-1 bg-[#8faf3e] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] py-3 rounded-full hover:bg-[#7a9535] transition-colors"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(quote._id)}
                    className="flex-1 bg-white text-[#ff9999] font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] py-3 rounded-full hover:bg-[#fff5f5] transition-colors border-2 border-[#ff9999]"
                  >
                    삭제
                  </button>
                </div>
              </div>
              {/* 16px padding 끝 */}
            </div>
          ))
        )}
      </div>

      {/* 추가/수정 모달 */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-[100]"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-[24px] p-6 w-full min-w-[343px] max-w-[418px] shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[20px] text-[#5c4033] mb-6">
              {editingQuote ? "명언 수정" : "새 명언 추가"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 명언 입력 */}
              <div>
                <label className="block font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] mb-2">
                  명언 내용 *
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full border border-[#e5fed9] rounded-[14px] px-4 py-3 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] focus:outline-none focus:border-[#8faf3e] resize-none"
                  rows={4}
                  placeholder="명언을 입력하세요"
                  required
                />
              </div>

              {/* 작가 입력 */}
              <div>
                <label className="block font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] mb-2">
                  작가 *
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full border border-[#e5fed9] rounded-[14px] px-4 py-3 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] focus:outline-none focus:border-[#8faf3e]"
                  placeholder="작가 이름"
                  required
                />
              </div>

              {/* 카테고리 입력 */}
              <div>
                <label className="block font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[13px] text-[#5c4033] mb-2">
                  카테고리
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-[#e5fed9] rounded-[14px] px-4 py-3 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] focus:outline-none focus:border-[#8faf3e]"
                  placeholder="오늘 둥실이의 한마디"
                />
              </div>

              {/* 버튼들 */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-[#f5f5f5] text-[#5c4033] font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] py-4 rounded-full hover:bg-[#e5e5e5] transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-br from-[#FFD2D2] to-[#FF9999] text-white font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] py-4 rounded-full shadow-md"
                >
                  {editingQuote ? "수정" : "추가"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
