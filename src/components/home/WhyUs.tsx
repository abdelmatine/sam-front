"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck } from 'lucide-react';

export default function WhyUs() {
  return (
    <section className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden border-b">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="border-l-4 border-primary pl-8 md:pl-12">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Clinical Excellence</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 leading-tight uppercase tracking-tighter">
                Why SAM Médicale <br /> <span className="text-primary">Solutions?</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 leading-relaxed font-medium italic max-w-xl">
                SAM Médicale is more than just a supplier. We are a technical partner committed to clinical excellence. Every device in our inventory undergoes a rigorous 15-point calibration check before shipping.
              </p>
              
              <div className="grid sm:grid-cols-1 gap-10">
                {[
                  { 
                    icon: Activity, 
                    title: "Precision Calibration", 
                    desc: "Our in-house clinical laboratory ensures every machine meets original manufacturer specifications with surgical precision." 
                  },
                  { 
                    icon: ShieldCheck, 
                    title: "Compliance First", 
                    desc: "We operate in full compliance with ISO 13485:2016 quality management standards for medical devices." 
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex gap-6 group cursor-default"
                  >
                    <div className="shrink-0 h-14 w-14 bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <item.icon className="h-7 w-7 transition-colors duration-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-xs tracking-widest group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[500px] md:h-[600px] w-full"
          >
            <motion.div 
              whileHover={{ scale: 1.03, zIndex: 30 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 right-0 w-4/5 h-4/5 z-0 grayscale hover:grayscale-0 transition-all duration-300 border-8 border-white dark:border-slate-900 shadow-2xl overflow-hidden cursor-pointer rounded-3xl"
            >
              <Image src="https://picsum.photos/seed/med10/800/1000" alt="Laboratory" fill className="object-cover" data-ai-hint="medical laboratory" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.03, zIndex: 30 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 w-3/5 h-3/5 z-10 grayscale hover:grayscale-0 transition-all duration-300 border-8 border-white dark:border-slate-900 shadow-2xl overflow-hidden cursor-pointer rounded-3xl"
            >
              <Image src="https://picsum.photos/seed/med11/800/1000" alt="Medical Tech" fill className="object-cover" data-ai-hint="medical device technician" />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 bg-primary text-white p-8 z-20 hidden md:block shadow-xl rounded-2xl"
            >
              <div className="text-4xl font-bold tracking-tighter mb-1">98%</div>
              <div className="text-[9px] font-bold uppercase tracking-widest opacity-80">Success Rate</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}