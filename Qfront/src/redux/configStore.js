import loadProductsReducer from './product/loadProducts/LoadProducts';
import filteredProductsReducer from './product/filteredProducts/FilteredProducts';
import departmentsReducer from './departments/Departments';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        loadProducts : loadProductsReducer,
        loadFilteredProducts : filteredProductsReducer,
        loadDepartments : departmentsReducer
    }
});

export default store;