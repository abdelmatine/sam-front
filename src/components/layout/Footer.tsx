
"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import { Mail, Facebook, Twitter, Instagram, ShieldCheck, MapPin, Phone, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '@/components/shared/Logo';

const Footer = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const footerLinks = [
    { label: t.categories.cpap, href: '/shop/cpap' },
    { label: t.categories.bpap, href: '/shop/bpap' },
    { label: t.categories.oxygen, href: '/shop/oxygen' },
    { label: t.categories.masks, href: '/shop/masks' },
    { label: t.categories.monitoring, href: '/shop/monitoring' }
  ];

  const legalLinks = [
    { label: t.footer.privacy, key: 'privacy' },
    { label: t.footer.terms, key: 'terms' },
    { label: t.footer.security, key: 'security' }
  ];

  return (
    <footer className="bg-background border-t py-24 mt-auto overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24"
        >
          <motion.div variants={itemVariants} className="space-y-10">
            <Logo />
            <p className="text-[11px] text-muted-foreground leading-relaxed max-w-xs font-medium italic">
              {t.footer.description}
            </p>
            <div className="flex gap-6">
              {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.2, color: 'hsl(var(--primary))', y: -2 }}
                  className="text-muted-foreground cursor-pointer transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/shop">
              <h4 className="font-bold text-foreground mb-10 uppercase tracking-[0.25em] text-[10px] border-l-4 border-primary pl-5 hover:text-primary transition-colors cursor-pointer">
                {t.categories.title}
              </h4>
            </Link>
            <ul className="space-y-5 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              {footerLinks.map((link) => (
                <motion.li 
                  key={link.label}
                  whileHover={{ x: 8, color: 'hsl(var(--primary))' }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <motion.div 
                    className="h-1 w-1 bg-primary/30 rounded-full transition-colors group-hover:bg-primary" 
                    whileHover={{ scale: 2 }}
                  />
                  <Link href={link.href} className="transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-foreground mb-10 uppercase tracking-[0.25em] text-[10px] border-l-4 border-primary pl-5">
              {t.contact_info.support_title}
            </h4>
            <ul className="space-y-6 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              <motion.li 
                whileHover={{ x: 8, color: 'hsl(var(--primary))' }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-5 group cursor-pointer"
              >
                <div className="p-2.5 bg-accent/50 group-hover:bg-primary/10 border border-primary/5 transition-colors">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                {t.contact_info.location}
              </motion.li>
              <motion.li 
                whileHover={{ x: 8, color: 'hsl(var(--primary))' }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-5 group cursor-pointer"
              >
                <div className="p-2.5 bg-accent/50 group-hover:bg-primary/10 border border-primary/5 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                {t.contact_info.phone}
              </motion.li>
              <motion.li 
                whileHover={{ x: 8, color: 'hsl(var(--primary))' }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-5 group cursor-pointer"
              >
                <div className="p-2.5 bg-accent/50 group-hover:bg-primary/10 border border-primary/5 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                {t.contact_info.email}
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-primary/5 p-10 border border-primary/10 clinical-shadow relative group overflow-hidden cursor-default"
            >
              <motion.div 
                className="absolute -top-4 -right-4 opacity-5"
                whileHover={{ rotate: 15, opacity: 0.1 }}
              >
                <ShieldCheck className="h-24 w-24 text-primary" />
              </motion.div>
              <h4 className="font-bold text-primary mb-5 uppercase tracking-[0.25em] text-[10px] flex items-center gap-3">
                <ShieldCheck className="h-4.5 w-4.5" /> {t.footer.quality_title}
              </h4>
              <p className="text-[10px] text-muted-foreground leading-relaxed italic font-medium relative z-10">
                {t.footer.quality_desc}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          viewport={{ once: true }}
          className="pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div className="flex items-center gap-3">
            <Activity className="h-4 w-4 text-primary/40" />
            <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.4em]">
              © {new Date().getFullYear()} SAM MÉDICALE • {t.footer.rights}
            </p>
          </div>
          <div className="flex gap-12 text-[9px] text-muted-foreground uppercase font-bold tracking-[0.4em]">
            {legalLinks.map((legal) => (
              <motion.span 
                key={legal.key}
                whileHover={{ color: 'hsl(var(--primary))' }}
                className="cursor-pointer transition-colors relative group"
              >
                {legal.label}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-[1.5px] bg-primary" 
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
