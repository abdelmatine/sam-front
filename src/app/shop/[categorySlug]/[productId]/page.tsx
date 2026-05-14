
"use client";

import React, { use, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { products } from '@/lib/products';
import { useTranslation } from '@/hooks/use-translation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { 
  ChevronRight, 
  ShoppingCart, 
  Heart, 
  Truck, 
  RefreshCcw, 
  Activity, 
  Star, 
  BadgeCheck,
  Package,
  Database
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import AIExplainer from '@/components/shared/AIExplainer';
import ProductCard from '@/components/shared/ProductCard';
import { motion } from 'framer-motion';

export default function ProductDetailPage({ params }: { params: Promise<{ categorySlug: string, productId: string }> }) {
  const { categorySlug, productId } = use(params);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  
  const product = products.find(p => p.id === productId);
  const isWishlisted = wishlist.some(item => item.id === productId);
  
  const relatedProducts = products
    .filter(p => p.category === categorySlug && p.id !== productId)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!product) return;
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
  };

  const handleWishlist = () => {
    if (!product) return;
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  if (!product) return null;

  const categoryName = (t.categories as any)[categorySlug] || categorySlug;

  return (
    <main className="min-h-screen pt-24 pb-20 bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Background Clinical Grid Accent */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 relative z-10"
      >
        {/* Breadcrumbs */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-10 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
          <Link href="/" className="hover:text-primary transition-colors">{t.catalogue.brand}</Link>
          <ChevronRight className="h-2.5 w-2.5" />
          <Link href="/shop" className="hover:text-primary transition-colors">{t.nav.catalogue}</Link>
          <ChevronRight className="h-2.5 w-2.5" />
          <Link href={`/shop/${categorySlug}`} className="hover:text-primary transition-colors">{categoryName}</Link>
          <ChevronRight className="h-2.5 w-2.5" />
          <span className="text-primary/80">{product.name}</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          {/* Left: Product Visuals */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            <div className="relative aspect-square border border-primary/10 bg-accent/5 overflow-hidden clinical-shadow">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                fill 
                className="object-contain p-12 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                priority
              />
              {product.isNew && (
                <div className="absolute top-8 left-8">
                  <Badge className="bg-primary text-white rounded-none text-[10px] uppercase font-bold tracking-widest px-4 py-2 border-none">
                    {t.product.new}
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((idx) => (
                <div key={idx} className="relative aspect-square border border-primary/5 bg-accent/3 overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer">
                  <Image src={`https://picsum.photos/seed/med-${idx}/400/400`} alt="Detail" fill className="object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Technical Specs & Actions */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col">
            <div className="border-l-4 border-primary pl-8 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Database className="h-3.5 w-3.5 text-primary/40" />
                <span className="text-[10px] text-primary font-bold uppercase tracking-[0.4em]">Tech-ID: {product.brand.toUpperCase()}</span>
              </div>
              <h1 className="text-4xl font-bold uppercase tracking-tighter leading-none mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-3.5 w-3.5", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted")} />
                  ))}
                  <span className="ml-1 text-primary">({product.rating})</span>
                </div>
                <div className="h-4 w-[1px] bg-border" />
                <span className="uppercase tracking-widest text-[10px]">{t.product.clinical_grade}</span>
              </div>
              <p className="text-muted-foreground text-sm italic leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="bg-accent/10 border-y py-10 px-8 mb-10">
              <div className="flex items-end gap-3 mb-8">
                <span className="text-4xl font-bold tracking-tighter text-foreground">${product.price.toLocaleString()}</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest pb-1">{t.product.msrp || 'MSRP Acquisition'}</span>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-primary text-white h-16 rounded-none text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {product.inStock ? t.product.add_to_cart : t.product.out_of_stock}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleWishlist}
                  className={cn(
                    "h-16 w-16 rounded-none border-2 transition-all",
                    isWishlisted ? "text-destructive bg-destructive/5 border-destructive/20" : "border-primary/10 hover:bg-primary/5"
                  )}
                >
                  <Heart className={cn("h-6 w-6", isWishlisted && "fill-destructive")} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: BadgeCheck, label: t.product.warranty },
                { icon: Truck, label: t.product.delivery },
                { icon: RefreshCcw, label: t.product.returns },
                { icon: Package, label: t.product.ready }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 border border-primary/5 bg-accent/3">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            <AIExplainer content={product.description} />
          </motion.div>
        </div>

        {/* Technical Specification Sheet */}
        <motion.div variants={itemVariants} className="mb-24">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0 gap-10">
              <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 text-[11px] font-bold uppercase tracking-[0.3em]">
                {t.product.specs}
              </TabsTrigger>
              <TabsTrigger value="clinical" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 text-[11px] font-bold uppercase tracking-[0.3em]">
                {t.nav.about}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="pt-10">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { label: t.product.tech_ref, value: `SAM-PRD-${product.id}v2` },
                  { label: t.product.classification, value: product.category.toUpperCase() },
                  { label: t.product.origin, value: product.brand },
                  { label: t.product.logistics, value: product.inStock ? t.product.ready : t.product.out_of_stock }
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-primary/5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{spec.label}</span>
                    <span className="text-xs font-bold uppercase tracking-tight text-primary">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="clinical" className="pt-10 max-w-3xl">
              <p className="text-sm leading-relaxed text-muted-foreground font-medium italic">
                {t.footer.quality_desc}
              </p>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Equipment */}
        {relatedProducts.length > 0 && (
          <motion.section variants={itemVariants} className="pt-24 border-t">
            <div className="flex items-center gap-3 mb-12 border-l-4 border-primary pl-6">
              <Activity className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold uppercase tracking-tighter">Équipements Complémentaires</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p as any} />
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>
    </main>
  );
}
