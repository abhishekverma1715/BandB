import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'bb_categories';

const defaultCategories = [
  {
    id: 'cat-1',
    name: 'Heavy-Duty Containers',
    slug: 'heavy-duty-containers',
    description: 'High-density polyethylene storage crates, bins, and industrial transport tubs.',
    icon: 'FiBox',
  },
  {
    id: 'cat-2',
    name: 'Industrial Molding',
    slug: 'industrial-molding',
    description: 'Custom injection-molded components, modular stands, and racking pallets.',
    icon: 'FiLayers',
  },
  {
    id: 'cat-3',
    name: 'Food Grade Polymer',
    slug: 'food-grade-polymer',
    description: 'BPA-free Tritan & PP bottles, airtight food storage, and kitchen containers.',
    icon: 'FiCoffee',
  },
  {
    id: 'cat-4',
    name: 'Child Safety Polymer',
    slug: 'child-safety-polymer',
    description: 'Pediatric seating, ergonomic booster chairs, and certified non-toxic molding.',
    icon: 'FiSmile',
  },
  {
    id: 'cat-5',
    name: 'Specialty Liquid Container',
    slug: 'specialty-liquid-container',
    description: 'Calibrated measuring buckets, chemical-resistant carboys, and dosing basins.',
    icon: 'FiDroplet',
  },
  {
    id: 'cat-6',
    name: 'Household & Sanitary',
    slug: 'household-and-sanitary',
    description: 'Durable commercial basins, organizers, sanitary ware, and utility bins.',
    icon: 'FiHome',
  },
];

const loadInitialCategories = () => {
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to parse categories from localStorage:', error);
  }
  return defaultCategories;
};

const saveCategories = (categories) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Failed to save categories to localStorage:', error);
  }
};

const initialState = {
  items: loadInitialCategories(),
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const name = action.payload.name.trim();
      const slug =
        action.payload.slug ||
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      const newCategory = {
        id: action.payload.id || `cat-${Date.now()}`,
        name,
        slug,
        description: action.payload.description || '',
        icon: action.payload.icon || 'FiFolder',
      };
      state.items.push(newCategory);
      saveCategories(state.items);
    },
    updateCategory: (state, action) => {
      const { id, name, slug, description, icon } = action.payload;
      const index = state.items.findIndex((cat) => String(cat.id) === String(id));
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          name: name !== undefined ? name.trim() : state.items[index].name,
          slug:
            slug !== undefined
              ? slug
              : name
              ? name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)+/g, '')
              : state.items[index].slug,
          description: description !== undefined ? description : state.items[index].description,
          icon: icon || state.items[index].icon,
        };
        saveCategories(state.items);
      }
    },
    deleteCategory: (state, action) => {
      state.items = state.items.filter(
        (cat) => String(cat.id) !== String(action.payload)
      );
      saveCategories(state.items);
    },
    resetCategories: (state) => {
      state.items = defaultCategories;
      saveCategories(defaultCategories);
    },
  },
});

export const {
  addCategory,
  updateCategory,
  deleteCategory,
  resetCategories,
} = categoriesSlice.actions;

// Selectors
export const selectAllCategories = (state) => state.categories.items;
export const selectCategoryById = (state, id) =>
  state.categories.items.find((cat) => String(cat.id) === String(id));
export const selectCategoryNames = (state) => [
  'All',
  ...state.categories.items.map((cat) => cat.name),
];

export default categoriesSlice.reducer;
