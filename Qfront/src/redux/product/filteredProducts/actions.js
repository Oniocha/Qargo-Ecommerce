import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchFilteredProductsApi } from "../api";

// Create action to fetch filtered products
export const getFilteredProducts = createAsyncThunk("filteredProducts/getFilteredProducts", async(skip, limit, filters) => {
    const data = { skip, limit, filters}
    const response = await axios.post(
        fetchFilteredProductsApi,
        {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        } )
    return response.data;
});

// Create an action to update filtered products
export const updateFilteredProducts = createAsyncThunk('filteredProducts/updateFilteredProducts', async(skip, limit, filters) => {
  // This action is useless for now
  // But it would be used to update the filteredProducts fetch
});