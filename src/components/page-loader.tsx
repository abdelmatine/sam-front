'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity } from 'lucide-react';

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
          <div className="relative flex flex-col items-center">
            {/* Clinical Core Container */}
            <motion.div
              animate={{ 
                x: [-30, 30, -30],
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.5, 
                ease: "easeInOut" 
              }}
              className="relative flex items-center justify-center"
            >
              {/* Inner Pulsing Glow */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
              
              {/* Main Clinical Icon */}
              <Activity className="h-16 w-16 text-primary relative z-10" />
            </motion.div>
          </div>
          
          {/* Branding */}
          <div className="flex flex-col items-center gap-2 mt-4">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary"
            >
              SAM MÉDICALE
            </motion.span>
            <div className="h-[2px] w-32 bg-primary/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-primary"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
