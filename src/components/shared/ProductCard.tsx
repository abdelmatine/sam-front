"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { Star, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';
import { useRouter } from 'next/navigation';

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
}

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    
    // Simulate minor delay for UX feedback
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
        title: "Dispositif Sélectionné",
        description: `${product.name} ajouté au panier.`,
      });
      setIsAdding(false);
    }, 400);
  };

  const handleNavigate = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    router.push(`/product/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border rounded-none overflow-hidden group transition-all clinical-shadow flex flex-col h-full hover:border-primary/40"
    >
      <div className="relative h-64 overflow-hidden border-b cursor-pointer" onClick={handleNavigate}>
        <Image 
          src={product.imageUrl}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-1000 group-hover:scale-110",
            isNavigating ? "blur-sm" : ""
          )}
        />
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
        
        {isNavigating && (
          <div className="absolute inset-0 bg-background/40 backdrop-blur-sm flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-white border-none rounded-none text-[8px] uppercase tracking-widest px-2 py-1 shadow-lg">
              {t.common.new}
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="destructive" className="rounded-none text-[8px] uppercase tracking-widest px-2 py-1 shadow-lg">
              {t.common.stock_out}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 gap-1">
        <span className="text-[9px] text-primary font-bold uppercase tracking-[0.2em]">{product.brand}</span>
        <h3 
          className="font-bold text-base group-hover:text-primary transition-colors line-clamp-1 mb-2 cursor-pointer"
          onClick={handleNavigate}
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn("h-3 w-3", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted")} 
            />
          ))}
          <span className="text-[9px] text-muted-foreground ml-1 font-bold">({product.rating})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t">
          <span className="text-xl font-bold tracking-tighter text-foreground">${product.price.toLocaleString()}</span>
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            size="sm"
            className="bg-primary hover:bg-primary/90 rounded-none h-9 w-9 p-0 shadow-lg shadow-primary/10 transition-transform active:scale-90"
          >
            {isAdding ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;