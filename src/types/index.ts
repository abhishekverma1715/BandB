export type ProductStock = 'in-stock' | 'low-stock' | 'out-of-stock';
export type ProductStockStatus = ProductStock;
export type InquiryStatus = 'new' | 'in-progress' | 'resolved' | 'archived';

// Product Interface
export interface Product {
  _id?: string;
  id: string | number;
  name: string;
  category: string;
  grade?: string;
  price: string;
  moq?: string;
  rating?: string;
  badge?: string;
  badgeColor?: string;
  image?: string;
  slug: string;
  stock: ProductStock;
  discountPercent?: number | null;
  description: string;
  specifications?: Record<string, string> | Array<{ key: string; value: string }>;
  createdAt?: string;
  updatedAt?: string;
}

// Inquiry Note Interface
export interface InquiryNote {
  _id?: string;
  id?: string;
  text: string;
  author: string;
  createdAt?: string;
}

// Inquiry Interface
export interface Inquiry {
  _id?: string;
  id?: string;
  inquiryId: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  subject: string;
  product?: string;
  quantity?: string;
  message: string;
  newsletter?: boolean;
  privacy: boolean;
  status: InquiryStatus;
  notes?: InquiryNote[];
  createdAt: string;
  updatedAt?: string;
}

// Category Interface
export interface Category {
  _id?: string;
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  productCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Admin Interface
export interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  token?: string;
  lastLogin?: string;
}

// Generic API Response Interface
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: unknown;
  count?: number;
}

// Dashboard Stats Interface
export interface DashboardStats {
  totalProducts: number;
  unreadInquiries: number;
  totalInquiries: number;
  stockAlertsCount: number;
  totalCategories: number;
  recentInquiries: Inquiry[];
  lowStockProducts: Product[];
}

// Auth State Interface
export interface AuthState {
  adminInfo: Admin | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Product State Interface
export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  lastFetched: string | null;
}

// Category State Interface
export interface CategoryState {
  items: Category[];
  loading: boolean;
  error: string | null;
  lastFetched: string | null;
}

// Inquiry State Interface
export interface InquiryState {
  items: Inquiry[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  lastFetched: string | null;
}
