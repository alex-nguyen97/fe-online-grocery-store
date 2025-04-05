import { createSlice } from '@reduxjs/toolkit';
import { categories } from './pages/category-data';
export const defaultSubCategory = { name: 'All' };

const initialState = {
    categories: [],
    selectedCategory: {},
    selectedSubcategory: defaultSubCategory,
    isShoppingCartOpen: false,
    isDeliveryDetailOpen: false,
    shoppingCart: [],
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
        setShoppingCartToggle: (state, action) => {
            state.isShoppingCartOpen = action.payload;
        },
        setShoppingCart: (state, action) => {
            state.shoppingCart = action.payload;
        },
        setDeliveryDetailToggle: (state, action) => {
            state.isDeliveryDetailOpen = action.payload;
        }
    }
});

export const { setCategories, setSelectedCategory, setSelectedSubCategory, setShoppingCartToggle, setShoppingCart, setDeliveryDetailToggle } = storeSlice.actions;
export default storeSlice.reducer;
