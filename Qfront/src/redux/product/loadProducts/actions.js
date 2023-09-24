import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getProductsByPriceApi, getAllCategoriesApi,
    loadBySellApi, getNewArrivalsApi
} from "../api";

// Create action to load by price
export const getProductsByPrice = createAsyncThunk("LOAD_BY_PRICE", async() => {
    const response = await axios.get(getProductsByPriceApi);
    return response.data.data;
});

// Create action to load by by categories
export const getAllCategories = createAsyncThunk("LOAD_BY_CATEGORIES", async() => {
    const response = await axios.get(getAllCategoriesApi);
    return response.data;
});

// create fetch action for fetch by price
export const loadBySell = createAsyncThunk("LOAD_BY_SELL", async () => {
    const response = await axios(loadBySellApi);
    return response.data.data;
});

// create fetch action for new Arrivals
export const getNewArrivals = createAsyncThunk("FETCH_PRODUCTS", async () => {
    const response = await axios(getNewArrivalsApi);
    return response.data.data;
});