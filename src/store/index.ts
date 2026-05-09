import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import i18nReducer from './slices/i18nSlice';
import wishlistReducer from './slices/wishlistSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    i18n: i18nReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
