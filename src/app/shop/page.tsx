"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/shared/ProductCard';
import { ShopSkeleton } from '@/components/shared/ProductSkeleton';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, ChevronDown, FilterX } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ShopPage() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial data load simulation
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { label: t.categories.view_all, value: 'all' },
    { label: t.categories.respiratory, value: 'respiratory' },
    { label: t.categories.oxygen, value: 'oxygen' },
    { label: t.categories.accessories, value: 'accessories' },
    { label: t.categories.monitoring, value: 'monitoring' },
    { label: t.categories.others, value: 'others' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => activeCategory === 'all' || p.category === activeCategory)
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <main className="min-h-screen pt-24 pb-20 bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-l-4 border-primary pl-6"
        >
          <h1 className="text-3xl font-headline font-bold mb-2 uppercase tracking-tight">
            {t.shop.title}
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl font-medium italic">
            {t.shop.subtitle}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start justify-between">
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={activeCategory === cat.value ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.value)}
                className="rounded-none text-[9px] font-bold uppercase tracking-widest h-9 px-5 transition-all"
              >
                {cat.label}
              </Button>
            ))}
          </div>

          <div className="flex gap-4 w-full lg:w-auto items-center">
            <div className="relative flex-1 lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input 
                placeholder={t.shop.search} 
                className="pl-10 rounded-none h-10 border-border text-xs focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-none h-10 gap-2 text-[10px] font-bold uppercase tracking-widest px-4">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  {t.common.sort}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-none border-primary/20 bg-background/95 backdrop-blur-md">
                <DropdownMenuItem onClick={() => setSortBy('featured')} className="text-xs rounded-none font-bold uppercase tracking-widest p-3">Mis en avant</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-low')} className="text-xs rounded-none font-bold uppercase tracking-widest p-3">Prix croissant</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-high')} className="text-xs rounded-none font-bold uppercase tracking-widest p-3">Prix décroissant</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('rating')} className="text-xs rounded-none font-bold uppercase tracking-widest p-3">Les mieux notés</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Results */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <ShopSkeleton />
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div 
                  layout
                  className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24 border border-dashed border-primary/20 bg-primary/5 flex flex-col items-center gap-4"
                >
                  <FilterX className="h-10 w-10 text-primary/40" />
                  <div>
                    <h3 className="text-lg font-bold mb-1 uppercase tracking-tighter">{t.shop.no_results}</h3>
                    <p className="text-xs text-muted-foreground">Essayez d'ajuster vos critères de recherche.</p>
                  </div>
                  <Button 
                    variant="link" 
                    onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                    className="text-primary font-bold uppercase text-[10px] tracking-[0.2em]"
                  >
                    {t.shop.reset}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </main>
  );
}