import { createSlice } from "@reduxjs/toolkit";
import { loadBySell } from "./action";

const loadBySellSlice = createSlice({
    name: "loadBySell",
    initialState: {},
    reducers: {},
    extraReducers: (builders) => {
        builders.addCase(loadBySell.fulfilled, (state, action) => {
            state.success = true;
            state.data = action.payload;
            state.loading = false;
        });
        builders.addCase(loadBySell.pending, (state) => {
            state.success = false;
            state.loading = true;
        });
        builders.addCase(loadBySell.rejected, (state) => {
            state.success = false;
            state.loading = false;
        })
    }
});

export default loadBySellSlice.reducer;