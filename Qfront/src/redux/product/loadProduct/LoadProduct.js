import { readProduct } from "./actions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productQureied: [],
    loading: false,
    success: null,
    errorQueringProduct : null
};

// reducer to handle for an individual product
const loadProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(readProduct.fulfilled, (state, action) => {
            state.success = true;
            state.productQureied = action.payload;
            state.loading = false;
            state.errorQueringProduct = null;
        });
        builder.addCase(readProduct.pending, (state) => {
            state.loading = true;
            state.productQureied = [];
            state.success = false;
            state.errorQueringProduct = null;
        });
        builder.addCase(readProduct.rejected, (state, action) => {
            state.loading = false;
            state.errorQueringProduct = action.payload;
            state.success = false;
            state.productQureied = [];
        });
    }
})

export default loadProductSlice.reducer;