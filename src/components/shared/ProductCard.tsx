"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { Star, Plus, Loader2, Heart, ShoppingCart, Activity, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  imageUrl: string;
  category: string;
  rating: number;
  inStock: boolean;
  isNew?: boolean;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

const ProductCard = ({ product, layout = 'grid' }: ProductCardProps) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const { t, isRTL } = useTranslation();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    
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
      setIsAdding(false);
    }, 400);
  };

  const handleWishlist = (e: React.MouseEvent) => {
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

  const handleLinkClick = () => {
    setIsNavigating(true);
  };

  const isList = layout === 'list';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={!isNavigating ? { y: -8, scale: isList ? 1.01 : 1.02 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={`/shop/${product.category}/${product.id}`} onClick={handleLinkClick} className="block h-full">
        <Card className={cn(
          "rounded-none overflow-hidden group transition-all border border-border/40 clinical-shadow flex bg-card relative",
          isList ? "flex-col md:flex-row h-auto min-h-[180px]" : "flex-col h-full hover:border-primary/40"
        )}>
          {/* Diagnostic Side Accent (Medical Trace) */}
          <div className={cn(
            "absolute top-0 w-[3px] h-0 bg-primary group-hover:h-full transition-all duration-700 z-30",
            isRTL ? "right-0" : "left-0"
          )} />

          <AnimatePresence>
            {isNavigating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2"
              >
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-primary">{t.common.loading}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={cn(
            "relative overflow-hidden border-border/40 bg-muted/10 shrink-0 flex items-center justify-center group-hover:bg-primary/[0.02] transition-colors",
            isList ? "w-full md:w-52 h-52 md:h-auto border-b md:border-b-0 md:border-r" : "h-56 border-b"
          )}>
            <AnimatePresence mode="wait">
              {isImageLoading && (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-accent/5"
                >
                  <div className="relative">
                    <Loader2 className="h-6 w-6 text-primary/20 animate-spin" />
                    <Activity className="h-3 w-3 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scanning Grid Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-1000 z-20" 
              style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '15px 15px' }} 
            />

            <motion.div
              animate={{ opacity: isImageLoading ? 0 : 1, scale: isImageLoading ? 0.95 : 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-full relative"
            >
              <Image 
                src={product.imageUrl}
                alt={product.name}
                fill
                className={cn(
                  "object-contain p-6 transition-all duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0",
                  isImageLoading ? "opacity-0" : "opacity-100"
                )}
                onLoad={() => setIsImageLoading(false)}
              />
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </motion.div>
            
            <div className={cn(
              "absolute top-4 flex flex-col gap-2 z-30",
              isRTL ? "right-4" : "left-4"
            )}>
              {product.isNew && (
                <Badge className="bg-primary text-white border-none rounded-none text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 shadow-2xl shadow-primary/40">
                  {t.common.new}
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive" className="rounded-none text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 shadow-2xl shadow-destructive/40">
                  {t.common.stock_out}
                </Badge>
              )}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={cn(
                "absolute top-4 z-30",
                isRTL ? "left-4" : "right-4"
              )}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleWishlist}
                className={cn(
                  "bg-white/80 dark:bg-black/40 backdrop-blur-md transition-all rounded-none h-9 w-9 shadow-sm border border-primary/5",
                  isWishlisted ? "text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                <Heart className={cn("h-4 w-4 transition-all", isWishlisted && "fill-destructive animate-pulse")} />
              </Button>
            </motion.div>

            {/* Tactical Reference ID */}
            <div className={cn(
              "absolute bottom-2 text-[7px] font-black text-primary/20 uppercase tracking-[0.4em] z-20",
              isRTL ? "right-4" : "left-4"
            )}>
              REF: SAM-ID-{product.id}
            </div>
          </div>

          <CardContent className={cn(
            "p-6 flex flex-col flex-1 gap-1 relative",
            isList ? "justify-center" : "justify-between"
          )}>
            <div className={cn("flex flex-col", isList && "md:flex-row md:items-start md:justify-between gap-6")}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-primary/10 rounded-sm">
                    <Activity className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-[9px] text-primary font-bold uppercase tracking-[0.3em]">{product.brand}</span>
                </div>
                
                <h3 className={cn(
                  "font-bold group-hover:text-primary transition-colors line-clamp-1 mb-2 uppercase tracking-tight leading-tight",
                  isList ? "text-xl md:text-2xl" : "text-[15px]"
                )}>
                  {product.name}
                </h3>

                {isList && product.description && (
                  <p className="text-[10px] text-muted-foreground line-clamp-2 mb-4 italic font-medium max-w-xl leading-relaxed">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn("h-3 w-3", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted/40")} 
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-muted-foreground font-black tracking-widest">({product.rating})</span>
                </div>
              </div>

              <div className={cn(
                "flex items-center justify-between",
                isList ? "md:flex-col md:items-end md:justify-center md:gap-4" : "mt-auto pt-5 border-t border-border/20"
              )}>
                <div className="flex flex-col">
                  {isList && <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary/60 mb-1">Acquisition MSRP</span>}
                  <span className={cn(
                    "font-bold tracking-tighter text-foreground flex items-end gap-1",
                    isList ? "text-3xl" : "text-xl"
                  )}>
                    <span className="text-xs font-medium pb-1.5 opacity-40">$</span>
                    {product.price.toLocaleString()}
                  </span>
                </div>
                
                <motion.div whileTap={{ scale: 0.95 }} className={cn(!isList && "shrink-0")}>
                  <Button 
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAdding}
                    className={cn(
                      "bg-primary text-white hover:bg-primary/90 rounded-none transition-all shadow-xl shadow-primary/20 border-none group/btn overflow-hidden",
                      isList ? "h-14 px-10 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3" : "h-11 w-11 p-0"
                    )}
                  >
                    {isAdding ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      isList ? (
                        <>
                          <ShoppingCart className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          {t.product.add_to_cart}
                        </>
                      ) : (
                        <Plus className="h-5 w-5 group-hover/btn:rotate-90 transition-transform duration-500" />
                      )
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;