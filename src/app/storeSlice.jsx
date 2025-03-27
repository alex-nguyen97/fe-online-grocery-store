import { createSlice } from '@reduxjs/toolkit';
import { categories } from './pages/category-data';
export const defaultSubCategory = { name: 'All' };

const initialState = {
    categories: categories,
    selectedCategory: categories[0],
    selectedSubcategory: defaultSubCategory,
};

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setSelectedSubCategory: (state, action) => {
            state.selectedSubcategory = action.payload;
        },
    }
});

export const { setCategories, setSelectedCategory, setSelectedSubCategory } = storeSlice.actions;
export default storeSlice.reducer;
