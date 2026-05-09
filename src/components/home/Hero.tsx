"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useTranslation } from '@/hooks/use-translation';
import { ShieldCheck, ArrowRight, Activity, Heart } from 'lucide-react';

const Hero = () => {
  const { t, isRTL } = useTranslation();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-cpap');

  return (
    <section className="relative pt-40 pb-24 overflow-hidden hero-gradient">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div>
              <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary py-1.5 px-4 rounded-full flex items-center gap-2 w-fit mb-6">
                <ShieldCheck className="h-4 w-4" />
                {t.hero.badge}
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold leading-[1.1] mb-6">
                {t.hero.title.split(' ').map((word, i) => 
                  word.toLowerCase() === 'respiratory' || word.toLowerCase() === 'respiratoires' || word.toLowerCase() === 'التنفسي' ? 
                  <span key={i} className="text-primary">{word} </span> : word + ' '
                )}
              </h1>
              <p className="text-muted-foreground text-xl max-w-lg leading-relaxed font-medium">
                {t.hero.subtitle}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/shop">
                <Button className="bg-primary text-white px-10 py-7 rounded-2xl text-lg font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 group">
                  {t.hero.cta_primary}
                  <ArrowRight className={cn("ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform", isRTL && "rotate-180 group-hover:-translate-x-1")} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-10 py-7 rounded-2xl text-lg border-2 font-bold hover:bg-accent transition-colors">
                  {t.hero.cta_secondary}
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-12 pt-10 border-t border-border/50">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">15k+</span>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t.hero.stat_patients}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">500+</span>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t.hero.stat_clinics}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">24/7</span>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t.hero.stat_support}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[450px] md:h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl medical-shadow border-4 border-white dark:border-white/10">
              {heroImage && (
                <Image 
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
            
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass-morphism p-5 rounded-3xl flex items-center gap-4 shadow-xl border-primary/10"
            >
              <div className="bg-primary/10 p-3 rounded-2xl">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">SpO2 Level</p>
                <p className="text-2xl font-bold text-primary">98%</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -left-8 glass-morphism p-5 rounded-3xl flex items-center gap-4 shadow-xl border-primary/10"
            >
              <div className="bg-destructive/10 p-3 rounded-2xl">
                <Heart className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">BPM</p>
                <p className="text-2xl font-bold text-destructive">72</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/30 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

export default Hero;

import { cn } from '@/lib/utils';