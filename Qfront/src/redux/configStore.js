import LoadByPriceReducer from './product/loadByPrice/LoadByPrice';
import loadBySellReducer from './product/loadBySell/LoadBySell';
import newArrivalsReducer from './product/newArrivals/NewArrivals';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        newArrivals : newArrivalsReducer,
        loadBySell : loadBySellReducer,
        loadByPrice : LoadByPriceReducer,
    }
});

export default store;