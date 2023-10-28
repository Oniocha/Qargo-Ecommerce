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
            state.authDataError = null;
        });
        builder.addCase(createAuthOrder.pending, (state) => {
            state.loading = true;
            state.authData = [];
            state.authDataError = null;
            state.success = false;
        });
        builder.addCase(createAuthOrder.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.authDataError = action.payload;
            state.authData = [];
        });
        builder.addCase(createGuestOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.guestData = action.payload;
            state.guestDataError = null;
        });
        builder.addCase(createGuestOrder.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.guestDataError = action.payload;
            state.guestData = [];
        });
        builder.addCase(createGuestOrder.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.guestDataError = null;
            state.guestData = [];
        });
    }
});

export default orderSlice.reducer;