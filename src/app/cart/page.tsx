"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id: string, currentQty: number, delta: number) => {
    const newQty = Math.max(1, currentQty + delta);
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  return (
    <main className="min-h-screen flex flex-col pt-24 pb-20 bg-background">
      <Navbar />
      <div className="container mx-auto px-4 flex-1">
        <h1 className="text-3xl font-headline font-bold mb-8 flex items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-primary" />
          Your Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-3xl border border-dashed p-12">
            <div className="bg-muted p-6 rounded-full mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is currently empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Explore our range of advanced respiratory solutions and medical equipment to get started.
            </p>
            <Link href="/shop">
              <Button className="bg-primary text-white px-10 py-6 rounded-xl text-lg font-bold">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-card border rounded-2xl medical-shadow group"
                  >
                    <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0 border">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{item.brand}</span>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{item.name}</h3>
                      <p className="text-primary font-bold mt-1">${item.price.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right flex flex-col items-center sm:items-end gap-2">
                      <p className="text-lg font-bold">${(item.price * item.quantity).toLocaleString()}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:bg-destructive/10 rounded-lg h-8"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <div className="flex justify-between items-center mt-4">
                <Link href="/shop">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Shop
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Shopping Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="flex flex-col gap-6">
              <div className="bg-card border rounded-3xl p-8 medical-shadow sticky top-28">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="font-medium text-foreground">${totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Tax</span>
                    <span className="font-medium text-foreground">$0.00</span>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-6 mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">${totalAmount.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-right italic">
                    All prices in USD. Tax calculated at checkout.
                  </p>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-primary text-white py-8 rounded-xl text-lg font-bold shadow-lg hover:bg-primary/90 transition-all group">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground text-sm">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Secure & Certified Checkout</span>
                </div>
              </div>
              
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                <h4 className="font-bold flex items-center gap-2 mb-2 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                  Medical Disclaimer
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Certain equipment like CPAP/BPAP machines may require a valid prescription. Please ensure you have yours ready during the medical review process.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}