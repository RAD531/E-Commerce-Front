import baseApi from '../apiSlice';

export const orderApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: (isAdmin) => ({
                url: `/order/${isAdmin ? "admin" : "my"}`,
            }),
            providesTags: ['Order'],
        }),
        
        processOrder: builder.mutation({
            query: (id) => ({
                url: `/order/order/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Order'],
        }),
    }),
});

export const { useGetOrdersQuery, useProcessOrderMutation } = orderApiSlice;