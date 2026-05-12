"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Newsletter() {
  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-40" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 text-center max-w-3xl relative z-10"
      >
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8 }}
          className="inline-block p-4 bg-primary/10 rounded-full border border-primary/20 mb-8"
        >
          <Mail className="h-8 w-8 text-primary" />
        </motion.div>
        
        <motion.h2 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tighter"
        >
          Professional Updates
        </motion.h2>
        
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-400 mb-12 text-sm md:text-base font-medium italic leading-relaxed"
        >
          Stay informed on the latest respiratory technology and receive automated reminders for equipment calibration and filter replacements.
        </motion.p>
        
        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 }
          }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <input 
            type="email" 
            placeholder="Medical Email Address" 
            className="flex-1 bg-white/5 border border-white/10 px-8 py-5 outline-none focus:border-primary focus:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-white placeholder:text-slate-500 rounded-none"
          />
          <Button className="bg-primary text-white font-bold px-12 h-auto rounded-none hover:bg-primary/90 transition-all uppercase tracking-widest text-[11px] py-5 active:scale-95 shadow-xl shadow-primary/20">
            Subscribe
          </Button>
        </motion.div>
        
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-3 text-slate-500"
        >
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
            Secure Clinical Protocol • HIPAA Compliant
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}