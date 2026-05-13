'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, Loader2 } from 'lucide-react';

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // This effect starts the loading process on link click
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      // Check if it's a valid internal navigation link
      if (anchor && anchor.href && anchor.getAttribute('href')?.startsWith('/') && anchor.getAttribute('target') !== '_blank') {
        // Standard click (no modifier keys)
        if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
          const targetPathname = new URL(anchor.href).pathname;
          // Only trigger if the pathname is different to avoid reloading same page
          if (pathname !== targetPathname) {
            setLoading(true);
          }
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [pathname]);

  // This effect stops the loading process when URL changes
  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[200] flex flex-col items-center justify-center gap-6 pointer-events-none"
        >
          <div className="relative">
            {/* Inner Pulsing Core */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
            />
            {/* Main Clinical Icon */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Activity className="h-12 w-12 text-primary" />
            </motion.div>
            {/* Surgical Spinner */}
            <Loader2 className="h-20 w-20 text-primary/10 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary"
            >
              SAM MÉDICALE
            </motion.span>
            <div className="h-[2px] w-24 bg-primary/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-primary"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
