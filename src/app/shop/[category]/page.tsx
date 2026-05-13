
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/shared/ProductCard';
import { ShopSkeleton } from '@/components/shared/ProductSkeleton';
import { products, categories } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, ChevronDown, FilterX, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CategoryPage() {
  const { t } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const activeCategory = (params.category as string) || 'all';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const menuCategories = [
    { label: t.categories.view_all, value: 'all' },
    ...categories.map(c => ({ label: c.name, value: c.slug }))
  ];

  const categoryData = categories.find(c => c.slug === activeCategory);

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
          className="mb-12 border-l-4 border-primary pl-6 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="text-3xl font-headline font-bold mb-2 uppercase tracking-tight">
              {activeCategory === 'all' ? t.catalogue.title : categoryData?.name}
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl font-medium italic">
              {activeCategory === 'all' ? t.catalogue.subtitle : categoryData?.description}
            </p>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => router.push('/shop')}
            className="rounded-none text-[10px] font-bold uppercase tracking-widest h-auto py-2 group"
          >
            <ArrowLeft className="mr-2 h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
            {t.catalogue.categories_btn}
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col lg:flex-row gap-6 mb-12 items-start justify-between"
        >
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {menuCategories.map((cat) => (
              <Button
                key={cat.value}
                variant={(activeCategory === cat.value || (activeCategory === 'all' && cat.value === 'all')) ? "default" : "outline"}
                onClick={() => router.push(cat.value === 'all' ? '/shop/all' : `/shop/${cat.value}`)}
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
                placeholder={t.catalogue.search} 
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
                <DropdownMenuItem onClick={() => setSortBy('featured')} className="text-xs rounded-none font-bold uppercase tracking-widest p-3">Featured</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-low')} className="text-xs rounded-none font-bold uppercase tracking-widest p-3">Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-high')} className="text-xs rounded-none font-bold uppercase tracking-widest p-3">Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('rating')} className="text-xs rounded-none font-bold uppercase tracking-widest p-3">Top Rated</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Results */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <ShopSkeleton />
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div 
                  layout
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
                    <h3 className="text-lg font-bold mb-1 uppercase tracking-tighter">{t.catalogue.no_results}</h3>
                    <p className="text-xs text-muted-foreground">Adjust filters or search parameters.</p>
                  </div>
                  <Button 
                    variant="link" 
                    onClick={() => { router.push('/shop/all'); setSearchQuery(''); }}
                    className="text-primary font-bold uppercase text-[10px] tracking-[0.2em]"
                  >
                    {t.catalogue.reset}
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
