"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { 
  Wrench, 
  Stethoscope, 
  Truck, 
  Headset, 
  GraduationCap, 
  ShieldAlert, 
  Microscope,
  ShieldCheck,
  Activity,
  Award,
  BadgeCheck,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Animation Variants calibrated for Surgical Resolve - Slower & Smoother
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

export default function ServicesPage() {
  const { t, isRTL } = useTranslation();

  const serviceList = [
    { icon: Wrench, key: 'calibration' },
    { icon: Stethoscope, key: 'consultation' },
    { icon: Truck, key: 'delivery' },
    { icon: Headset, key: 'support' },
    { icon: GraduationCap, key: 'training' },
    { icon: ShieldAlert, key: 'hygiene' },
    { icon: Microscope, key: 'polygraphy' }
  ];

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
            <motion.h1 variants={itemVariants} className="text-3xl md:text-7xl font-headline font-bold mb-8 uppercase tracking-tighter leading-[0.9]">
              {t.services.hero.title}
              <span className="text-primary">{t.services.hero.highlight}</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium italic">
              {t.services.hero.subtitle}
            </motion.p>
          </div>
        </motion.section>

        {/* Services Grid */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="py-24"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              variants={{
                visible: { transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
              }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {serviceList.map((service) => {
                const Icon = service.icon;
                const data = (t.services.list as any)[service.key];
                return (
                  <motion.div 
                    key={service.key} 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <Card className="rounded-none bg-accent/5 border-primary/10 clinical-shadow group hover:bg-primary/[0.03] transition-all h-full relative overflow-hidden">
                      <div className={cn(
                        "absolute top-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-1000",
                        isRTL ? "right-0" : "left-0"
                      )} />
                      <CardContent className="p-8 md:p-10 flex flex-col gap-6 md:gap-8">
                        <div className="shrink-0 w-fit">
                          <div className="p-4 md:p-5 bg-primary/10 rounded-none text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 border border-primary/10">
                            <Icon className="h-6 w-6 md:h-8 md:w-8" />
                          </div>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          <div className="flex items-center gap-3">
                            <Activity className="h-3 w-3 text-primary/40" />
                            <h3 className="font-bold uppercase text-[10px] md:text-[11px] tracking-[0.3em] text-primary/80">{data.title}</h3>
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground font-medium italic leading-relaxed">
                            {data.desc}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action - Enhanced Clinical Intervention Station */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="py-24 md:py-32 bg-primary text-white relative overflow-hidden group"
        >
          {/* Background Technical Pattern */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />
          <div className="absolute top-0 right-0 w-[50%] h-full bg-white/[0.02] -skew-x-12 translate-x-1/4 z-0" />
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <motion.div 
                variants={{
                  visible: { transition: { staggerChildren: 0.3, delayChildren: 0.3 } }
                }}
                className="flex flex-col items-center gap-8 md:gap-12"
              >
                {/* Protocol Badge */}
                <motion.div variants={itemVariants} className="flex items-center gap-3 bg-white/10 px-3 py-1.5 md:px-4 md:py-2 border border-white/20">
                  <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/90">INTERVENTION_MOD_v4.2</span>
                </motion.div>

                {/* Main Icon Grouping */}
                <motion.div variants={itemVariants} className="relative group/icon">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-150"
                  />
                  <div className="relative p-8 md:p-10 bg-white/10 rounded-none border border-white/20 backdrop-blur-md clinical-shadow transition-all duration-1000 group-hover/icon:border-white/40">
                    <ShieldCheck className="h-12 w-12 md:h-16 md:w-16 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 p-2 md:p-3 bg-white text-primary rounded-none shadow-2xl">
                    <Activity className="h-4 w-4 md:h-5 md:w-5 animate-pulse" />
                  </div>
                </motion.div>

                {/* Typography Content */}
                <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
                  <h2 className="text-3xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] max-w-2xl">
                    {t.services.cta.title}
                  </h2>
                  <p className="text-primary-foreground/60 text-base md:text-xl font-medium italic leading-relaxed max-w-xl mx-auto">
                    {t.services.cta.subtitle}
                  </p>
                </motion.div>

                {/* Primary Action Button */}
                <motion.div variants={itemVariants} className="w-full md:w-auto">
                  <Link href="/contact" className="block w-full h-full">
                    <Button className="w-full md:w-auto bg-white text-primary hover:bg-white/90 active:bg-primary active:text-white px-6 py-6 md:px-16 md:py-10 rounded-none text-[9px] md:text-[12px] font-black uppercase tracking-[0.4em] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all hover:scale-105 active:scale-95 group/btn relative overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center gap-4">
                        {t.services.cta.button}
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover/btn:translate-x-3 transition-transform duration-700" />
                      </span>
                      <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                    </Button>
                  </Link>
                </motion.div>

                {/* Metadata Footer */}
                <motion.div variants={itemVariants} className="flex items-center gap-6 md:gap-8 opacity-40 mt-4 md:mt-6 grayscale">
                   <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em]">{t.catalogue.standards.iso}</div>
                   <div className="h-3 w-[1px] bg-white/30" />
                   <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em]">{t.catalogue.standards.fda}</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Compliance Registry */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="py-24 md:py-32 border-t border-primary/5 bg-background relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12 md:mb-16 opacity-40">
                <div className="h-[1px] w-8 md:w-12 bg-primary" />
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.5em] text-primary">
                  {t.about.registry.badge}
                </span>
                <div className="h-[1px] w-8 md:w-12 bg-primary" />
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-32">
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
                      whileHover={{ y: -10 }}
                      className="flex flex-col items-center gap-4 md:gap-6 group"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative p-5 md:p-6 bg-primary/5 border border-primary/10 rounded-full text-primary/40 group-hover:text-primary group-hover:border-primary/30 transition-all duration-700">
                          <Icon className="h-6 w-6 md:h-8 md:w-8" />
                        </div>
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-foreground group-hover:text-primary transition-colors duration-500">{std.label}</h4>
                        <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{std.detail}</p>
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
