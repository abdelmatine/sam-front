"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { clearCart } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Loader2, 
  Database, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Package, 
  ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function CheckoutPage() {
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { t, isRTL } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Handle order submission protocol
  const handleAcquisitionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate technical synchronization
    setTimeout(() => {
      const generatedId = Math.floor(100000 + Math.random() * 900000).toString();
      setOrderId(generatedId);
      setIsProcessing(false);
      setIsSuccess(true);
      dispatch(clearCart());
    }, 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <main className="min-h-screen flex flex-col pt-32 pb-20 bg-background relative overflow-hidden">
        <Navbar />
        <div className="container mx-auto px-4 flex flex-col items-center justify-center flex-1 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md">
             <Activity className="h-16 w-16 text-primary/20 mx-auto mb-8 animate-pulse" />
             <h1 className="text-3xl font-headline font-bold uppercase tracking-tighter mb-4">{t.cart.empty}</h1>
             <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.4em] mb-12">{t.cart.empty_desc}</p>
             <Link href="/shop">
               <Button className="bg-primary text-white px-12 py-8 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl">
                 {t.cart.continue}
               </Button>
             </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col pt-24 pb-20 bg-background relative overflow-hidden">
      <Navbar />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center justify-center py-20 text-center max-w-2xl mx-auto"
            >
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                className="p-10 bg-primary/10 rounded-full mb-10 relative"
              >
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
                />
                <CheckCircle2 className="h-20 w-20 text-primary relative z-10" />
              </motion.div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-3 opacity-40">
                  <Database className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em]">SIGNAL_LOCKED_v4.2</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tighter">{t.checkout.success_title}</h1>
                <p className="text-muted-foreground text-sm font-medium italic leading-relaxed">
                  {t.checkout.success_desc.replace('{{id}}', orderId)}
                </p>
                <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link href="/shop">
                    <Button className="bg-primary text-white px-12 py-8 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl">
                      {t.checkout.back_to_shop || "Inventory Home"}
                    </Button>
                  </Link>
                  <Button variant="outline" className="px-12 py-8 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] border-2">
                    Print Technical Receipt
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-12"
            >
              <motion.div variants={itemVariants} className={cn("border-primary", isRTL ? "border-r-4 pr-8" : "border-l-4 pl-8")}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-1.5 bg-primary/10 rounded-sm">
                    <Database className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/70">{t.checkout.module_id}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tighter mb-4">{t.checkout.title}</h1>
                <p className="text-muted-foreground text-sm font-medium italic max-w-2xl">{t.checkout.subtitle}</p>
              </motion.div>

              <form onSubmit={handleAcquisitionSubmit} className="grid lg:grid-cols-12 gap-12">
                {/* Protocol Inputs */}
                <div className="lg:col-span-8 space-y-10">
                  <motion.div variants={itemVariants}>
                    <Card className="rounded-none clinical-shadow border-primary/10 bg-accent/5 overflow-hidden">
                      <div className="bg-primary/5 p-6 border-b border-primary/10 flex items-center gap-4">
                        <Truck className="h-5 w-5 text-primary" />
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em]">{t.checkout.shipping_details}</h2>
                      </div>
                      <CardContent className="p-8 grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 ml-1">{t.checkout.first_name}</Label>
                          <Input required className="rounded-none border-primary/10 bg-background h-12 focus-visible:ring-primary/20" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 ml-1">{t.checkout.last_name}</Label>
                          <Input required className="rounded-none border-primary/10 bg-background h-12 focus-visible:ring-primary/20" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 ml-1">{t.checkout.email}</Label>
                          <Input type="email" required className="rounded-none border-primary/10 bg-background h-12 focus-visible:ring-primary/20" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 ml-1">{t.checkout.phone}</Label>
                          <Input required className="rounded-none border-primary/10 bg-background h-12 focus-visible:ring-primary/20" />
                        </div>
                        <div className="md:col-span-2 space-y-3">
                          <Label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 ml-1">{t.checkout.address}</Label>
                          <Input required className="rounded-none border-primary/10 bg-background h-12 focus-visible:ring-primary/20" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 ml-1">{t.checkout.city}</Label>
                          <Input required className="rounded-none border-primary/10 bg-background h-12 focus-visible:ring-primary/20" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 ml-1">{t.checkout.postal_code}</Label>
                          <Input required className="rounded-none border-primary/10 bg-background h-12 focus-visible:ring-primary/20" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card className="rounded-none clinical-shadow border-primary/10 bg-accent/5 overflow-hidden">
                      <div className="bg-primary/5 p-6 border-b border-primary/10 flex items-center gap-4">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em]">{t.checkout.payment_method}</h2>
                      </div>
                      <CardContent className="p-8 space-y-10">
                        <RadioGroup defaultValue="card" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-3 space-y-0 border border-primary/10 p-4 bg-background/50 hover:bg-primary/5 transition-all cursor-pointer">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex-1 cursor-pointer font-bold uppercase text-[9px] tracking-widest">{t.checkout.payment_types.card}</Label>
                          </div>
                          <div className="flex items-center space-x-3 space-y-0 border border-primary/10 p-4 bg-background/50 hover:bg-primary/5 transition-all cursor-pointer opacity-50 grayscale">
                            <RadioGroupItem value="bank" id="bank" disabled />
                            <Label htmlFor="bank" className="flex-1 cursor-pointer font-bold uppercase text-[9px] tracking-widest">{t.checkout.payment_types.bank}</Label>
                          </div>
                          <div className="flex items-center space-x-3 space-y-0 border border-primary/10 p-4 bg-background/50 hover:bg-primary/5 transition-all cursor-pointer opacity-50 grayscale">
                            <RadioGroupItem value="wire" id="wire" disabled />
                            <Label htmlFor="wire" className="flex-1 cursor-pointer font-bold uppercase text-[9px] tracking-widest">{t.checkout.payment_types.wire}</Label>
                          </div>
                        </RadioGroup>

                        <div className="grid md:grid-cols-2 gap-8 pt-4">
                          <div className="md:col-span-2 space-y-3">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 ml-1">{t.checkout.card_holder}</Label>
                            <Input required className="rounded-none border-primary/10 bg-background h-12 focus-visible:ring-primary/20" placeholder="SURNAME INITIALS" />
                          </div>
                          <div className="md:col-span-2 space-y-3">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 ml-1">{t.checkout.card_number}</Label>
                            <div className="relative">
                              <Input required maxLength={19} className="rounded-none border-primary/10 bg-background h-12 pl-12 focus-visible:ring-primary/20" placeholder="XXXX XXXX XXXX XXXX" />
                              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 ml-1">{t.checkout.expiry}</Label>
                            <Input required className="rounded-none border-primary/10 bg-background h-12 focus-visible:ring-primary/20" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 ml-1">{t.checkout.cvv}</Label>
                            <Input required maxLength={3} className="rounded-none border-primary/10 bg-background h-12 focus-visible:ring-primary/20" placeholder="***" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Sidebar Summary */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <motion.div variants={itemVariants} className="sticky top-28">
                    <Card className="rounded-none clinical-shadow border-primary/20 bg-card overflow-hidden">
                      <div className="bg-primary p-6 text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Package className="h-4 w-4" />
                          <h2 className="text-xs font-bold uppercase tracking-[0.3em]">{t.checkout.order_review}</h2>
                        </div>
                        <span className="text-[10px] font-black bg-white/10 px-2 py-0.5">{items.length} Units</span>
                      </div>
                      
                      <CardContent className="p-8">
                        <div className="max-h-[300px] overflow-y-auto space-y-6 mb-10 pr-4 custom-scrollbar">
                          {items.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                              <div className="relative h-14 w-14 shrink-0 border border-primary/10 bg-accent/5 p-2 overflow-hidden">
                                <Image src={item.imageUrl} alt={item.name} fill className="object-contain grayscale" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[10px] font-bold uppercase tracking-tight truncate leading-none mb-1">{item.name}</h4>
                                <p className="text-[8px] text-primary font-black uppercase tracking-widest">Qty: {item.quantity}</p>
                              </div>
                              <span className="text-xs font-bold tracking-tighter tabular-nums">${(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-4 pt-6 border-t border-dashed border-primary/10 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          <div className="flex justify-between">
                            <span>{t.cart.subtotal}</span>
                            <span className="text-foreground tracking-tighter text-xs">${totalAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-primary">
                            <span>{t.cart.shipping}</span>
                            <span>{t.common.free}</span>
                          </div>
                        </div>

                        <div className="mt-8 pt-8 border-t-2 border-primary/10">
                          <div className="flex justify-between items-end mb-10">
                            <div className="flex flex-col gap-1">
                              <span className="text-[8px] font-black text-primary/40 uppercase tracking-[0.4em]">{t.cart.total_acquisition}</span>
                              <span className="text-sm font-bold uppercase tracking-tighter">{t.cart.total}</span>
                            </div>
                            <span className="text-3xl font-bold tracking-tighter text-primary">${totalAmount.toLocaleString()}</span>
                          </div>

                          <Button 
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-primary text-white py-10 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 active:scale-95 group/btn"
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                {t.checkout.submitting}
                              </>
                            ) : (
                              <>
                                {t.checkout.place_order}
                                {isRTL ? <ArrowLeft className="h-4 w-4 group-hover/btn:-translate-x-2 transition-transform" /> : <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform" />}
                              </>
                            )}
                          </Button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-primary/5 flex flex-col items-center gap-4 text-center grayscale opacity-40">
                           <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.3em]">
                             <Lock className="h-3 w-3" />
                             {t.cart.encryption_protocol}
                           </div>
                           <p className="text-[8px] leading-relaxed italic max-w-[200px]">
                             {t.cart.protocol_desc}
                           </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}