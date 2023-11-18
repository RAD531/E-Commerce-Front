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
        paymentOrder: builder.mutation({
            query: ({ totalAmount }) => ({
                url: '/order/payment',
                method: 'POST',
                body: { totalAmount },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        placeOrder: builder.mutation({
            query: ({ shippingInfo, orderItems, paymentMethod, paymentInfo, itemsPrice, taxPrice, shippingCharges, totalAmount }) => ({
                url: '/order/new',
                method: 'POST',
                body: { shippingInfo, orderItems, paymentMethod, paymentInfo, itemsPrice, taxPrice, shippingCharges, totalAmount },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Order'],
        }),
    }),
});

export const { useGetOrdersQuery, useProcessOrderMutation, usePaymentOrderMutation, usePlaceOrderMutation } = orderApiSlice;