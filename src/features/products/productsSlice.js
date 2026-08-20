import { createSlice } from '@reduxjs/toolkit';
import { productsData as defaultProducts } from '../../data/productsData.js';

const STORAGE_KEY = 'bb_products';

const loadInitialProducts = () => {
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to parse products from localStorage:', error);
  }
  return defaultProducts;
};

const saveProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Failed to save products to localStorage:', error);
  }
};

const initialState = {
  items: loadInitialProducts(),
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: action.payload.id || Date.now(),
        slug:
          action.payload.slug ||
          action.payload.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, ''),
        rating: action.payload.rating || '5.0',
        stock: action.payload.stock || 'in-stock',
      };
      state.items.unshift(newProduct);
      saveProducts(state.items);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(
        (p) => String(p.id) === String(action.payload.id)
      );
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
        };
        saveProducts(state.items);
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(
        (p) => String(p.id) !== String(action.payload)
      );
      saveProducts(state.items);
    },
    toggleStockStatus: (state, action) => {
      const { id, stock } = action.payload;
      const product = state.items.find((p) => String(p.id) === String(id));
      if (product) {
        product.stock = stock;
        saveProducts(state.items);
      }
    },
    resetProducts: (state) => {
      state.items = defaultProducts;
      saveProducts(defaultProducts);
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  toggleStockStatus,
  resetProducts,
} = productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductById = (state, id) =>
  state.products.items.find((p) => String(p.id) === String(id));
export const selectProductBySlug = (state, slug) =>
  state.products.items.find(
    (p) => p.slug === slug || String(p.id) === String(slug)
  );
export const selectProductsByCategory = (state, category) => {
  if (!category || category === 'All') return state.products.items;
  return state.products.items.filter((p) => p.category === category);
};
export const selectStockAlerts = (state) =>
  state.products.items.filter(
    (p) => p.stock === 'low-stock' || p.stock === 'out-of-stock'
  );

export default productsSlice.reducer;
