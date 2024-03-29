import { createCategory, createProduct } from "./action";
import { createSlice } from "@reduxjs/toolkit";

// Create slice for vendor actions
const initialState = {
    loading : false,
    data : [],
    errorCreatingCategory : null,
    errorCreatingProduct : null,
}

const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCategory.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.successCategoryData = [];
            state.errorCreatingCategory = null;
        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.successCategoryData = action.payload;
            state.success = true;
            state.errorCreatingCategory = null;
        });
        builder.addCase(createCategory.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.errorCreatingCategory = action.payload;
            state.successCategoryData = [];
        });
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.errorCreatingProduct = null;
            state.successProductData = [];
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.successProductData = action.payload;
            state.errorCreatingProduct = null;
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.success = false;
            state.errorCreatingProduct = action.payload;
            state.loading = false;
            state.successProductData = [];
        });
    }
});

export default vendorSlice.reducer;