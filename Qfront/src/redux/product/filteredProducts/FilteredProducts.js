import { createSlice } from "@reduxjs/toolkit";
import { getFilteredProducts, updateFilteredProducts } from "./actions";

const initialState = {
    data: [],
    loading: false,
    error: null,
}

const filteredProductsSlice = createSlice({
    name: "filteredProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFilteredProducts.fulfilled, (state, action) => {
            state.success = true;
            state.fetchedFilteredProducts = action.payload;
            state.loading = false;
        });
        builder.addCase(getFilteredProducts.pending, (state) => {
            state.success =  false;
            state.loading = true;
        });
        builder.addCase(getFilteredProducts.rejected, (state) => {
            state.success = false;
            state.loading = false;
        });
        builder.addCase(updateFilteredProducts.fulfilled, (state, action) => {
            state.fetchedFilteredProducts = action.payload;
            state.fetchedSize = action.size;
            state.success = true;
            state.loading = false;
        });
        builder.addCase(updateFilteredProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateFilteredProducts.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.updatedFilteredProductsError = action.payload;
        })
    }
})

export default filteredProductsSlice.reducer;