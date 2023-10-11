import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl, transactionsEndPointApi } from "../api";

// create action to calculate tranasction fees
export const getTransactionFees = createAsyncThunk("transactions/getTransactionFees",
  async( { cost }, { rejectWithValue }) => {
    try {
        const getTransactionFeesApi = `${transactionsEndPointApi}/transaction/fees`;
        const response = await baseUrl.post(getTransactionFeesApi, { amount: cost }, {
            headers: {
                accept: "application/json",
                "Content-type": "application/json" 
            },
        });
        return response.data.data
    } catch (error) {
        rejectWithValue(error)
    }
});

// create action for intiating Transaction
export const initiateTransaction = createAsyncThunk("transactions/initiateTransactions", async(
    { ref,
      mail,
      cost,
      kind,
      number,
      telco,
      redirect,
      name
    },
    { rejectWithValue }
    ) => {
    try {
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
      const initiateTransactionApi = `${transactionsEndPointApi}/momopayment`
      const response = baseUrl.post(initiateTransactionApi, { payment }, {
        headers: {
            accept : "application/json",
            "Content-type": "application/json"
        },
      })

       return response.data.data;

    } catch (error) {
        return rejectWithValue(error)
    }
})