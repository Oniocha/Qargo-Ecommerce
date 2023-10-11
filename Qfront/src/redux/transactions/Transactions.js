import { getTransactionFees, initiateTransaction } from "./actions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactionFee: [],
    initiationResponse : [],
    getTransactionError : null,
    errorInititatingTransaction : null,
    success : null,
    loading: false,
}

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTransactionFees.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.transactionFee = action.payload;
        });
        builder.addCase(getTransactionFees.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTransactionFees.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.getTransactionError = action.payload;
        });
        builder.addCase(initiateTransaction.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.initiationResponse = action.payload;
        });
        builder.addCase(initiateTransaction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(initiateTransaction.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.errorInititatingTransaction = action.payload;
        });
    }
});

export default transactionsSlice.reducer;