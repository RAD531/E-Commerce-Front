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
        addProduct: builder.mutation({
            query: (formData) => ({
                url: '/product/new',
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: ({ id, name, description, price, stock, category }) => ({
                url: `/product/product/${id}`,
                method: 'PUT',
                body: JSON.stringify({ name, description, price, stock, category }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/product/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),
        addProductImage: builder.mutation({
            query: ({ productId, formData }) => ({
                url: `/product/images/${productId}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Product']
        }),
        deleteProductImage: builder.mutation({
            query: ({ productId, imageId }) => ({
                url: `/product/images/${productId}?id=${imageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),
    }),
});

export const { useGetAllProductsQuery, useGetProductDetailsQuery, useGetAdminProductsQuery, useAddProductMutation, useUpdateProductMutation, useAddProductImageMutation, useDeleteProductImageMutation, useDeleteProductMutation } = productApiSlice;