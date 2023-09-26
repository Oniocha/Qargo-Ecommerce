import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllCategoriesApi, productsEndPointApi
} from "../../api";

// Create action to load by price
export const getProductsByPrice = createAsyncThunk("LOAD_BY_PRICE", async() => {
    const getProductsByPriceApi = productsEndPointApi + `?sortBy=price&order=asc&limit=10`;
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
    const loadBySellApi = productsEndPointApi + `?sortBy=sold&order=desc&limit=10`;
    const response = await axios(loadBySellApi);
    return response.data.data;
});

// create fetch action for new Arrivals
export const getNewArrivals = createAsyncThunk("FETCH_PRODUCTS", async () => {
    const getNewArrivalsApi = productsEndPointApi + `?sortBy=sold&order=desc&limit=10`;
    const response = await axios(getNewArrivalsApi);
    return response.data.data;
});

// Related Products action
export const listRelated = createAsyncThunk("loadProduct/listRelated", async(prodId) => {
    const listRelatedApi = productsEndPointApi + `/related/${prodId}`
    const response = await axios.get(listRelatedApi);
    return response.data;
})