import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl, getAllCategoriesApi, productsEndPointApi
} from "../../api";

// Create action to load by price
export const getProductsByPrice = createAsyncThunk("LOAD_BY_PRICE", async( _, { rejectWithValue }) => {
    try {
       const getProductsByPriceApi = `${productsEndPointApi}?sortBy=price&order=asc&limit=10`;
       const response = await baseUrl.get(getProductsByPriceApi);
       return response.data.data;
    } catch (error) {
        rejectWithValue(error)
    }
});

// Create action to load by by categories
export const getAllCategories = createAsyncThunk("LOAD_BY_CATEGORIES", async( _, { rejectWithValue }) => {
    try {
       const response = await baseUrl.get(getAllCategoriesApi);
       return response.data;
    } catch (error) {
        rejectWithValue(error)
    }
});

// create fetch action for fetch by price
export const loadBySell = createAsyncThunk("LOAD_BY_SELL", async ( _, { rejectWithValue }) => {
    try {
        const loadBySellApi = `${productsEndPointApi}?sortBy=sold&order=desc&limit=10`;
        const response = await baseUrl.get(loadBySellApi);
        return response.data.data;
    } catch (error) {
        rejectWithValue(error)
    }
});

// create fetch action for new Arrivals
export const getNewArrivals = createAsyncThunk("FETCH_PRODUCTS", async ( _, { rejectWithValue }) => {
    try {
        const getNewArrivalsApi = `${productsEndPointApi}?sortBy=sold&order=desc&limit=10`;
        const response = await baseUrl.get(getNewArrivalsApi);
        return response.data.data;
    } catch (error) {
        rejectWithValue(error)
    }
});

// Related Products action
export const listRelated = createAsyncThunk("loadProduct/listRelated", async( { prodId }, { rejectWithValue } ) => {
    try {
        const listRelatedApi = `${productsEndPointApi}/related/${prodId}`
        const response = await baseUrl.get(listRelatedApi);
        return response.data;
    } catch (error) {
        rejectWithValue(error)
    }
})