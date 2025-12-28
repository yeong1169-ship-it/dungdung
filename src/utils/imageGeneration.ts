// Hugging Face API를 사용한 이미지 생성
const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY || "YOUR_HF_API_KEY";

// Stable Diffusion 모델 사용
const MODEL_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

export async function generateImage(prompt: string): Promise<string> {
  try {
    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        options: {
          wait_for_model: true
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    console.error("이미지 생성 오류:", error);
    // 오류 발생시 플레이스홀더 이미지 반환
    return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=500&fit=crop";
  }
}

// 백엔드를 통한 이미지 생성
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export async function searchUnsplashImage(query: string): Promise<string> {
  try {
    console.log("🖼️  이미지 생성 요청:", query);

    const response = await fetch(`${API_URL}/chat/generate-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: query })
    });

    if (!response.ok) {
      throw new Error(`API 오류: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ 이미지 URL 생성:", data.imageUrl);
    return data.imageUrl;
  } catch (error) {
    console.error("이미지 생성 오류:", error);
    // 오류 시 기본 이미지 반환
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${randomId}/500/500`;
  }
}
