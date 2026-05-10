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

  const tickerItems = [...stats, ...stats, ...stats];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative w-full overflow-hidden hero-gradient pt-12 md:pt-14">
      <div className="relative h-[600px] md:h-[650px] flex items-center">
        {/* Background Image Animation - Now sliding from Left and Slower */}
        <motion.div 
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
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
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 border border-primary/20 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary">{t.hero.badge}</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6 tracking-tighter">
              {t.hero.title}
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-muted-foreground text-base md:text-lg mb-10 max-w-lg leading-relaxed font-medium">
              {t.hero.subtitle}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
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
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className="border-y bg-background/50 backdrop-blur-sm py-12 overflow-hidden relative"
      >
        <div className="flex items-center">
          <motion.div 
            className="flex items-center whitespace-nowrap"
            animate={{
              x: isRTL ? ["0%", "33.33%"] : ["0%", "-33.33%"]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {tickerItems.map((stat, i) => (
              <div key={i} className="flex items-center">
                <div className="flex items-start gap-6 px-12 md:px-24 min-w-[350px] md:min-w-[450px]">
                  <div className="shrink-0 p-3 bg-primary/5 rounded-none border border-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col whitespace-normal">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-1">{stat.title}</h4>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic max-w-[280px]">
                      {stat.desc}
                    </p>
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-primary/20 shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
