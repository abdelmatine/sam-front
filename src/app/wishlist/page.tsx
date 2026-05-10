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
import { Heart, ShoppingCart, Trash2, ArrowLeft, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
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

  return (
    <main className="min-h-screen flex flex-col pt-24 pb-20 bg-background">
      <Navbar />
      <div className="container mx-auto px-4 flex-1">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-12 border-l-4 border-primary pl-6"
        >
          <div>
            <h1 className="text-3xl font-headline font-bold uppercase tracking-tighter flex items-center gap-3">
              <Heart className="h-7 w-7 text-primary" />
              Wishlist
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1 italic">
              Clinical equipment saved for future acquisition
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
          <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-primary/20 bg-primary/5">
            <Activity className="h-12 w-12 text-primary/30 mb-6" />
            <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">Your Wishlist is Empty</h2>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-8">No clinical devices have been prioritized yet.</p>
            <Link href="/shop">
              <Button className="bg-primary text-white px-12 py-7 rounded-none text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-primary/20">
                Explore Catalogue
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <Card className="rounded-none overflow-hidden group transition-all h-full flex flex-col hover:border-primary/40 clinical-shadow">
                    <div className="relative aspect-square border-b overflow-hidden">
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
                        className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-destructive rounded-none opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-6 flex flex-col flex-1">
                      <span className="text-[9px] text-primary font-bold uppercase tracking-[0.2em] mb-1">{item.brand}</span>
                      <h3 className="text-sm font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                      
                      <div className="mt-auto pt-4 border-t flex items-center justify-between">
                        <span className="text-lg font-bold tracking-tighter">${item.price.toLocaleString()}</span>
                        <Button 
                          onClick={() => handleAddToCart(item)}
                          className="bg-primary text-white h-10 px-4 rounded-none text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          Move to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link href="/shop">
            <Button variant="outline" className="rounded-none h-12 px-8 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              Back to Clinical Shop
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}