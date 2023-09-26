import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { productEndPointApi } from './../../api';

// Create action to list product
export const readProduct = createAsyncThunk("loadProduct/readProduct", async(prodId) => {
    const response = await axios.get(productEndPointApi + `/${prodId}`);
    return response.data;
});