import { createSlice } from '@reduxjs/toolkit';
import { categories } from './containers/category-data';
export const defaultSubCategory = { sub_category_name: 'All' };

const initialState = {
    categories: [],
    selectedCategory: {},
    selectedSubcategory: defaultSubCategory,
    products: [],
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
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    }
});

export const {
    setCategories,
    setSelectedCategory,
    setSelectedSubCategory,
    setShoppingCartToggle,
    setShoppingCart,
    setDeliveryDetailToggle,
    setProducts,
} = storeSlice.actions;
export default storeSlice.reducer;
