import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllCategoriesApi = `${process.env.REACT_APP_API_URL}/categories`;

export const getAllCategories = createAsyncThunk("one", async() => {
    const response = await axios.get(getAllCategoriesApi);
    return response.data;
});