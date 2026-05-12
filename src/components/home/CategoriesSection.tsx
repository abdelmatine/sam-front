"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Activity } from 'lucide-react';

const CategoriesSection = () => {
  const respiratoryImage = PlaceHolderImages.find(img => img.id === 'category-respiratory');
  const accessoriesImage = PlaceHolderImages.find(img => img.id === 'category-accessories');
  const monitoringImage = PlaceHolderImages.find(img => img.id === 'category-monitoring');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-32 bg-slate-950 text-white overflow-hidden relative">
      {/* Background clinical decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 border-l-4 border-primary pl-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Technical Classification</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">
            Specialized <span className="text-primary">Categories</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl font-medium italic leading-relaxed">
            Precision engineered equipment for every respiratory need. Our catalogue is organized by clinical application to ensure rapid identification of necessary solutions.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-12 gap-6 h-auto lg:h-[700px]"
        >
          {/* Main Category: Respiratory Care */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7 relative group overflow-hidden border border-white/10 bg-slate-900 clinical-shadow"
          >
            <Link href="/shop?category=respiratory" className="block h-full min-h-[400px]">
              {respiratoryImage && (
                <Image 
                  src={respiratoryImage.imageUrl}
                  alt="Respiratory Care"
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                  data-ai-hint="medical device monitor"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <Badge className="bg-primary text-white mb-6 rounded-none text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 border-none shadow-lg shadow-primary/20">
                  Professional Choice
                </Badge>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">Respiratory Care</h3>
                <p className="text-white/60 text-sm mb-8 max-w-md font-medium italic">
                  Advanced CPAP, BPAP, and Oxygen Concentrators engineered for critical home therapy and clinical support.
                </p>
                <div className="flex items-center gap-2 text-primary font-bold uppercase text-[10px] tracking-[0.3em] group-hover:gap-4 transition-all">
                  Explore Selection <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side Categories */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-6">
            {/* Protective Gear */}
            <motion.div 
              variants={itemVariants}
              className="relative group overflow-hidden border border-white/10 bg-slate-900 clinical-shadow"
            >
              <Link href="/shop?category=others" className="block h-full min-h-[250px]">
                {accessoriesImage && (
                  <Image 
                    src={accessoriesImage.imageUrl}
                    alt="Protective Gear"
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-105 opacity-50 group-hover:opacity-100"
                    data-ai-hint="medical gloves apparel"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-t" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">Protective Gear</h3>
                  <p className="text-white/60 text-xs mb-6 font-medium italic">Nitrile Gloves & Medical Apparel</p>
                  <div className="h-[2px] w-12 bg-primary group-hover:w-24 transition-all" />
                </div>
              </Link>
            </motion.div>

            {/* Clinical Supplies */}
            <motion.div 
              variants={itemVariants}
              className="relative group overflow-hidden border border-white/10 bg-slate-900 clinical-shadow"
            >
              <Link href="/shop?category=accessories" className="block h-full min-h-[250px]">
                {monitoringImage && (
                  <Image 
                    src={monitoringImage.imageUrl}
                    alt="Clinical Supplies"
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-105 opacity-50 group-hover:opacity-100"
                    data-ai-hint="medical kits filters"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-t" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">Clinical Supplies</h3>
                  <p className="text-white/60 text-xs mb-6 font-medium italic">Calibration Kits & Filters</p>
                  <div className="h-[2px] w-12 bg-primary group-hover:w-24 transition-all" />
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
