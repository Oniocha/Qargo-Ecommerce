import { createSlice } from "@reduxjs/toolkit";
import { getProductsByPrice, getAllCategories, loadBySell, getNewArrivals } from "./actions";

const loadProducts = createSlice({
    name: "loadProducts",
    initialState : {},
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getProductsByPrice.fulfilled, (state, action) => {
            state.success =  true;
            state.fetchedProductsByPrice = action.payload;
            state.loading = false;
        });
        builder.addCase(getProductsByPrice.pending, (state) => {
            state.success = false;
            state.loading =  true;
        });
        builder.addCase(getProductsByPrice.rejected, (state) => {
            state.success = false;
            state.loading = false;
        });
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.success = true;
            state.fetchedCategories = action.payload;
            state.loading = false;
        });
        builder.addCase(getAllCategories.pending, (state) => {
            state.success = false;
            state.loading = true;
        });
        builder.addCase(getAllCategories.rejected, (state) => {
            state.success = false;
            state.loading = false;
        });
        builder.addCase(loadBySell.fulfilled, (state, action) => {
            state.success = true;
            state.fetchedDataBySell = action.payload;
            state.loading = false;
        });
        builder.addCase(loadBySell.pending, (state) => {
            state.success = false;
            state.loading = true;
        });
        builder.addCase(loadBySell.rejected, (state) => {
            state.success = false;
            state.loading = false;
        });
        builder.addCase(getNewArrivals.fulfilled, (state, action) => {
            state.fetchedNewArrivals = action.payload;
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

export default loadProducts.reducer;