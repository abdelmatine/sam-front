
"use client";

import React, { use, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { products, categories } from '@/lib/products';
import ProductCard from '@/components/shared/ProductCard';
import { useTranslation } from '@/hooks/use-translation';
import { ChevronRight, Filter, SortAsc, LayoutGrid, List, Search } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShopSkeleton } from '@/components/shared/ProductSkeleton';

export default function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = use(params);
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const currentCategory = categories.find(c => c.slug === categorySlug);
  const filteredProducts = products.filter(p => 
    (categorySlug === 'all' || p.category === categorySlug) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categoryName = categorySlug === 'all' 
    ? t.catalogue.global_inventory 
    : (t.categories as any)[categorySlug] || currentCategory?.name || categorySlug;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [categorySlug]);

  return (
    <main className="min-h-screen pt-24 pb-20 bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-10 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
          <Link href="/" className="hover:text-primary transition-colors">{t.catalogue.brand}</Link>
          <ChevronRight className="h-2.5 w-2.5" />
          <Link href="/shop" className="hover:text-primary transition-colors">{t.nav.catalogue}</Link>
          <ChevronRight className="h-2.5 w-2.5" />
          <span className="text-primary/80">{categoryName}</span>
        </div>

        {/* Clinical Console */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 pb-8 border-b border-primary/10">
          <div className="w-full lg:w-1/2 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder={t.catalogue.search} 
              className="pl-12 h-14 rounded-none border-primary/10 bg-accent/5 focus-visible:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <Button variant="outline" className="h-14 px-6 rounded-none text-[10px] font-bold uppercase tracking-widest border-primary/10 hover:bg-primary/5 flex-1 lg:flex-none">
              <Filter className="h-3.5 w-3.5 mr-2" />
              {t.common.sort}
            </Button>
            <div className="h-10 w-[1px] bg-primary/10 hidden lg:block" />
            <div className="flex items-center border border-primary/10 bg-accent/5 p-1">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-none bg-primary text-white">
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-none text-muted-foreground hover:text-primary">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {filteredProducts.length} {t.catalogue.no_results !== '0' ? 'Appareils Identifiés' : t.catalogue.no_results}
          </div>
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ShopSkeleton />
            </motion.div>
          ) : filteredProducts.length > 0 ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-primary/20 bg-accent/5"
            >
              <Search className="h-12 w-12 text-muted-foreground/30 mb-6" />
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-2">{t.catalogue.no_results}</h3>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{t.catalogue.reset}</p>
              <Button 
                onClick={() => setSearchTerm('')} 
                variant="link" 
                className="mt-6 text-primary uppercase text-[10px] font-bold tracking-widest"
              >
                Reset Clinical Search
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
