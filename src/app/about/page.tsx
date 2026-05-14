
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import { CheckCircle2, Heart, Award, Users, ShieldCheck, Database, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function AboutPage() {
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

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Background Clinical Grid Accent */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Hero Header */}
        <section className="pt-32 pb-20 hero-gradient">
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-6">
              <Database className="h-4 w-4 text-primary/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">Mission Statement v1.0</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-headline font-bold mb-6 uppercase tracking-tighter">
              Notre Mission est le <span className="text-primary">Souffle</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-medium italic">
              Chez SAM Médicale, nous comblons l'écart entre l'excellence clinique et les soins à domicile. Nous nous dédions à fournir une technologie respiratoire de pointe à ceux qui en ont le plus besoin.
            </motion.p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={itemVariants} className="relative h-[400px] md:h-[600px] rounded-none overflow-hidden clinical-shadow border border-primary/10">
                <Image 
                  src="https://picsum.photos/seed/about1/800/1000" 
                  alt="Our Medical Facility" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  data-ai-hint="medical laboratory"
                />
              </motion.div>
              <div className="space-y-12">
                <div className="space-y-6 border-l-4 border-primary pl-8">
                  <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-headline font-bold uppercase tracking-tighter">
                    Leader de la <span className="text-primary">Santé Respiratoire</span>
                  </motion.h2>
                  <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed font-medium italic">
                    Fondée par une équipe de spécialistes en pneumologie et d'ingénieurs médicaux, SAM Médicale a commencé avec un objectif simple : rendre l'équipement d'oxygénothérapie et de sommeil accessible, fiable et facile à utiliser.
                  </motion.p>
                  <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed font-medium italic">
                    Aujourd'hui, nous servons plus de 15 000 patients, en partenariat avec des marques de classe mondiale pour garantir que chaque appareil répond aux normes cliniques les plus strictes.
                  </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { icon: Award, title: "Certifié FDA", desc: "Tous nos produits sont rigoureusement testés et approuvés." },
                    { icon: Users, title: "Patient d'Abord", desc: "Équipe de support dédiée disponible 24/7." },
                    { icon: Heart, title: "Soins Compatissants", desc: "Nous comprenons l'importance de la fiabilité." },
                    { icon: ShieldCheck, title: "Confiance Mondiale", desc: "Partenariats avec 500+ cliniques mondiales." }
                  ].map((item, i) => (
                    <motion.div key={i} variants={itemVariants}>
                      <Card className="rounded-none bg-accent/5 border-primary/5 shadow-none group hover:bg-primary/5 transition-colors">
                        <CardContent className="p-6 flex gap-4">
                          <div className="shrink-0">
                            <div className="p-2 bg-primary/10 rounded-sm text-primary group-hover:bg-primary group-hover:text-white transition-all">
                              <item.icon className="h-5 w-5" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold mb-1 uppercase text-[10px] tracking-widest">{item.title}</h4>
                            <p className="text-[10px] text-muted-foreground font-medium italic leading-tight">{item.desc}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <motion.section variants={itemVariants} className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {[
                { val: "15k+", label: "Patients Servis" },
                { val: "12+", label: "Années d'Expérience" },
                { val: "500+", label: "Partenaires Cliniques" },
                { val: "98%", label: "Satisfaction Patient" }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">{stat.val}</div>
                  <div className="text-primary-foreground/60 text-[9px] font-bold uppercase tracking-[0.3em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}
