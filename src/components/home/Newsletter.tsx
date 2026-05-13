"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function Newsletter() {
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

  const leftVariants = {
    hidden: { opacity: 0, x: -70 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 70 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
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
      {/* Clinical Atmosphere Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-40" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 text-center max-w-3xl relative z-10"
      >
        {/* Animated Icon */}
        <motion.div 
          variants={fadeUpVariants}
          className="inline-block p-5 bg-primary/10 rounded-full border border-primary/20 mb-10"
        >
          <Mail className="h-10 w-10 text-primary" />
        </motion.div>
        
        {/* Content coming from Left */}
        <div className="space-y-6 mb-16">
          <motion.h2 
            variants={leftVariants}
            className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter"
          >
            Professional <span className="text-primary">Updates</span>
          </motion.h2>
          
          <motion.p 
            variants={leftVariants}
            className="text-slate-400 text-sm md:text-lg font-medium italic leading-relaxed max-w-2xl mx-auto"
          >
            Stay informed on the latest respiratory technology and receive automated reminders for equipment calibration and filter replacements.
          </motion.p>
        </div>
        
        {/* Subscription coming from Right */}
        <motion.form 
          onSubmit={handleSubscribe}
          variants={rightVariants}
          className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto relative"
        >
          <div className="absolute -inset-1 bg-primary/5 blur-xl pointer-events-none" />
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Medical Email Address" 
            className="flex-1 bg-white/5 border border-white/10 px-8 py-5 outline-none focus:border-primary focus:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-white placeholder:text-slate-500 rounded-none relative z-10"
          />
          <Button 
            type="submit"
            disabled={isSubscribing}
            className="bg-primary text-white font-bold px-12 h-auto rounded-none hover:bg-primary/90 transition-all uppercase tracking-widest text-[11px] py-5 active:scale-95 shadow-xl shadow-primary/20 relative z-10 min-w-[150px]"
          >
            {isSubscribing ? <Loader2 className="h-5 w-5 animate-spin" /> : "Subscribe"}
          </Button>
        </motion.form>
        
        {/* Compliance Footer */}
        <motion.div 
          variants={fadeUpVariants}
          className="mt-16 flex items-center justify-center gap-3 text-slate-500"
        >
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">
            Secure Clinical Protocol • HIPAA Compliant
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}