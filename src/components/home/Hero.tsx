"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();

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
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden hero-gradient flex flex-col pt-16">
      {/* Background Image with Lateral Entrance */}
      <motion.div 
        initial={{ x: "5%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src="https://picsum.photos/seed/hero-cpap/1920/1080"
          alt="Respiratory Medical Device"
          fill
          className="object-cover grayscale-[0.2]"
          priority
          data-ai-hint="medical device"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
      </motion.div>

      {/* Main Content Area */}
      <div className="relative flex-1 flex items-center z-10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 border border-primary/20 mb-8">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">{t.hero.badge}</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-6xl font-bold text-foreground leading-[1.1] mb-8 tracking-tighter uppercase"
            >
              SAM <span className="text-primary">Médicale</span><br />
              <span className="text-2xl md:text-4xl opacity-90">{t.hero.title}</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-foreground/80 text-base md:text-lg mb-12 max-w-lg leading-relaxed font-medium italic">
              {t.hero.subtitle}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
              <Link href="/shop" className="w-full sm:w-auto">
                <Button className="bg-primary text-white px-12 py-8 rounded-none text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 w-full">
                  {t.hero.cta_primary}
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline" className="px-12 py-8 rounded-none text-[11px] font-bold uppercase tracking-[0.25em] border-2 hover:bg-accent transition-colors flex items-center justify-center gap-3 w-full">
                  {t.hero.cta_secondary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
