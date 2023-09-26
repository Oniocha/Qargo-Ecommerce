import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productsEndPointApi } from "../../api";

const fetchFilteredProductsApi = productsEndPointApi + `/by/search`;

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
  // This action receives data with new parameters
  // Also returns size
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

// create action to list products
export const listProducts = createAsyncThunk("loadProducts/listProducts", async(params) => {
  const query = {
      search: params.search,
      department: params.deparment
  }
  const listingEndPoint = productsEndPointApi + `/search?${query}`;
  const response = await axios.get(listingEndPoint);
  return response.data;
})