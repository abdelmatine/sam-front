"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { clearWishlist } from '@/store/slices/wishlistSlice';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import Link from 'next/link';
import { Heart, Trash2, ArrowLeft, ArrowRight, Activity, Database, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import ProductCard from '@/components/shared/ProductCard';

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
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] }
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
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/[0.01] -skew-x-12 translate-x-1/4" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 flex-1 relative z-10"
      >
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-l-4 border-primary pl-8 gap-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-primary/10 rounded-sm">
                <Database className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/70">Selection_Archive v2.1</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tighter flex items-center gap-4">
                Priorités Cliniques
                <span className="text-[10px] bg-primary text-white px-3 py-1 rounded-none font-black tracking-widest">{items.length} Units</span>
              </h1>
              <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-[0.3em] mt-2 italic">
                Équipements sauvegardés pour analyse technique et acquisition future
              </p>
            </div>
          </div>
          
          {items.length > 0 && (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="ghost" 
                onClick={() => dispatch(clearWishlist())}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-none px-6 py-6 h-auto border-2 border-transparent hover:border-destructive/20 transition-all"
              >
                <Trash2 className="h-4 w-4 mr-3" />
                Déréférencer tout
              </Button>
            </motion.div>
          )}
        </motion.div>

        {items.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-44 text-center border-2 border-dashed border-primary/10 bg-accent/3 relative overflow-hidden"
          >
            <div className="absolute top-4 left-4 opacity-10 text-[8px] font-bold uppercase tracking-[0.5em]">Diagnostic ID: NO-PRIORITY-REF</div>
            <div className="relative mb-10">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary rounded-full blur-3xl"
              />
              <div className="p-12 bg-primary/10 rounded-full relative z-10 border border-primary/20">
                <Heart className="h-16 w-16 text-primary/20" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-6 uppercase tracking-tighter text-foreground/80">Aucune Priorité Identifiée</h2>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.4em] mb-12 max-w-sm leading-relaxed mx-auto">
              Votre archive technique est actuellement vide. Explorez notre catalogue pour prioriser des solutions de soins.
            </p>
            <Link href="/shop">
              <Button className="bg-primary text-white px-20 py-8 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-4">
                <Sparkles className="h-4 w-4" />
                Explorer le Catalogue
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            <AnimatePresence mode="popLayout">
              {wishlistProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="h-full"
                >
                  <ProductCard product={product as any} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <motion.div variants={itemVariants} className="mt-20 pt-10 border-t border-primary/10 flex flex-col items-center gap-10">
          <div className="flex items-center gap-6 grayscale opacity-30">
            <div className="text-[8px] font-bold uppercase tracking-[0.5em]">SYSTEM STABILITY: 99.9%</div>
            <div className="h-4 w-[1px] bg-primary/30" />
            <div className="text-[8px] font-bold uppercase tracking-[0.5em]">ISO 13485 CERTIFIED</div>
          </div>
          
          <Link href="/shop">
            <Button variant="outline" className="rounded-none h-16 px-12 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-4 border-2 border-primary/10 hover:bg-primary/5 hover:border-primary/30 transition-all group">
              {isRTL ? <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" /> : <ArrowLeft className="h-4 w-4 group-hover:-translate-x-2 transition-transform" />}
              Retour au Catalogue Technique
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
