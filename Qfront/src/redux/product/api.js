export const getProductsByPriceApi = `${process.env.REACT_APP_API_URL}/products?sortBy=price&order=asc&limit=10`;
export const getAllCategoriesApi = `${process.env.REACT_APP_API_URL}/categories`;
export const loadBySellApi = `${process.env.REACT_APP_API_URL}/products?sortBy=sold&order=desc&limit=10`;
export const getNewArrivalsApi = `${process.env.REACT_APP_API_URL}/products?sortBy=sold&order=desc&limit=10`;