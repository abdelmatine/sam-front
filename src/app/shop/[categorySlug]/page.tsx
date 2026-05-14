
"use client";

import React, { use, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { products, categories } from '@/lib/products';
import ProductCard from '@/components/shared/ProductCard';
import { useTranslation } from '@/hooks/use-translation';
import { ChevronRight, Filter, LayoutGrid, List, Search, Activity, Database, Hash, Loader2, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ShopSkeleton } from '@/components/shared/ProductSkeleton';
import ClinicalDropdown from '@/components/shared/ClinicalDropdown';
import { cn } from '@/lib/utils';

export default function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = use(params);
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const currentCategory = categories.find(c => c.slug === categorySlug);
  const filteredProducts = products.filter(p => 
    (categorySlug === 'all' || p.category === categorySlug) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const categoryName = categorySlug === 'all' 
    ? t.catalogue.global_inventory 
    : (t.categories as any)[categorySlug] || currentCategory?.name || categorySlug;

  const categoryDescription = categorySlug === 'all'
    ? t.catalogue.all_devices_desc
    : (t.categories as any)[`${categorySlug}_desc`] || currentCategory?.description || t.catalogue.subtitle;

  useEffect(() => {
    setIsLoading(true);
    setVisibleCount(8);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [categorySlug]);

  const handleLoadMore = () => {
    setIsFetchingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 4);
      setIsFetchingMore(false);
    }, 800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const categoryItems = [
    { label: t.categories.view_all, href: '/shop' },
    { label: t.categories.cpap, href: '/shop/cpap' },
    { label: t.categories.bpap, href: '/shop/bpap' },
    { label: t.categories.oxygen, href: '/shop/oxygen' },
    { label: t.categories.masks, href: '/shop/masks' },
    { label: t.categories.accessories, href: '/shop/accessories' },
    { label: t.categories.monitoring, href: '/shop/monitoring' },
    { label: t.categories.consumables, href: '/shop/consumables' },
    { label: t.categories.others, href: '/shop/others' },
  ];

  return (
    <main className="min-h-screen pt-24 pb-20 bg-background relative overflow-hidden">
      <Navbar />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-10 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60"
        >
          <Link href="/" className="hover:text-primary transition-colors">{t.catalogue.brand}</Link>
          <ChevronRight className="h-2.5 w-2.5" />
          <ClinicalDropdown 
            isHoverable={true}
            variant="compact"
            trigger={
              <div className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
                {t.nav.catalogue}
                <ChevronDown className="h-2.5 w-2.5" />
              </div>
            }
            items={categoryItems}
          />
          <ChevronRight className="h-2.5 w-2.5" />
          <span className="text-primary/80">{categoryName}</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              <div className="mb-16 border-l-4 border-primary/20 pl-8 space-y-4">
                <Skeleton className="h-4 w-32 rounded-none bg-primary/5" />
                <Skeleton className="h-12 w-64 rounded-none bg-primary/5" />
                <Skeleton className="h-4 w-96 rounded-none bg-primary/5" />
              </div>
              <Skeleton className="h-16 w-full rounded-none bg-primary/5 mb-12" />
              <ShopSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key={categorySlug}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-12"
            >
              <div className="mb-16 border-l-4 border-primary pl-8">
                <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
                  <div className="p-1.5 bg-primary/10 rounded-sm">
                    <Database className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/70">{t.catalogue.tech_id}: {categorySlug.toUpperCase()}</span>
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
                  {categoryDescription}
                </motion.p>
              </div>

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
                      {t.catalogue.sort}
                    </Button>
                    <div className="w-[1px] bg-primary/10" />
                    <div className="flex items-center bg-background px-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setViewMode('grid')}
                        className={cn(
                          "h-12 w-12 rounded-none transition-all",
                          viewMode === 'grid' ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-primary"
                        )}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setViewMode('list')}
                        className={cn(
                          "h-12 w-12 rounded-none transition-all",
                          viewMode === 'list' ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-primary"
                        )}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center justify-between mb-8 px-2">
                <div className="flex items-center gap-4">
                  <Activity className="h-4 w-4 text-primary/40 animate-pulse" />
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    {filteredProducts.length} {t.catalogue.identified_devices}
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.4em] opacity-30">
                  <Hash className="h-3 w-3" />
                  IDX-REF: {displayedProducts.length > 0 ? displayedProducts[0].id : 'N/A'}
                </div>
              </motion.div>

              {filteredProducts.length > 0 ? (
                <div className="space-y-12">
                  <motion.div 
                    layout
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={cn(
                      "grid gap-8",
                      viewMode === 'grid' ? "sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
                    )}
                  >
                    <AnimatePresence mode="popLayout">
                      {displayedProducts.map((product) => (
                        <motion.div 
                          key={product.id} 
                          layout
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit={{ opacity: 0, scale: 0.95 }}
                        >
                          <ProductCard product={product} layout={viewMode} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {hasMore && (
                    <motion.div 
                      variants={itemVariants}
                      className="flex justify-center pt-8"
                    >
                      <Button 
                        onClick={handleLoadMore}
                        disabled={isFetchingMore}
                        className="bg-primary text-white px-12 py-8 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-3 min-w-[300px]"
                      >
                        {isFetchingMore ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            {t.catalogue.load_more}
                            <ChevronRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <motion.div 
                  variants={itemVariants}
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
                    {t.catalogue.reset_search}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
