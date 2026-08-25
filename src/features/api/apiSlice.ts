import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getApiBaseUrl, getAuthToken } from '../../utils/api.js';
import { Product, Inquiry, Category, DashboardStats } from '../../types/index.js';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product', 'Inquiry', 'Category', 'Dashboard', 'Admin'],
  endpoints: (builder) => ({
    // PRODUCTS
    getProducts: builder.query<Product[], { category?: string; stock?: string; search?: string } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.category && params.category !== 'All') queryParams.append('category', params.category);
        if (params?.stock && params.stock !== 'All') queryParams.append('stock', params.stock);
        if (params?.search) queryParams.append('search', params.search);
        const qs = queryParams.toString();
        return `/products${qs ? `?${qs}` : ''}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id, _id, slug }) => ({ type: 'Product' as const, id: (id || _id || slug) as string })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getProduct: builder.query<Product, string>({
      query: (slugOrId) => `/products/${slugOrId}`,
      providesTags: (_result, _error, slugOrId) => [{ type: 'Product', id: slugOrId }],
    }),

    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }, { type: 'Dashboard', id: 'STATS' }],
    }),

    updateProduct: builder.mutation<Product, { id: string | number; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Product', id: String(id) },
        { type: 'Product', id: 'LIST' },
        { type: 'Dashboard', id: 'STATS' },
      ],
    }),

    updateStock: builder.mutation<Product, { id: string | number; stock: string }>({
      query: ({ id, stock }) => ({
        url: `/products/${id}/stock`,
        method: 'PATCH',
        body: { stock },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Product', id: String(id) },
        { type: 'Product', id: 'LIST' },
        { type: 'Dashboard', id: 'STATS' },
      ],
    }),

    deleteProduct: builder.mutation<{ success: boolean; message: string }, string | number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }, { type: 'Dashboard', id: 'STATS' }],
    }),

    // INQUIRIES
    getInquiries: builder.query<Inquiry[], { status?: string; search?: string } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.status && params.status !== 'all') queryParams.append('status', params.status);
        if (params?.search) queryParams.append('search', params.search);
        const qs = queryParams.toString();
        return `/inquiries${qs ? `?${qs}` : ''}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id, _id, inquiryId }) => ({
                type: 'Inquiry' as const,
                id: (id || _id || inquiryId) as string,
              })),
              { type: 'Inquiry', id: 'LIST' },
            ]
          : [{ type: 'Inquiry', id: 'LIST' }],
    }),

    getInquiry: builder.query<Inquiry, string>({
      query: (id) => `/inquiries/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Inquiry', id }],
    }),

    submitInquiry: builder.mutation<{ success: boolean; message: string; inquiry: Inquiry }, Partial<Inquiry>>({
      query: (inquiryData) => ({
        url: '/inquiries',
        method: 'POST',
        body: inquiryData,
      }),
      invalidatesTags: [{ type: 'Inquiry', id: 'LIST' }, { type: 'Dashboard', id: 'STATS' }],
    }),

    updateInquiryStatus: builder.mutation<Inquiry, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/inquiries/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Inquiry', id },
        { type: 'Inquiry', id: 'LIST' },
        { type: 'Dashboard', id: 'STATS' },
      ],
    }),

    addInquiryNote: builder.mutation<Inquiry, { id: string; note: { text: string; author?: string } }>({
      query: ({ id, note }) => ({
        url: `/inquiries/${id}/notes`,
        method: 'POST',
        body: note,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Inquiry', id }, { type: 'Inquiry', id: 'LIST' }],
    }),

    deleteInquiry: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/inquiries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Inquiry', id: 'LIST' }, { type: 'Dashboard', id: 'STATS' }],
    }),

    clearAllInquiries: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: '/inquiries/clear/all',
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Inquiry', id: 'LIST' }, { type: 'Dashboard', id: 'STATS' }],
    }),

    // CATEGORIES
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id, _id, slug }) => ({ type: 'Category' as const, id: (id || _id || slug) as string })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),

    addCategory: builder.mutation<Category, Partial<Category>>({
      query: (newCategory) => ({
        url: '/categories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }, { type: 'Dashboard', id: 'STATS' }],
    }),

    updateCategory: builder.mutation<Category, { id: string; data: Partial<Category> }>({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
    }),

    deleteCategory: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }, { type: 'Dashboard', id: 'STATS' }],
    }),

    // DASHBOARD STATS
    getDashboardStats: builder.query<{ success: boolean; data: DashboardStats }, void>({
      query: () => '/dashboard/stats',
      providesTags: [{ type: 'Dashboard', id: 'STATS' }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useUpdateStockMutation,
  useDeleteProductMutation,
  useGetInquiriesQuery,
  useGetInquiryQuery,
  useSubmitInquiryMutation,
  useUpdateInquiryStatusMutation,
  useAddInquiryNoteMutation,
  useDeleteInquiryMutation,
  useClearAllInquiriesMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetDashboardStatsQuery,
} = apiSlice;
