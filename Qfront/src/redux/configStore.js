import loadProductsReducer from './product/loadProducts/LoadProducts';
import filteredProductsReducer from './product/filteredProducts/FilteredProducts';
import departmentsReducer from './departments/Departments';
import loadProductReducer from './product/loadProduct/LoadProduct';
import transactionsReducer  from './transactions/Transactions';
import orderReducer from './orders/Orders';
import vendorReducer from './vendor/Vendor';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

const store = configureStore({
    reducer: {
        loadProducts : loadProductsReducer,
        loadFilteredProducts : filteredProductsReducer,
        loadDepartments : departmentsReducer,
        loadProduct : loadProductReducer,
        transaction: transactionsReducer,
        order: orderReducer,
        vendor: vendorReducer,
    },
    middleware: (getDefaultMiddlewares) => {
        return process.env.NODE_ENV === 'development' ? getDefaultMiddlewares().concat(logger) : getDefaultMiddlewares({ serializableCheck: false });
    },
});

export default store;