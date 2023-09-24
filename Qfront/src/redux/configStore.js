import loadProductsReducer from './product/loadProducts/LoadProducts';
import filteredProductsReducer from './product/filteredProducts/FilteredProducts';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        loadProducts : loadProductsReducer,
        loadFilteredProducts: filteredProductsReducer,
    }
});

export default store;