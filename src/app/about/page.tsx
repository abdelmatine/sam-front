
"use client";

import React, { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import { Award, Users, Heart, ShieldCheck, Database, Activity, BadgeCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, animate, useInView } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

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

export default function AboutPage() {
  const { t, isRTL } = useTranslation();

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
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
      
      <div className="relative z-10">
        {/* Hero Header */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="pt-40 pb-24 hero-gradient"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-8">
              <Database className="h-4 w-4 text-primary/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">{t.about.hero.badge}</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-headline font-bold mb-8 uppercase tracking-tighter leading-[0.9]">
              {t.about.hero.title}
              <span className="text-primary">{isRTL ? "نفس" : "Breath"}</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium italic">
              {t.about.hero.subtitle}
            </motion.p>
          </div>
        </motion.section>

        {/* Story Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="py-24"
        >
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
                <motion.div 
                  id="clinical-story-content"
                  variants={itemVariants}
                  transition={{ delay: 0.4 }}
                  className={cn("space-y-8 border-primary", isRTL ? "border-r-4 pr-10" : "border-l-4 pl-10")}
                >
                  <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tighter leading-none">
                    {t.about.story.title}
                    <span className="text-primary">{isRTL ? "الصحة" : "Health"}</span>
                  </h2>
                  
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium italic">
                    {t.about.story.p1}
                  </p>
                  
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium italic">
                    {t.about.story.p2}
                  </p>
                </motion.div>

                <motion.div 
                  variants={{
                    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.6 } }
                  }}
                  className="grid sm:grid-cols-2 gap-6"
                >
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
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants} 
          className="py-24 bg-primary text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-16 text-center"
            >
              {Object.entries(t.about.stats).map(([key, stat], i) => (
                <motion.div key={key} variants={itemVariants} className="space-y-4">
                  <div className="text-5xl md:text-6xl font-bold tracking-tighter mb-2">
                    <StatCounter value={stat.val} />
                  </div>
                  <div className="text-primary-foreground/60 text-[10px] font-bold uppercase tracking-[0.5em]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Global Standards Registry */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="py-32 border-t border-primary/5 bg-background relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-16 opacity-40">
                <div className="h-[1px] w-12 bg-primary" />
                <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-primary">{isRTL ? "معايير الجودة العالمية" : "Global Quality Registry"}</span>
                <div className="h-[1px] w-12 bg-primary" />
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32">
                {[
                  { icon: ShieldCheck, label: t.catalogue.standards.iso, detail: isRTL ? "إدارة الجودة" : "Quality Management" },
                  { icon: Award, label: t.catalogue.standards.ce, detail: isRTL ? "الصحة والسلامة" : "Clinical Health & Safety" },
                  { icon: BadgeCheck, label: t.catalogue.standards.fda, detail: isRTL ? "الامتثال التنظيمي" : "Regulatory Compliance" }
                ].map((std, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center gap-6 group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="relative p-6 bg-primary/5 border border-primary/10 rounded-full text-primary/40 group-hover:text-primary group-hover:border-primary/30 transition-all duration-500">
                        <std.icon className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground group-hover:text-primary transition-colors">{std.label}</h4>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{std.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
