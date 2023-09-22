import { createSlice } from "@reduxjs/toolkit";
import { getProductsByPrice } from "./actions";

const loadByPriceSlice = createSlice({
    name: "loadByPrice",
    initialState : {},
    reducers : {},
    extraReducers : (builders) => {
        builders.addCase(getProductsByPrice.fulfilled, (state, action) => {
            state.success =  true;
            state.data = action.payload;
            state.loading = false;
        });
        builders.addCase(getProductsByPrice.pending, (state) => {
            state.success = false;
            state.loading =  true;
        });
        builders.addCase(getProductsByPrice.rejected, (state) => {
            state.success = false;
            state.loading = false;
        });
    }
});

export default loadByPriceSlice.reducer;