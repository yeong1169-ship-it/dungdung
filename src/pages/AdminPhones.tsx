import { useState, useEffect } from "react";

interface PhoneEntry {
  id: number;
  phone: string;
  date: string;
}

export default function AdminPhones() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneEntry[]>([]);

  useEffect(() => {
    loadPhoneNumbers();
  }, []);

  const loadPhoneNumbers = () => {
    const stored = localStorage.getItem('phoneNumbers');
    if (stored) {
      const parsed = JSON.parse(stored);
      setPhoneNumbers(parsed.reverse()); // 최신순으로 정렬
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('이 전화번호를 삭제하시겠습니까?')) {
      const updated = phoneNumbers.filter(entry => entry.id !== id);
      setPhoneNumbers(updated);
      localStorage.setItem('phoneNumbers', JSON.stringify(updated.reverse()));
    }
  };

  const handleExport = () => {
    const csvContent = "전화번호,등록일시\n" +
      phoneNumbers.map(entry => `${entry.phone},${entry.date}`).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `소식받기_전화번호_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="bg-white rounded-[20px] p-4 shadow-sm border border-[#e5fed9]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[18px] text-[#5c4033]">
            소식 받기 전화번호
          </h2>
          <span className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#8faf3e]">
            총 {phoneNumbers.length}개
          </span>
        </div>
        <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033] opacity-70">
          사용자가 입력한 전화번호 목록입니다
        </p>
      </div>

      {/* 엑스포트 버튼 */}
      {phoneNumbers.length > 0 && (
        <button
          onClick={handleExport}
          className="w-full bg-[#8faf3e] text-white rounded-[12px] px-4 py-3 font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] hover:bg-[#7a9835] transition-colors"
        >
          📥 CSV로 내보내기
        </button>
      )}

      {/* 전화번호 목록 */}
      <div className="space-y-2">
        {phoneNumbers.length === 0 ? (
          <div className="bg-white rounded-[20px] p-8 shadow-sm border border-[#e5fed9] text-center">
            <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[14px] text-[#5c4033] opacity-50">
              등록된 전화번호가 없습니다
            </p>
          </div>
        ) : (
          phoneNumbers.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-[16px] p-4 shadow-sm border border-[#e5fed9] flex items-center justify-between"
            >
              <div className="flex-1">
                <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:B',sans-serif] text-[16px] text-[#5c4033]">
                  {entry.phone}
                </p>
                <p className="font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] text-[#5c4033] opacity-50 mt-1">
                  {entry.date}
                </p>
              </div>
              <button
                onClick={() => handleDelete(entry.id)}
                className="ml-4 px-3 py-1.5 bg-red-50 text-red-500 rounded-[8px] font-['Hakgyoansim_Dunggeunmiso_OTF:R',sans-serif] text-[12px] hover:bg-red-100 transition-colors"
              >
                삭제
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
