import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { transactionsEndPointApi } from "../api";

// create action to calculate tranasction fees
export const getTransactionFees = createAsyncThunk("transactions/getTransactionFees", async(cost) => {
    const getTransactionFeesApi = transactionsEndPointApi + `/transaction/fees`;
    const response = await axios.post(getTransactionFeesApi, {
        headers: {
            accept: "application/json",
            "Content-type": "application/json" 
        },
        body: JSON.stringify({amount: cost})
    });
    return response.data.data
});

// create action for intiating Transaction
export const initiateTransaction = createAsyncThunk("transactions/initiateTransactions", async(
    ref,
    mail,
    cost,
    kind,
    number,
    telco,
    redirect,
    name
) => {
    let payment = {
        currency: "GHS",
        fullname: name,
        tx_ref: ref,
        amount: cost,
        email: mail,
        type: kind,
        phone_number: number,
        network: telco,
        redirect_url: redirect,
    };
    const initiateTransactionApi = transactionsEndPointApi + `/momopayment`
    const response = axios.post(initiateTransactionApi, {
        headers: {
            accept : "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(payment)
    })

    return response.data.data;
})