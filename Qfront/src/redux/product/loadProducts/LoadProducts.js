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
        });
        builder.addCase(getProductsByPrice.pending, (state) => {
            state.success = false;
            state.loading =  true;
        });
        builder.addCase(getProductsByPrice.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.productsByPriceError = action.payload;
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
        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.fetchedCategoriesError = action.payload
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
        builder.addCase(loadBySell.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.dataBySellError = action.payload;
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
        builder.addCase(getNewArrivals.pending, (state, action) => {
            state.success = false;
            state.loading = true;
            state.newArrivalsError = action.payload;
        });
        builder.addCase(listRelated.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.relatedProducts = action.payload;
        });
        builder.addCase(listRelated.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(listRelated.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.relatedProductsError = action.payload
        })
    }
});

export default loadProducts.reducer;