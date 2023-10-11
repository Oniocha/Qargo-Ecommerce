import { createAuthOrder, createGuestOrder } from "./actions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    success: null,
    loading: false,
    authData : [],
    guestData : [],
    authDataError : null,
    guestDataError : null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAuthOrder.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.authData = action.payload;
        });
        builder.addCase(createAuthOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAuthOrder.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.authDataError = action.payload;
        });
        builder.addCase(createGuestOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.guestData = action.payload;
        });
        builder.addCase(createGuestOrder.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.guestDataError = action.payload;
        });
        builder.addCase(createGuestOrder.pending, (state) => {
            state.loading = true;
        });
    }
});

export default orderSlice.reducer;