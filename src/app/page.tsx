
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
import { ShoppingCart, ArrowRight, ShieldCheck, Activity, Mail, Loader2, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { RootState } from '@/store';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
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

  const handleWishlist = (product: any) => {
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      brand: product.brand
    }));
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Hero />
      <CategoriesSection />

      {/* Flagship Equipment */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-950/50 overflow-hidden border-b">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
          >
            <div className="border-l-4 border-primary pl-6">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Top Tier Solutions</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">Flagship Equipment</h2>
              <p className="text-slate-500 text-sm italic font-medium">Our most trusted and highly-rated clinical solutions.</p>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary/5 rounded-none px-6 py-6 h-auto">
                View All Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10">
            {featuredProducts.map((product, index) => {
              const isWishlisted = wishlist.some(item => item.id === product.id);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <Card className="rounded-none border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 overflow-hidden group transition-all duration-700 hover:shadow-2xl hover:shadow-primary/5 h-full relative">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleWishlist(product);
                      }}
                      className={cn(
                        "absolute top-6 right-6 z-20 rounded-none transition-all duration-300",
                        isWishlisted ? "text-destructive bg-destructive/5" : "text-slate-300 hover:text-primary hover:bg-primary/5"
                      )}
                    >
                      <Heart className={cn("h-5 w-5", isWishlisted && "fill-destructive")} />
                    </Button>

                    <CardContent className="p-0 flex flex-col xl:flex-row h-full">
                      {/* Image Side */}
                      <div className="relative w-full xl:w-72 h-72 xl:h-auto shrink-0 bg-slate-50 dark:bg-slate-800/50 overflow-hidden">
                        <Image 
                          src={product.imageUrl} 
                          alt={product.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </div>

                      {/* Content Side */}
                      <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-t xl:border-t-0 xl:border-l border-slate-100 dark:border-white/5">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[9px] text-primary font-bold tracking-[0.3em] uppercase">ISO Certified Clinical Grade</span>
                          </div>
                          
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 block">{product.brand}</span>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-tight leading-tight">{product.name}</h3>
                          
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-8 line-clamp-3 leading-relaxed font-medium italic">
                            {product.description || "Ultra-quiet operation with advanced humidification and smart data tracking for clinical accuracy at home."}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-6 border-t border-slate-50 dark:border-white/5 gap-6">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">MSRP Acquisition</span>
                            <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter">${product.price.toLocaleString()}.00</span>
                          </div>
                          
                          <div className="flex gap-3 w-full sm:w-auto">
                            <Link href={`/product/${product.id}`} className="flex-1 sm:flex-initial">
                              <Button variant="outline" className="w-full sm:w-auto rounded-none h-14 px-6 text-[10px] font-bold uppercase tracking-widest border-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                Specifications
                              </Button>
                            </Link>
                            <Button 
                              onClick={() => handleAddToCart(product)}
                              disabled={addingId === product.id}
                              className="bg-primary text-white h-14 w-14 p-0 rounded-none shadow-xl shadow-primary/20 transition-all active:scale-95 group/btn shrink-0"
                            >
                              {addingId === product.id ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShoppingCart className="h-6 w-6 group-hover/btn:scale-110 transition-transform" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden border-b">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="border-l-4 border-primary pl-8 md:pl-12">
                <div className="flex items-center gap-2 mb-6">
                  <Activity className="h-5 w-5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Clinical Excellence</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 leading-tight uppercase tracking-tighter">
                  Why SAM Médicale <br /> <span className="text-primary">Solutions?</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 leading-relaxed font-medium italic max-w-xl">
                  SAM Médicale is more than just a supplier. We are a technical partner committed to clinical excellence. Every device in our inventory undergoes a rigorous 15-point calibration check before shipping.
                </p>
                
                <div className="grid sm:grid-cols-1 gap-10">
                  {[
                    { 
                      icon: Activity, 
                      title: "Precision Calibration", 
                      desc: "Our in-house clinical laboratory ensures every machine meets original manufacturer specifications with surgical precision." 
                    },
                    { 
                      icon: ShieldCheck, 
                      title: "Compliance First", 
                      desc: "We operate in full compliance with ISO 13485:2016 quality management standards for medical devices." 
                    }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 10 }}
                      className="flex gap-6 group cursor-default"
                    >
                      <div className="shrink-0 h-14 w-14 bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <item.icon className="h-7 w-7 transition-colors duration-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-xs tracking-widest group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Asymmetric Image Grid */}
            <div className="relative h-[500px] md:h-[600px] w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute top-0 right-0 w-4/5 h-4/5 z-0 grayscale hover:grayscale-0 transition-all duration-300 border-8 border-white dark:border-slate-900 shadow-2xl overflow-hidden cursor-pointer rounded-3xl"
              >
                <Image src="https://picsum.photos/seed/med10/800/1000" alt="Laboratory" fill className="object-cover" data-ai-hint="medical laboratory" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute bottom-0 left-0 w-3/5 h-3/5 z-10 grayscale hover:grayscale-0 transition-all duration-300 border-8 border-white dark:border-slate-900 shadow-2xl overflow-hidden cursor-pointer rounded-3xl"
              >
                <Image src="https://picsum.photos/seed/med11/800/1000" alt="Medical Tech" fill className="object-cover" data-ai-hint="medical device technician" />
                <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
              </motion.div>
              
              {/* Floating Stat Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 bg-primary text-white p-8 z-20 hidden md:block shadow-xl rounded-2xl"
              >
                <div className="text-4xl font-bold tracking-tighter mb-1">98%</div>
                <div className="text-[9px] font-bold uppercase tracking-widest opacity-80">Success Rate</div>
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
        transition={{ duration: 2.0 }}
        className="py-24 bg-slate-900 text-white"
      >
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Mail className="h-8 w-8 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4 uppercase tracking-tighter">Professional Updates</h2>
          <p className="text-slate-400 mb-10 text-sm font-medium italic">
            Stay informed on the latest respiratory technology and receive automated reminders for equipment calibration and filter replacements.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Medical Email Address" 
              className="flex-1 bg-white/5 border border-white/10 px-6 py-4 outline-none focus:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest"
            />
            <Button className="bg-primary text-white font-bold px-10 h-auto rounded-none hover:bg-primary/90 transition-all uppercase tracking-widest text-[10px]">
              Subscribe
            </Button>
          </div>
          <p className="text-[10px] text-slate-500 mt-8 font-bold tracking-[0.2em] uppercase">
            Data handled according to HIPAA guidelines.
          </p>
        </div>
      </motion.section>
    </main>
  );
}
