
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // We only show the global loader when the pathname actually changes
  // and we want a global transition. We've removed the manual click interceptor
  // to prefer localized card-level loading states.
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
          <div className="relative flex flex-col items-center overflow-hidden w-full max-w-xs">
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ 
                x: ["-100%", "100%", "-100%"], 
                opacity: 1 
              }}
              transition={{ 
                x: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                opacity: { duration: 0.5 }
              }}
              className="relative flex items-center justify-center p-12"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-primary/30 rounded-full blur-3xl" 
              />
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <Activity className="h-14 w-14 text-primary relative z-10" />
              </motion.div>
            </motion.div>
          </div>
          
          <div className="flex flex-col items-center gap-2 mt-4">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary"
            >
              SAM MÉDICALE
            </motion.span>
            <div className="h-[2px] w-32 bg-primary/10 relative overflow-hidden mt-1">
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
