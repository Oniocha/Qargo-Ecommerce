import { createSlice } from "@reduxjs/toolkit";
import { getFilteredProducts, updateFilteredProducts, listProducts
} from "./actions";

const initialState = {
    success: null,
    loading: false,
    fetchedFilteredProducts: [],
    fetchedSize : "",
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
            state.filteredProductsError = null;
        });
        builder.addCase(getFilteredProducts.pending, (state) => {
            state.success =  false;
            state.loading = true;
            state.filteredProductsError = null;
            state.fetchedFilteredProducts = [];
        });
        builder.addCase(getFilteredProducts.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.filteredProductsError = action.payload;
            state.fetchedFilteredProducts = [];
        });
        builder.addCase(updateFilteredProducts.fulfilled, (state, action) => {
            state.fetchedFilteredProducts = action.payload;
            state.fetchedSize = action.payload.size;
            state.success = true;
            state.loading = false;
            state.updatedFilteredProductsError = null;
        });
        builder.addCase(updateFilteredProducts.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.updatedFilteredProductsError = null;
            state.fetchedSize = "";
            state.fetchedFilteredProducts = [];
        });
        builder.addCase(updateFilteredProducts.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.updatedFilteredProductsError = action.payload;
            state.fetchedFilteredProducts = [];
            state.fetchedSize = ""
        });
        builder.addCase(listProducts.fulfilled, (state, action) => {
            state.success = true;
            state.quriedProducts = action.payload;
            state.loading = false;
            state.errorQueryingProduct = null;
        });
        builder.addCase(listProducts.pending, (state) => {
            state.loading = true;
            state.errorQueryingProduct = null;
            state.success = false;
            state.quriedProducts = [];
        });
        builder.addCase(listProducts.rejected, (state, action) => {
            state.success = false;
            state.errorQueryingProduct = action.payload;
            state.quriedProducts = [];
            state.loading = false;
        });
    }
})

export default filteredProductsSlice.reducer;