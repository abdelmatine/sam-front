import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  brand: string;
}

export interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<WishlistState>) {
      state.items = action.payload.items;
    },
    toggleWishlist(state, action: PayloadAction<WishlistItem>) {
      const item = action.payload;
      const index = state.items.findIndex((i) => i.id === item.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(item);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
