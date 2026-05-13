"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';

export default function Newsletter() {
  const { t } = useTranslation();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    setTimeout(() => {
      toast({
        title: "Registration Confirmed",
        description: "Your clinical update profile has been activated.",
      });
      setIsSubscribing(false);
      setEmail('');
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-40" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 text-center max-w-3xl relative z-10"
      >
        <motion.div 
          variants={fadeUpVariants}
          className="inline-block p-5 bg-primary/10 rounded-full border border-primary/20 mb-10"
        >
          <Mail className="h-10 w-10 text-primary" />
        </motion.div>
        
        <div className="space-y-6 mb-16">
          <motion.h2 
            variants={fadeUpVariants}
            className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter"
          >
            {t.newsletter.title} <span className="text-primary">{t.newsletter.subtitle}</span>
          </motion.h2>
          
          <motion.p 
            variants={fadeUpVariants}
            className="text-slate-400 text-sm md:text-lg font-medium italic leading-relaxed max-w-2xl mx-auto"
          >
            {t.newsletter.description}
          </motion.p>
        </div>
        
        <motion.form 
          onSubmit={handleSubscribe}
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto relative"
        >
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.newsletter.placeholder} 
            className="flex-1 bg-white/5 border border-white/10 px-8 py-5 outline-none focus:border-primary focus:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-white placeholder:text-slate-500 rounded-none relative z-10"
          />
          <Button 
            type="submit"
            disabled={isSubscribing}
            className="bg-primary text-white font-bold px-12 h-auto rounded-none hover:bg-primary/90 transition-all uppercase tracking-widest text-[11px] py-5 active:scale-95 shadow-xl shadow-primary/20 relative z-10 min-w-[150px]"
          >
            {isSubscribing ? <Loader2 className="h-5 w-5 animate-spin" /> : t.newsletter.button}
          </Button>
        </motion.form>
        
        <motion.div 
          variants={fadeUpVariants}
          className="mt-16 flex items-center justify-center gap-3 text-slate-500"
        >
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">
            {t.newsletter.compliance}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}