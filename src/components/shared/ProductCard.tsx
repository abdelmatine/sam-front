"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { ShoppingCart, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
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
      description: `${product.name} added to selection.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-card border rounded-none overflow-hidden group transition-all clinical-shadow flex flex-col h-full"
    >
      <div className="relative h-72 overflow-hidden border-b">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <Image 
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.5] group-hover:grayscale-0"
          />
        </Link>
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && <Badge className="bg-primary text-white border-none rounded-none text-[9px] uppercase tracking-widest px-2 py-1">{t.common.new}</Badge>}
          {!product.inStock && <Badge variant="destructive" className="rounded-none text-[9px] uppercase tracking-widest px-2 py-1">{t.common.stock_out}</Badge>}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 gap-1">
        <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">{product.brand}</span>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-1 mb-2">{product.name}</h3>
        </Link>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn("h-3 w-3", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted")} 
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1 font-bold">({product.rating})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t">
          <span className="text-lg font-bold tracking-tight">${product.price.toLocaleString()}</span>
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            size="sm"
            className="bg-primary hover:bg-primary/90 rounded-none h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;