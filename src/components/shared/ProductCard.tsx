"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { Star, Plus, Loader2, Heart, ShoppingCart, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';
import { getBrandById } from '@/lib/products';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  brandId: string;
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

  const brand = getBrandById(product.brandId);

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
        brand: brand?.name || 'N/A'
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
      brand: brand?.name || 'N/A'
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
      whileHover={!isNavigating ? { y: -5 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={`/shop/${product.category}/${product.id}`} onClick={handleLinkClick} className="block h-full">
        <Card className={cn(
          "rounded-none overflow-hidden group transition-all border border-border/40 clinical-shadow flex bg-card relative",
          isList ? "flex-col md:flex-row h-auto min-h-[220px]" : "flex-col h-full hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
        )}>
          {/* Clinical Lateral Accent */}
          <div className={cn(
            "absolute top-0 w-[2.5px] h-0 bg-primary group-hover:h-full transition-all duration-700 z-30",
            isRTL ? "right-0" : "left-0"
          )} />

          <AnimatePresence>
            {isNavigating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3"
              >
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">{t.common.loading}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Sector */}
          <div className={cn(
            "relative overflow-hidden bg-accent/[0.01] shrink-0 flex items-center justify-center transition-colors border-border/40",
            isList ? "w-full md:w-64 h-64 md:h-auto border-b md:border-b-0 md:border-r" : "h-56 border-b"
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
                  <Activity className="h-4 w-4 text-primary/20 animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none" />
            
            <motion.div
              animate={{ opacity: isImageLoading ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full relative"
            >
              <Image 
                src={product.imageUrl}
                alt={product.name}
                fill
                className={cn(
                  "object-cover transition-all duration-1000 group-hover:scale-105",
                  "grayscale-[0.3] group-hover:grayscale-0"
                )}
                onLoad={() => setIsImageLoading(false)}
              />
            </motion.div>
            
            {/* Status Badges */}
            <div className={cn(
              "absolute top-5 flex flex-col gap-2 z-30",
              isRTL ? "right-5" : "left-5"
            )}>
              {product.isNew && (
                <Badge className="bg-primary text-white border-none rounded-none text-[8px] font-black uppercase tracking-[0.35em] px-3 py-2 shadow-2xl shadow-primary/30">
                  {t.common.new}
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive" className="rounded-none text-[8px] font-black uppercase tracking-[0.35em] px-3 py-2 shadow-2xl shadow-destructive/30">
                  {t.common.stock_out}
                </Badge>
              )}
            </div>

            {/* Wishlist Toggle */}
            <div className={cn(
              "absolute top-5 z-30 opacity-0 group-hover:opacity-100 transition-all translate-y-[-8px] group-hover:translate-y-0",
              isRTL ? "left-5" : "right-5"
            )}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleWishlist}
                className={cn(
                  "bg-background/90 backdrop-blur-md transition-all rounded-none h-10 w-10 border border-border/40 hover:bg-primary/5 shadow-sm",
                  isWishlisted ? "text-destructive" : "text-muted-foreground hover:text-primary"
                )}
              >
                <Heart className={cn("h-4.5 w-4.5 transition-all", isWishlisted && "fill-destructive")} />
              </Button>
            </div>
          </div>

          {/* Content Sector */}
          <CardContent className={cn(
            "p-8 flex flex-col flex-1 relative bg-gradient-to-br from-transparent to-accent/[0.02]",
            isList ? "justify-center" : "justify-between"
          )}>
            <div className="flex flex-col h-full">
              <div className="flex-1">
                {/* Brand Header */}
                <div className="flex flex-col gap-1 mb-5">
                  <span className="text-[9px] text-primary font-black uppercase tracking-[0.4em]">
                    {brand?.name || 'N/A'}
                  </span>
                </div>
                
                <h3 className={cn(
                  "font-headline font-bold group-hover:text-primary transition-colors mb-4 uppercase tracking-tighter leading-[0.95]",
                  isList ? "text-2xl md:text-3xl" : "text-[16px] line-clamp-2"
                )}>
                  {product.name}
                </h3>

                {isList && product.description && (
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mb-8 italic font-medium max-w-xl leading-relaxed">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn("h-3 w-3", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted/10")} 
                      />
                    ))}
                  </div>
                  <div className="h-3 w-[1px] bg-border/40" />
                  <span className="text-[8px] text-muted-foreground/60 font-black tracking-[0.2em] tabular-nums">
                    VAL: {product.rating}
                  </span>
                </div>
              </div>

              {/* Price & Action Section */}
              <div className={cn(
                "flex items-center justify-between mt-auto border-t border-border/15 pt-6",
                isList ? "md:border-t-0 md:pt-0" : ""
              )}>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 opacity-40">
                    <ShieldCheck className="h-2.5 w-2.5 text-primary" />
                    <span className="text-[7px] font-black uppercase tracking-[0.4em]">Acquisition_MSRP</span>
                  </div>
                  <span className={cn(
                    "font-headline font-bold tracking-tighter text-foreground flex items-baseline gap-0.5",
                    isList ? "text-4xl" : "text-2xl"
                  )}>
                    <span className="text-[11px] font-medium opacity-40">$</span>
                    {product.price.toLocaleString()}
                  </span>
                </div>
                
                <div className={cn("shrink-0", !isList && "flex gap-2")}>
                  <Button 
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAdding}
                    className={cn(
                      "bg-primary text-white hover:bg-primary/90 rounded-none transition-all shadow-2xl shadow-primary/20 border-none group/btn relative overflow-hidden",
                      isList ? "h-16 px-12 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-5" : "h-12 w-12 p-0"
                    )}
                  >
                    {isAdding ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      isList ? (
                        <>
                          <ShoppingCart className="h-5 w-5 group-hover/btn:translate-x-1.5 transition-transform duration-700" />
                          {t.product.add_to_cart}
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-700" />
                        </>
                      ) : (
                        <div className="relative flex items-center justify-center">
                          <Plus className="h-6 w-6 group-hover/btn:rotate-90 transition-transform duration-700" />
                          {/* Premium Action Glow Layer */}
                          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover/btn:scale-[2] transition-transform duration-1000 opacity-0 group-hover/btn:opacity-100 blur-xl" />
                        </div>
                      )
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;