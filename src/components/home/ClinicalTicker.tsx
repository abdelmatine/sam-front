"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, PhoneCall } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const ClinicalTicker = () => {
  const { t, isRTL } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);

  const stats = [
    { icon: ShieldCheck, title: t.ticker.iso.title, desc: t.ticker.iso.desc },
    { icon: Truck, title: t.ticker.logistics.title, desc: t.ticker.logistics.desc },
    { icon: PhoneCall, title: t.ticker.support.title, desc: t.ticker.support.desc }
  ];

  const tickerItems = [...stats, ...stats, ...stats];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      className="relative z-10 border-y bg-background py-10 overflow-hidden cursor-default"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center">
        <motion.div 
          className="flex items-center whitespace-nowrap"
          animate={{
            x: isRTL ? ["0%", "33.33%"] : ["0%", "-33.33%"]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {tickerItems.map((stat, i) => (
            <div key={i} className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-5 px-16 md:px-28 min-w-[320px] md:min-w-[450px] group"
              >
                <div className="shrink-0 p-3 bg-primary/5 rounded-none border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <stat.icon className="h-6 w-6 transition-colors duration-500" />
                </div>
                <div className="flex flex-col whitespace-normal">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {stat.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic max-w-[280px] font-medium group-hover:text-foreground transition-colors">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
              <div className="h-10 w-[1px] bg-primary/10 shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ClinicalTicker;