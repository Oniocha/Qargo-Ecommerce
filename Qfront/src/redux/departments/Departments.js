import {getAllDepartments} from './actions';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fetchedDepartments: [],
    departmentsApiError: null,
    loading: false,
    success: null,
};

// Create departments reducer
const departmentsSlice = createSlice({
    name: "departments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllDepartments.fulfilled, (state, action) => {
            state.success = true;
            state.fetchedDepartments = action.payload;
            state.loading = false;
        });
        builder.addCase(getAllDepartments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllDepartments.rejected, (state, action) => {
            state.success = false;
            state.departmentsApiError = action.payload;
            state.loading = false;
        });
    }
});

export default departmentsSlice.reducer;