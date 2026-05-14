
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Stethoscope, 
  Truck, 
  Headset, 
  GraduationCap, 
  ShieldAlert, 
  Activity, 
  Database,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ServicesPage() {
  const { t, isRTL } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const serviceList = [
    { icon: Wrench, key: 'calibration' },
    { icon: Stethoscope, key: 'consultation' },
    { icon: Truck, key: 'delivery' },
    { icon: Headset, key: 'support' },
    { icon: GraduationCap, key: 'training' },
    { icon: ShieldAlert, key: 'hygiene' }
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
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">{t.services.hero.badge}</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-headline font-bold mb-8 uppercase tracking-tighter leading-[0.9]">
              {t.services.hero.title.split('{Surgical}')[0]}
              <span className="text-primary">{isRTL ? "الجراحية" : (t.services.hero.title.includes('{Surgical}') ? "Surgical" : "Chirurgicale")}</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium italic">
              {t.services.hero.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceList.map((service, i) => {
                const Icon = service.icon;
                const data = (t.services.list as any)[service.key];
                return (
                  <motion.div 
                    key={service.key} 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <Card className="rounded-none bg-accent/5 border-primary/10 clinical-shadow group hover:bg-primary/[0.03] transition-all h-full relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-700" />
                      <CardContent className="p-10 flex flex-col gap-8">
                        <div className="shrink-0 w-fit">
                          <div className="p-5 bg-primary/10 rounded-none text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-primary/10">
                            <Icon className="h-8 w-8" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Activity className="h-3 w-3 text-primary/40" />
                            <h3 className="font-bold uppercase text-[11px] tracking-[0.3em] text-primary/80">{data.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground font-medium italic leading-relaxed">
                            {data.desc}
                          </p>
                        </div>
                        <div className="mt-auto pt-6 border-t border-primary/5 flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-primary/40 group-hover:text-primary transition-colors">
                          PROTOCOL_ACTIVE <ArrowRight className="h-3 w-3" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 bg-primary text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-10">
              <div className="p-6 bg-white/10 rounded-full border border-white/20">
                <ShieldCheck className="h-12 w-12" />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none">
                  {t.services.cta.title}
                </h2>
                <p className="text-primary-foreground/70 text-lg md:text-xl font-medium italic">
                  {t.services.cta.subtitle}
                </p>
              </div>
              <Link href="/contact">
                <Button className="bg-white text-primary hover:bg-white/90 px-12 py-8 rounded-none text-[12px] font-bold uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95">
                  {t.services.cta.button}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

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
