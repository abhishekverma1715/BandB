import { Product, Inquiry, Category, Admin, DashboardStats, ApiResponse } from '../types/index.js';

export const getApiBaseUrl = (): string => {
  const envUrl = (import.meta as any).env?.VITE_API_URL;
  if (envUrl) {
    const trimmed = envUrl.trim().replace(/\/$/, '');
    return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
  }
  return '/api';
};

export const getAuthToken = (): string | null => {
  try {
    const saved = localStorage.getItem('adminInfo');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed?.token || null;
    }
  } catch {
    // ignore
  }
  return null;
};

export const apiFetch = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;

  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);

  let data: any = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    const text = await response.text();
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    const errorMessage =
      data?.error || data?.message || `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  return data as T;
};

export const apiGet = <T = any>(endpoint: string, params?: Record<string, any>): Promise<T> => {
  let queryString = '';
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    const qs = searchParams.toString();
    if (qs) queryString = `?${qs}`;
  }
  return apiFetch<T>(`${endpoint}${queryString}`, { method: 'GET' });
};

export const apiPost = <T = any>(endpoint: string, body?: any): Promise<T> =>
  apiFetch<T>(endpoint, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });

export const apiPut = <T = any>(endpoint: string, body?: any): Promise<T> =>
  apiFetch<T>(endpoint, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });

export const apiPatch = <T = any>(endpoint: string, body?: any): Promise<T> =>
  apiFetch<T>(endpoint, {
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
  });

export const apiDelete = <T = any>(endpoint: string): Promise<T> =>
  apiFetch<T>(endpoint, {
    method: 'DELETE',
  });

// Namespaced API Methods
export const api = {
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiPost<Admin>('/auth/login', credentials),
    me: () => apiGet<ApiResponse<Admin>>('/auth/me'),
    logout: () => apiPost<{ success: boolean; message: string }>('/auth/logout'),
  },
  products: {
    getAll: (params?: { category?: string; stock?: string; search?: string }) =>
      apiGet<Product[]>('/products', params),
    getOne: (slugOrId: string) => apiGet<Product>(`/products/${slugOrId}`),
    create: (data: Partial<Product>) => apiPost<Product>('/products', data),
    update: (id: string, data: Partial<Product>) => apiPut<Product>(`/products/${id}`, data),
    updateStock: (id: string, stock: string) =>
      apiPatch<Product>(`/products/${id}/stock`, { stock }),
    delete: (id: string) => apiDelete<{ success: boolean; message: string }>(`/products/${id}`),
  },
  inquiries: {
    submit: (data: Partial<Inquiry>) =>
      apiPost<{ success: boolean; message: string; inquiry: Inquiry }>('/inquiries', data),
    getAll: (params?: { status?: string; search?: string }) =>
      apiGet<Inquiry[]>('/inquiries', params),
    getOne: (id: string) => apiGet<Inquiry>(`/inquiries/${id}`),
    updateStatus: (id: string, status: string) =>
      apiPatch<Inquiry>(`/inquiries/${id}/status`, { status }),
    addNote: (id: string, note: { text: string; author?: string }) =>
      apiPost<Inquiry>(`/inquiries/${id}/notes`, note),
    delete: (id: string) => apiDelete<{ success: boolean; message: string }>(`/inquiries/${id}`),
    clearAll: () =>
      apiDelete<{ success: boolean; message: string }>('/inquiries/clear/all'),
  },
  categories: {
    getAll: () => apiGet<Category[]>('/categories'),
    create: (data: Partial<Category>) => apiPost<Category>('/categories', data),
    update: (id: string, data: Partial<Category>) => apiPut<Category>(`/categories/${id}`, data),
    delete: (id: string) => apiDelete<{ success: boolean; message: string }>(`/categories/${id}`),
  },
  dashboard: {
    getStats: () => apiGet<{ success: boolean; data: DashboardStats }>('/dashboard/stats'),
  },
};
