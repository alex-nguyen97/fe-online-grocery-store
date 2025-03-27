import { configureStore } from '@reduxjs/toolkit';
import storeSliceReducer from './storeSlice';

const store = configureStore({
    reducer: {
        store: storeSliceReducer
    }
});

export default store;