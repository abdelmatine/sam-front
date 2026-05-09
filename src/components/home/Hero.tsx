"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShieldCheck, ArrowRight, Activity } from 'lucide-react';

const Hero = () => {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-cpap');

  return (
    <section className="relative pt-32 pb-20 overflow-hidden hero-gradient">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary py-1 px-3 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                FDA Approved & Certified
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-headline font-bold leading-tight">
              Advanced <span className="text-primary">Respiratory Care</span> Solutions
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed">
              Premium CPAP, BPAP, Oxygen Concentrators, and Medical Accessories designed for home and clinical excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/shop">
                <Button className="bg-primary text-white px-8 py-6 rounded-xl text-lg hover:bg-primary/90 transition-all shadow-lg medical-shadow group">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-8 py-6 rounded-xl text-lg border-2">
                  Request Consultation
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-8 pt-8 border-t border-border/50">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">15k+</span>
                <span className="text-sm text-muted-foreground">Patients Served</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">500+</span>
                <span className="text-sm text-muted-foreground">Clinics Trusted</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">24/7</span>
                <span className="text-sm text-muted-foreground">Expert Support</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl medical-shadow"
          >
            {heroImage && (
              <Image 
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage.imageHint}
              />
            )}
            {/* Overlay Elements */}
            <div className="absolute top-8 right-8 glass-morphism p-4 rounded-2xl flex items-center gap-4 animate-bounce-slow">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Real-time Oxygen Level</p>
                <p className="text-lg font-bold">98% SpO2</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] -z-10" />
    </section>
  );
};

export default Hero;