import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, productEndPointApi } from './../../api';

// Create action to list product
export const readProduct = createAsyncThunk("loadProduct/readProduct", async( { prodId }, { rejectWithValue }) => {
    try {
        const response = await baseUrl.get(`${productEndPointApi}/${prodId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});