import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { productsData as defaultProducts } from '../../data/productsData.js';
import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from '../../utils/api.js';
import { Product, ProductState, ProductStock } from '../../types/index.js';

const STORAGE_KEY = 'bb_products';

export const normalizeProduct = (p: any): Product => {
  if (!p) {
    return {
      id: String(Date.now()),
      name: 'Untitled Product',
      category: 'Heavy-Duty Containers',
      price: '$0.00 / unit',
      slug: `product-${Date.now()}`,
      stock: 'in-stock' as ProductStock,
      description: '',
    };
  }
  const id = p._id || p.id || String(Date.now());
  const slug =
    p.slug ||
    (p.name
      ? p.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      : `product-${id}`);

  return {
    ...p,
    _id: p._id || id,
    id: id,
    slug: slug,
    name: p.name || 'Untitled Product',
    category: p.category || 'Heavy-Duty Containers',
    grade: p.grade || '100% Virgin Polymer',
    price: p.price || '$0.00 / unit',
    moq: p.moq || 'MOQ 100 pcs',
    rating: String(p.rating || '5.0'),
    badge: p.badge || '',
    badgeColor: p.badgeColor || 'bg-blue-600',
    image: p.image || '/hero-products/prod-1.png',
    stock: (p.stock as ProductStock) || 'in-stock',
    discountPercent:
      p.discountPercent !== undefined && p.discountPercent !== null
        ? Number(p.discountPercent)
        : null,
    description: p.description || '',
    specifications: p.specifications || {},
    createdAt: p.createdAt || new Date().toISOString(),
  };
};

const loadInitialProducts = (): Product[] => {
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeProduct).filter(Boolean);
      }
    }
  } catch (error) {
    console.error('Failed to parse products from localStorage:', error);
  }
  return defaultProducts.map(normalizeProduct);
};

const saveProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Failed to save products to localStorage:', error);
  }
};

// Async Thunk: Fetch Products from API / MongoDB
export const fetchProducts = createAsyncThunk<Product[], Record<string, any> | void>(
  'products/fetchProducts',
  async (params = {}) => {
    try {
      const data = await apiGet<Product[]>('/products', params || {});
      const items = Array.isArray(data) ? data.map(normalizeProduct) : [];
      if (items.length > 0) {
        saveProducts(items);
        return items;
      }
      return loadInitialProducts();
    } catch (err: any) {
      console.warn('Live API fetchProducts notice:', err.message);
      return loadInitialProducts();
    }
  }
);

// Async Thunk: Add New Product
export const addProduct = createAsyncThunk<Product, Partial<Product>>(
  'products/addProduct',
  async (productData) => {
    try {
      const created = await apiPost<Product>('/products', productData);
      return normalizeProduct(created);
    } catch (err: any) {
      console.warn('Backend addProduct fallback:', err.message);
      return normalizeProduct({
        ...productData,
        _id: `prod-local-${Date.now()}`,
        id: `prod-local-${Date.now()}`,
      });
    }
  }
);

// Async Thunk: Update Product
export const updateProduct = createAsyncThunk<Product, Partial<Product>>(
  'products/updateProduct',
  async (productData) => {
    const targetId = productData._id || productData.id || productData.slug;
    try {
      const updated = await apiPut<Product>(`/products/${targetId}`, productData);
      return normalizeProduct(updated);
    } catch (err: any) {
      console.warn('Backend updateProduct fallback:', err.message);
      return normalizeProduct(productData);
    }
  }
);

// Async Thunk: Toggle Product Stock Status
export const toggleStockStatus = createAsyncThunk<
  { id: string | number; stock: ProductStock; updated?: Product },
  { id: string | number; stock: ProductStock }
>('products/toggleStockStatus', async ({ id, stock }) => {
  try {
    const updated = await apiPatch<Product>(`/products/${id}/stock`, { stock });
    return { id, stock, updated: normalizeProduct(updated) };
  } catch (err: any) {
    console.warn('Backend toggleStockStatus fallback:', err.message);
    return { id, stock };
  }
});

// Async Thunk: Delete Product
export const deleteProduct = createAsyncThunk<string | number, string | number>(
  'products/deleteProduct',
  async (id) => {
    try {
      await apiDelete(`/products/${id}`);
      return id;
    } catch (err: any) {
      console.warn('Backend deleteProduct fallback:', err.message);
      return id;
    }
  }
);

const initialState: ProductState = {
  items: loadInitialProducts(),
  loading: false,
  error: null,
  lastFetched: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.items = defaultProducts.map(normalizeProduct);
      saveProducts(state.items);
    },
  },
  extraReducers: (builder) => {
    // fetchProducts
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.items = action.payload;
      state.lastFetched = new Date().toISOString();
      saveProducts(state.items);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || 'Failed to fetch products';
    });

    // addProduct
    builder.addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      if (action.payload) {
        state.items.unshift(action.payload);
        saveProducts(state.items);
      }
    });

    // updateProduct
    builder.addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      if (action.payload) {
        const index = state.items.findIndex(
          (p) =>
            String(p.id) === String(action.payload.id) ||
            String(p._id) === String(action.payload._id) ||
            String(p.slug) === String(action.payload.slug)
        );
        if (index !== -1) {
          state.items[index] = action.payload;
          saveProducts(state.items);
        }
      }
    });

    // toggleStockStatus
    builder.addCase(toggleStockStatus.fulfilled, (state, action) => {
      const { id, stock, updated } = action.payload;
      const index = state.items.findIndex(
        (p) =>
          String(p.id) === String(id) ||
          String(p._id) === String(id) ||
          String(p.slug) === String(id)
      );
      if (index !== -1) {
        if (updated) {
          state.items[index] = updated;
        } else {
          state.items[index].stock = stock;
        }
        saveProducts(state.items);
      }
    });

    // deleteProduct
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(
        (p) =>
          String(p.id) !== String(id) &&
          String(p._id) !== String(id) &&
          String(p.slug) !== String(id)
      );
      saveProducts(state.items);
    });
  },
});

export const { resetProducts } = productsSlice.actions;

// Selectors
export const selectAllProducts = (state: { products: ProductState }) => state.products.items;
export const selectProductsLoading = (state: { products: ProductState }) => state.products.loading;
export const selectProductById = (state: { products: ProductState }, id: string | number) =>
  state.products.items.find(
    (p) =>
      String(p.id) === String(id) ||
      String(p._id) === String(id) ||
      String(p.slug) === String(id)
  );
export const selectProductBySlug = (state: { products: ProductState }, slug: string) =>
  state.products.items.find(
    (p) =>
      p.slug === slug ||
      String(p.id) === String(slug) ||
      String(p._id) === String(slug)
  );
export const selectProductsByCategory = (state: { products: ProductState }, category: string) => {
  if (!category || category === 'All') return state.products.items;
  return state.products.items.filter((p) => p.category === category);
};
export const selectStockAlerts = (state: { products: ProductState }) =>
  state.products.items.filter(
    (p) => p.stock === 'low-stock' || p.stock === 'out-of-stock'
  );

export default productsSlice.reducer;
