// src/features/categoriesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { categories } from './pages/category-data';

const initialState = {
    categories: categories,
    subCategories: [],
    selectedCategory: 1,
    selectedSubcategory: 1,
};

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        }
    }
});

export const { setCategories } = storeSlice.actions;
export default storeSlice.reducer;
