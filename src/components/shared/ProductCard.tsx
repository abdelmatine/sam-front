"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

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
      title: "Added to Cart",
      description: `${product.name} has been added to your shopping cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border rounded-xl overflow-hidden group transition-all medical-shadow flex flex-col h-full"
    >
      <Link href={`/product/${product.id}`} className="relative h-64 overflow-hidden block">
        <Image 
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <Badge className="bg-primary text-white border-none">New Arrival</Badge>}
          {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <Button variant="secondary" size="icon" className="rounded-full shadow-lg">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full shadow-lg" asChild>
            <Link href={`/product/${product.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{product.brand}</span>
            <Link href={`/product/${product.id}`}>
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn("h-3 w-3", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted")} 
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
          <span className="text-xl font-bold">${product.price.toLocaleString()}</span>
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            size="sm"
            className="bg-primary hover:bg-primary/90 rounded-lg gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}