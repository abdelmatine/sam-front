"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { Star, Plus, Loader2, Heart, ShoppingCart, Activity } from 'lucide-react';
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
  const { t } = useTranslation();
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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={`/shop/${product.category}/${product.id}`} onClick={handleLinkClick} className="block h-full">
        <Card className={cn(
          "rounded-none overflow-hidden group transition-all border border-border/40 clinical-shadow flex bg-card relative",
          isList ? "flex-col md:flex-row h-auto min-h-[180px]" : "flex-col h-full hover:border-primary/40"
        )}>
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
            "relative overflow-hidden border-border/40 bg-muted/30 shrink-0 flex items-center justify-center",
            isList ? "w-full md:w-52 h-52 md:h-auto border-b md:border-b-0 md:border-r" : "h-52 border-b"
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

            <motion.div
              animate={{ opacity: isImageLoading ? 0 : 1, scale: isImageLoading ? 0.95 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Image 
                src={product.imageUrl}
                alt={product.name}
                fill
                className={cn(
                  "object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0",
                  isImageLoading ? "opacity-0" : "opacity-100"
                )}
                onLoad={() => setIsImageLoading(false)}
              />
            </motion.div>
            
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
              {product.isNew && (
                <Badge className="bg-primary text-white border-none rounded-none text-[7px] uppercase tracking-widest px-1.5 py-0.5 shadow-lg">
                  {t.common.new}
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive" className="rounded-none text-[7px] uppercase tracking-widest px-1.5 py-0.5 shadow-lg">
                  {t.common.stock_out}
                </Badge>
              )}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="absolute top-3 right-3 z-20"
            >
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleWishlist}
                className={cn(
                  "bg-white/90 backdrop-blur-sm transition-all rounded-none h-8 w-8 shadow-sm",
                  isWishlisted ? "text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                <Heart className={cn("h-3.5 w-3.5 transition-all", isWishlisted && "fill-destructive animate-pulse")} />
              </Button>
            </motion.div>
          </div>

          <CardContent className={cn(
            "p-5 flex flex-col flex-1 gap-0.5 relative",
            isList ? "justify-center" : "justify-between"
          )}>
            <div className="absolute top-0 left-0 w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-700" />
            
            <div className={cn("flex flex-col", isList && "md:flex-row md:items-start md:justify-between gap-3")}>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Activity className="h-2.5 w-2.5 text-primary/40" />
                  <span className="text-[8px] text-primary font-bold uppercase tracking-[0.15em]">{product.brand}</span>
                </div>
                <h3 className={cn(
                  "font-bold group-hover:text-primary transition-colors line-clamp-1 mb-1 uppercase tracking-tight",
                  isList ? "text-lg md:text-xl" : "text-sm"
                )}>
                  {product.name}
                </h3>

                {isList && product.description && (
                  <p className="text-[10px] text-muted-foreground line-clamp-2 mb-3 italic font-medium max-w-xl">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn("h-2.5 w-2.5", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted")} 
                    />
                  ))}
                  <span className="text-[8px] text-muted-foreground ml-1 font-bold">({product.rating})</span>
                </div>
              </div>

              <div className={cn(
                "flex items-center justify-between",
                isList ? "md:flex-col md:items-end md:justify-center md:gap-3" : "mt-auto pt-3 border-t border-border/40"
              )}>
                <div className="flex flex-col">
                  {isList && <span className="text-[7px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Acquisition MSRP</span>}
                  <span className={cn(
                    "font-bold tracking-tighter text-foreground",
                    isList ? "text-2xl" : "text-lg"
                  )}>
                    ${product.price.toLocaleString()}
                  </span>
                </div>
                
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAdding}
                    className={cn(
                      "bg-primary hover:bg-primary/90 rounded-none transition-all shadow-md border-none",
                      isList ? "h-11 px-8 text-[9px] font-bold uppercase tracking-[0.15em] flex items-center gap-2.5" : "h-9 w-9 p-0"
                    )}
                  >
                    {isAdding ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      isList ? (
                        <>
                          <ShoppingCart className="h-3.5 w-3.5" />
                          {t.product.add_to_cart}
                        </>
                      ) : (
                        <Plus className="h-5 w-5" />
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