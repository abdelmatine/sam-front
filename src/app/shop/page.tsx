
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import { categories } from '@/lib/products';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, ChevronRight, Hash, Database } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';

export default function CatalogueRootPage() {
  const { t } = useTranslation();

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Clinical Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-10 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
          <Link href="/" className="hover:text-primary transition-colors">{t.catalogue.brand}</Link>
          <ChevronRight className="h-2.5 w-2.5" />
          <span className="text-primary/80">{t.nav.catalogue}</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="border-l-4 border-primary pl-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center p-1.5 bg-primary/10 rounded-sm">
                <Database className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/70">{t.catalogue.tech_id}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tighter leading-none mb-4">
              {t.catalogue.title}
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl font-medium italic leading-relaxed">
              {t.catalogue.subtitle}
            </p>
          </motion.div>

          <div className="hidden lg:flex items-center gap-6 p-4 border bg-accent/10 backdrop-blur-sm">
            <div className="text-right">
              <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{t.catalogue.index_total}</div>
              <div className="text-2xl font-bold tracking-tighter">0{categories.length} <span className="text-sm font-medium text-primary">{t.catalogue.sectors}</span></div>
            </div>
            <div className="h-10 w-[1px] bg-border" />
            <Activity className="h-6 w-6 text-primary animate-pulse" />
          </div>
        </div>

        {/* Technical Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => {
            const localizedName = (t.categories as any)[category.slug] || category.name;
            const localizedDesc = (t.categories as any)[`${category.slug}_desc`] || category.description;

            return (
              <motion.div 
                key={category.id} 
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Link href={`/shop/${category.slug}`}>
                  <Card className="rounded-none overflow-hidden group border border-border/40 hover:border-primary/40 clinical-shadow bg-card/60 backdrop-blur-sm h-full cursor-pointer relative">
                    <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-none transform translate-y-[-5px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <Hash className="h-2.5 w-2.5 text-primary" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">IDX-0{index + 1}</span>
                    </div>

                    <div className="relative h-64 overflow-hidden border-b">
                      <Image 
                        src={category.imageUrl} 
                        alt={localizedName} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />
                    </div>
                    
                    <CardContent className="p-10 relative">
                      <div className="absolute top-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-700" />
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="h-[2px] w-12 bg-primary/30 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
                        <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest">{t.catalogue.clinical_sector}</span>
                      </div>

                      <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                        {localizedName}
                      </h3>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed italic mb-10 h-12 line-clamp-3 font-medium">
                        {localizedDesc}
                      </p>

                      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/80 group-hover:text-primary group-hover:gap-6 transition-all duration-500">
                        {t.catalogue.explore_range} <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
          
          {/* Global Inventory Tile */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link href="/shop/all">
              <Card className="rounded-none overflow-hidden group border-2 border-dashed border-primary/20 bg-primary/5 h-full flex items-center justify-center min-h-[450px] cursor-pointer relative">
                <CardContent className="text-center p-10">
                  <div className="p-7 bg-primary/10 rounded-full inline-block mb-8 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_30px_rgba(0,121,107,0.3)] transition-all duration-500">
                    <Activity className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2">{t.catalogue.global_inventory}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.4em] mb-10">{t.catalogue.all_devices_desc}</p>
                  <div className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-background px-8 py-4 border border-primary/20 clinical-shadow group-hover:border-primary transition-all">
                    {t.catalogue.access_grid} <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </motion.div>

        {/* Technical Footer Label */}
        <div className="mt-24 pt-12 border-t flex items-center justify-center gap-10 grayscale opacity-30">
          <div className="text-[9px] font-bold uppercase tracking-[0.5em]">{t.catalogue.standards.iso}</div>
          <div className="h-4 w-[1px] bg-border" />
          <div className="text-[9px] font-bold uppercase tracking-[0.5em]">{t.catalogue.standards.ce}</div>
          <div className="h-4 w-[1px] bg-border" />
          <div className="text-[9px] font-bold uppercase tracking-[0.5em]">{t.catalogue.standards.fda}</div>
        </div>
      </div>
    </main>
  );
}
