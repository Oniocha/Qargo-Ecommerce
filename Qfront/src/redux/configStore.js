import loadProductsReducer from './product/loadProducts/LoadProducts';
import filteredProductsReducer from './product/filteredProducts/FilteredProducts';
import departmentsReducer from './departments/Departments';
import loadProductReducer from './product/loadProduct/LoadProduct';
import transactionsReducer  from './transactions/Transactions';
import orderReducer from './orders/Orders';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        loadProducts : loadProductsReducer,
        loadFilteredProducts : filteredProductsReducer,
        loadDepartments : departmentsReducer,
        loadProduct : loadProductReducer,
        transaction: transactionsReducer,
        order: orderReducer
    }
});

export default store;