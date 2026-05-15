"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Database, Activity } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

interface UnderConstructionProps {
  className?: string;
  moduleName?: string;
}

const UnderConstruction = ({ className, moduleName }: UnderConstructionProps) => {
  const { t, isRTL } = useTranslation();

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-primary/10 bg-primary/[0.02] relative overflow-hidden",
      className
    )}>
      <div className={cn(
        "absolute top-4 opacity-10 text-[8px] font-bold uppercase tracking-[0.5em]",
        isRTL ? "right-4" : "left-4"
      )}>
        {moduleName || "MODULE_CALIBRATION_v4.2"}
      </div>
      
      <div className="relative mb-8">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute inset-0 border border-dashed border-primary/20 rounded-full"
        />
        <div className="p-8 bg-primary/5 rounded-full relative z-10">
          <Wrench className="h-10 w-10 text-primary/40 animate-pulse" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter text-foreground/80">
        {t.common.under_construction}
      </h3>
      
      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.4em] max-w-xs leading-relaxed mx-auto">
        {t.common.under_construction_desc}
      </p>

      <div className="mt-8 flex items-center gap-4 opacity-30">
        <Activity className="h-3 w-3 text-primary" />
        <div className="h-[1px] w-12 bg-primary" />
        <Database className="h-3 w-3 text-primary" />
      </div>
    </div>
  );
};

export default UnderConstruction;