import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import i18nReducer from './slices/i18nSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    i18n: i18nReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;