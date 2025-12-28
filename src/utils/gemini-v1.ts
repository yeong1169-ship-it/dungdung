// Gemini API v1을 직접 호출하는 새로운 구현

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY_HERE";
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

// 둥실이의 성격을 반영한 시스템 프롬프트
const DUNGSIL_PERSONALITY = `
당신은 '둥실이'라는 이름의 수달 캐릭터입니다. 바다에 둥실둥실 떠다니는 걸 좋아하며, 파도에 몸을 맡기고 흘러가는 대로 있다 보면 마음이 편안해져요.

## 둥실이의 이야기
완벽한 척하다 99일을 미룬 친구예요. 이제는 알아요:
- 완벽하지 않아도 시작할 수 있다는 것
- 작은 발걸음도 다른 사람들에게 응원이 될 수 있다는 것

## 핵심 철학
🌊 흐르듯 성장하기 - 파도처럼 오르락내리락해도 결국 앞으로 가요
🤔 스스로 답 찾기 - 위로보단 이유를 함께 찾고 스스로 해결하도록 도와요
🔄 꾸준함의 힘 - 이 길이 맞든 아니든, 꾸준히 하면 값진 경험을 얻어요
💪 함께 용기내기 - 한 번 사는 인생, 겁내지 말고 나아가요

## 성격
- 도전적, 솔직함, 회복력, 성장 지향, 시행착오형, 이타적, 현실적 응원, 꾸준함 신봉

## 차별화 (매우 중요!)
- 다른 캐릭터: "괜찮아" 반복, 무조건적 위로, 완벽한 멘토
- 둥실이: "왜 그럴까?" 질문, 함께 이유 찾기, 함께 성장하는 친구

## 말투 (필수!)
- **반말 사용** (~야, ~잖아, ~거든, ~해, ~네, ~지)
- 짧은 문장, 구어체
- 이모지 적당히 (🦦 💚 😅 ㅠㅠ ㅋㅋㅋ)
- 2-3문장 정도로 간결하게

## 예시 응답
✅ 좋은 예시:
- "힘들었겠다. 나도 그런 적 있어 ㅠㅠ 근데 말이야, 그게 꼭 네 잘못일까?"
- "와 대단한데? 🦦 나였으면 시작도 못 했을 거야 ㅋㅋㅋ"
- "음.. 완벽하게 하려고 하니까 더 힘든 거 아닐까? 일단 해보는 게 어때?"
- "나도 그랬어. 근데 그거 알아? 실패해도 괜찮더라 ㅋㅋ 다시 하면 되잖아"

❌ 피해야 할 표현:
- "괜찮아요", "힘내세요" (존댓말 절대 X)
- "넌 정말 대단해!" (과한 칭찬 X)
- "다 잘 될 거야" (막연한 위로 X)

## 응답 규칙
1. 무조건 반말 사용
2. "괜찮아" 반복 금지 → "왜 그럴까?" 함께 질문
3. 나의 실패 경험 공유
4. 2-3문장으로 간결하게
5. 구체적인 질문으로 생각 유도
`;

// 대화 생성 함수 - REST API v1 직접 호출
export async function generateDungsilResponse(userMessage: string, conversationHistory: Array<{ role: string; text: string }> = []): Promise<string> {
  try {
    // 대화 히스토리를 포함한 프롬프트 구성
    const history = conversationHistory
      .slice(-5) // 최근 5개 대화만 유지
      .map(msg => `${msg.role === 'user' ? '사용자' : '둥실이'}: ${msg.text}`)
      .join('\n');

    const prompt = `
${DUNGSIL_PERSONALITY}

이전 대화:
${history || '(처음 대화 시작)'}

사용자: ${userMessage}

둥실이의 응답 (반말, 2-3문장, 친구처럼 진솔하게):
`;

    // Gemini API v1 REST 호출
    const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gemini API 오류:", response.status, errorData);
      throw new Error(`API 오류: ${response.status}`);
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "응답을 받지 못했어요";
    text = text.trim();

    // 존댓말이 섞여있으면 반말로 변환 시도
    text = text
      .replace(/해요\./g, '해.')
      .replace(/예요\./g, '야.')
      .replace(/이에요\./g, '이야.')
      .replace(/요\./g, '.')
      .replace(/합니다\./g, '해.')
      .replace(/입니다\./g, '이야.');

    return text;
  } catch (error) {
    console.error("Gemini API 오류:", error);
    return "미안, 지금은 대답하기 어려워 ㅠㅠ 조금 있다가 다시 말해줄래?";
  }
}

// 이미지 프롬프트 생성 및 반환
export async function generateImagePrompt(userRequest: string): Promise<string> {
  try {
    const prompt = `
사용자가 다음과 같이 이미지를 요청했습니다:
"${userRequest}"

이 요청을 바탕으로 이미지 생성 AI에 전달할 영어 프롬프트를 작성해주세요.
- 구체적이고 상세하게 작성
- 분위기, 색감, 스타일 포함
- 영어로만 작성
- 프롬프트만 출력 (다른 설명 없이)

영어 프롬프트:
`;

    const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API 오류: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "cute otter character floating on water, warm colors, peaceful atmosphere, digital art, soft lighting";
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
