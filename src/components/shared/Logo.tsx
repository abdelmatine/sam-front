'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconOnly?: boolean;
}

const Logo = ({ className, textClassName, iconOnly = false }: LogoProps) => {
  return (
    <div className={cn("inline-block", className)}>
      <Link href="/" className="flex items-center gap-4 group">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="p-2 rounded-full bg-primary/90 
          backdrop-blur-md 
          border border-white/20 shadow-xl
          dark:border-white/10 dark:bg-white/90 
          shadow-[0_8px_25px_-5px_hsl(var(--primary)/0.4)] 
          flex items-center justify-center relative 
          overflow-hidden"
        >
          <Activity className="h-5 w-5 text-white dark:text-primary relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
        </motion.div>
        
        {!iconOnly && (
          <motion.span 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "font-headline font-bold text-lg tracking-tighter text-foreground origin-left",
              textClassName
            )}
          >
            SAM <span className="text-primary">Médicale</span>
          </motion.span>
        )}
      </Link>
    </div>
  );
};

export default Logo;
