
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight, ShieldCheck, Activity, Loader2, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';

export default function FlagshipEquipment() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [navigatingId, setNavigatingId] = useState<string | null>(null);
  const featuredProducts = products.slice(0, 2);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingId(product.id);
    setTimeout(() => {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        brand: product.brand
      }));
      toast({
        title: t.product.selection_updated,
        description: `${product.name} ${t.product.added_to_cart_msg}`,
      });
      setAddingId(null);
    }, 400);
  };

  const handleWishlist = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      brand: product.brand
    }));
  };

  const handleLinkClick = (id: string) => {
    setNavigatingId(id);
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

  const childVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden border-b relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border-l-4 border-primary pl-6"
          >
            <motion.div variants={childVariants} className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Activity className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Top Tier Solutions</span>
            </motion.div>
            <motion.h2 variants={childVariants} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">
              {t.flagship.title}
            </motion.h2>
            <motion.p variants={childVariants} className="text-slate-500 text-sm italic font-medium">
              {t.flagship.subtitle}
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/shop">
              <Button variant="ghost" className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary/5 rounded-none px-6 py-6 h-auto transition-all duration-300">
                {t.categories.view_all} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10">
          {featuredProducts.map((product, index) => {
            const isWishlisted = wishlist.some(item => item.id === product.id);
            const isNavigating = navigatingId === product.id;
            const xOffset = index % 2 === 0 ? -50 : 50;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: xOffset }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1
                }}
                className="h-full"
              >
                <Link 
                  href={`/shop/${product.category}/${product.id}`} 
                  onClick={() => handleLinkClick(product.id)}
                  className="block h-full group"
                >
                  <motion.div whileHover={!isNavigating ? { scale: 1.01 } : {}} transition={{ duration: 0.4 }} className="h-full">
                    <Card className="rounded-none border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 overflow-hidden group transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 h-full relative">
                      <AnimatePresence>
                        {isNavigating && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3"
                          >
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary">{t.common.loading}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => handleWishlist(e, product)}
                        className={cn(
                          "absolute top-6 right-6 z-20 rounded-none transition-all duration-300",
                          isWishlisted ? "text-destructive bg-destructive/5" : "text-slate-300 hover:text-primary hover:bg-primary/5"
                        )}
                      >
                        <Heart className={cn("h-5 w-5", isWishlisted && "fill-destructive")} />
                      </Button>

                      <CardContent className="p-0 flex flex-col xl:flex-row h-full">
                        <div className="relative w-full xl:w-72 h-72 xl:h-auto shrink-0 bg-slate-50 dark:bg-slate-800/50 overflow-hidden">
                          <Image 
                            src={product.imageUrl} 
                            alt={product.name} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-all duration-700"
                          />
                        </div>

                        <div className="flex-1 p-6 md:p-10 flex flex-col justify-between border-t xl:border-t-0 xl:border-l border-slate-100 dark:border-white/5">
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                              <span className="text-[9px] text-primary font-bold tracking-[0.3em] uppercase">{t.flagship.certified}</span>
                            </div>
                            
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 block">{product.brand}</span>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                            
                            <p className="text-slate-500 dark:text-slate-400 text-xs mb-8 line-clamp-3 leading-relaxed font-medium italic">
                              {product.description}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-6 border-t border-slate-50 dark:border-white/5 gap-6">
                            <div className="flex flex-col">
                              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">{t.flagship.msrp}</span>
                              <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter">${product.price.toLocaleString()}.00</span>
                            </div>
                            
                            <div className="flex gap-3 w-full sm:w-auto">
                              <Button variant="outline" className="flex-1 sm:flex-initial rounded-none h-14 px-6 text-[10px] font-bold uppercase tracking-widest border-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                {t.flagship.specs}
                              </Button>
                              <Button 
                                onClick={(e) => handleAddToCart(e, product)}
                                disabled={addingId === product.id}
                                className="bg-primary text-white h-14 w-14 p-0 rounded-none shadow-xl shadow-primary/20 transition-all active:scale-95 group/btn shrink-0"
                              >
                                {addingId === product.id ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShoppingCart className="h-6 w-6 group-hover/btn:scale-110 transition-transform" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
