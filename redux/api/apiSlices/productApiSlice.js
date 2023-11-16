import baseApi from '../apiSlice';

export const productApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({ keyword, category }) => ({
                url: `/product/all?keyword=${keyword}&category=${category}`,
            }),
            providesTags: ['Product']
        }),
        getAdminProducts: builder.query({
            query: () => ({
                url: '/product/admin',
            }),
            providesTags: ['Product']
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `/product/product/${id}`,
            }),
            providesTags: ['Product']
        }),
    }),
});

export const { useGetAllProductsQuery, useGetProductDetailsQuery, useGetAdminProductsQuery } = productApiSlice;