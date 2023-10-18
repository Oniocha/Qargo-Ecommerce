import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, productsEndPointApi } from "../../api";

const fetchFilteredProductsApi = `${productsEndPointApi}/by/search`;

// Create action to fetch filtered products
export const getFilteredProducts = createAsyncThunk("filteredProducts/getFilteredProducts",
  async( { skip, limit, filters }, { rejectWithValue }) => {
    try {
      const data = { skip, limit, filters }
      const response = await axiosInstance.post(
          fetchFilteredProductsApi,
          { data },
          {
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
              }
          } )
      return response.data;
    } catch (error) {
      return rejectWithValue(error)
    }
});

// Create an action to update filtered products
export const updateFilteredProducts = createAsyncThunk('filteredProducts/updateFilteredProducts',
  async( { skip, limit, filters }, { rejectWithValue }) => {
    try {
      // This action receives data with new parameters
      // Also returns size
      const data = { skip, limit, filters}
      const response = await axiosInstance.post(
          fetchFilteredProductsApi,
          { data },
          {
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
              }
          } )
      return response.data;
    } catch (error) {
      return rejectWithValue(error)
    }
});

// create action to list products
export const listProducts = createAsyncThunk("loadProducts/listProducts", async(params, { rejectWithValue } ) => {
  try {
    const query = params?.search || params?.department ? params : {}
    const listingEndPoint = `${productsEndPointApi}/search?${query}`;
    const response = await axiosInstance.get(listingEndPoint);
    return response.data;

  } catch (error) {
    return rejectWithValue(error)
  }
})