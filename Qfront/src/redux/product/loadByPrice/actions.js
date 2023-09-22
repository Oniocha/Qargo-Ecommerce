import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getProductsByPriceApi = `${process.env.REACT_APP_API_URL}/products?sortBy=price&order=asc&limit=10`;

// Create action to load by price
export const getProductsByPrice = createAsyncThunk("LOAD_BY_PRICE", async() => {
    const response = await axios.get(getProductsByPriceApi);
    return response.data.data;
});