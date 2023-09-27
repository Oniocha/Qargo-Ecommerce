import { getTransactionFees } from "./actions";
import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTransactionFees.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.transactionFee = action.payload;
        })
    }
});

export default transactionsSlice.reducer;