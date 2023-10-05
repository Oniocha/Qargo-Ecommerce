import { createAuthOrder, createGuestOrder } from "./actions";
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAuthOrder.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(createAuthOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAuthOrder.rejected, (state) => {
            state.loading = false;
            state.success = false;
        });
        builder.addCase(createGuestOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
        });
        builder.addCase(createGuestOrder.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
        });
        builder.addCase(createGuestOrder.pending, (state) => {
            state.loading = true;
        });
    }
});

export default orderSlice.reducer;