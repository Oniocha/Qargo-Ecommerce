import axios from 'axios';

// Create base url for axios to
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// End points to query backend
export const getAllCategoriesApi = `categories`;
export const getDepartmentsApi = `departments`;
export const productsEndPointApi =  `products`;
export const productEndPointApi = `product`;
export const transactionsEndPointApi = `rave`;
export const ordersEndPoint = `order`;
export const vendorCategoryEndpoint = `category/create`;
export const vendorProductEndpoint = `product/create`;