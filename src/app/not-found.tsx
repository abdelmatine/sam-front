
"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { Activity, ArrowLeft, Database, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Clinical Atmospheric Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 flex-1 flex flex-col items-center justify-center relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl"
        >
          {/* Diagnostic Icon Group */}
          <div className="relative inline-block mb-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full"
            />
            <div className="p-10 bg-primary/10 rounded-full relative z-10">
              <SearchX className="h-16 w-16 text-primary" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 p-3 bg-background border border-primary/20 rounded-none shadow-xl"
            >
              <Activity className="h-5 w-5 text-primary" />
            </motion.div>
          </div>

          {/* Clinical Error Message */}
          <div className="space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 text-primary/60 mb-2">
              <Database className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Error v4.0.4 - Signal Interrupted</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tighter leading-none text-foreground">
              {t.error.not_found_title}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto leading-relaxed font-medium italic">
              {t.error.not_found_desc}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/">
              <Button className="bg-primary text-white px-12 py-8 rounded-none text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 flex items-center gap-3">
                <ArrowLeft className="h-4 w-4" />
                {t.error.back_home}
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" className="px-12 py-8 rounded-none text-[11px] font-bold uppercase tracking-[0.25em] border-2 border-primary/20 hover:bg-primary/5 transition-all">
                {t.nav.catalogue}
              </Button>
            </Link>
          </div>

          {/* Clinical Compliance */}
          <div className="mt-20 pt-8 border-t border-primary/10 flex items-center justify-center gap-8 grayscale opacity-30">
            <div className="text-[8px] font-bold uppercase tracking-[0.5em]">SYSTEM STABILITY: 99.9%</div>
            <div className="h-3 w-[1px] bg-border" />
            <div className="text-[8px] font-bold uppercase tracking-[0.5em]">DIAGNOSTIC ID: ERR-404-SAM</div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
