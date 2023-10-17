import { axiosInstance, ordersEndPoint } from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create action to allow orders from a registered user
export const createAuthOrder = createAsyncThunk("orders/createAuthOrder", async( { userId, access, orderData },
    { rejectWithValue }) => {
    try {
        const createAuthOrderEndPoint = `${ordersEndPoint}/create/${userId}`;
        const response = await axiosInstance.post(createAuthOrderEndPoint, { order: orderData }, {
            headers: {
                accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${access}`
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.error)
    }
});

// Create action to allow orders from guests
export const createGuestOrder = createAsyncThunk("orders/createGuestOrder", async( { orderData } ,
    { rejectWithValue }) => {
    try {
        const createGuestOrderEndPoint = `${ordersEndPoint}/guest/create`;
        const response = await axiosInstance.post(createGuestOrderEndPoint, { order: orderData }, {
            headers: {
                accept: "application/json",
                "Content-type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.error)
    }
});