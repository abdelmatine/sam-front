
"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, Loader2, Database, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import { toast } from '@/hooks/use-toast';

export default function CartPage() {
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { t, isRTL } = useTranslation();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (id: string, currentQty: number, delta: number) => {
    const newQty = Math.max(1, currentQty + delta);
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      toast({
        title: "Clinical Portal Access",
        description: "Redirecting to secure payment processor...",
      });
      setIsCheckingOut(false);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const summaryVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }
    }
  };

  return (
    <main className="min-h-screen flex flex-col pt-24 pb-20 bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Background Clinical Grid Accent */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 flex-1 relative z-10"
      >
        <motion.div variants={itemVariants} className="flex flex-col mb-10 border-l-4 border-primary pl-8">
          <div className="flex items-center gap-3 mb-2">
            <Database className="h-3.5 w-3.5 text-primary/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">Checkout Module v3.2</span>
          </div>
          <h1 className="text-3xl font-headline font-bold flex items-center gap-3 uppercase tracking-tight">
            <ShoppingBag className="h-6 w-6 text-primary" />
            {t.cart.title}
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-primary/20 bg-primary/5 relative"
          >
            <Activity className="h-10 w-10 text-primary/30 mb-6" />
            <h2 className="text-xl font-bold mb-4 uppercase text-foreground/80">{t.cart.empty}</h2>
            <Link href="/shop">
              <Button className="bg-primary text-white px-12 py-7 rounded-none text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl shadow-primary/20">
                {t.cart.continue}
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    exit={{ opacity: 0, x: -50 }}
                  >
                    <Card className="rounded-none clinical-shadow overflow-hidden border-border/40 relative">
                      <div className="absolute top-0 left-0 w-[2px] h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                      <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-8">
                        <div className="relative h-24 w-24 border bg-muted shrink-0 p-2">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-contain grayscale hover:grayscale-0 transition-all duration-700" />
                        </div>
                        
                        <div className="flex-1 text-center sm:text-left">
                          <span className="text-[9px] text-primary uppercase tracking-widest font-bold mb-1 block">{item.brand}</span>
                          <h3 className="text-base font-bold uppercase leading-tight tracking-tight mb-2">{item.name}</h3>
                          <p className="text-primary font-bold text-sm tracking-tighter">${item.price.toLocaleString()}</p>
                        </div>

                        <div className="flex items-center gap-3 border border-primary/10 p-1.5 bg-accent/5">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none hover:bg-primary/10"
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-bold text-xs">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none hover:bg-primary/10"
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right flex flex-col items-center sm:items-end gap-2">
                          <p className="text-lg font-bold tracking-tighter">${(item.price * item.quantity).toLocaleString()}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive h-8 px-2 rounded-none hover:bg-destructive/5 text-[9px] font-bold uppercase tracking-widest"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-2" />
                            {t.cart.remove}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <motion.div variants={itemVariants} className="mt-4">
                <Link href="/shop">
                  <Button variant="outline" className="rounded-none uppercase text-[10px] font-bold tracking-widest h-12 px-8 border-primary/20 hover:bg-primary/5 transition-all">
                    {isRTL ? <ArrowRight className="mr-3 h-4 w-4" /> : <ArrowLeft className="mr-3 h-4 w-4" />}
                    {t.cart.continue}
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div variants={summaryVariants} className="flex flex-col gap-6">
              <Card className="rounded-none clinical-shadow sticky top-28 bg-card border border-primary/10">
                <CardContent className="p-10">
                  <h3 className="text-xl font-bold mb-8 uppercase tracking-tighter border-b border-primary/10 pb-4">{t.cart.summary}</h3>
                  
                  <div className="space-y-5 mb-10 text-xs">
                    <div className="flex justify-between text-muted-foreground font-bold uppercase tracking-widest">
                      <span>{t.cart.subtotal}</span>
                      <span className="text-foreground tracking-tighter text-sm">${totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-bold uppercase tracking-widest">
                      <span>{t.cart.shipping}</span>
                      <span className="text-primary text-[10px] tracking-[0.2em]">{t.common.free}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-bold uppercase tracking-widest">
                      <span>{t.cart.tax}</span>
                      <span className="text-foreground tracking-tighter text-sm">$0.00</span>
                    </div>
                  </div>

                  <div className="border-t border-primary/20 pt-8 mb-10">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold uppercase tracking-tighter">{t.cart.total}</span>
                      <span className="text-3xl font-bold text-primary tracking-tighter">${totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-primary text-white py-8 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center active:scale-95"
                  >
                    {isCheckingOut ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        {t.cart.checkout}
                        {isRTL ? <ArrowLeft className="ml-3 h-4 w-4" /> : <ArrowRight className="ml-3 h-4 w-4" />}
                      </>
                    )}
                  </Button>

                  <div className="mt-10 flex items-center justify-center gap-3 text-muted-foreground text-[9px] uppercase font-bold tracking-[0.3em] opacity-60 italic">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    Secure Clinical Portal Encryption
                  </div>
                </CardContent>
              </Card>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1.2 }}
                className="border border-primary/20 bg-primary/5 rounded-none p-8"
              >
                <h4 className="text-[10px] font-bold flex items-center gap-2 mb-4 text-primary uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4" />
                  Clinical Protocol Notice
                </h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed font-medium italic">
                  {t.cart.disclaimer}
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </main>
  );
}
