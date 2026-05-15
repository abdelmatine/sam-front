"use client";

import React, { useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { clearWishlist } from '@/store/slices/wishlistSlice';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import Link from 'next/link';
import { Heart, Trash2, ArrowLeft, ArrowRight, Activity, Database, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import ProductCard from '@/components/shared/ProductCard';
import { cn } from '@/lib/utils';

export default function WishlistPage() {
  const { items } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();
  const { t, isRTL } = useTranslation();

  // Resolve full product data for each wishlist item with memoization for optimization
  const wishlistProducts = useMemo(() => {
    return items
      .map(item => products.find(p => p.id === item.id))
      .filter((p): p is typeof products[0] => p !== undefined);
  }, [items]);

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
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary/70">{t.wishlist.archive_v}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                {t.wishlist.title}
                <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-none border border-primary/20">{items.length} {t.wishlist.units}</span>
              </h1>
              <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.4em] mt-2 italic">
                {t.wishlist.subtitle}
              </p>
            </div>
            
            {items.length > 0 && (
              <Button 
                variant="ghost" 
                onClick={() => dispatch(clearWishlist())}
                className="text-muted-foreground hover:text-destructive text-[9px] font-bold uppercase tracking-widest rounded-none h-auto py-2 group"
              >
                <Trash2 className="h-3 w-3 mr-2 group-hover:scale-110 transition-transform" />
                {t.wishlist.clear}
              </Button>
            )}
          </div>
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
                {t.wishlist.diag_id}
              </div>
              
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  filter: ["grayscale(1)", "grayscale(0)", "grayscale(1)"]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="p-10 bg-primary/5 rounded-full mb-12 border border-primary/10 relative"
              >
                <div className="absolute inset-0 border border-dashed border-primary/20 rounded-full animate-[spin_25s_linear_infinite]" />
                <Heart className="h-16 w-16 text-primary/40 relative z-10" />
              </motion.div>
              
              <div className="space-y-4 mb-16">
                <div className="flex items-center justify-center gap-3 opacity-40">
                  <Database className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em]">SIGNAL: ARCHIVE_NULL_REF</span>
                </div>
                <h2 className="text-3xl font-bold uppercase tracking-tighter text-foreground/80 leading-none">{t.wishlist.empty_title}</h2>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.4em] leading-relaxed max-w-xs mx-auto italic">
                  {t.wishlist.empty_desc}
                </p>
              </div>

              <Link href="/shop" className="w-full">
                <Button className="w-full bg-primary text-white py-10 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all group/btn">
                  <Sparkles className="h-4 w-4 mr-4 group-hover/btn:scale-125 transition-transform" />
                  {t.cart.continue}
                  <ArrowRight className={cn("h-4 w-4 ml-4 group-hover/btn:translate-x-2 transition-transform", isRTL && "rotate-180 group-hover/btn:-translate-x-2")} />
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-12">
            <motion.div 
              layout
              variants={containerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {wishlistProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    variants={itemVariants}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-12 flex justify-start">
              <Link href="/shop">
                <Button variant="outline" className="rounded-none uppercase text-[10px] font-bold tracking-[0.25em] h-12 px-10 border-2 border-primary/10 hover:bg-primary/5 hover:border-primary/30 transition-all group">
                  {isRTL ? <ArrowRight className="mr-3 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="mr-3 h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />}
                  {t.cart.continue}
                </Button>
              </Link>
            </motion.div>
          </div>
        )}

        <motion.div 
          variants={itemVariants}
          className="mt-24 pt-10 border-t border-primary/10 flex flex-wrap items-center justify-center gap-12 grayscale opacity-30"
        >
          <div className="flex items-center gap-6">
            <div className="text-[8px] font-bold uppercase tracking-[0.5em]">{t.wishlist.stability}</div>
            <div className="h-4 w-[1px] bg-primary/20" />
            <div className="text-[8px] font-bold uppercase tracking-[0.5em]">{t.wishlist.iso_cert}</div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
