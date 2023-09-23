import LoadProductsReducer from './product/loadProducts/LoadProducts';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        loadProducts : LoadProductsReducer,
    }
});

export default store;