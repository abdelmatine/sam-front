"use client";

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import CategoriesSection from '@/components/home/CategoriesSection';
import ProductCard from '@/components/shared/ProductCard';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import { CheckCircle2, Award, Truck, PhoneCall, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Home() {
  const { t, isRTL } = useTranslation();
  const featuredProducts = products.slice(0, 4);

  const benefits = [
    {
      icon: Award,
      title: "Authorized Dealer",
      desc: "100% original products from world-leading medical brands."
    },
    {
      icon: CheckCircle2,
      title: "Clinical Excellence",
      desc: "Every device is pre-inspected by our medical technicians."
    },
    {
      icon: Truck,
      title: "Express Logistics",
      desc: "Confidential and safe doorstep delivery globally."
    },
    {
      icon: PhoneCall,
      title: "Medical Support",
      desc: "Direct access to respiratory specialists for setup support."
    }
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <CategoriesSection />

      {/* Featured Products */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-headline font-bold mb-4">Solutions <span className="text-primary">Vedettes</span></h2>
              <p className="text-muted-foreground text-lg max-w-xl">Nos équipements les plus performants, choisis par les professionnels de santé.</p>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="rounded-2xl px-8 py-6 font-bold border-2 hover:bg-primary hover:text-white transition-all">
                {t.categories.view_all}
              </Button>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30"
          >
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8">Besoin d'Assistance <span className="text-accent">Professionnelle ?</span></h2>
              <p className="text-white/80 text-xl mb-12 leading-relaxed">
                Notre équipe de thérapeutes respiratoires est prête à vous aider à choisir l'équipement et la configuration adaptés à vos besoins.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button className="bg-white text-primary hover:bg-white/90 px-10 py-7 rounded-2xl text-xl font-bold shadow-lg">
                  Chat en Direct
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 py-7 rounded-2xl text-xl border-2 font-bold">
                  Consulter les FAQs
                </Button>
              </div>
            </div>
            {/* Abstract Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
          </motion.div>
        </div>
      </section>

      <footer className="bg-card border-t pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-8">
                <div className="bg-primary rounded-xl p-2">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <span className="font-headline font-bold text-2xl tracking-tight">RespiraMed</span>
              </Link>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                Leader mondial de la fourniture de soins respiratoires de haute précision. Certifié cliniquement pour votre tranquillité d'esprit.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">Navigation</h4>
              <ul className="flex flex-col gap-5 text-muted-foreground text-lg">
                <li><Link href="/shop" className="hover:text-primary transition-colors">Boutique</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">Notre Mission</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">Produits</h4>
              <ul className="flex flex-col gap-5 text-muted-foreground text-lg">
                <li><Link href="/shop?category=respiratory" className="hover:text-primary transition-colors">CPAP & BPAP</Link></li>
                <li><Link href="/shop?category=oxygen" className="hover:text-primary transition-colors">Concentrateurs</Link></li>
                <li><Link href="/shop?category=accessories" className="hover:text-primary transition-colors">Masques</Link></li>
                <li><Link href="/shop?category=monitoring" className="hover:text-primary transition-colors">Surveillance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">Contact</h4>
              <ul className="flex flex-col gap-5 text-muted-foreground text-lg">
                <li className="flex items-center gap-3">
                  <PhoneCall className="h-5 w-5 text-primary" />
                  +1 (800) RESPIRA
                </li>
                <li>support@respiramed.com</li>
                <li className="text-sm">123 Clinical Way, New York, NY 10001</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-sm text-muted-foreground font-medium">
              &copy; {new Date().getFullYear()} RespiraMed Solutions. Tous les dispositifs médicaux sont approuvés par la FDA.
            </p>
            <div className="flex gap-10">
              <span className="text-sm font-bold text-muted-foreground cursor-pointer hover:text-primary">Conditions</span>
              <span className="text-sm font-bold text-muted-foreground cursor-pointer hover:text-primary">Confidentialité</span>
              <span className="text-sm font-bold text-muted-foreground cursor-pointer hover:text-primary">Retours</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}