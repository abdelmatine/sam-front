"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useTranslation } from '@/hooks/use-translation';
import { ShieldCheck, Truck, PhoneCall, ArrowRight } from 'lucide-react';

const Hero = () => {
  const { t, isRTL } = useTranslation();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-cpap');

  const stats = [
    { icon: ShieldCheck, title: "CERTIFICATION ISO", desc: "Standard de gestion de qualité pour dispositifs médicaux." },
    { icon: Truck, title: "LOGISTIQUE CLINIQUE", desc: "Expédition sécurisée de matériel sensible partout." },
    { icon: PhoneCall, title: "SUPPORT TECHNIQUE", desc: "Assistance experte 24/7 pour le calibrage." }
  ];

  return (
    <section className="relative w-full overflow-hidden hero-gradient pt-16 md:pt-20">
      <div className="relative h-[600px] md:h-[650px] flex items-center">
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl}
              alt="Medical Device"
              fill
              className="object-cover opacity-10 dark:opacity-20 grayscale"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 border border-primary/20 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary">{t.hero.badge}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6 tracking-tighter">
              {t.hero.title}
            </h1>
            
            <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-lg leading-relaxed font-medium">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button className="bg-primary text-white px-10 py-7 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                  {t.hero.cta_primary}
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="outline" className="px-10 py-7 rounded-none text-xs font-bold uppercase tracking-widest border-2 hover:bg-accent transition-colors flex items-center gap-2">
                  {t.hero.cta_secondary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border-y bg-background/50 backdrop-blur-sm py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="shrink-0 p-3 bg-primary/5 rounded-none border border-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-1">{stat.title}</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;