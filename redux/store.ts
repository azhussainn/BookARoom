import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { authApi } from "./api/auth";

export const store = configureStore({
    reducer: {
        auth: userReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

