import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: "https://e-commerce-back-5qe8.onrender.com/api/v1" }),
    tagTypes: ["User", "Profile", "Product", "Category", "Order"],
    endpoints: () => ({}),
});

export default baseApi;