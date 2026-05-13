"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

export default function FlagshipEquipment() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const [addingId, setAddingId] = useState<string | null>(null);
  const featuredProducts = products.slice(0, 2);

  const handleAddToCart = (product: any) => {
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
        title: "Selection Updated",
        description: `${product.name} added to cart.`,
      });
      setAddingId(null);
    }, 400);
  };

  const handleWishlist = (product: any) => {
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      brand: product.brand
    }));
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
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
      />
      
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
            <motion.h2 variants={childVariants} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">Flagship Equipment</motion.h2>
            <motion.p variants={childVariants} className="text-slate-500 text-sm italic font-medium">Our most trusted and highly-rated clinical solutions.</motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/shop">
              <Button variant="ghost" className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary/5 rounded-none px-6 py-6 h-auto transition-all duration-300">
                View All Categories <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10">
          {featuredProducts.map((product, index) => {
            const isWishlisted = wishlist.some(item => item.id === product.id);
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
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.4 }} className="h-full">
                  <Card className="rounded-none border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 overflow-hidden group transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 h-full relative">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleWishlist(product);
                      }}
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
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </div>

                      <div className="flex-1 p-6 md:p-10 flex flex-col justify-between border-t xl:border-t-0 xl:border-l border-slate-100 dark:border-white/5">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[9px] text-primary font-bold tracking-[0.3em] uppercase">ISO Certified Clinical Grade</span>
                          </div>
                          
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 block">{product.brand}</span>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-tight leading-tight">{product.name}</h3>
                          
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-8 line-clamp-3 leading-relaxed font-medium italic">
                            {product.description || "Ultra-quiet operation with advanced humidification and smart data tracking for clinical accuracy at home."}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-6 border-t border-slate-50 dark:border-white/5 gap-6">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">MSRP Acquisition</span>
                            <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter">${product.price.toLocaleString()}.00</span>
                          </div>
                          
                          <div className="flex gap-3 w-full sm:w-auto">
                            <Link href={`/shop/${product.category}/${product.id}`} className="flex-1 sm:flex-initial">
                              <Button variant="outline" className="w-full sm:w-auto rounded-none h-14 px-6 text-[10px] font-bold uppercase tracking-widest border-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                Specifications
                              </Button>
                            </Link>
                            <Button 
                              onClick={() => handleAddToCart(product)}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
