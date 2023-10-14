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
        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.successCategoryData = action.payload;
            state.success = true;
        });
        builder.addCase(createCategory.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.errorCreatingCategory = action.payload;
        });
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.successProductData = action.payload;
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.success = false;
            state.errorCreatingProduct = action.payload;
        });
    }
});

export default vendorSlice.reducer;