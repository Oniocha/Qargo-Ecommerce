import { ordersEndPoint } from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create action to allow orders from a registered user
export const createAuthOrder = createAsyncThunk("orders/createAuthOrder", async(userId, access, orderData) => {
    const createAuthOrderEndPoint = ordersEndPoint + `/create/${userId}`;
    const response = await axios.post(createAuthOrderEndPoint, {
        headers: {
            accept: "application/json",
            "Content-type": "application/json",
            Authorization: `bearer ${access}`
        },
        body: JSON.stringify({order: orderData})
    });
    return response.data;
});

// Create action to allow orders from guests
export const createGuestOrder = createAsyncThunk("orders/createGuestOrder", async(orderData) => {
    const createGuestOrderEndPoint = ordersEndPoint + `/guest/create`;
    const response = await axios.post(createGuestOrderEndPoint, {
        headers: {
            accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify({order: orderData})
    });
    return response.data;
});