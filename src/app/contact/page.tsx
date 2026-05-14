
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

export default function ContactPage() {
  const { toast } = useToast();
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

  const contactInfos = [
    { 
      icon: Phone, 
      title: "Assistance Technique", 
      val: "+1 (800) RESPIRA", 
      desc: "Lun-Ven: 8h - 20h EST",
      color: "text-primary"
    },
    { 
      icon: Mail, 
      title: "Email Support", 
      val: "support@respiramed.com", 
      desc: "Délai de réponse: < 24h",
      color: "text-primary"
    },
    { 
      icon: MapPin, 
      title: "Clinical Plaza", 
      val: "123 Medical Center Way", 
      desc: "New York, NY 10001",
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
            Comment <span className="text-primary">Aider?</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-medium italic">
            Que vous ayez des questions sur les spécifications de l'équipement, la couverture d'assurance ou l'état d'une commande, notre équipe spécialisée est là pour vous assister.
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
                Distributeur Officiel Agréé
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed font-medium italic relative z-10">
                Nous sommes des fournisseurs certifiés pour ResMed, Philips et plus encore. Tout le support technique est assuré par des techniciens formés en usine.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <Card className="border border-primary/10 clinical-shadow bg-card overflow-hidden rounded-none">
              <div className="bg-primary p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                  <MessageSquare className="h-32 w-32" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-4 uppercase tracking-tighter">
                    <Activity className="h-8 w-8 animate-pulse" />
                    Envoyer un Message
                  </h3>
                  <p className="text-primary-foreground/70 text-sm mt-3 font-medium italic">
                    Les consultations médicales et calibrations techniques peuvent être initiées ici.
                  </p>
                </div>
              </div>
              <CardContent className="p-10">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 ml-1">Nom Complet</label>
                    <Input placeholder="John Doe" className="rounded-none h-14 bg-accent/5 border-primary/10 focus-visible:ring-primary/20 text-sm font-medium" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 ml-1">Email Professionnel</label>
                    <Input type="email" placeholder="john@clinique.com" className="rounded-none h-14 bg-accent/5 border-primary/10 focus-visible:ring-primary/20 text-sm font-medium" required />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 ml-1">Type de Demande</label>
                    <Input placeholder="Spécifications, Calibration, Revue de Prescription..." className="rounded-none h-14 bg-accent/5 border-primary/10 focus-visible:ring-primary/20 text-sm font-medium" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 ml-1">Message Diagnostic</label>
                    <Textarea placeholder="Comment nos spécialistes peuvent-ils vous assister aujourd'hui?" className="min-h-[160px] rounded-none bg-accent/5 border-primary/10 focus-visible:ring-primary/20 text-sm font-medium resize-none" required />
                  </div>
                  <div className="md:col-span-2 pt-6">
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white h-20 text-[11px] font-bold uppercase tracking-[0.3em] rounded-none hover:bg-primary/90 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-primary/20"
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          <>
                            Synchroniser le Signal
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Clinical Stability Status */}
        <motion.div 
          variants={itemVariants}
          className="mt-24 pt-10 border-t border-primary/10 flex flex-wrap items-center justify-center gap-12 grayscale opacity-30"
        >
          <div className="text-[8px] font-bold uppercase tracking-[0.5em]">SYSTÈME ACTIF: 99.9%</div>
          <div className="h-4 w-[1px] bg-primary/20" />
          <div className="text-[8px] font-bold uppercase tracking-[0.5em]">ENCRYPTAGE: AES-256</div>
          <div className="h-4 w-[1px] bg-primary/20" />
          <div className="text-[8px] font-bold uppercase tracking-[0.5em]">ID RÉSEAU: SAM-SYNC-NET</div>
        </motion.div>
      </motion.div>
    </main>
  );
}

