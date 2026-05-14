
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { Star, Plus, Loader2, Heart, ShoppingCart } from 'lucide-react';
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={!isNavigating ? { y: -8, scale: isList ? 1.01 : 1.02 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={`/shop/${product.category}/${product.id}`} onClick={handleLinkClick} className="block h-full">
        <Card className={cn(
          "rounded-none overflow-hidden group transition-all border border-border/40 clinical-shadow flex bg-card relative",
          isList ? "flex-col md:flex-row h-auto min-h-[220px]" : "flex-col h-full hover:border-primary/40"
        )}>
          {/* Navigation Overlay */}
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

          {/* Product Image Section */}
          <div className={cn(
            "relative overflow-hidden border-border/40 bg-muted/30 shrink-0",
            isList ? "w-full md:w-64 h-64 md:h-auto border-b md:border-b-0 md:border-r" : "h-64 border-b"
          )}>
            <Image 
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
            
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-primary text-white border-none rounded-none text-[8px] uppercase tracking-widest px-2 py-1 shadow-lg shadow-primary/20">
                  {t.common.new}
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive" className="rounded-none text-[8px] uppercase tracking-widest px-2 py-1 shadow-lg shadow-destructive/20">
                  {t.common.stock_out}
                </Badge>
              )}
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleWishlist}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white text-muted-foreground transition-all rounded-none opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0"
            >
              <Heart className={cn("h-4 w-4 transition-colors", isWishlisted && "fill-destructive text-destructive")} />
            </Button>
          </div>

          {/* Product Info Section */}
          <CardContent className={cn(
            "p-6 flex flex-col flex-1 gap-1 relative",
            isList ? "justify-center" : "justify-between"
          )}>
            <div className="absolute top-0 left-0 w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-700" />
            
            <div className={cn("flex flex-col", isList && "md:flex-row md:items-start md:justify-between gap-4")}>
              <div className="flex-1">
                <span className="text-[9px] text-primary font-bold uppercase tracking-[0.2em]">{product.brand}</span>
                <h3 className={cn(
                  "font-bold group-hover:text-primary transition-colors line-clamp-1 mb-2 uppercase tracking-tight",
                  isList ? "text-xl md:text-2xl" : "text-base"
                )}>
                  {product.name}
                </h3>

                {isList && product.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4 italic font-medium max-w-2xl">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn("h-3 w-3", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted")} 
                    />
                  ))}
                  <span className="text-[9px] text-muted-foreground ml-1 font-bold">({product.rating})</span>
                </div>
              </div>

              <div className={cn(
                "flex items-center justify-between",
                isList ? "md:flex-col md:items-end md:justify-center md:gap-4" : "mt-auto pt-4 border-t border-border/40"
              )}>
                <span className={cn(
                  "font-bold tracking-tighter text-foreground",
                  isList ? "text-3xl" : "text-xl"
                )}>
                  ${product.price.toLocaleString()}
                </span>
                
                <Button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className={cn(
                    "bg-primary hover:bg-primary/90 rounded-none transition-all active:scale-95 shadow-lg shadow-primary/20",
                    isList ? "h-12 px-8 text-[10px] font-bold uppercase tracking-widest" : "h-9 w-9"
                  )}
                  size={isList ? "default" : "icon"}
                >
                  {isAdding ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    isList ? (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {t.product.add_to_cart}
                      </>
                    ) : (
                      <Plus className="h-5 w-5" />
                    )
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
