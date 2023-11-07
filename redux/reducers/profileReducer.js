import { createReducer } from "@reduxjs/toolkit";

export const profileReducer = createReducer({}, builder => {
    builder
        .addCase("updateProfileRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateProfileSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updateProfileFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    builder
        .addCase("updateProfilePictureRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateProfilePictureSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updateProfilePictureFail", (state, action) => {
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