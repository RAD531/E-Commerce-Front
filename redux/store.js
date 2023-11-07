import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { passwordReducer } from "./reducers/passwordReducer";
import { profileReducer } from "./reducers/profileReducer";
import { productReducer } from "./reducers/productReducer";

export const store = configureStore({
    reducer: {
        user: userReducer,
        password: passwordReducer,
        profile: profileReducer,
        product: productReducer
    }
});

export const server = "https://e-commerce-back-5qe8.onrender.com/api/v1";