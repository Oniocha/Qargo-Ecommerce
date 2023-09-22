import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loadBySellApi = `${process.env.REACT_APP_API_URL}/products?sortBy=sold&order=desc&limit=10`;

// create fetch action for fetch by price
export const loadBySell = createAsyncThunk("LOAD_BY_SELL", async () => {
    const response = await axios(loadBySellApi);
    return response.data.data;
});