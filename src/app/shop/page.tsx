
"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import { categories } from '@/lib/products';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { useRouter } from 'next/navigation';

export default function ShopRootPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [navigatingSlug, setNavigatingSlug] = useState<string | null>(null);

  const handleCategoryClick = (slug: string) => {
    setNavigatingSlug(slug);
    router.push(`/shop/${slug}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16 border-l-4 border-primary pl-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Classification Technique</span>
          </div>
          <h1 className="text-4xl font-headline font-bold uppercase tracking-tight">{t.shop.title}</h1>
          <p className="text-muted-foreground text-sm max-w-2xl font-medium italic mt-2">
            Sélectionnez une catégorie spécialisée pour parcourir les solutions cliniques de précision.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Card 
                onClick={() => handleCategoryClick(category.slug)}
                className="rounded-none overflow-hidden group border-none clinical-shadow bg-card h-full cursor-pointer relative"
              >
                {navigatingSlug === category.slug && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-20 flex items-center justify-center">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  </div>
                )}
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={category.imageUrl} 
                    alt={category.name} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed italic mb-6">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary group-hover:gap-4 transition-all">
                    Explorer la Sélection <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          <motion.div variants={itemVariants}>
            <Card 
              onClick={() => handleCategoryClick('all')}
              className="rounded-none overflow-hidden group border-2 border-dashed border-primary/20 bg-primary/5 h-full flex items-center justify-center min-h-[400px] cursor-pointer relative"
            >
              {navigatingSlug === 'all' && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-20 flex items-center justify-center">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                </div>
              )}
              <CardContent className="text-center p-8">
                <div className="p-5 bg-primary/10 rounded-full inline-block mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Activity className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Catalogue Complet</h3>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-8">Tous les dispositifs cliniques</p>
                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-white px-6 py-3 border border-primary/10 shadow-lg">
                  Accéder à la Grille <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
