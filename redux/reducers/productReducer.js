import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer({ products: [], product: {} }, builder => {
    builder
        .addCase("getAllProductsRequest", (state, action) => {
            state.loading = true;
        })
        .addCase("getAdminProductsRequest", (state, action) => {
            state.loading = true;
        })
        .addCase("getProductDetailsRequest", (state, action) => {
            state.loading = true;
        })
        .addCase("getAllProductsSuccess", (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase("getProductDetailsSuccess", (state, action) => {
            state.loading = false;
            state.product = action.payload;
        })
        .addCase("getAdminProductsSuccess", (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.inStock = action.payload.inStock;
            state.outOfStock = action.payload.outOfStock;
        })
        .addCase("getProductDetailsFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("getAllProductsFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("getAdminProductsFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    builder.addCase("clearError", (state, action) => {
        state.error = null;
    });

    builder.addCase("clearMessage", (state, action) => {
        state.message = null;
    });
});