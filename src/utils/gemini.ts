// 백엔드 API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// 대화 생성 함수 - 백엔드 API 호출
export async function generateDungsilResponse(userMessage: string, conversationHistory: Array<{ role: string; text: string }> = []): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/chat/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        conversationHistory: conversationHistory.slice(-5)
      })
    });

    if (!response.ok) {
      throw new Error(`API 오류: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("백엔드 API 오류:", error);
    return "미안, 지금은 대답하기 어려워 ㅠㅠ 조금 있다가 다시 말해줄래?";
  }
}

// 이미지 프롬프트 생성 및 반환 - 백엔드 API 호출
export async function generateImagePrompt(userRequest: string): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/chat/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userRequest,
        conversationHistory: []
      })
    });

    if (!response.ok) {
      console.error(`API 오류: ${response.status}`);
      throw new Error(`API 오류: ${response.status}`);
    }

    const data = await response.json();
    console.log("이미지 프롬프트 API 응답:", data);

    if (data.imagePrompt) {
      return data.imagePrompt;
    }

    // imagePrompt가 없으면 기본 프롬프트 반환
    return "cute otter character floating on water, warm colors, peaceful atmosphere, digital art, soft lighting";
  } catch (error) {
    console.error("이미지 프롬프트 생성 오류:", error);
    return "cute otter character floating on water, warm colors, peaceful atmosphere, digital art, soft lighting";
  }
}

// 이미지 생성 요청인지 확인
export function isImageRequest(text: string): boolean {
  const imageKeywords = ['이미지', '그림', '사진', '만들어', '그려', '생성', '배경화면', '그림 그려'];
  return imageKeywords.some(keyword => text.includes(keyword));
}

// 대화 히스토리 관리를 위한 타입
export interface ConversationMessage {
  role: 'user' | 'dungsil';
  text: string;
}
