import newArrivalsReducer from './product/NewArrivals';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        newArrivals : newArrivalsReducer
    }
});

export default store;