"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, Loader2, Database, Activity, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function CartPage() {
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { t, isRTL } = useTranslation();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (id: string, currentQty: number, delta: number) => {
    const newQty = Math.max(1, currentQty + delta);
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  const handleCheckout = () => {
    // Technical Click Lock: Prevent redundant signals during procurement transition
    if (isCheckingOut) return;
    
    setIsCheckingOut(true);
    
    // Initiate secure handoff to checkout terminal
    setTimeout(() => {
      router.push('/checkout');
      // Note: We do not set isCheckingOut back to false here to ensure the 
      // button remains in its "locked" state during navigation.
    }, 800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 30 : -30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const summaryVariants = {
    hidden: { opacity: 0, x: isRTL ? -30 : 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }
    }
  };

  return (
    <main className="min-h-screen flex flex-col pt-24 pb-20 bg-background relative overflow-hidden">
      <Navbar />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 flex-1 relative z-10"
      >
        <motion.div variants={itemVariants} className={cn("flex flex-col mb-12 border-primary", isRTL ? "border-r-4 pr-8" : "border-l-4 pl-8")}>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-1.5 bg-primary/10 rounded-sm">
              <Database className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/70">{t.cart.procurement_module}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
            {t.cart.title}
            <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-none border border-primary/20">{items.length} {t.cart.units}</span>
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="relative min-h-[500px] flex flex-col items-center justify-center p-12 border border-primary/10 bg-accent/3 overflow-hidden group"
          >
            {/* Architectural Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/20" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/20" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/20" />
            
            {/* Background Technical Grid Scan */}
            <div className="absolute inset-0 opacity-[0.03] flex flex-col gap-6 p-4 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="h-[1px] w-full bg-primary" />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
              <div className={cn("absolute -top-16 opacity-10 text-[8px] font-bold uppercase tracking-[0.5em]", isRTL ? "right-0" : "left-0")}>
                {t.cart.system_id}
              </div>
              
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 1, 0.5] 
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="p-10 bg-primary/5 rounded-full mb-12 border border-primary/10 relative"
              >
                <div className="absolute inset-0 border border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
                <ShoppingBag className="h-16 w-16 text-primary/40 relative z-10" />
              </motion.div>
              
              <div className="space-y-4 mb-16">
                <div className="flex items-center justify-center gap-3 opacity-40">
                  <Activity className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em]">STATUS: INVENTORY_ZERO</span>
                </div>
                <h2 className="text-3xl font-bold uppercase tracking-tighter text-foreground/80 leading-none">{t.cart.empty}</h2>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.4em] leading-relaxed max-w-xs mx-auto italic">
                  {t.cart.empty_desc}
                </p>
              </div>

              <Link href="/shop" className="w-full">
                <Button className="w-full bg-primary text-white py-10 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all group/btn">
                  {t.cart.continue}
                  <ArrowRight className={cn("h-4 w-4 ml-4 group-hover/btn:translate-x-2 transition-transform", isRTL && "rotate-180 group-hover/btn:-translate-x-2")} />
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    variants={itemVariants}
                    exit={{ opacity: 0, x: isRTL ? 50 : -50, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="rounded-none clinical-shadow overflow-hidden border-border/40 relative group hover:border-primary/30 transition-all">
                      <div className={cn("absolute top-0 w-[3px] h-0 bg-primary group-hover:h-full transition-all duration-700", isRTL ? "right-0" : "left-0")} />
                      <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-10">
                        <div className="relative h-24 w-24 border bg-accent/5 shrink-0 p-3 overflow-hidden">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-contain grayscale group-hover:grayscale-0 transition-all duration-1000" />
                          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        
                        <div className="flex-1 text-center sm:text-left">
                          <div className={cn("flex items-center justify-center sm:justify-start gap-3 mb-2", isRTL && "sm:flex-row-reverse")}>
                             <span className="text-[9px] text-primary font-black uppercase tracking-[0.4em]">{item.brand}</span>
                             <div className="h-[1px] w-4 bg-primary/20" />
                             <span className="text-[7px] text-muted-foreground font-bold uppercase tracking-widest">{t.cart.ref}: {item.id.padStart(4, '0')}</span>
                          </div>
                          <h3 className="text-lg font-bold uppercase leading-none tracking-tighter mb-4 group-hover:text-primary transition-colors">{item.name}</h3>
                          <div className={cn("flex items-center justify-center sm:justify-start gap-4", isRTL && "sm:flex-row-reverse")}>
                            <p className="text-primary font-bold text-base tracking-tighter">${item.price.toLocaleString()}</p>
                            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest bg-accent/10 px-2 py-0.5">{t.cart.clinical_grade}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 border border-primary/10 p-1 bg-accent/5">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none hover:bg-primary/10 hover:text-primary"
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="w-10 text-center">
                            <span className="text-[10px] font-black tabular-nums">{item.quantity}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none hover:bg-primary/10 hover:text-primary"
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right flex flex-col items-center sm:items-end gap-3 min-w-[120px]">
                          <p className="text-xl font-bold tracking-tighter">${(item.price * item.quantity).toLocaleString()}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive h-8 px-4 rounded-none hover:bg-destructive/5 text-[9px] font-bold uppercase tracking-[0.2em] border border-transparent hover:border-destructive/20"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            <Trash2 className="h-3 w-3 mr-2" />
                            {t.cart.remove}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <motion.div variants={itemVariants} className="mt-6 flex justify-between items-center">
                <Link href="/shop">
                  <Button variant="outline" className="rounded-none uppercase text-[10px] font-bold tracking-[0.25em] h-12 px-10 border-2 border-primary/10 hover:bg-primary/5 hover:border-primary/30 transition-all group">
                    {isRTL ? <ArrowRight className="mr-3 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="mr-3 h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />}
                    {t.cart.continue}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={() => dispatch(clearCart())}
                  className="text-muted-foreground hover:text-destructive text-[9px] font-bold uppercase tracking-widest rounded-none"
                >
                  {t.cart.clear}
                </Button>
              </motion.div>
            </div>

            <motion.div variants={summaryVariants} className="lg:col-span-4 flex flex-col gap-6">
              <Card className="rounded-none clinical-shadow sticky top-28 bg-card border border-primary/20 overflow-hidden">
                <div className="bg-primary/5 border-b border-primary/10 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="h-3.5 w-3.5 text-primary/60" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/80">{t.cart.secure_portal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-primary/40">{t.cart.active}</span>
                  </div>
                </div>

                <CardContent className="p-8 md:p-10">
                  <h3 className="text-xl font-bold mb-10 uppercase tracking-tighter">{t.cart.summary}</h3>
                  
                  <div className="space-y-6 mb-12 text-[11px]">
                    <div className="flex justify-between text-muted-foreground font-bold uppercase tracking-[0.2em]">
                      <span>{t.cart.subtotal}</span>
                      <span className="text-foreground tracking-tighter text-sm">${totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-bold uppercase tracking-[0.2em]">
                      <div className="flex items-center gap-2">
                        <span>{t.cart.shipping}</span>
                        <Badge variant="outline" className="text-[7px] py-0 border-primary/30 text-primary">{t.cart.priority}</Badge>
                      </div>
                      <span className="text-primary text-[10px] tracking-[0.2em] font-black">{t.common.free}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-bold uppercase tracking-[0.2em]">
                      <span>{t.cart.tax}</span>
                      <span className="text-foreground tracking-tighter text-sm">$0.00</span>
                    </div>
                  </div>

                  <div className="border-y border-dashed border-primary/20 py-8 mb-12 bg-primary/[0.02] -mx-10 px-10">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-primary/60">{t.cart.total_acquisition}</span>
                        <span className="text-base font-bold uppercase tracking-tighter leading-none">{t.cart.total}</span>
                      </div>
                      <span className="text-3xl font-bold text-primary tracking-tighter">${totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-primary text-white py-10 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center active:scale-95 group/check overflow-hidden relative"
                  >
                    <AnimatePresence mode="wait">
                      {isCheckingOut ? (
                        <motion.div 
                          key="loading"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-3"
                        >
                          <Loader2 className="h-5 w-5 animate-spin" />
                          {t.cart.synchronizing}
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="idle"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center justify-center gap-4"
                        >
                          {t.cart.checkout}
                          {isRTL ? <ArrowLeft className="h-4 w-4 group-hover/check:-translate-x-2 transition-transform" /> : <ArrowRight className="h-4 w-4 group-hover/check:translate-x-2 transition-transform" />}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>

                  <div className="mt-10 flex flex-col items-center gap-4 text-center grayscale opacity-40">
                    <div className="flex items-center justify-center gap-6">
                      <div className="text-[8px] font-bold uppercase tracking-widest">{t.cart.ssl_secure}</div>
                      <div className="h-3 w-[1px] bg-muted-foreground" />
                      <div className="text-[8px] font-bold uppercase tracking-widest">{t.cart.pci_compliant}</div>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground text-[8px] uppercase font-bold tracking-[0.3em] italic">
                      <ShieldCheck className="h-3 w-3 text-primary" />
                      {t.cart.encryption_protocol}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1.2 }}
                className="border border-primary/20 bg-primary/5 rounded-none p-8 relative overflow-hidden"
              >
                <div className={cn("absolute top-0 w-24 h-24 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2", isRTL ? "left-0" : "right-0")} />
                <h4 className="text-[9px] font-bold flex items-center gap-2 mb-4 text-primary uppercase tracking-[0.2em] relative z-10">
                  <ShieldCheck className="h-4 w-4" />
                  {t.cart.protocol_notice}
                </h4>
                <p className="text-[9px] text-muted-foreground leading-relaxed font-medium italic relative z-10">
                  {t.cart.disclaimer} {t.cart.protocol_desc}
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </main>
  );
}
