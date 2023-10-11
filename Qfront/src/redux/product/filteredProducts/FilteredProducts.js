import { createSlice } from "@reduxjs/toolkit";
import { getFilteredProducts, updateFilteredProducts, listProducts
} from "./actions";

const initialState = {
    success: null,
    loading: false,
    fetchedFilteredProducts: [],
    fetchedSize : [],
    quriedProducts : [],
    updatedFilteredProductsError : null,
    errorQueryingProduct : null,
    filteredProductsError : null
};

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
        builder.addCase(getFilteredProducts.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.filteredProductsError = action.payload;
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
        });
        builder.addCase(listProducts.fulfilled, (state, action) => {
            state.success = true;
            state.quriedProducts = action.payload;
            state.loading = false;
        });
        builder.addCase(listProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(listProducts.rejected, (state, action) => {
            state.success = false;
            state.errorQueryingProduct = action.payload;
        });
    }
})

export default filteredProductsSlice.reducer;