
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleWishlist, clearWishlist } from '@/store/slices/wishlistSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowLeft, ArrowRight, ShieldCheck, Activity, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import { toast } from '@/hooks/use-toast';

export default function WishlistPage() {
  const { items } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();
  const { t, isRTL } = useTranslation();

  const handleAddToCart = (item: any) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl,
      brand: item.brand
    }));
    toast({
      title: "Device Selected",
      description: `${item.name} added to cart.`,
    });
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
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
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
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-between mb-12 border-l-4 border-primary pl-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Database className="h-3.5 w-3.5 text-primary/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">Module: WISHLIST-IDX</span>
            </div>
            <h1 className="text-3xl font-headline font-bold uppercase tracking-tighter flex items-center gap-3">
              <Heart className="h-7 w-7 text-primary" />
              Priorités Cliniques
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1 italic">
              Équipements sauvegardés pour acquisition future
            </p>
          </div>
          
          {items.length > 0 && (
            <Button 
              variant="ghost" 
              onClick={() => dispatch(clearWishlist())}
              className="text-destructive hover:text-destructive hover:bg-destructive/5 text-[10px] font-bold uppercase tracking-widest rounded-none"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </motion.div>

        {items.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-primary/20 bg-primary/5 relative overflow-hidden"
          >
            <Activity className="h-12 w-12 text-primary/30 mb-6" />
            <h2 className="text-xl font-bold mb-4 uppercase tracking-tight text-foreground/80">Votre Liste est Vide</h2>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-8">Aucun dispositif n'a été priorisé pour le moment.</p>
            <Link href="/shop">
              <Button className="bg-primary text-white px-12 py-7 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl shadow-primary/20">
                Explorer le Catalogue
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={itemVariants}
                  className="h-full"
                >
                  <Card className="rounded-none overflow-hidden group transition-all h-full flex flex-col hover:border-primary/40 clinical-shadow border-border/40">
                    <div className="relative aspect-square border-b overflow-hidden bg-muted/30">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => dispatch(toggleWishlist(item))}
                        className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-destructive rounded-none opacity-0 group-hover:opacity-100 transition-all translate-y-[-10px] group-hover:translate-y-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-6 flex flex-col flex-1 relative">
                      <div className="absolute top-0 left-0 w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-700" />
                      <span className="text-[9px] text-primary font-bold uppercase tracking-[0.2em] mb-1">{item.brand}</span>
                      <h3 className="text-sm font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                      
                      <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                        <span className="text-lg font-bold tracking-tighter text-foreground">${item.price.toLocaleString()}</span>
                        <Button 
                          onClick={() => handleAddToCart(item)}
                          className="bg-primary text-white h-10 px-4 rounded-none text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 active:scale-95 shadow-lg shadow-primary/10"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          Au Panier
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <motion.div variants={itemVariants} className="mt-12 flex justify-center">
          <Link href="/shop">
            <Button variant="outline" className="rounded-none h-12 px-8 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 border-primary/20 hover:bg-primary/5">
              {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              Retour au Catalogue
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
