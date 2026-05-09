"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useTranslation } from '@/hooks/use-translation';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const { t, isRTL } = useTranslation();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-cpap');

  return (
    <section className="relative pt-24 pb-16 overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div>
              <Badge variant="outline" className="border-primary/30 text-primary py-1 px-3 rounded-none uppercase tracking-widest text-[10px] mb-6">
                <ShieldCheck className="h-3 w-3 mr-1" />
                {t.hero.badge}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight mb-6">
                {t.hero.title}
              </h1>
              <p className="text-muted-foreground text-lg max-w-lg leading-relaxed border-l-2 border-primary/20 pl-4">
                {t.hero.subtitle}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/shop">
                <Button className="bg-primary text-white px-8 py-6 rounded-none text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all group">
                  {t.hero.cta_primary}
                  {isRTL ? <ArrowLeft className="ml-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-8 py-6 rounded-none text-sm border-2 font-bold uppercase tracking-widest hover:bg-accent transition-colors">
                  {t.hero.cta_secondary}
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-border mt-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">15k+</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.hero.stat_patients}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">500+</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.hero.stat_clinics}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">24/7</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.hero.stat_support}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[550px] border border-border clinical-shadow bg-muted">
              {heroImage && (
                <Image 
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;