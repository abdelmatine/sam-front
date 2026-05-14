
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/shared/ProductCard';
import { ShopSkeleton } from '@/components/shared/ProductSkeleton';
import { products, categories } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, ChevronDown, FilterX, ArrowLeft, ChevronRight } from 'lucide-react';
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
  const categorySlug = params.categorySlug as string;
  const activeCategory = categorySlug || 'all';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const menuCategories = [
    { label: t.categories.view_all, value: 'all' },
    ...categories.map(c => ({ 
      label: (t.categories as any)[c.slug] || c.name, 
      value: c.slug 
    }))
  ];

  const categoryData = categories.find(c => c.slug === activeCategory);
  const localizedCategoryName = categoryData ? (t.categories as any)[categoryData.slug] || categoryData.name : '';
  const localizedCategoryDesc = categoryData ? (t.categories as any)[`${categoryData.slug}_desc`] || categoryData.description : '';

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
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">{t.catalogue.brand}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-primary transition-colors">{t.nav.catalogue}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary">{activeCategory === 'all' ? t.categories.view_all : localizedCategoryName}</span>
        </div>

        {/* Header */}
        <div className="mb-12 border-l-4 border-primary pl-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-headline font-bold mb-2 uppercase tracking-tight">
              {activeCategory === 'all' ? t.catalogue.title : localizedCategoryName}
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl font-medium italic">
              {activeCategory === 'all' ? t.catalogue.subtitle : localizedCategoryDesc}
            </p>
          </div>
          <Link href="/shop">
            <Button variant="ghost" className="rounded-none text-[10px] font-bold uppercase tracking-widest h-auto py-2 group">
              <ArrowLeft className="mr-2 h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
              {t.catalogue.categories_btn}
            </Button>
          </Link>
        </div>

        {/* Filters Console */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start justify-between bg-accent/5 p-6 border border-border/40">
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {menuCategories.map((cat) => (
              <Link key={cat.value} href={cat.value === 'all' ? '/shop/all' : `/shop/${cat.value}`}>
                <Button
                  variant={(activeCategory === cat.value) ? "default" : "outline"}
                  className="rounded-none text-[9px] font-bold uppercase tracking-widest h-9 px-5 transition-all"
                >
                  {cat.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex gap-4 w-full lg:w-auto items-center">
            <div className="relative flex-1 lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input 
                placeholder={t.catalogue.search} 
                className="pl-10 rounded-none h-10 border-border text-xs focus-visible:ring-primary/20 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-none h-10 gap-2 text-[10px] font-bold uppercase tracking-widest px-4 bg-background">
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
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-24 border border-dashed border-primary/20 bg-primary/5 flex flex-col items-center gap-4">
                  <FilterX className="h-10 w-10 text-primary/40" />
                  <div>
                    <h3 className="text-lg font-bold mb-1 uppercase tracking-tighter">{t.catalogue.no_results}</h3>
                    <p className="text-xs text-muted-foreground">Adjust filters or search parameters.</p>
                  </div>
                  <Button 
                    variant="link" 
                    onClick={() => { setSearchQuery(''); }}
                    className="text-primary font-bold uppercase text-[10px] tracking-[0.2em]"
                  >
                    {t.catalogue.reset}
                  </Button>
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </main>
  );
}
