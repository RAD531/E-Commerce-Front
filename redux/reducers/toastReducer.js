import { createReducer } from "@reduxjs/toolkit";

export const toastReducer = createReducer({ message: null, error: null }, builder => {
    builder.addCase("addToError", (state, action) => {
        state.error = action.payload;
    });

    builder.addCase("addToMessage", (state, action) => {
        state.message = action.payload;
    });
    
    builder.addCase("clearError", (state, action) => {
        state.error = null;
    });

    builder.addCase("clearMessage", (state, action) => {
        state.message = null;
    });
});