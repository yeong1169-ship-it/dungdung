// API 기본 URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// API 클라이언트 유틸리티
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // GET 요청
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST 요청
  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT 요청
  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // PATCH 요청
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE 요청
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // FormData POST 요청 (파일 업로드용)
  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        // FormData 사용 시 Content-Type 헤더를 자동으로 설정하도록 함
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // FormData PUT 요청 (파일 업로드용 수정)
  async putFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: formData,
        // FormData 사용 시 Content-Type 헤더를 자동으로 설정하도록 함
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }
}

export const api = new ApiClient(API_BASE_URL);

// 타입 정의
export interface Quote {
  _id: string;
  text: string;
  author: string;
  category: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Wallpaper {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  colors: string[];
  resolutions: {
    mobile: { width: number; height: number };
    tablet: { width: number; height: number };
    desktop: { width: number; height: number };
  };
  views: number;
  downloads: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  _id: string;
  text: string;
  sender: 'dungsil' | 'user';
  sessionId: string;
  isSaved: boolean;
  createdAt: string;
  updatedAt: string;
}

// API 함수들
export const quotesApi = {
  getAll: (params?: { category?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.limit) query.append('limit', params.limit.toString());
    return api.get<Quote[]>(`/quotes?${query.toString()}`);
  },

  getRandom: () => api.get<Quote>('/quotes/random'),

  getById: (id: string) => api.get<Quote>(`/quotes/${id}`),

  create: (data: { text: string; author: string; category?: string }) =>
    api.post<Quote>('/quotes', data),

  like: (id: string) => api.patch<Quote>(`/quotes/${id}/like`),

  update: (id: string, data: Partial<Quote>) =>
    api.put<Quote>(`/quotes/${id}`, data),

  delete: (id: string) => api.delete(`/quotes/${id}`),
};

export const wallpapersApi = {
  getAll: (params?: {
    sort?: 'newest' | 'popular' | 'downloads' | 'oldest';
    search?: string;
    limit?: number;
    page?: number;
  }) => {
    const query = new URLSearchParams();
    if (params?.sort) query.append('sort', params.sort);
    if (params?.search) query.append('search', params.search);
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.page) query.append('page', params.page.toString());
    return api.get<{
      wallpapers: Wallpaper[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
      };
    }>(`/wallpapers?${query.toString()}`);
  },

  getById: (id: string) => api.get<Wallpaper>(`/wallpapers/${id}`),

  create: (formData: FormData) =>
    api.postFormData<Wallpaper>('/wallpapers', formData),

  download: (id: string) => api.patch<Wallpaper>(`/wallpapers/${id}/download`),

  update: (id: string, formData: FormData) =>
    api.putFormData<Wallpaper>(`/wallpapers/${id}`, formData),

  delete: (id: string) => api.delete(`/wallpapers/${id}`),
};

export const chatApi = {
  getSessionMessages: (sessionId: string, limit?: number) => {
    const query = limit ? `?limit=${limit}` : '';
    return api.get<ChatMessage[]>(`/chat/session/${sessionId}${query}`);
  },

  sendMessage: (data: {
    text: string;
    sender: 'dungsil' | 'user';
    sessionId: string;
  }) => api.post<ChatMessage>('/chat', data),

  toggleSave: (id: string) => api.patch<ChatMessage>(`/chat/${id}/save`),

  getSavedMessages: (sessionId: string) =>
    api.get<ChatMessage[]>(`/chat/saved/${sessionId}`),

  deleteMessage: (id: string) => api.delete(`/chat/${id}`),

  deleteSession: (sessionId: string) =>
    api.delete<{ message: string; deletedCount: number }>(
      `/chat/session/${sessionId}`
    ),
};
