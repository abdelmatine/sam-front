"use client";

import React, { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import { Award, Users, Heart, ShieldCheck, Activity, BadgeCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, animate, useInView, Variants } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const StatCounter = ({ value }: { value: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''));
      const suffix = value.replace(/[0-9.]/g, '');
      
      const controls = animate(0, numericPart, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(latest) {
          setDisplayValue(Math.floor(latest).toLocaleString() + suffix);
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.25,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function AboutPage() {
  const { t, isRTL } = useTranslation();
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-clinical');
  const valueIcons = [Award, Users, Heart, ShieldCheck];

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <Navbar />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      </div>
      
      <div className="relative z-10 flex-1">
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="pt-40 pb-24 hero-gradient"
        >
          <div className="container px-4 text-center">
            <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-headline font-bold mb-6 uppercase tracking-tighter leading-[0.9]">
              {t.about.hero.title}
              <span className="text-primary">{t.about.hero.highlight}</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium italic">
              {t.about.hero.subtitle}
            </motion.p>
          </div>
        </motion.section>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-24"
        >
          <div className="container px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div variants={itemVariants} className="relative h-[400px] md:h-[600px] rounded-none overflow-hidden clinical-shadow border border-primary/10 group">
                <Image 
                  src={aboutImage?.imageUrl || "https://picsum.photos/seed/about-clinical/800/1000"} 
                  alt={aboutImage?.description || "Clinical Research Facility"} 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  data-ai-hint={aboutImage?.imageHint || "medical laboratory"}
                />
                <div className="absolute inset-0 bg-primary/10 opacity-40 group-hover:opacity-0 transition-opacity duration-1000" />
              </motion.div>
              
              <div className="space-y-12">
                <motion.div 
                  variants={itemVariants}
                  className={cn("space-y-6 border-primary", isRTL ? "border-r-4 pr-10" : "border-l-4 pl-10")}
                >
                  <h2 className="text-3xl md:text-4xl font-headline font-bold uppercase tracking-tighter leading-none">
                    {t.about.story.title}
                    <span className="text-primary">{t.about.story.highlight}</span>
                  </h2>
                  
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed font-medium italic">
                    {t.about.story.p1}
                  </p>
                  
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed font-medium italic">
                    {t.about.story.p2}
                  </p>
                </motion.div>

                <motion.div 
                  variants={{
                    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.4 } }
                  }}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  {Object.entries(t.about.values).map(([key, value], i) => {
                    const Icon = valueIcons[i] || ShieldCheck;
                    return (
                      <motion.div 
                        key={key} 
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <Card className="rounded-none bg-accent/5 border-primary/10 clinical-shadow group hover:bg-primary/[0.03] transition-all h-full">
                          <CardContent className="p-6 flex flex-col gap-4">
                            <div className="shrink-0 w-fit">
                              <div className="p-3 bg-primary/10 rounded-none text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 border border-primary/10">
                                <Icon className="h-5 w-5" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-bold uppercase text-[9px] tracking-[0.3em] text-primary/80">{value.title}</h4>
                              <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">{value.desc}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants} 
          className="py-20 bg-primary text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="container px-4 relative z-10">
            <motion.div 
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center"
            >
              {Object.entries(t.about.stats).map(([key, stat]) => (
                <motion.div key={key} variants={itemVariants} className="space-y-3">
                  <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-1">
                    <StatCounter value={stat.val} />
                  </div>
                  <div className="text-primary-foreground/60 text-[9px] font-bold uppercase tracking-[0.5em]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="py-24 border-t border-primary/5 bg-background relative overflow-hidden"
        >
          <div className="container px-4">
            <div className="flex flex-col items-center text-center">
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12 opacity-40">
                <div className="h-[1px] w-10 bg-primary" />
                <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-primary">
                  {t.about.registry.badge}
                </span>
                <div className="h-[1px] w-10 bg-primary" />
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
                {[
                  { icon: ShieldCheck, label: t.catalogue.standards.iso, detail: t.about.registry.iso_detail },
                  { icon: Award, label: t.catalogue.standards.ce, detail: t.about.registry.ce_detail },
                  { icon: BadgeCheck, label: t.catalogue.standards.fda, detail: t.about.registry.fda_detail }
                ].map((std, i) => {
                  const Icon = std.icon;
                  return (
                    <motion.div 
                      key={i} 
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      className="flex flex-col items-center gap-4 group"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative p-5 bg-primary/5 border border-primary/10 rounded-full text-primary/40 group-hover:text-primary group-hover:border-primary/30 transition-all duration-700">
                          <Icon className="h-7 w-7" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground group-hover:text-primary transition-colors duration-500">{std.label}</h4>
                        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{std.detail}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}