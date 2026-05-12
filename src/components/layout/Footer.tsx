"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import { Activity, Mail, Facebook, Twitter, Instagram, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-background border-t py-20 mt-auto overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-primary rounded-none"
              >
                <Activity className="h-5 w-5 text-white" />
              </motion.div>
              <span className="font-headline font-bold text-xl tracking-tighter text-foreground">
                SAM <span className="text-primary">Médicale</span>
              </span>
            </Link>
            <p className="text-[11px] text-muted-foreground leading-relaxed max-w-xs font-medium italic">
              Global provider of clinical respiratory solutions and specialized medical equipment. ISO 13485 certified for surgical precision in patient care.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.2, color: 'hsl(var(--primary))' }}
                  className="text-muted-foreground cursor-pointer transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Column */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-foreground mb-8 uppercase tracking-[0.2em] text-[10px] border-l-2 border-primary pl-4">
              {t.categories.title}
            </h4>
            <ul className="space-y-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              {['CPAP & BPAP', "Concentrateurs d'Oxygène", 'Interfaces & Masques', 'Monitoring'].map((link) => (
                <motion.li 
                  key={link}
                  whileHover={{ x: 4, color: 'hsl(var(--primary))' }}
                  className="cursor-pointer transition-all flex items-center gap-2"
                >
                  <div className="h-1 w-1 bg-primary/20 rounded-full" />
                  {link}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-foreground mb-8 uppercase tracking-[0.2em] text-[10px] border-l-2 border-primary pl-4">
              Contact
            </h4>
            <ul className="space-y-5 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              <motion.li whileHover={{ x: 4 }} className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2 bg-accent/50 group-hover:bg-primary/10 transition-colors">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                </div>
                Paris, France
              </motion.li>
              <motion.li whileHover={{ x: 4 }} className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2 bg-accent/50 group-hover:bg-primary/10 transition-colors">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                </div>
                +33 (0) 1 23 45 67 89
              </motion.li>
              <motion.li whileHover={{ x: 4 }} className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2 bg-accent/50 group-hover:bg-primary/10 transition-colors">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                </div>
                support@sam-medicale.fr
              </motion.li>
            </ul>
          </motion.div>

          {/* Certifications Column */}
          <motion.div variants={itemVariants}>
            <div className="bg-primary/5 p-8 border border-primary/10 clinical-shadow relative group overflow-hidden">
              <motion.div 
                className="absolute top-0 right-0 p-2 opacity-10"
                whileHover={{ rotate: 45, opacity: 0.2 }}
              >
                <ShieldCheck className="h-12 w-12 text-primary" />
              </motion.div>
              <h4 className="font-bold text-primary mb-4 uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Certifications
              </h4>
              <p className="text-[10px] text-muted-foreground leading-relaxed italic font-medium relative z-10">
                All equipment complies with European CE standards and ISO 13485:2016 quality management for medical devices. High-fidelity calibration guaranteed.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.3em]">
            © {new Date().getFullYear()} SAM MÉDICALE • PRECISION RESPIRATORY SOLUTIONS
          </p>
          <div className="flex gap-10 text-[9px] text-muted-foreground uppercase font-bold tracking-[0.3em]">
            {['Confidentialité', 'Conditions', 'Sécurité'].map((legal) => (
              <motion.span 
                key={legal}
                whileHover={{ color: 'hsl(var(--primary))' }}
                className="cursor-pointer transition-colors relative group"
              >
                {legal}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;