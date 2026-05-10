"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';

export default function CartPage() {
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { t, isRTL } = useTranslation();

  const handleQuantityChange = (id: string, currentQty: number, delta: number) => {
    const newQty = Math.max(1, currentQty + delta);
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  return (
    <main className="min-h-screen flex flex-col pt-24 pb-20 bg-background">
      <Navbar />
      <div className="container mx-auto px-4 flex-1">
        <h1 className="text-2xl font-headline font-bold mb-10 flex items-center gap-3 uppercase tracking-tight">
          <ShoppingBag className="h-6 w-6 text-primary" />
          {t.cart.title}
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border bg-accent/30">
            <ShoppingBag className="h-10 w-10 text-muted-foreground mb-6" />
            <h2 className="text-xl font-bold mb-4 uppercase">{t.cart.empty}</h2>
            <Link href="/shop">
              <Button className="bg-primary text-white px-10 py-6 rounded-none text-xs font-bold uppercase tracking-widest">
                {t.cart.continue}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card className="rounded-none clinical-shadow overflow-hidden">
                      <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative h-20 w-20 border bg-muted shrink-0">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                        </div>
                        
                        <div className="flex-1 text-center sm:text-left">
                          <span className="text-[10px] text-primary uppercase tracking-widest font-bold">{item.brand}</span>
                          <h3 className="text-base font-bold uppercase leading-tight">{item.name}</h3>
                          <p className="text-primary font-bold mt-1 text-sm">${item.price.toLocaleString()}</p>
                        </div>

                        <div className="flex items-center gap-2 border p-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-bold text-xs">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right flex flex-col items-center sm:items-end gap-1">
                          <p className="text-base font-bold">${(item.price * item.quantity).toLocaleString()}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive h-8 px-2 rounded-none hover:bg-destructive/5 text-[10px] font-bold uppercase tracking-widest"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <div className="mt-6">
                <Link href="/shop">
                  <Button variant="outline" className="rounded-none uppercase text-[10px] font-bold tracking-widest h-10 px-6">
                    {isRTL ? <ArrowRight className="mr-2 h-3.5 w-3.5" /> : <ArrowLeft className="mr-2 h-3.5 w-3.5" />}
                    {t.cart.continue}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <Card className="rounded-none clinical-shadow sticky top-28 bg-card border">
                <CardContent className="p-8">
                  <h3 className="text-lg font-bold mb-6 uppercase tracking-tight">{t.cart.summary}</h3>
                  
                  <div className="space-y-4 mb-8 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>{t.cart.subtotal}</span>
                      <span className="font-bold text-foreground">${totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{t.cart.shipping}</span>
                      <span className="text-primary font-bold uppercase text-[10px] tracking-widest">{t.common.free}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{t.cart.tax}</span>
                      <span className="font-bold text-foreground">$0.00</span>
                    </div>
                  </div>

                  <div className="border-t pt-6 mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold uppercase">{t.cart.total}</span>
                      <span className="text-2xl font-bold text-primary tracking-tight">${totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary text-white py-8 rounded-none text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all">
                    {t.cart.checkout}
                    {isRTL ? <ArrowLeft className="ml-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>

                  <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground text-[9px] uppercase font-bold tracking-widest">
                    <ShieldCheck className="h-3 w-3 text-primary" />
                    Secure Clinical Portal
                  </div>
                </CardContent>
              </Card>
              
              <div className="border border-primary/20 bg-primary/5 rounded-none p-6">
                <h4 className="text-[10px] font-bold flex items-center gap-2 mb-2 text-primary uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4" />
                  Clinical Notice
                </h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  {t.cart.disclaimer}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}