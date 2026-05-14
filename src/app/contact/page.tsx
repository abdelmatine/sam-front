
"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck, Loader2, Database, Activity, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';

export default function ContactPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Signal Synchronized",
        description: "Our medical specialists have received your inquiry.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const formGroupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const contactInfos = [
    { 
      icon: Phone, 
      title: t.contact.info.technical_title, 
      val: t.contact_info.phone, 
      desc: t.contact.info.technical_hours,
      color: "text-primary"
    },
    { 
      icon: Mail, 
      title: t.contact.info.email_title, 
      val: t.contact_info.email, 
      desc: t.contact.info.email_response,
      color: "text-primary"
    },
    { 
      icon: MapPin, 
      title: t.contact.info.location_title, 
      val: t.contact.info.location_address, 
      desc: t.contact_info.location,
      color: "text-primary"
    }
  ];

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Background Clinical Grid Accent */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 relative z-10 pt-32 pb-20"
      >
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-headline font-bold mb-6 uppercase tracking-tighter">
            {t.contact.title.split(' ')[0]} <span className="text-primary">{t.contact.title.split(' ').slice(1).join(' ')}</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-medium italic">
            {t.contact.subtitle}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact Info Column */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
            <div className="grid gap-6">
              {contactInfos.map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.03, x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <Card className="rounded-none border-primary/10 bg-accent/5 clinical-shadow overflow-hidden group">
                    <CardContent className="p-8 flex gap-6">
                      <div className="shrink-0">
                        <div className="p-4 bg-primary/10 rounded-sm text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <item.icon className="h-6 w-6" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-[10px] uppercase tracking-widest text-primary/60 mb-1">{item.title}</h4>
                        <p className="text-lg font-bold tracking-tight mb-1">{item.val}</p>
                        <p className="text-[10px] text-muted-foreground font-medium italic">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-primary/5 border border-primary/20 p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-[10px] mb-4">
                <ShieldCheck className="h-5 w-5" />
                {t.contact.authorized.title}
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed font-medium italic relative z-10">
                {t.contact.authorized.desc}
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <Card className="border border-primary/10 clinical-shadow bg-card overflow-hidden rounded-none">
              <div className="bg-primary p-10 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 group-hover:scale-125 group-hover:rotate-[24deg] transition-all duration-1000 ease-out">
                  <MessageSquare className="h-32 w-32" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-4 uppercase tracking-tighter">
                    <Activity className="h-8 w-8 animate-pulse" />
                    {t.contact.form.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm mt-3 font-medium italic">
                    {t.contact.form.subtitle}
                  </p>
                </div>
              </div>
              
              <CardContent className="p-10">
                <form onSubmit={handleSubmit}>
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    <motion.div variants={formGroupVariants} className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 ml-1">{t.contact.form.name_label}</label>
                      <Input placeholder={t.contact.form.name_placeholder} className="rounded-none h-14 bg-accent/5 border-primary/10 focus-visible:ring-primary/20 text-sm font-medium transition-all" required />
                    </motion.div>
                    
                    <motion.div variants={formGroupVariants} className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 ml-1">{t.contact.form.email_label}</label>
                      <Input type="email" placeholder={t.contact.form.email_placeholder} className="rounded-none h-14 bg-accent/5 border-primary/10 focus-visible:ring-primary/20 text-sm font-medium transition-all" required />
                    </motion.div>
                    
                    <motion.div variants={formGroupVariants} className="md:col-span-2 space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 ml-1">{t.contact.form.type_label}</label>
                      <Input placeholder={t.contact.form.type_placeholder} className="rounded-none h-14 bg-accent/5 border-primary/10 focus-visible:ring-primary/20 text-sm font-medium transition-all" />
                    </motion.div>
                    
                    <motion.div variants={formGroupVariants} className="md:col-span-2 space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 ml-1">{t.contact.form.message_label}</label>
                      <Textarea placeholder={t.contact.form.message_placeholder} className="min-h-[160px] rounded-none bg-accent/5 border-primary/10 focus-visible:ring-primary/20 text-sm font-medium resize-none transition-all" required />
                    </motion.div>
                    
                    <motion.div variants={formGroupVariants} className="md:col-span-2 pt-6">
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-primary text-white h-20 text-[11px] font-bold uppercase tracking-[0.3em] rounded-none hover:bg-primary/90 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-primary/20 overflow-hidden relative"
                        >
                          <AnimatePresence mode="wait">
                            {isSubmitting ? (
                              <motion.div 
                                key="submitting"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-3"
                              >
                                <Loader2 className="h-6 w-6 animate-spin" />
                                {t.contact.form.submitting}
                              </motion.div>
                            ) : (
                              <motion.div 
                                key="idle"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-4"
                              >
                                {t.contact.form.submit}
                                <Send className="h-4 w-4" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Clinical Compliance Status */}
        <motion.div 
          variants={itemVariants}
          className="mt-24 pt-10 border-t border-primary/10 flex flex-wrap items-center justify-center gap-12 grayscale opacity-30"
        >
          <div className="text-[9px] font-bold uppercase tracking-[0.5em]">{t.catalogue.standards.iso}</div>
          <div className="h-4 w-[1px] bg-primary/20" />
          <div className="text-[9px] font-bold uppercase tracking-[0.5em]">{t.catalogue.standards.ce}</div>
          <div className="h-4 w-[1px] bg-primary/20" />
          <div className="text-[9px] font-bold uppercase tracking-[0.5em]">{t.catalogue.standards.fda}</div>
        </motion.div>
      </motion.div>
    </main>
  );
}
