import axios from "axios";
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const getNewArrivalsApi = `${process.env.REACT_APP_API_URL}/products?sortBy=sold&order=desc&limit=10`

// create fetch action for new Arrivals
export const getNewArrivals = createAsyncThunk("FETCH_PRODUCTS", async () => {
    const data = await axios(getNewArrivalsApi);
    console.log(data);
    return data.response;
});

// create new arrivals slice
const newArrivals = createSlice({
    name: 'products',
    initialState:{},
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(getNewArrivals.fulfilled, (state, action) => {
            state.data = action.payload;
            state.success = true;
            state.loading = false;
        });
        builder.addCase(getNewArrivals.rejected, (state) => {
            state.success = false;
            state.loading = false;
        });
        builder.addCase(getNewArrivals.pending, (state) => {
            state.success = false;
            state.loading = true;
        })
    }
});

export default newArrivals.reducer;