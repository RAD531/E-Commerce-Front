import { createReducer } from "@reduxjs/toolkit";

export const passwordReducer = createReducer({}, builder => {
    builder
        .addCase("updatePasswordRequest", (state) => {
            state.loading = true;
        })
        .addCase("updatePasswordSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updatePasswordFail", (state, action) => {
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