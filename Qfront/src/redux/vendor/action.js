import { vendorCategoryEndpoint, vendorProductEndpoint, axiosInstance } from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create vendor action to create category
export const createCategory = createAsyncThunk("vendor/createCategory", async({userId, access, name }, { rejectWithValue }) => {
    const createCategoryApi = `${vendorCategoryEndpoint}/${userId}`
    try {
        const response = await axiosInstance.post(createCategoryApi, { name }, {
            headers: {
                accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${access}`
            }
        })
        return response.data
    } catch(error) {
        return rejectWithValue(error);
    }
});

// Create vendor action to create product
export const createProduct = createAsyncThunk("vendor/createProduct", async({ userId, access, product }, { rejectWithValue }) => {
    const createProductApi = `${vendorProductEndpoint}/${userId}`
    try {
        const response = await axiosInstance.post(createProductApi,  product, {
            headers: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${access}`
        });
        return response.data
    } catch (error) {
        return rejectWithValue(error);
    }
})