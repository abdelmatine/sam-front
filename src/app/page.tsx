"use client";

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import CategoriesSection from '@/components/home/CategoriesSection';
import FlagshipEquipment from '@/components/home/FlagshipEquipment';
import WhyUs from '@/components/home/WhyUs';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Hero />
      <CategoriesSection />
      <FlagshipEquipment />
      <WhyUs />
      <Newsletter />
    </main>
  );
}