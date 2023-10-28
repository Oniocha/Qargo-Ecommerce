import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, transactionsEndPointApi } from "../api";

// create action to calculate tranasction fees
export const getTransactionFees = createAsyncThunk("transactions/getTransactionFees",
  async( { cost }, { rejectWithValue }) => {
    try {
        const getTransactionFeesApi = `${transactionsEndPointApi}/transaction/fees`;
        const response = await axiosInstance.post(getTransactionFeesApi, { amount: cost }, {
            headers: {
                accept: "application/json",
                "Content-type": "application/json" 
            },
        });
        return response.data.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

// create action for intiating Transaction
export const initiateTransaction = createAsyncThunk("transactions/initiateTransactions", async (
    { tx_ref,
      email,
      amount,
      type,
      phone_number,
      network,
      redirect_url,
      fullname
    },
    { rejectWithValue }
    ) => {
    try {
      let payment = {
        currency: "GHS",
        fullname,
        tx_ref,
        amount: amount,
        email,
        type,
        phone_number,
        network,
        redirect_url,
      };
      const initiateTransactionApi = `${transactionsEndPointApi}/momopayment`
      const response = await axiosInstance.post(initiateTransactionApi, payment, {
        headers: {
            accept : "application/json",
            "Content-type": "application/json"
        },
      })

       return response.data.meta;

    } catch (error) {
        return rejectWithValue(error)
    }
})