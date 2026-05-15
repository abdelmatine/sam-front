"use client";

import React from 'react';
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

  // Resolve full product data for each wishlist item to ensure ProductCard has all technical metadata
  const wishlistProducts = items
    .map(item => products.find(p => p.id === item.id))
    .filter((p): p is typeof products[0] => p !== undefined);

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
    hidden: { opacity: 0, x: -30, scale: 0.98 },
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
      
      {/* Background Clinical Grid Accent - Identical to Cart */}
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
        {/* Technical Header - Mirrors Cart Header */}
        <motion.div variants={itemVariants} className="flex flex-col mb-16 border-l-4 border-primary pl-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-1.5 bg-primary/10 rounded-sm">
              <Database className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/70">Selection_Archive v2.1</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-headline font-bold flex items-center gap-4 uppercase tracking-tighter">
                {isRTL ? "الأولويات السريرية" : "Priorités Cliniques"}
                <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-none border border-primary/20">{items.length} Units</span>
              </h1>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.4em] mt-2 italic">
                {isRTL ? "معدات محفوظة للتحليل الفني" : "Équipements sauvegardés pour analyse technique et acquisition future"}
              </p>
            </div>
            
            {items.length > 0 && (
              <Button 
                variant="ghost" 
                onClick={() => dispatch(clearWishlist())}
                className="text-muted-foreground hover:text-destructive text-[9px] font-bold uppercase tracking-widest rounded-none h-auto py-2 group"
              >
                <Trash2 className="h-3.5 w-3.5 mr-2 group-hover:scale-110 transition-transform" />
                {isRTL ? "إلغاء المرجعية" : "Déréférencer tout"}
              </Button>
            )}
          </div>
        </motion.div>

        {items.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-40 text-center border-2 border-dashed border-primary/10 bg-primary/[0.02] relative overflow-hidden"
          >
            <div className="absolute top-4 left-4 opacity-10 text-[8px] font-bold uppercase tracking-[0.5em]">Diagnostic ID: NO-PRIORITY-REF</div>
            <div className="relative mb-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-primary/20 rounded-full"
              />
              <div className="p-10 bg-primary/5 rounded-full relative z-10">
                <Heart className="h-12 w-12 text-primary/20" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-tighter text-foreground/80">
              {isRTL ? "لا توجد أولويات محددة" : "Aucune Priorité Identifiée"}
            </h2>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.4em] mb-12 max-w-xs leading-relaxed mx-auto">
              {isRTL ? "أرشيفك الفني فارغ حاليا" : "Votre archive technique est actuellement vide. Explorez notre catalogue."}
            </p>
            <Link href="/shop">
              <Button className="bg-primary text-white px-16 py-8 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                <Sparkles className="h-4 w-4 mr-3" />
                {t.cart.continue}
              </Button>
            </Link>
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
                    <ProductCard product={product as any} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-12 flex justify-start">
              <Link href="/shop">
                <Button variant="outline" className="rounded-none uppercase text-[10px] font-bold tracking-[0.25em] h-14 px-10 border-2 border-primary/10 hover:bg-primary/5 hover:border-primary/30 transition-all group">
                  {isRTL ? <ArrowRight className="mr-3 h-4 w-4 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="mr-3 h-4 w-4 group-hover:-translate-x-1 transition-transform" />}
                  {t.cart.continue}
                </Button>
              </Link>
            </motion.div>
          </div>
        )}

        {/* Clinical Compliance Status - Mirrors Cart Footer */}
        <motion.div 
          variants={itemVariants}
          className="mt-24 pt-10 border-t border-primary/10 flex flex-wrap items-center justify-center gap-12 grayscale opacity-30"
        >
          <div className="flex items-center gap-6">
            <div className="text-[8px] font-bold uppercase tracking-[0.5em]">SYSTEM STABILITY: 99.9%</div>
            <div className="h-4 w-[1px] bg-primary/20" />
            <div className="text-[8px] font-bold uppercase tracking-[0.5em]">ISO 13485 CERTIFIED</div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
