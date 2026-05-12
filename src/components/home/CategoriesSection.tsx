
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-32 bg-slate-50/50 dark:bg-slate-950 text-foreground overflow-hidden relative border-y">
      {/* Clinical atmosphere decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
          className="mb-24 border-l-4 border-primary pl-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary">Technical Classification</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tighter text-slate-900 dark:text-white">
            Specialized <span className="text-primary">Categories</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl font-medium italic leading-relaxed">
            Precision engineered equipment for every respiratory need. Our catalogue is organized by clinical application to ensure rapid identification of necessary solutions.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-12 gap-8 h-auto lg:h-[750px]"
        >
          {/* Main Category: Respiratory Care */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.005 }}
            className="lg:col-span-7 relative group overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 clinical-shadow rounded-none"
          >
            <Link href="/shop?category=respiratory" className="block h-full min-h-[450px]">
              {respiratoryImage && (
                <Image 
                  src={respiratoryImage.imageUrl}
                  alt="Respiratory Care"
                  fill
                  className="object-cover grayscale-[0.4] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                  data-ai-hint="medical device monitor"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
              <div className="absolute bottom-12 left-12 right-12">
                <Badge className="bg-primary text-white mb-8 rounded-none text-[11px] uppercase font-bold tracking-[0.25em] px-5 py-2.5 border-none shadow-xl shadow-primary/20">
                  Professional Choice
                </Badge>
                <h3 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight text-white">Respiratory Care</h3>
                <p className="text-white/80 text-sm md:text-base mb-10 max-w-lg font-medium italic leading-relaxed">
                  Advanced CPAP, BPAP, and Oxygen Concentrators engineered for critical home therapy and clinical support.
                </p>
                <div className="flex items-center gap-3 text-primary font-bold uppercase text-[11px] tracking-[0.4em] group-hover:gap-6 transition-all">
                  Explore Selection <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side Categories */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-8">
            {/* Protective Gear */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="relative group overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 clinical-shadow rounded-none"
            >
              <Link href="/shop?category=others" className="block h-full min-h-[280px]">
                {accessoriesImage && (
                  <Image 
                    src={accessoriesImage.imageUrl}
                    alt="Protective Gear"
                    fill
                    className="object-cover grayscale-[0.6] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                    data-ai-hint="medical gloves apparel"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <h3 className="text-3xl font-bold mb-3 uppercase tracking-tight text-white">Protective Gear</h3>
                  <p className="text-white/70 text-sm mb-8 font-medium italic">Nitrile Gloves & Medical Apparel</p>
                  <div className="h-[3px] w-16 bg-primary group-hover:w-32 transition-all duration-700" />
                </div>
              </Link>
            </motion.div>

            {/* Clinical Supplies */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="relative group overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 clinical-shadow rounded-none"
            >
              <Link href="/shop?category=accessories" className="block h-full min-h-[280px]">
                {monitoringImage && (
                  <Image 
                    src={monitoringImage.imageUrl}
                    alt="Clinical Supplies"
                    fill
                    className="object-cover grayscale-[0.6] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                    data-ai-hint="medical kits filters"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <h3 className="text-3xl font-bold mb-3 uppercase tracking-tight text-white">Clinical Supplies</h3>
                  <p className="text-white/70 text-sm mb-8 font-medium italic">Calibration Kits & Filters</p>
                  <div className="h-[3px] w-16 bg-primary group-hover:w-32 transition-all duration-700" />
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
