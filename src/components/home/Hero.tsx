"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useTranslation } from '@/hooks/use-translation';
import { ShieldCheck, Truck, PhoneCall } from 'lucide-react';

const Hero = () => {
  const { t, isRTL } = useTranslation();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-cpap');

  const stats = [
    { icon: ShieldCheck, title: "ISO 13485 CERTIFIED", desc: "Quality management standard for medical devices." },
    { icon: Truck, title: "GLOBAL SHIPPING", desc: "Reliable logistics for clinical supplies worldwide." },
    { icon: PhoneCall, title: "24/7 TECHNICAL SUPPORT", desc: "Expert calibration and maintenance assistance." }
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Main */}
      <div className="relative h-[600px] md:h-[700px] flex items-center">
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl}
              alt="Medical Device"
              fill
              className="object-cover opacity-20"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 hero-text-shadow">
              Advanced Respiratory Solutions for Home & Clinical Care
            </h1>
            <p className="text-slate-600 text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-medium">
              ISO 13485 certified equipment designed for precision, reliability, and patient comfort. Trusted by leading clinical facilities worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button className="bg-primary text-white px-10 py-7 rounded-none text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all">
                  Shop CPAP & BPAP
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="outline" className="bg-white/50 backdrop-blur-sm px-10 py-7 rounded-none text-sm border-2 font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors">
                  View Catalog
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Benefits Bar */}
      <div className="border-y bg-slate-50/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="shrink-0 p-2 bg-primary/5 rounded-full">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-1">{stat.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
