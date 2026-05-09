"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

const CategoriesSection = () => {
  const respiratoryImage = PlaceHolderImages.find(img => img.id === 'category-respiratory');
  const accessoriesImage = PlaceHolderImages.find(img => img.id === 'category-accessories');
  const monitoringImage = PlaceHolderImages.find(img => img.id === 'category-monitoring');

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Specialized Categories</h2>
          <p className="text-slate-500 text-sm">Precision engineered equipment for every respiratory need.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Main Category */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="lg:col-span-2 relative group overflow-hidden bg-slate-100"
          >
            <Link href="/shop?category=respiratory" className="block h-full">
              {respiratoryImage && (
                <Image 
                  src={respiratoryImage.imageUrl}
                  alt="Respiratory Care"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  data-ai-hint="medical device monitor"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <Badge className="bg-emerald-500 text-white mb-4 rounded-none text-[10px] uppercase font-bold tracking-widest px-3">
                  Professional Choice
                </Badge>
                <h3 className="text-3xl font-bold mb-2">Respiratory Care</h3>
                <p className="text-white/70 text-sm">CPAP, BPAP, and Oxygen Concentrators</p>
              </div>
            </Link>
          </motion.div>

          {/* Side Categories */}
          <div className="grid gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative group overflow-hidden bg-slate-100"
            >
              <Link href="/shop?category=others" className="block h-full">
                {accessoriesImage && (
                  <Image 
                    src={accessoriesImage.imageUrl}
                    alt="Protective Gear"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    data-ai-hint="medical gloves apparel"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-1">Protective Gear</h3>
                  <p className="text-white/70 text-xs">Nitrile Gloves & Medical Apparel</p>
                </div>
              </Link>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="relative group overflow-hidden bg-slate-100"
            >
              <Link href="/shop?category=accessories" className="block h-full">
                {monitoringImage && (
                  <Image 
                    src={monitoringImage.imageUrl}
                    alt="Clinical Supplies"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    data-ai-hint="medical kits filters"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-1">Clinical Supplies</h3>
                  <p className="text-white/70 text-xs">Calibration Kits & Filters</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
