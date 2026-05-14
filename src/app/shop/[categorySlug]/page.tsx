
"use client";

import React, { use, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { products, categories } from '@/lib/products';
import ProductCard from '@/components/shared/ProductCard';
import { useTranslation } from '@/hooks/use-translation';
import { ChevronRight, Filter, LayoutGrid, List, Search, Activity, Database, Hash } from 'lucide-react';
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

  // Localized loading effect for category transitions
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [categorySlug]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Background Clinical Grid Accent */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
      </div>

      <motion.div 
        key={categorySlug}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 relative z-10"
      >
        {/* Breadcrumbs */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-10 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
          <Link href="/" className="hover:text-primary transition-colors">{t.catalogue.brand}</Link>
          <ChevronRight className="h-2.5 w-2.5" />
          <Link href="/shop" className="hover:text-primary transition-colors">{t.nav.catalogue}</Link>
          <ChevronRight className="h-2.5 w-2.5" />
          <span className="text-primary/80">{categoryName}</span>
        </motion.div>

        {/* Technical Module Header */}
        <div className="mb-16 border-l-4 border-primary pl-8">
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
            <div className="p-1.5 bg-primary/10 rounded-sm">
              <Database className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/70">Module: {categorySlug.toUpperCase()}</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tighter leading-none mb-4"
          >
            {categoryName}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground text-sm max-w-xl font-medium italic leading-relaxed"
          >
            {currentCategory?.description || t.catalogue.subtitle}
          </motion.p>
        </div>

        {/* Clinical Console Interface */}
        <motion.div variants={itemVariants} className="bg-accent/5 backdrop-blur-md border border-primary/10 p-1 mb-12 shadow-2xl shadow-black/5">
          <div className="flex flex-col lg:flex-row items-stretch gap-1">
            <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder={t.catalogue.search} 
                className="pl-14 h-16 rounded-none border-none bg-background focus-visible:ring-0 text-[11px] font-bold uppercase tracking-widest placeholder:text-muted-foreground/40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-stretch gap-1 p-1 bg-primary/5">
              <Button variant="ghost" className="h-14 px-8 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                <Filter className="h-3.5 w-3.5 mr-3" />
                {t.common.sort}
              </Button>
              <div className="w-[1px] bg-primary/10" />
              <div className="flex items-center bg-background px-2">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-none bg-primary text-white shadow-lg">
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-none text-muted-foreground hover:text-primary">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Metadata */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-4">
            <Activity className="h-4 w-4 text-primary/40 animate-pulse" />
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              {filteredProducts.length} {t.catalogue.no_results !== '0' ? 'Appareils Identifiés' : t.catalogue.no_results}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.4em] opacity-30">
            <Hash className="h-3 w-3" />
            Clinical-IDX: {filteredProducts.length > 0 ? filteredProducts[0].id : 'N/A'}
          </div>
        </motion.div>

        {/* Product Grid Entry Point with Localized Transitions */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ShopSkeleton />
            </motion.div>
          ) : filteredProducts.length > 0 ? (
            <motion.div 
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-40 text-center border-2 border-dashed border-primary/10 bg-accent/3 relative overflow-hidden"
            >
              <div className="absolute top-4 left-4 opacity-10 text-[10px] font-bold uppercase tracking-[0.5em]">Diagnostic ID: NO-RESULTS-SAM</div>
              <Search className="h-16 w-16 text-primary/20 mb-8" />
              <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4 text-foreground/80">{t.catalogue.no_results}</h3>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.4em] mb-12 max-w-xs">{t.catalogue.reset}</p>
              <Button 
                onClick={() => setSearchTerm('')} 
                className="bg-primary text-white px-12 py-7 rounded-none text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:scale-105 transition-transform"
              >
                Reset Clinical Search
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
