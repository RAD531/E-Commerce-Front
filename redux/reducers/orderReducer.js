import { createReducer } from "@reduxjs/toolkit";

export const orderReducer = createReducer({ paymentClientSecret: null }, builder => {
    builder
        .addCase("placeOrderRequest", (state) => {
            state.loading = true;
        })
        .addCase("paymentOrderRequest", (state) => {
            state.loading = true;
        })
        .addCase("placeOrderSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("paymentOrderSuccess", (state, action) => {
            state.loading = false;
            state.paymentClientSecret = action.payload;
        })
        .addCase("placeOrderFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("paymentOrderFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

    builder.addCase("clearError", (state, action) => {
        state.error = null;
    });

    builder.addCase("clearMessage", (state, action) => {
        state.message = null;
    });
});