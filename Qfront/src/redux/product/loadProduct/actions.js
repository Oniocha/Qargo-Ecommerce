import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance, productEndPointApi } from './../../api';

// Create action to list product
export const readProduct = createAsyncThunk("loadProduct/readProduct", async( prodId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${productEndPointApi}/${prodId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});