
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { ShieldCheck, Truck, PhoneCall, ArrowRight } from 'lucide-react';

const Hero = () => {
  const { t, isRTL } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);

  const stats = [
    { icon: ShieldCheck, title: "CERTIFICATION ISO", desc: "Standard de gestion de qualité pour dispositifs médicaux." },
    { icon: Truck, title: "LOGISTIQUE CLINIQUE", desc: "Expédition sécurisée de matériel sensible partout." },
    { icon: PhoneCall, title: "SUPPORT TECHNIQUE", desc: "Assistance experte 24/7 pour le calibrage." }
  ];

  // Tripled for infinite seamless scrolling
  const tickerItems = [...stats, ...stats, ...stats];

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
    hidden: { opacity: 0, x: -15 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <>
      {/* Full Screen Hero Section */}
      <section className="relative w-full h-screen min-h-[700px] overflow-hidden hero-gradient flex flex-col pt-16">
        {/* Background Image - Covers entire section */}
        <motion.div 
          initial={{ x: "-3%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/hero.jpg"
            alt="Respiratory Medical Device"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </motion.div>

        {/* Main Content Area - Vertically Centered */}
        <div className="relative flex-1 flex items-center z-10">
          <div className="container mx-auto px-4">
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
              
              <motion.h1 
                variants={itemVariants} 
                className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6 tracking-tighter uppercase drop-shadow-sm"
              >
                {t.hero.title}
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-foreground/90 text-sm md:text-base mb-10 max-w-md leading-relaxed font-bold italic drop-shadow-sm">
                {t.hero.subtitle}
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button className="bg-primary text-white px-10 py-7 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 w-full sm:w-auto">
                      {t.hero.cta_primary}
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="px-10 py-7 rounded-none text-[10px] font-bold uppercase tracking-widest border-2 hover:bg-accent transition-colors flex items-center gap-2 w-full sm:w-auto">
                      {t.hero.cta_secondary}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Medical Ticker - Appear After Scroll */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 border-y bg-background py-8 overflow-hidden cursor-default"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
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
                duration: 40,
                ease: "linear",
              },
            }}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {tickerItems.map((stat, i) => (
              <div key={i} className="flex items-center" onClick={() => setIsPaused(!isPaused)}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start gap-4 px-12 md:px-24 min-w-[300px] md:min-w-[400px] cursor-pointer group"
                >
                  <div className="shrink-0 p-2 bg-primary/10 rounded-none border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col whitespace-normal">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-1 group-hover:text-primary transition-colors">
                      {stat.title}
                    </h4>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic max-w-[250px] group-hover:text-foreground transition-colors">
                      {stat.desc}
                    </p>
                  </div>
                </motion.div>
                <div className="h-8 w-[1px] bg-primary/20 shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Hero;
