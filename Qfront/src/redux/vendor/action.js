import { vendorCategoryEndpoint, vendorProductEndpoint, baseUrl } from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create vendor action to create category
export const createCategory = createAsyncThunk("vendor/createCategory", async({user_id, access, category }, { rejectWithValue }) => {
    const createCategoryApi = `${vendorCategoryEndpoint}/${user_id}`
    try {
        const response = await baseUrl.post(createCategoryApi, { category }, {
            headers: {
                accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${access}`
            }
        })
        return response.data
    } catch(error) {
        rejectWithValue(error);
    }
});

// Create vendor action to create product
export const createProduct = createAsyncThunk("vendor/createProduct", async({ user_id, access, product }, { rejectWithValue }) => {
    const createProductApi = `${vendorProductEndpoint}/${user_id}`
    try {
        const response = await baseUrl.post(createProductApi, { product }, {
            headers: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${access}`
        });
        return response.data
    } catch (error) {
        rejectWithValue(error);
    }
})