"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import AIExplainer from '@/components/shared/AIExplainer';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, ArrowLeft } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <main className="min-h-screen pt-32 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button onClick={() => router.push('/shop')}>Back to Shop</Button>
      </main>
    );
  }

  const handleAddToCart = () => {
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
      description: `${product.name} is now in your cart.`,
    });
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery Placeholder */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-3xl overflow-hidden border bg-white medical-shadow">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                fill 
                className="object-cover"
                priority
              />
              {product.isNew && (
                <Badge className="absolute top-6 left-6 bg-primary text-white text-sm py-1 px-3">
                  New Technology
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border bg-muted cursor-pointer hover:border-primary transition-colors">
                  <Image src={product.imageUrl} alt={product.name} fill className="object-cover opacity-60" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-sm text-primary font-bold uppercase tracking-widest">{product.brand}</span>
              <h1 className="text-4xl font-headline font-bold mt-2 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}`} 
                    />
                  ))}
                  <span className="text-sm font-medium ml-2">{product.rating} / 5.0</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm text-green-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" />
                  Clinical Grade
                </span>
              </div>
            </div>

            <div className="text-3xl font-bold text-foreground">
              ${product.price.toLocaleString()}
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="space-y-4 pt-4">
              <Button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full py-8 text-lg font-bold rounded-2xl bg-primary text-white hover:bg-primary/90 shadow-lg medical-shadow group"
              >
                <ShoppingCart className="mr-2 h-6 w-6" />
                {product.inStock ? "Add to Shopping Cart" : "Out of Stock"}
              </Button>
            </div>

            <Separator className="my-4" />

            {/* AI Assistant Section */}
            <AIExplainer content={`${product.name} by ${product.brand}. Specifications: ${product.description}`} />

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-muted/50">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-muted/50">
                <RefreshCw className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">14-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-muted/50">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
