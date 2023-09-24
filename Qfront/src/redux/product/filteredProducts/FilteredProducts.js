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
        builder.addCase(updateFilteredProducts, (state, action) => {
            state.fetchedFilteredProducts = action.payload;
          });
    }
})

export default filteredProductsSlice.reducer;