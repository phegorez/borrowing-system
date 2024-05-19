import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import { logger } from 'redux-logger';
import authSlice from "./store/authSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: authSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type IRootState = ReturnType<typeof store.getState>

// Middleware configuration
const middleware = (getDefaultMiddleware: any) => 
    process.env.VITE_MODE_ENV !== 'production'
    ? getDefaultMiddleware({ 
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/FLUSH', 'persist/PAUSE', 'persist/PURGE', 'persist/REGISTER']
        }
    }).concat(logger)
    : getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/FLUSH', 'persist/PAUSE', 'persist/PURGE', 'persist/REGISTER']
        }
    });

const store = configureStore({
    reducer: persistedReducer,
    middleware,
    devTools: process.env.VITE_MODE_ENV !== 'production'
});

const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export { store, persistor };