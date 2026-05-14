"use client";

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import ClinicalTicker from '@/components/home/ClinicalTicker';
import CategoriesSection from '@/components/home/CategoriesSection';
import FlagshipEquipment from '@/components/home/FlagshipEquipment';
import WhyUs from '@/components/home/WhyUs';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ClinicalTicker />
      <div className="space-y-20 md:space-y-32">
        <CategoriesSection />
        <FlagshipEquipment />
        <WhyUs />
        <Newsletter />
      </div>
    </main>
  );
}