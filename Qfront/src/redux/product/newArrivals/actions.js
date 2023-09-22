import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getNewArrivalsApi = `${process.env.REACT_APP_API_URL}/products?sortBy=sold&order=desc&limit=10`;

// create fetch action for new Arrivals
export const getNewArrivals = createAsyncThunk("FETCH_PRODUCTS", async () => {
    const response = await axios(getNewArrivalsApi);
    return response.data.data;
});