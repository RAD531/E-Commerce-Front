import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";
import baseApi from "./api/apiSlice";
import { toastMiddleware } from "./middleware/toastMiddleware";
import { toastReducer } from "./reducers/toastReducer";

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        order: orderReducer,
        toast: toastReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(baseApi.middleware, toastMiddleware),
});

export const server = "https://e-commerce-back-5qe8.onrender.com/api/v1";