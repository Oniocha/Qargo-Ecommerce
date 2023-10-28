import { createSlice } from "@reduxjs/toolkit";
import { getProductsByPrice, getAllCategories,
    loadBySell, getNewArrivals, listRelated
} from "./actions";

const initialState = {
    fetchedProductsByPrice : [],
    fetchedCategories : [],
    fetchedDataBySell : [],
    relatedProducts : [],
    fetchedNewArrivals : [],
    success : null,
    loading: false,
    productsByPriceError : null,
    fetchedCategoriesError : null,
    dataBySellError : null,
    newArrivalsError : null,
    relatedProductsError : null
}

const loadProducts = createSlice({
    name: "loadProducts",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getProductsByPrice.fulfilled, (state, action) => {
            state.success =  true;
            state.fetchedProductsByPrice = action.payload;
            state.loading = false;
            state.productsByPriceError = null;
        });
        builder.addCase(getProductsByPrice.pending, (state) => {
            state.success = false;
            state.loading =  true;
            state.productsByPriceError = null;
            state.fetchedProductsByPrice = [];
        });
        builder.addCase(getProductsByPrice.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.productsByPriceError = action.payload;
            state.fetchedProductsByPrice = [];
        });
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.success = true;
            state.fetchedCategories = action.payload;
            state.loading = false;
            state.fetchedCategoriesError = null;
        });
        builder.addCase(getAllCategories.pending, (state) => {
            state.success = false;
            state.loading = true;
            state.fetchedCategoriesError = null;
            state.fetchedCategories = [];
        });
        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.fetchedCategoriesError = action.payload
            state.fetchedCategories = [];
        });
        builder.addCase(loadBySell.fulfilled, (state, action) => {
            state.success = true;
            state.fetchedDataBySell = action.payload;
            state.loading = false;
            state.dataBySellError = null;
        });
        builder.addCase(loadBySell.pending, (state) => {
            state.success = false;
            state.loading = true;
            state.fetchedDataBySell = [];
            state.dataBySellError = null;
        });
        builder.addCase(loadBySell.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.dataBySellError = action.payload;
            state.fetchedDataBySell = [];
        });
        builder.addCase(getNewArrivals.fulfilled, (state, action) => {
            state.fetchedNewArrivals = action.payload;
            state.success = true;
            state.loading = false;
            state.newArrivalsError = null;
        });
        builder.addCase(getNewArrivals.pending, (state) => {
            state.success = false;
            state.loading = true;
            state.fetchedNewArrivals = [];
            state.newArrivalsError = null;
        });
        builder.addCase(getNewArrivals.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.newArrivalsError = action.payload;
            state.fetchedNewArrivals = [];
        });
        builder.addCase(listRelated.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.relatedProducts = action.payload;
            state.relatedProductsError = null;
        });
        builder.addCase(listRelated.pending, (state) => {
            state.success = false;
            state.loading = true;
            state.relatedProducts = [];
            state.relatedProductsError = null;
        });
        builder.addCase(listRelated.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.relatedProductsError = action.payload
            state.relatedProducts = [];
        })
    }
});

export default loadProducts.reducer;