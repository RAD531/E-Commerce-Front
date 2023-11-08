import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer({ cartItems: [] }, builder => {
    builder
        .addCase("addToCart", (state, action) => {
            const item = action.payload;
            const isExist = state.cartItems.find(i => i.product === item.product);

            if (isExist) {
                state.cartItems = state.cartItems.filter(i => i.product === isExist.product ? item : i);
            }

            else {
                state.cartItems.push(item);
            }
        })
        .addCase("removeFromCart", (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(i => i.product !== id);
        })
        .addCase("clearCart", (state) => {
            state.cartItems = [];
        })

    builder.addCase("clearError", (state, action) => {
        state.error = null;
    });

    builder.addCase("clearMessage", (state, action) => {
        state.message = null;
    });
});