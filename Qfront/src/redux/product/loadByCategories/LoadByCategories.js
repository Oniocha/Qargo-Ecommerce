import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "./actions";

const getAllCategoriesSlice = createSlice({
    name: "getAllCategories",
    initialState: {},
    reducers: {},
    extraReducers : (builders) => {
        builders.addCase(getAllCategories.fulfilled, (state, action) => {
            state.success = true;
            state.data = action.payload;
            state.loading = false;
        });
        builders.addCase(getAllCategories.pending, (state) => {
            state.success = false;
            state.loading = true;
        });
        builders.addCase(getAllCategories.rejected, (state) => {
            state.success = false;
            state.loading = false;
        })
    }
});

export default getAllCategoriesSlice.reducer;