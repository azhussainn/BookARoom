import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { authApi } from "./api/auth";
import { userApi } from "./api/user";

export const store = configureStore({
    reducer: {
        auth: userSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware, userApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

