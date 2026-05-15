"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setCart } from '@/store/slices/cartSlice';
import { setWishlist } from '@/store/slices/wishlistSlice';

const STORAGE_KEYS = {
  CART: 'sam_med_procurement_archive',
  WISHLIST: 'sam_med_priority_archive'
};

export function StatePersistence() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initial Technical Rehydration
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);

      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        dispatch(setCart(parsed));
      }

      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        dispatch(setWishlist(parsed));
      }
    } catch (error) {
      console.error("Technical Archive Synchronization Error:", error);
    } finally {
      setIsInitialized(true);
    }
  }, [dispatch]);

  // Archive Update Synchronization
  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (error) {
      console.error("Cart Archive Write Error:", error);
    }
  }, [cart, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Wishlist Archive Write Error:", error);
    }
  }, [wishlist, isInitialized]);

  return null;
}
