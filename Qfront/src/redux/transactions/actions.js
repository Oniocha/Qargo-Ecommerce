import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { transactionsEndPointApi } from "../api";

// create action to calculate tranasction fees
export const getTransactionFees = createAsyncThunk("transactions/getTransactionFees", async(cost) => {
    const getTransactionFeesApi = transactionsEndPointApi + `/fees`;
    const data = {amount: cost};
    const response = await axios.post(getTransactionFeesApi, {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-type": "application/json" 
        },
        body: JSON.stringify(data)
    });
    debugger;
    return response.data
});