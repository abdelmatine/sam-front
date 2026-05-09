"use client";

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import CategoriesSection from '@/components/home/CategoriesSection';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import { ShoppingCart, ArrowRight, ShieldCheck, Activity, Mail, Facebook, Twitter, Instagram, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function Home() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [addingId, setAddingId] = useState<string | null>(null);
  const featuredProducts = products.slice(0, 2);

  const handleAddToCart = (product: any) => {
    setAddingId(product.id);
    setTimeout(() => {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        brand: product.brand
      }));
      toast({
        title: "Selection Updated",
        description: `${product.name} added to cart.`,
      });
      setAddingId(null);
    }, 400);
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Hero />
      <CategoriesSection />

      {/* Flagship Equipment */}
      <section className="py-24 bg-slate-50/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-16"
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Flagship Equipment</h2>
              <p className="text-slate-500 text-sm">Our most trusted and highly-rated solutions.</p>
            </div>
            <Link href="/shop" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border p-6 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 items-center group transition-shadow hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className="relative w-full sm:w-40 h-40 shrink-0 bg-slate-50 flex items-center justify-center">
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    fill 
                    className="object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-3 w-3 text-slate-400" />
                    <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">ISO Certified</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                  <p className="text-slate-500 text-xs mb-6 line-clamp-2 leading-relaxed">
                    Ultra-quiet operation with advanced humidification and smart data tracking for clinical accuracy at home.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-slate-900">${product.price.toLocaleString()}.00</span>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      disabled={addingId === product.id}
                      className="bg-primary text-white h-10 w-10 p-0 rounded-none shadow-lg shadow-primary/20 transition-transform active:scale-90"
                    >
                      {addingId === product.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-50/50 p-8 md:p-12 lg:p-20 border border-emerald-100"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight">Why RespiraMed Solutions?</h2>
              <p className="text-slate-600 mb-10 leading-relaxed">
                RespiraMed is more than just a supplier. We are a technical partner committed to clinical excellence. Every device in our inventory undergoes a rigorous 15-point calibration check before shipping.
              </p>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="shrink-0 h-10 w-10 bg-emerald-100 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Precision Calibration</h4>
                    <p className="text-sm text-slate-500">In-house laboratory ensures every machine meets original manufacturer specs.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 h-10 w-10 bg-emerald-100 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Compliance First</h4>
                    <p className="text-sm text-slate-500">Fully compliant with ISO 13485:2016 quality management standards.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-4 h-[300px] md:h-[500px]">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative h-full bg-slate-100"
              >
                <Image src="https://picsum.photos/seed/med10/600/800" alt="Laboratory" fill className="object-cover" data-ai-hint="medical laboratory" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative h-full bg-slate-100"
              >
                <Image src="https://picsum.photos/seed/med11/600/800" alt="Medical Tech" fill className="object-cover" data-ai-hint="medical device technician" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-slate-900 text-white"
      >
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Mail className="h-8 w-8 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Professional Updates & Reminders</h2>
          <p className="text-slate-400 mb-10">
            Stay informed on the latest respiratory technology and receive automated reminders for equipment calibration and filter replacements.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Medical Email Address" 
              className="flex-1 bg-white/10 border border-white/20 px-6 py-4 outline-none focus:bg-white/20 transition-all text-sm"
            />
            <Button className="bg-emerald-400 text-slate-900 font-bold px-10 h-auto rounded-none hover:bg-emerald-300">
              Subscribe
            </Button>
          </div>
          <p className="text-[10px] text-slate-500 mt-6">
            We respect clinical privacy. Data handled according to HIPAA guidelines.
          </p>
        </div>
      </motion.section>

      {/* Footer Branding Fix */}
      <footer className="bg-white border-t py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">SAM Médicale Solutions</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-8">
                Global provider of clinical respiratory solutions and specialized medical equipment. ISO 13485 Certified.
              </p>
              <div className="flex gap-4">
                <Facebook className="h-4 w-4 text-slate-400 cursor-pointer hover:text-primary transition-colors" />
                <Twitter className="h-4 w-4 text-slate-400 cursor-pointer hover:text-primary transition-colors" />
                <Instagram className="h-4 w-4 text-slate-400 cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Equipment</h4>
              <ul className="space-y-4 text-xs text-slate-500">
                <li className="hover:text-primary cursor-pointer transition-colors">CPAP Machines</li>
                <li className="hover:text-primary cursor-pointer transition-colors">BPAP Therapy</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Oxygen Concentrators</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Humidifiers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Services</h4>
              <ul className="space-y-4 text-xs text-slate-500">
                <li className="hover:text-primary cursor-pointer transition-colors">Calibration Services</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Maintenance Plans</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Facility Procurement</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Clinical Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4 text-xs text-slate-500">
                <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Shipping & Returns</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Contact Support</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-slate-400">© {new Date().getFullYear()} SAM Médicale Solutions. ISO 13485 Certified Medical Supplies.</p>
            <div className="flex gap-8 text-[10px] text-slate-400">
              <span className="hover:text-primary cursor-pointer">Security</span>
              <span className="hover:text-primary cursor-pointer">Sitemap</span>
              <span className="hover:text-primary cursor-pointer">Certifications</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
