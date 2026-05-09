"use client";

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/shared/ProductCard';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
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
        <div className="mb-12 border-l-4 border-primary pl-6">
          <h1 className="text-3xl font-headline font-bold mb-2 uppercase tracking-tight">{t.shop.title}</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            {t.shop.subtitle}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start justify-between">
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={activeCategory === cat.value ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.value)}
                className="rounded-none text-[10px] font-bold uppercase tracking-widest h-9 px-4"
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
                className="pl-10 rounded-none h-10 border-border text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-none h-10 gap-2 text-[10px] font-bold uppercase tracking-widest">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  {t.common.sort}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-none border-primary/20">
                <DropdownMenuItem onClick={() => setSortBy('featured')} className="text-xs rounded-none">Featured</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-low')} className="text-xs rounded-none">Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-high')} className="text-xs rounded-none">Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('rating')} className="text-xs rounded-none">Top Rated</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-border">
            <h3 className="text-lg font-bold mb-2 uppercase">{t.shop.no_results}</h3>
            <Button 
              variant="link" 
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="text-primary font-bold uppercase text-[10px]"
            >
              {t.shop.reset}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}