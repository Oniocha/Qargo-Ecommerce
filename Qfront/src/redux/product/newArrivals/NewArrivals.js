import {createSlice} from '@reduxjs/toolkit';
import { getNewArrivals } from './actions';

// create new arrivals slice
const newArrivals = createSlice({
    name: 'newArrivals',
    initialState:{},
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(getNewArrivals.fulfilled, (state, action) => {
            state.data = action.payload;
            state.success = true;
            state.loading = false;
        });
        builder.addCase(getNewArrivals.rejected, (state) => {
            state.success = false;
            state.loading = false;
        });
        builder.addCase(getNewArrivals.pending, (state) => {
            state.success = false;
            state.loading = true;
        });
    }
});

export default newArrivals.reducer;