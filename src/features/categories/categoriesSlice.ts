import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPut, apiDelete } from '../../utils/api.js';
import { Category, CategoryState } from '../../types/index.js';

const STORAGE_KEY = 'bb_categories';

const defaultCategories: Category[] = [
  {
    id: 'cat-1',
    _id: 'cat-1',
    name: 'Heavy-Duty Containers',
    slug: 'heavy-duty-containers',
    description: 'High-density polyethylene storage crates, bins, and industrial transport tubs.',
    icon: 'FiBox',
  },
  {
    id: 'cat-2',
    _id: 'cat-2',
    name: 'Industrial Molding',
    slug: 'industrial-molding',
    description: 'Custom injection-molded components, modular stands, and racking pallets.',
    icon: 'FiLayers',
  },
  {
    id: 'cat-3',
    _id: 'cat-3',
    name: 'Food Grade Polymer',
    slug: 'food-grade-polymer',
    description: 'BPA-free Tritan & PP bottles, airtight food storage, and kitchen containers.',
    icon: 'FiCoffee',
  },
  {
    id: 'cat-4',
    _id: 'cat-4',
    name: 'Child Safety Polymer',
    slug: 'child-safety-polymer',
    description: 'Pediatric seating, ergonomic booster chairs, and certified non-toxic molding.',
    icon: 'FiSmile',
  },
  {
    id: 'cat-5',
    _id: 'cat-5',
    name: 'Specialty Liquid Container',
    slug: 'specialty-liquid-container',
    description: 'Calibrated measuring buckets, chemical-resistant carboys, and dosing basins.',
    icon: 'FiDroplet',
  },
  {
    id: 'cat-6',
    _id: 'cat-6',
    name: 'Household & Sanitary',
    slug: 'household-and-sanitary',
    description: 'Durable commercial basins, organizers, sanitary ware, and utility bins.',
    icon: 'FiHome',
  },
];

export const normalizeCategory = (cat: any): Category => {
  if (!cat) {
    return {
      id: `cat-${Date.now()}`,
      name: 'Untitled Category',
      slug: `category-${Date.now()}`,
      description: '',
      icon: 'FiLayers',
      productCount: 0,
    };
  }
  const id = cat._id || cat.id || `cat-${Date.now()}`;
  const slug =
    cat.slug ||
    (cat.name
      ? cat.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      : `category-${id}`);

  return {
    ...cat,
    _id: cat._id || id,
    id: id,
    name: cat.name || 'Untitled Category',
    slug: slug,
    description: cat.description || '',
    icon: cat.icon || 'FiLayers',
    productCount: cat.productCount !== undefined ? cat.productCount : 0,
  };
};

const loadInitialCategories = (): Category[] => {
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeCategory).filter(Boolean);
      }
    }
  } catch (error) {
    console.error('Failed to parse categories from localStorage:', error);
  }
  return defaultCategories.map(normalizeCategory);
};

const saveCategories = (categories: Category[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Failed to save categories to localStorage:', error);
  }
};

// Async Thunk: Fetch Categories from API / MongoDB
export const fetchCategories = createAsyncThunk<Category[], void>(
  'categories/fetchCategories',
  async () => {
    try {
      const data = await apiGet<Category[]>('/categories');
      const items = Array.isArray(data) ? data.map(normalizeCategory) : [];
      if (items.length > 0) {
        saveCategories(items);
        return items;
      }
      return loadInitialCategories();
    } catch (err: any) {
      console.warn('Live API fetchCategories notice:', err.message);
      return loadInitialCategories();
    }
  }
);

// Async Thunk: Add Category
export const addCategory = createAsyncThunk<Category, Partial<Category>>(
  'categories/addCategory',
  async (categoryData) => {
    try {
      const created = await apiPost<Category>('/categories', categoryData);
      return normalizeCategory(created);
    } catch (err: any) {
      console.warn('Backend addCategory fallback:', err.message);
      return normalizeCategory({
        ...categoryData,
        _id: `cat-local-${Date.now()}`,
        id: `cat-local-${Date.now()}`,
      });
    }
  }
);

// Async Thunk: Update Category
export const updateCategory = createAsyncThunk<Category, Partial<Category>>(
  'categories/updateCategory',
  async (categoryData) => {
    const targetId = categoryData._id || categoryData.id || categoryData.slug;
    try {
      const updated = await apiPut<Category>(`/categories/${targetId}`, categoryData);
      return normalizeCategory(updated);
    } catch (err: any) {
      console.warn('Backend updateCategory fallback:', err.message);
      return normalizeCategory(categoryData);
    }
  }
);

// Async Thunk: Delete Category
export const deleteCategory = createAsyncThunk<string, string>(
  'categories/deleteCategory',
  async (id) => {
    try {
      await apiDelete(`/categories/${id}`);
      return id;
    } catch (err: any) {
      console.warn('Backend deleteCategory fallback:', err.message);
      return id;
    }
  }
);

const initialState: CategoryState = {
  items: loadInitialCategories(),
  loading: false,
  error: null,
  lastFetched: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategories: (state) => {
      state.items = defaultCategories.map(normalizeCategory);
      saveCategories(state.items);
    },
  },
  extraReducers: (builder) => {
    // fetchCategories
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
      state.loading = false;
      state.items = action.payload;
      state.lastFetched = new Date().toISOString();
      saveCategories(state.items);
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || 'Failed to fetch categories';
    });

    // addCategory
    builder.addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
      if (action.payload) {
        state.items.push(action.payload);
        saveCategories(state.items);
      }
    });

    // updateCategory
    builder.addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
      if (action.payload) {
        const index = state.items.findIndex(
          (c) =>
            String(c.id) === String(action.payload.id) ||
            String(c._id) === String(action.payload._id) ||
            String(c.slug) === String(action.payload.slug)
        );
        if (index !== -1) {
          state.items[index] = action.payload;
          saveCategories(state.items);
        }
      }
    });

    // deleteCategory
    builder.addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter(
        (c) =>
          String(c.id) !== String(id) &&
          String(c._id) !== String(id) &&
          String(c.slug) !== String(id)
      );
      saveCategories(state.items);
    });
  },
});

export const { resetCategories } = categoriesSlice.actions;

// Selectors
export const selectAllCategories = (state: { categories: CategoryState }) => state.categories.items;
export const selectCategoriesLoading = (state: { categories: CategoryState }) =>
  state.categories.loading;
export const selectCategoryById = (state: { categories: CategoryState }, id: string) =>
  state.categories.items.find(
    (c) =>
      String(c.id) === String(id) ||
      String(c._id) === String(id) ||
      String(c.slug) === String(id)
  );
export const selectCategoryNames = (state: { categories: CategoryState }) => [
  'All',
  ...state.categories.items.map((cat) => cat.name),
];

export default categoriesSlice.reducer;
