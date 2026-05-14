"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import AIExplainer from '@/components/shared/AIExplainer';
import { products, categories } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, ArrowLeft, ArrowRight, Heart, Loader2, ChevronRight, Activity } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ProductDetailPage() {
  const { productId, categorySlug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const { t, isRTL } = useTranslation();
  const [isAdding, setIsAdding] = useState(false);
  
  const product = products.find(p => p.id === productId);
  const category = categories.find(c => c.slug === categorySlug);
  const isWishlisted = wishlist.some(item => item.id === product?.id);

  const localizedCategoryName = category ? (t.categories as any)[category.slug] || category.name : '';

  if (!product) {
    return (
      <main className="min-h-screen pt-32 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 uppercase text-foreground">404 - Device Not Found</h1>
        <Button onClick={() => router.push('/shop')} className="rounded-none uppercase tracking-widest text-xs font-bold">Catalogue</Button>
      </main>
    );
  }

  const handleAddToCart = () => {
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
        title: "Device Selected",
        description: `${product.name} ready for acquisition.`,
      });
      setIsAdding(false);
    }, 400);
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      brand: product.brand
    }));
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
        >
          <Link href="/" className="hover:text-primary transition-colors">{t.catalogue.brand}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-primary transition-colors">{t.nav.catalogue}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/shop/${categorySlug}`} className="hover:text-primary transition-colors">{localizedCategoryName}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary">{product.name}</span>
        </motion.div>

        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mb-8 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] h-auto p-0 hover:bg-transparent hover:text-primary group"
        >
          {isRTL ? <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1" /> : <ArrowLeft className="mr-2 h-3.5 w-3.5 group-hover:-translate-x-1" />}
          {t.product.back}
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square border bg-muted clinical-shadow overflow-hidden">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                fill 
                className="object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
                priority
              />
              {product.isNew && (
                <Badge className="absolute top-6 left-6 bg-primary text-white text-[9px] uppercase tracking-[0.2em] rounded-none px-3 py-1.5 border-none shadow-xl shadow-primary/20">
                  {t.product.new}
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="border-l-4 border-primary pl-6">
              <span className="text-[11px] text-primary font-bold uppercase tracking-[0.3em] block mb-2">{product.brand}</span>
              <h1 className="text-3xl md:text-4xl font-headline font-bold uppercase tracking-tight leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}`} 
                    />
                  ))}
                  <span className="text-xs font-bold ml-2 uppercase tracking-widest">{product.rating} / 5.0</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {t.product.clinical_grade}
                </span>
              </div>
            </div>

            <div className="text-3xl font-bold tracking-tight text-foreground border-b pb-6 flex items-center justify-between">
              ${product.price.toLocaleString()}
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleWishlist}
                className={cn("rounded-none border-primary/20 transition-all", isWishlisted && "bg-destructive/5 border-destructive/20")}
              >
                <Heart className={cn("h-5 w-5", isWishlisted && "fill-destructive text-destructive")} />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-widest">{t.product.specs}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm italic font-medium">
                {product.description}
              </p>
              
              {/* Specification Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border/40">
                <div className="space-y-1">
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">{t.product.tech_ref}</span>
                  <p className="text-xs font-bold uppercase tracking-tight">SAM-{product.id}-CLINICAL</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">{t.product.classification}</span>
                  <p className="text-xs font-bold uppercase tracking-tight">{localizedCategoryName}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">{t.product.origin}</span>
                  <p className="text-xs font-bold uppercase tracking-tight">{product.brand}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">{t.product.logistics}</span>
                  <p className="text-xs font-bold uppercase tracking-tight text-primary">{t.product.ready}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className="w-full py-8 text-sm font-bold uppercase tracking-[0.3em] rounded-none bg-primary text-white hover:bg-primary/90 transition-all clinical-shadow"
              >
                {isAdding ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <ShoppingCart className="mr-3 h-5 w-5" />}
                {product.inStock ? t.product.add_to_cart : t.product.out_of_stock}
              </Button>
            </div>

            <Separator />

            {/* AI Assistant */}
            <AIExplainer content={`${product.name} by ${product.brand}. Specifications: ${product.description}`} />

            {/* Logistics */}
            <div className="grid grid-cols-3 gap-1 mt-4">
              <div className="flex flex-col items-center text-center gap-2 p-4 border bg-accent/30">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-widest">{t.product.delivery}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 border bg-accent/30">
                <RefreshCw className="h-4 w-4 text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-widest">{t.product.returns}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 border bg-accent/30">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-widest">{t.product.warranty}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
