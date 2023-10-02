import loadProductsReducer from './product/loadProducts/LoadProducts';
import filteredProductsReducer from './product/filteredProducts/FilteredProducts';
import departmentsReducer from './departments/Departments';
import loadProductReducer from './product/loadProduct/LoadProduct';
import transactionsReducer  from './transactions/Transactions';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        loadProducts : loadProductsReducer,
        loadFilteredProducts : filteredProductsReducer,
        loadDepartments : departmentsReducer,
        loadProduct : loadProductReducer,
        transaction: transactionsReducer
    }
});

export default store;