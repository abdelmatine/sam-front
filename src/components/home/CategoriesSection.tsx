
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Activity, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

const CategoriesSection = () => {
  const { t } = useTranslation();
  const [navigatingSlug, setNavigatingSlug] = useState<string | null>(null);

  const respiratoryImage = PlaceHolderImages.find(img => img.id === 'category-respiratory');
  const accessoriesImage = PlaceHolderImages.find(img => img.id === 'category-accessories');
  const monitoringImage = PlaceHolderImages.find(img => img.id === 'category-monitoring');

  const handleLinkClick = (slug: string) => {
    setNavigatingSlug(slug);
  };

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
    <section className="py-32 bg-slate-50/50 dark:bg-slate-950 text-foreground overflow-hidden relative border-y">
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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-12 gap-8 h-auto lg:h-[750px]"
        >
          {/* Main Category: Respiratory Care */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7 h-full"
          >
            <Link href="/shop/cpap" onClick={() => handleLinkClick('cpap')} className="block h-full min-h-[450px]">
              <Card className="h-full rounded-none overflow-hidden group border border-slate-200 dark:border-white/10 clinical-shadow bg-card relative">
                <AnimatePresence>
                  {navigatingSlug === 'cpap' && (
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

                {respiratoryImage && (
                  <Image 
                    src={respiratoryImage.imageUrl}
                    alt="Soin Respiratoire"
                    fill
                    className="object-cover grayscale-[0.4] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
                
                <CardContent className="absolute bottom-12 left-12 right-12 p-0">
                  <Badge className="bg-primary text-white mb-8 rounded-none text-[11px] uppercase font-bold tracking-[0.25em] px-5 py-2.5 border-none shadow-xl shadow-primary/20">
                    Choix Professionnel
                  </Badge>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight text-white">Soin Respiratoire</h3>
                  <p className="text-white/80 text-sm md:text-base mb-10 max-w-lg font-medium italic leading-relaxed">
                    CPAP, BPAP et Concentrateurs d'Oxygène avancés conçus pour la thérapie à domicile et le soutien clinique.
                  </p>
                  <div className="flex items-center gap-3 text-primary font-bold uppercase text-[11px] tracking-[0.4em] group-hover:gap-6 transition-all">
                    Explorer la Sélection <ArrowRight className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Side Categories */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-8">
            <motion.div variants={itemVariants} className="h-full">
              <Link href="/shop/others" onClick={() => handleLinkClick('others')} className="block h-full min-h-[280px]">
                <Card className="h-full rounded-none overflow-hidden group border border-slate-200 dark:border-white/10 clinical-shadow bg-card relative">
                  <AnimatePresence>
                    {navigatingSlug === 'others' && (
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

                  {accessoriesImage && (
                    <Image 
                      src={accessoriesImage.imageUrl}
                      alt="Autres Équipements"
                      fill
                      className="object-cover grayscale-[0.6] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  <CardContent className="absolute bottom-10 left-10 p-0">
                    <Badge className="bg-primary/20 text-white mb-4 rounded-none text-[9px] uppercase font-bold tracking-[0.2em] px-3 py-1 border-none backdrop-blur-md">
                      Technologie Annexe
                    </Badge>
                    <h3 className="text-3xl font-bold mb-3 uppercase tracking-tight text-white">Autres</h3>
                    <p className="text-white/70 text-sm mb-6 font-medium italic">Équipements et Accessoires Divers</p>
                    <div className="flex items-center gap-3 text-primary font-bold uppercase text-[10px] tracking-[0.3em] group-hover:gap-5 transition-all">
                      Voir la Gamme <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="h-full">
              <Link href="/shop/accessories" onClick={() => handleLinkClick('accessories')} className="block h-full min-h-[280px]">
                <Card className="h-full rounded-none overflow-hidden group border border-slate-200 dark:border-white/10 clinical-shadow bg-card relative">
                  <AnimatePresence>
                    {navigatingSlug === 'accessories' && (
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

                  {monitoringImage && (
                    <Image 
                      src={monitoringImage.imageUrl}
                      alt="Accessoires Cliniques"
                      fill
                      className="object-cover grayscale-[0.6] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  <CardContent className="absolute bottom-10 left-10 p-0">
                    <Badge className="bg-primary/20 text-white mb-4 rounded-none text-[9px] uppercase font-bold tracking-[0.2em] px-3 py-1 border-none backdrop-blur-md">
                      Support Médical
                    </Badge>
                    <h3 className="text-3xl font-bold mb-3 uppercase tracking-tight text-white">Accessoires</h3>
                    <p className="text-white/70 text-sm mb-6 font-medium italic">Kits de Calibration et Filtres</p>
                    <div className="flex items-center gap-3 text-primary font-bold uppercase text-[10px] tracking-[0.3em] group-hover:gap-5 transition-all">
                      Voir la Gamme <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
