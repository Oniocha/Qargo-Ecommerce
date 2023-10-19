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
            state.getTransactionError = null;
        });
        builder.addCase(getTransactionFees.pending, (state) => {
            state.success = false;
            state.loading = true;
            state.transactionFee = [];
            state.getTransactionError = null;
        });
        builder.addCase(getTransactionFees.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.getTransactionError = action.payload;
            state.transactionFee = [];
        });
        builder.addCase(initiateTransaction.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.initiationResponse = action.payload;
            state.errorInititatingTransaction = null;
        });
        builder.addCase(initiateTransaction.pending, (state) => {
            state.success = false;
            state.loading = true;
            state.initiationResponse = [];
            state.errorInititatingTransaction = null;
        });
        builder.addCase(initiateTransaction.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.errorInititatingTransaction = action.payload;
            state.initiationResponse = [];
        });
    }
});

export default transactionsSlice.reducer;