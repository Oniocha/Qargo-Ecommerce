import { getDepartmentsApi } from "../api";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create action to get all departments
export const getAllDepartments = createAsyncThunk("departments/getAllDepartments", async() => {
    const response = await axios.get(getDepartmentsApi);
    return response.data;
});
