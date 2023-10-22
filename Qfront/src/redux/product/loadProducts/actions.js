import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    axiosInstance, getAllCategoriesApi, productsEndPointApi
} from "../../api";

// Create action to load by price
export const getProductsByPrice = createAsyncThunk("LOAD_BY_PRICE", async (params = {}, { rejectWithValue }) => {
    try {
        const sortBy = params.sortBy || 'price'
        const order = params.order || 'asc'
        const limit = params.limit || 10
        const getProductsByPriceApi = `${productsEndPointApi}?sortBy=${sortBy}&order=${order}&limit=${limit}`;
        const response = await axiosInstance.get(getProductsByPriceApi);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error)
    }
});

// Create action to load by by categories
export const getAllCategories = createAsyncThunk("LOAD_BY_CATEGORIES", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(getAllCategoriesApi);
        return response.data;
    } catch (error) {
        return rejectWithValue(error)
    }
});

// create fetch action for fetch by price
export const loadBySell = createAsyncThunk("LOAD_BY_SELL", async (params = {}, { rejectWithValue }) => {
    try {
        const sortBy = params.sortBy || 'price'
        const order = params.order || 'asc'
        const limit = params.limit || 10
        const loadBySellApi = `${productsEndPointApi}?sortBy=${sortBy}&order=${order}&limit=${limit}`;
        const response = await axiosInstance.get(loadBySellApi);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error)
    }
});

// create fetch action for new Arrivals
export const getNewArrivals = createAsyncThunk("FETCH_PRODUCTS", async (params = {}, { rejectWithValue }) => {
    
    
    try {
        const sortBy = params.sortBy || 'price'
        const order = params.order || 'asc'
        const limit = params.limit || 10
        const getNewArrivalsApi = `${productsEndPointApi}?sortBy=${sortBy}&order=${order}&limit=${limit}`;
        const response = await axiosInstance.get(getNewArrivalsApi);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error)
    }
});

// Related Products action
export const listRelated = createAsyncThunk("loadProduct/listRelated", async (prodId, { rejectWithValue }) => {
    try {
        const listRelatedApi = `${productsEndPointApi}/related/${prodId}`
        const response = await axiosInstance.get(listRelatedApi);
        return response.data;
    } catch (error) {
        return rejectWithValue(error)
    }
})