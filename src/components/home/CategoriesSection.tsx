"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'CPAP & BPAP Devices',
    count: '24 Products',
    href: '/shop?category=respiratory',
    image: 'category-respiratory'
  },
  {
    title: 'Oxygen Concentrators',
    count: '18 Products',
    href: '/shop?category=oxygen',
    image: 'category-respiratory'
  },
  {
    title: 'Masks & Accessories',
    count: '150+ Items',
    href: '/shop?category=accessories',
    image: 'category-accessories'
  },
  {
    title: 'Monitoring Equipment',
    count: '42 Products',
    href: '/shop?category=monitoring',
    image: 'category-monitoring'
  }
];

const CategoriesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Browse Our Specialist <span className="text-primary">Medical Collections</span></h2>
            <p className="text-muted-foreground">Discover high-precision equipment curated for respiratory health, patient monitoring, and home clinical support.</p>
          </div>
          <Link href="/shop" className="text-primary font-semibold flex items-center gap-1 hover:underline group">
            View All Categories
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => {
            const catImage = PlaceHolderImages.find(img => img.id === cat.image);
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={cat.href}>
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-4 shadow-md medical-shadow">
                    {catImage && (
                      <Image 
                        src={catImage.imageUrl}
                        alt={cat.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        data-ai-hint={catImage.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                      <span className="text-white/80 text-sm font-medium">{cat.count}</span>
                      <h3 className="text-white text-xl font-bold">{cat.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;