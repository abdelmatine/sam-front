
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Activity, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  badgeText: string;
  className?: string;
  isLarge?: boolean;
}

const CategoryCard = ({ slug, title, description, imageUrl, badgeText, className, isLarge = false }: CategoryCardProps) => {
  const { t, isRTL } = useTranslation();
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <Link 
      href={`/shop/${slug}`} 
      onClick={() => setIsNavigating(true)} 
      className={cn("block h-full min-h-[350px] lg:min-h-0", className)}
    >
      <Card className="h-full rounded-none overflow-hidden group border border-slate-200 dark:border-white/10 clinical-shadow bg-card relative">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-700 z-30" />
        
        {/* Badge: Top Right (Top Left for RTL) */}
        <div className={cn(
          "absolute top-8 z-30",
          isRTL ? "left-8" : "right-8"
        )}>
          <Badge className="bg-primary text-white rounded-none text-[10px] uppercase font-bold tracking-[0.2em] px-4 py-2 border-none shadow-xl shadow-primary/20">
            {badgeText}
          </Badge>
        </div>

        {/* Navigation Overlay */}
        <AnimatePresence>
          {isNavigating && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3"
            >
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary">{t.common.loading}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Visual */}
        <Image 
          src={imageUrl}
          alt={title}
          fill
          className={cn(
            "object-cover transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0",
            isLarge ? "grayscale-[0.4]" : "grayscale-[0.6]"
          )}
        />
        
        {/* Atmospheric Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
        
        {/* Technical Data Content */}
        <CardContent className={cn(
          "absolute left-8 right-8 p-0 z-20", 
          isLarge ? "bottom-12 md:left-12 md:right-12" : "bottom-8"
        )}>
          <div className="flex items-center mb-6">
            {/* Animated Middle Line (The Sam-Medicale Signature) */}
            <div className="h-[2px] w-12 bg-primary group-hover:w-24 group-hover:bg-primary transition-all duration-700" />
          </div>
          
          <h3 className={cn(
            "font-bold uppercase tracking-tight text-white group-hover:text-primary transition-colors duration-300",
            isLarge ? "text-4xl md:text-5xl mb-6" : "text-2xl md:text-3xl mb-3"
          )}>
            {title}
          </h3>
          
          <p className={cn(
            "text-white/80 font-medium italic leading-relaxed",
            isLarge ? "text-sm md:text-base mb-10 max-w-lg" : "text-xs mb-6 line-clamp-2"
          )}>
            {description}
          </p>
          
          <div className="flex items-center gap-4 text-primary">
            <div className="h-[1px] w-8 bg-primary/40 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
            <ArrowRight className={cn(
              "transition-transform duration-500", 
              isLarge ? "h-6 w-6 group-hover:translate-x-4" : "h-5 w-5 group-hover:translate-x-3"
            )} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const CategoriesSection = () => {
  const { t } = useTranslation();

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
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-32 bg-slate-50/50 dark:bg-slate-950 text-foreground overflow-hidden relative">
      {/* Background Clinical Grid */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="border-l-4 border-primary pl-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary">Classification Technique</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tighter text-slate-900 dark:text-white">
              Catégories <span className="text-primary">Spécialisées</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl font-medium italic leading-relaxed">
              Équipements de précision pour chaque besoin respiratoire. Notre catalogue est organisé par application clinique pour garantir une identification rapide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <Link href="/shop">
              <Button variant="ghost" className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary/5 rounded-none px-8 py-6 h-auto transition-all duration-300">
                {t.categories.view_all} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Clinical Module Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-12 gap-8 h-auto lg:h-[750px]"
        >
          {/* Main Module: Respiratory Care */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <CategoryCard 
              slug="cpap"
              title="Soin Respiratoire"
              description="CPAP, BPAP et Concentrateurs d'Oxygène avancés conçus pour la thérapie à domicile et le soutien clinique."
              imageUrl="https://picsum.photos/seed/cat1/800/600"
              badgeText="Choix Professionnel"
              isLarge
            />
          </motion.div>

          {/* Auxiliary Modules Grid */}
          <div className="lg:col-span-5 grid grid-rows-1 lg:grid-rows-2 gap-8">
            <motion.div variants={itemVariants}>
              <CategoryCard 
                slug="others"
                title="Autres"
                description="Équipements et Accessoires Divers pour le soutien quotidien."
                imageUrl="https://picsum.photos/seed/cat4/400/300"
                badgeText="Technologie Annexe"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <CategoryCard 
                slug="accessories"
                title="Accessoires"
                description="Kits de Calibration, Filtres et tubulures de grade chirurgical."
                imageUrl="https://picsum.photos/seed/cat2/400/300"
                badgeText="Support Médical"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
