import { createReducer } from "@reduxjs/toolkit";

export const orderReducer = createReducer({ orders: [], processOrderLoad: false }, builder => {
    builder
        .addCase("placeOrderRequest", (state) => {
            state.loading = true;
        })
        .addCase("paymentOrderRequest", (state) => {
            state.loading = true;
        })
        .addCase("getOrdersRequest", (state) => {
            state.loading = true;
        })
        .addCase("processOrderRequest", (state) => {
            state.processOrderLoad = true;
        })
        .addCase("placeOrderSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("paymentOrderSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("getOrdersSuccess", (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
        .addCase("processOrderSuccess", (state, action) => {
            state.processOrderLoad = false;
            state.message = action.payload;
        })
        .addCase("placeOrderFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("paymentOrderFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("getOrdersFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("processOrderFail", (state, action) => {
            state.processOrderLoad = false;
            state.error = action.payload;
        })

    builder.addCase("clearError", (state, action) => {
        state.error = null;
    });

    builder.addCase("clearMessage", (state, action) => {
        state.message = null;
    });
});