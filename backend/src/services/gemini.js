import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: API_KEY });

if (!API_KEY) {
  console.error('⚠️  GROQ_API_KEY가 설정되지 않았습니다!');
  console.error('📝 https://console.groq.com 에서 무료 API 키를 발급받으세요.');
}

// 둥실이의 성격을 반영한 시스템 프롬프트
const DUNGSIL_PERSONALITY = `
⚠️ 최우선 규칙: 반드시 1-2문장으로만 답변! 절대 3문장 이상 쓰지 마세요!

당신은 '둥실이'라는 이름의 수달 캐릭터입니다. 바다에 둥실둥실 떠다니는 걸 좋아하며, 파도에 몸을 맡기고 흘러가는 대로 있다 보면 마음이 편안해져요.

## 둥실이의 이야기
완벽한 척하다 99일을 미룬 친구예요. 이제는 알아요:
- 완벽하지 않아도 시작할 수 있다는 것
- 작은 발걸음도 다른 사람들에게 응원이 될 수 있다는 것

## 핵심 철학
흐르듯 성장하기 - 파도처럼 오르락내리락해도 결국 앞으로 가요
스스로 답 찾기 - 과도한 공감보다는 함께 해결방안을 모색해요
꾸준함의 힘 - 이 길이 맞든 아니든, 꾸준히 하면 값진 경험을 얻어요
함께 용기내기 - 한 번 사는 인생, 겁내지 말고 나아가요

## 성격
- 도전적, 솔직함, 회복력, 성장 지향, 시행착오형, 현실적 응원, 꾸준함 신봉
- 과도한 공감보다는 함께 문제를 파악하고 해결 방법을 찾아가는 친구
- 친근하되 존중하는 태도 유지

## 차별화 (매우 중요!)
- 다른 캐릭터: "괜찮아" 반복, 무조건적 위로, 완벽한 멘토
- 둥실이: "왜 그럴까?" 질문, 함께 이유 찾기, 해결방안 모색하는 친구

## 말투 (필수!)
- **존중하는 반말 사용** (~야, ~잖아, ~거든, ~해, ~네, ~지)
- **극도로 짧게** - 반드시 1-2문장으로만 답변! 절대 길게 쓰지 마세요!
- **간결한 구어체**
- **이모지 최소화** - 한 응답당 최대 1-2개만 사용
- **웃음 표현 최소화** - 꼭 필요할 때만 사용하되 과하지 않게
- **순수 한글만 사용** - 영어, 일본어, 한자, 외래어 절대 금지! (이모지만 허용)

## 예시 응답 (이 길이를 절대 넘지 마세요!)
✅ 좋은 예시:
- "그럴 수 있지. 왜 그랬을까?"
- "나도 그랬어. 다음엔 어떻게 해볼까?"
- "방법을 바꿔보는 건 어때?"
- "무슨 일이 있었는지 말해줄래?"

❌ 피해야 할 표현:
- "괜찮아요", "힘내세요" (존댓말 절대 X)
- "넌 정말 대단해! 👍✨💪🎉" (과한 칭찬, 이모지 난발 X)
- 3문장 이상의 긴 답변 (절대 금지!)
- "okay", "fighting", "がんばって", "Check", "Tip" 등 모든 외국어와 외래어
- "ㅋㅋㅋㅋㅋ", "ㅎㅎㅎㅎ" 등 과도한 웃음 표현 (꼭 필요할 때만 짧게)
- 반말이지만 무례한 표현 (존중하는 태도 유지)

## 응답 규칙 (반드시 지킬 것!)
1. 무조건 반말 사용하되 존중하는 태도 유지
2. 절대적으로 1-2문장으로만 답변! 3문장 이상 금지!
3. 과도한 공감 금지 → 함께 해결방안 모색
4. 이모지는 한 응답당 최대 1-2개만
5. 웃음 표현 최소화 (꼭 필요할 때만)
6. 순수 한글만 사용 (영어/일본어/한자/외래어 절대 금지, 이모지만 허용)
7. 구체적인 질문으로 스스로 생각하게 유도
8. 친근하되 예의 바른 말투 유지
`;

/**
 * 둥실이 AI 응답 생성 - Groq API 사용
 * @param {string} userMessage - 사용자 메시지
 * @param {Array<{role: string, text: string}>} conversationHistory - 대화 히스토리
 * @returns {Promise<string>} AI 응답
 */
export async function generateDungsilResponse(userMessage, conversationHistory = []) {
  try {
    // 대화 히스토리를 메시지 형식으로 구성
    const messages = [
      { role: 'system', content: DUNGSIL_PERSONALITY }
    ];

    // 이전 대화 추가
    conversationHistory.slice(-5).forEach(msg => {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text
      });
    });

    // 현재 메시지 추가
    messages.push({ role: 'user', content: userMessage });

    // Groq API로 채팅 완성
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile', // Groq의 무료 모델 (빠르고 한국어 지원 좋음)
      temperature: 0.8,
      max_tokens: 80, // 짧은 답변을 위해 토큰 수 감소
      top_p: 0.9
    });

    let text = chatCompletion.choices[0]?.message?.content || "미안, 지금은 대답하기 어려워 ㅠㅠ";
    text = text.trim();

    // 존댓말이 섞여있으면 반말로 변환 시도
    text = text
      .replace(/해요\./g, '해.')
      .replace(/예요\./g, '야.')
      .replace(/이에요\./g, '이야.')
      .replace(/요\./g, '.')
      .replace(/합니다\./g, '해.')
      .replace(/입니다\./g, '이야.');

    // 강제로 1-2문장으로 제한 (마침표 기준으로 잘라내기)
    const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 0);
    if (sentences.length > 2) {
      text = sentences.slice(0, 2).join('. ') + '.';
    }

    return text;
  } catch (error) {
    console.error("Groq API 오류:", error);
    return "미안, 지금은 대답하기 어려워 ㅠㅠ 조금 있다가 다시 말해줄래?";
  }
}

/**
 * 이미지 프롬프트 생성
 * @param {string} userRequest - 사용자의 이미지 요청
 * @returns {Promise<string>} 영어 이미지 프롬프트
 */
export async function generateImagePrompt(userRequest) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Translate Korean image requests to detailed English image generation prompts. Be specific and descriptive.'
        },
        {
          role: 'user',
          content: `Korean request: "${userRequest}"\n\nEnglish image prompt (only output the prompt, no explanation):`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 100
    });

    return chatCompletion.choices[0]?.message?.content?.trim() || "cute otter character floating on water, warm colors, peaceful atmosphere, digital art, soft lighting";
  } catch (error) {
    console.error("이미지 프롬프트 생성 오류:", error);
    return "cute otter character floating on water, warm colors, peaceful atmosphere, digital art, soft lighting";
  }
}

/**
 * 이미지 생성 요청인지 확인
 * @param {string} text - 사용자 메시지
 * @returns {boolean} 이미지 요청 여부
 */
export function isImageRequest(text) {
  const imageKeywords = ['이미지', '그림', '사진', '만들어', '그려', '생성', '배경화면', '그림 그려'];
  return imageKeywords.some(keyword => text.includes(keyword));
}
