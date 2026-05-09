"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Loader2, Activity } from 'lucide-react';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    // Basic navigation loader effect
    const handleStart = () => setIsPageLoading(true);
    const handleComplete = () => setIsPageLoading(false);

    // Since Next.js 13+ doesn't have events for App Router, we trigger on pathname change
    handleStart();
    const timeout = setTimeout(handleComplete, 600);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isPageLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-[200] flex flex-col items-center justify-center gap-4"
          >
            <div className="relative">
              <Activity className="h-10 w-10 text-primary animate-pulse" />
              <Loader2 className="h-16 w-16 text-primary/20 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary animate-pulse">
              SAM MÉDICALE
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;