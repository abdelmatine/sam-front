
"use client";

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import ClinicalTicker from '@/components/home/ClinicalTicker';
import CategoriesSection from '@/components/home/CategoriesSection';
import FlagshipEquipment from '@/components/home/FlagshipEquipment';
import WhyUs from '@/components/home/WhyUs';
import Newsletter from '@/components/home/Newsletter';
import { motion } from 'framer-motion';

const SectionDivider = () => (
  <div className="w-full flex items-center justify-center overflow-hidden py-4">
    <div className="h-px flex-1 bg-border/40" />
    <div className="flex items-center gap-2 px-8 opacity-20">
      <div className="h-1 w-1 rounded-full bg-primary" />
      <div className="h-[2px] w-10 bg-primary rounded-full" />
      <div className="h-1 w-1 rounded-full bg-primary" />
    </div>
    <div className="h-px flex-1 bg-border/40" />
  </div>
);

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SectionDivider />
      <ClinicalTicker />
      <SectionDivider />
      <CategoriesSection />
      <SectionDivider />
      <FlagshipEquipment />
      <SectionDivider />
      <WhyUs />
      <SectionDivider />
      <Newsletter />
    </main>
  );
}
