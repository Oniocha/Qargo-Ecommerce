import { baseUrl, getDepartmentsApi } from "../api";
import { createAsyncThunk } from '@reduxjs/toolkit';

// Create action to get all departments
export const getAllDepartments = createAsyncThunk("departments/getAllDepartments", async(_, { rejectWithValue }) => {
    try {
        const response = await baseUrl.get(getDepartmentsApi);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});
