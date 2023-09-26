import { readProduct } from "./actions";
import { createSlice } from "@reduxjs/toolkit";


// reducer to handle for an individual product
const loadProductSlice = createSlice({
    name: "product",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(readProduct.fulfilled, (state, action) => {
            state.success = true;
            state.productQureied = action.payload;
            state.loading = false;
        });
        builder.addCase(readProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(readProduct.rejected, (state, action) => {
            state.loading = false;
            state.errorQueringProduct = action.payload;
            state.success = false;
        });
    }
})

export default loadProductSlice.reducer;