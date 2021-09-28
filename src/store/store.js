import {configureStore} from "@reduxjs/toolkit";
import auth from './slices/auth';
import rooms from './slices/rooms';


export const store = configureStore({
    reducer: {
        auth,
        rooms,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})