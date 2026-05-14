
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import { Award, Users, Heart, ShieldCheck, Database, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const { t, isRTL } = useTranslation();

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
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const valueIcons = [Award, Users, Heart, ShieldCheck];

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Background Clinical Grid Accent */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Hero Header */}
        <section className="pt-40 pb-24 hero-gradient">
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-8">
              <Database className="h-4 w-4 text-primary/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">{t.about.hero.badge}</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-headline font-bold mb-8 uppercase tracking-tighter leading-[0.9]">
              {t.about.hero.title.split('{breath}')[0]}
              <span className="text-primary">{isRTL ? "نفس" : (t.about.hero.title.includes('{breath}') ? "Breath" : "Souffle")}</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium italic">
              {t.about.hero.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div variants={itemVariants} className="relative h-[500px] md:h-[700px] rounded-none overflow-hidden clinical-shadow border border-primary/10 group">
                <Image 
                  src="https://picsum.photos/seed/about-clinical/800/1000" 
                  alt="Clinical Research Facility" 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  data-ai-hint="medical laboratory"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-40 group-hover:opacity-0 transition-opacity duration-1000" />
              </motion.div>
              
              <div className="space-y-16">
                <div className={cn("space-y-8 border-primary", isRTL ? "border-r-4 pr-10" : "border-l-4 pl-10")}>
                  <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tighter leading-none">
                    {t.about.story.title.split('{health}')[0]}
                    <span className="text-primary">{isRTL ? "الصحة" : (t.about.story.title.includes('{health}') ? "Health" : "Santé")}</span>
                  </motion.h2>
                  
                  <motion.p variants={itemVariants} className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium italic">
                    {t.about.story.p1}
                  </motion.p>
                  
                  <motion.p variants={itemVariants} className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium italic">
                    {t.about.story.p2}
                  </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {Object.entries(t.about.values).map(([key, value], i) => {
                    const Icon = valueIcons[i];
                    return (
                      <motion.div 
                        key={key} 
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <Card className="rounded-none bg-accent/5 border-primary/10 clinical-shadow group hover:bg-primary/[0.03] transition-all h-full">
                          <CardContent className="p-8 flex flex-col gap-6">
                            <div className="shrink-0 w-fit">
                              <div className="p-4 bg-primary/10 rounded-none text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-primary/10">
                                <Icon className="h-6 w-6" />
                              </div>
                            </div>
                            <div>
                              <h4 className="font-bold mb-2 uppercase text-[10px] tracking-[0.3em] text-primary/80">{value.title}</h4>
                              <p className="text-[11px] text-muted-foreground font-medium italic leading-relaxed">{value.desc}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <motion.section 
          variants={itemVariants} 
          className="py-24 bg-primary text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
              {Object.entries(t.about.stats).map(([key, stat], i) => (
                <div key={key} className="space-y-4">
                  <div className="text-5xl md:text-6xl font-bold tracking-tighter mb-2">{stat.val}</div>
                  <div className="text-primary-foreground/60 text-[10px] font-bold uppercase tracking-[0.5em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Compliance Footer */}
        <motion.div 
          variants={itemVariants}
          className="py-20 flex flex-wrap items-center justify-center gap-12 grayscale opacity-30 border-t border-primary/5"
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.6em]">{t.catalogue.standards.iso}</div>
          <div className="h-4 w-[1px] bg-primary/20" />
          <div className="text-[10px] font-bold uppercase tracking-[0.6em]">{t.catalogue.standards.ce}</div>
          <div className="h-4 w-[1px] bg-primary/20" />
          <div className="text-[10px] font-bold uppercase tracking-[0.6em]">{t.catalogue.standards.fda}</div>
        </motion.div>
      </motion.div>
    </main>
  );
}
