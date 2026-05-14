
"use client";

import React, { use, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { products } from '@/lib/products';
import { useTranslation } from '@/hooks/use-translation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { 
  ChevronRight, 
  ShoppingCart, 
  Heart, 
  Truck, 
  RefreshCcw, 
  Activity, 
  Star, 
  BadgeCheck,
  Package,
  Database,
  ChevronDown,
  PhoneCall,
  Mail,
  ShieldAlert,
  Copy,
  LayoutGrid
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/shared/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import ClinicalDropdown from '@/components/shared/ClinicalDropdown';

export default function ProductDetailPage({ params }: { params: Promise<{ categorySlug: string, productId: string }> }) {
  const { categorySlug, productId } = use(params);
  const { t, isRTL } = useTranslation();
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const product = products.find(p => p.id === productId);
  const isWishlisted = wishlist.some(item => item.id === productId);
  
  const relatedProducts = products
    .filter(p => p.category === categorySlug && p.id !== productId)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      brand: product.brand
    }));
    toast({
      title: t.product.selection_updated,
      description: `${product.name} ${t.product.added_to_cart_msg}`,
    });
  };

  const handleWishlist = () => {
    if (!product) return;
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      brand: product.brand
    }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const rightToLeftVariants = {
    hidden: { opacity: 0, x: isRTL ? -60 : 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const leftToRightVariants = {
    hidden: { opacity: 0, x: isRTL ? 60 : -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerDetails = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4
      }
    }
  };

  const specContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const specItemVariants = {
    hidden: { opacity: 0, x: isRTL ? -20 : 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] }
    }
  };

  if (!product) return null;

  const categoryName = (t.categories as any)[categorySlug] || categorySlug;

  const categoryItems = [
    { label: t.categories.view_all, href: '/shop' },
    { label: t.categories.cpap, href: '/shop/cpap' },
    { label: t.categories.bpap, href: '/shop/bpap' },
    { label: t.categories.oxygen, href: '/shop/oxygen' },
    { label: t.categories.masks, href: '/shop/masks' },
    { label: t.categories.accessories, href: '/shop/accessories' },
    { label: t.categories.monitoring, href: '/shop/monitoring' },
    { label: t.categories.consumables, href: '/shop/consumables' },
    { label: t.categories.others, href: '/shop/others' },
  ];

  const techSpecs = [
    { label: t.product.tech_ref, value: `SAM-PRD-${product.id}v2.5` },
    { label: t.product.classification, value: product.category.toUpperCase() },
    { label: t.product.origin, value: product.brand },
    { label: t.product.logistics, value: product.inStock ? t.product.ready : t.product.out_of_stock },
    { label: t.product.clinical_protocol, value: "Verified v4.0" },
    { label: t.product.compliance, value: "ISO 13485:2016" }
  ];

  return (
    <main className="min-h-screen pt-24 pb-20 bg-background relative overflow-hidden">
      <Navbar />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-10 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
          <Link href="/" className="hover:text-primary transition-colors">{t.catalogue.brand}</Link>
          <ChevronRight className={cn("h-2.5 w-2.5", isRTL && "rotate-180")} />
          <ClinicalDropdown 
            isHoverable={true}
            variant="compact"
            trigger={
              <div className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
                {t.nav.catalogue}
                <ChevronDown className="h-2.5 w-2.5" />
              </div>
            }
            items={categoryItems}
          />
          <ChevronRight className={cn("h-2.5 w-2.5", isRTL && "rotate-180")} />
          <Link href={`/shop/${categorySlug}`} className="hover:text-primary transition-colors">{categoryName}</Link>
          <ChevronRight className={cn("h-2.5 w-2.5", isRTL && "rotate-180")} />
          <span className="text-primary/80">{product.name}</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            <div className="relative aspect-square border border-primary/10 bg-accent/5 overflow-hidden clinical-shadow group">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                fill 
                className="object-contain p-12 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {product.isNew && (
                <div className={cn("absolute top-8", isRTL ? "right-8" : "left-8")}>
                  <Badge className="bg-primary text-white rounded-none text-[10px] uppercase font-bold tracking-widest px-4 py-2 border-none shadow-xl shadow-primary/20">
                    {t.product.new}
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="relative aspect-square border border-primary/5 bg-accent/3 overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer shadow-sm hover:shadow-lg"
                >
                  <Image src={`https://picsum.photos/seed/med-detail-${idx}/400/400`} alt="Detail" fill className="object-cover" />
                  <div className="absolute inset-0 bg-primary/5 opacity-40" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col">
            <motion.div 
              variants={staggerDetails}
              initial="hidden"
              animate="visible"
              className={cn("border-primary mb-10", isRTL ? "border-r-4 pr-8" : "border-l-4 pl-8")}
            >
              <motion.div variants={rightToLeftVariants} className="flex items-center gap-3 mb-4">
                <div className="p-1.5 bg-primary/10 rounded-sm">
                  <Database className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-[10px] text-primary font-bold uppercase tracking-[0.4em]">{t.catalogue.tech_id}: {product.brand.toUpperCase()}-v2</span>
              </motion.div>
              
              <motion.h1 variants={rightToLeftVariants} className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.9] mb-6">{product.name}</motion.h1>
              
              <motion.div variants={rightToLeftVariants} className="flex items-center gap-6 text-xs font-bold text-muted-foreground mb-8">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-4 w-4", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted")} />
                  ))}
                  <span className="ml-1 text-primary text-sm font-bold tracking-tighter">{product.rating}</span>
                </div>
                <div className="h-5 w-[1px] bg-border" />
                <span className="uppercase tracking-[0.2em] text-[10px] text-primary/60">{t.product.clinical_grade}</span>
              </motion.div>
              
              <motion.p variants={rightToLeftVariants} className="text-muted-foreground text-sm italic leading-relaxed font-medium max-w-lg">
                {product.description}
              </motion.p>
            </motion.div>

            <motion.div 
              variants={staggerDetails}
              initial="hidden"
              animate="visible"
              className="bg-accent/5 backdrop-blur-md border border-primary/10 py-10 px-10 mb-10 shadow-2xl shadow-primary/5 relative overflow-hidden"
            >
              <div className={cn("absolute top-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2", isRTL ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2")} />
              
              <motion.div variants={rightToLeftVariants} className="flex items-end gap-3 mb-10">
                <span className="text-5xl font-bold tracking-tighter text-foreground">${product.price.toLocaleString()}</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest pb-2 opacity-60">{t.product.acquisition}</span>
              </motion.div>

              <motion.div variants={rightToLeftVariants} className="flex flex-col sm:flex-row gap-4 relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="flex-1"
                >
                  <Button 
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="w-full bg-primary text-white h-16 rounded-none text-[11px] font-bold uppercase tracking-[0.25em] shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 transition-all hover:bg-primary/90"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {product.inStock ? t.product.add_to_cart : t.product.out_of_stock}
                  </Button>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <Button 
                    variant="outline" 
                    onClick={handleWishlist}
                    className={cn(
                      "h-16 w-16 rounded-none border-2 transition-all",
                      isWishlisted ? "text-destructive bg-destructive/5" : "border-primary/10 hover:bg-primary/5"
                    )}
                  >
                    <Heart className={cn("h-6 w-6 transition-all", isWishlisted && "fill-destructive")} />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={staggerDetails}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-4 mb-10"
            >
              {[
                { icon: BadgeCheck, label: t.product.warranty },
                { icon: Truck, label: t.product.delivery },
                { icon: RefreshCcw, label: t.product.returns },
                { icon: Package, label: t.product.ready }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={rightToLeftVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="flex items-center gap-4 p-5 border border-primary/5 bg-accent/3 hover:bg-primary/5 transition-colors group cursor-default"
                >
                  <item.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={staggerDetails}
              initial="hidden"
              animate="visible"
              className="border border-primary/10 bg-accent/5 p-8 rounded-none clinical-shadow relative overflow-hidden group cursor-default"
            >
              <div className={cn("absolute top-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2", isRTL ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2")} />
              <motion.h4 variants={rightToLeftVariants} className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" />
                {t.contact_info.support_title}
              </motion.h4>
              <motion.div variants={rightToLeftVariants} className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  onClick={() => handleCopy(t.contact_info.phone, "phone")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-4 p-4 border border-primary/5 bg-background/50 hover:bg-primary/5 transition-all group relative">
                    <div className="p-2 bg-primary/10 rounded-sm">
                      <PhoneCall className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">{t.product.tech_assistance}</div>
                      <div className="text-xs font-bold tracking-tight">{t.contact_info.phone}</div>
                    </div>
                    <div className="flex items-center justify-center min-w-[60px]">
                      <AnimatePresence mode="wait">
                        {copiedId === "phone" ? (
                          <motion.div
                            key="check"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="flex items-center gap-1.5"
                          >
                            <span className="text-[8px] font-bold text-primary uppercase tracking-[0.2em]">{t.product.copied}</span>
                            <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Copy className="h-3 w-3 text-primary/20 group-hover:text-primary transition-colors" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  onClick={() => handleCopy(t.contact_info.email, "email")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-4 p-4 border border-primary/5 bg-background/50 hover:bg-primary/5 transition-all group relative">
                    <div className="p-2 bg-primary/10 rounded-sm">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">{t.product.support_email}</div>
                      <div className="text-xs font-bold tracking-tight">{t.contact_info.email}</div>
                    </div>
                    <div className="flex items-center justify-center min-w-[60px]">
                      <AnimatePresence mode="wait">
                        {copiedId === "email" ? (
                          <motion.div
                            key="check"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="flex items-center gap-1.5"
                          >
                            <span className="text-[8px] font-bold text-primary uppercase tracking-[0.2em]">{t.product.copied}</span>
                            <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Copy className="h-3 w-3 text-primary/20 group-hover:text-primary transition-colors" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.p variants={rightToLeftVariants} className="mt-6 text-[9px] text-muted-foreground font-medium italic leading-relaxed">
                {t.product.support_disclaimer}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mb-24 pt-24 border-t border-primary/10">
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn("flex items-center gap-4 mb-12 border-primary", isRTL ? "border-r-4 pr-8" : "border-l-4 pl-8")}
          >
            <div className="p-2 bg-primary/10 rounded-none border border-primary/20">
              <LayoutGrid className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tighter">{t.product.specs}</h2>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.4em] mt-1 italic">{t.product.tech_file_v}</p>
            </div>
          </motion.div>

          <motion.div 
            variants={specContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {techSpecs.map((spec, i) => (
              <motion.div 
                key={i} 
                variants={specItemVariants}
                whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--primary) / 0.02)" }}
                className="flex justify-between items-center py-6 px-8 border border-primary/5 bg-accent/3 hover:border-primary/20 transition-all group cursor-default"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors">{spec.label}</span>
                <span className="text-xs font-bold uppercase tracking-tight text-foreground text-right">{spec.value}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="mt-12 bg-primary/[0.03] p-10 border border-primary/10 relative overflow-hidden"
          >
             <div className={cn("absolute top-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2", isRTL ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2")} />
             <p className="text-sm leading-relaxed text-muted-foreground font-medium italic relative z-10 max-w-4xl">
              {t.product.test_report.replace('{name}', product.name)}
            </p>
          </motion.div>
        </motion.div>

        {relatedProducts.length > 0 && (
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="pt-24 border-t border-primary/10"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 px-4 gap-6">
              <motion.div 
                variants={leftToRightVariants}
                className={cn("flex items-center gap-4 border-primary", isRTL ? "border-r-4 pr-8" : "border-l-4 pl-8")}
              >
                <Activity className="h-6 w-6 text-primary animate-pulse" />
                <div>
                  <h2 className="text-3xl font-bold uppercase tracking-tighter">{t.product.related_title}</h2>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.4em] mt-1">{t.product.sector}: {categoryName}</p>
                </div>
              </motion.div>
              
              <motion.div variants={rightToLeftVariants}>
                <Link href={`/shop/${categorySlug}`}>
                  <Button variant="ghost" className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary/5 h-12 px-8 rounded-none border border-transparent hover:border-primary/10 transition-all">
                    {t.product.view_all} <ChevronRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                  </Button>
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              variants={containerVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
            >
              {relatedProducts.map((p) => (
                <motion.div key={p.id} variants={itemVariants}>
                  <ProductCard product={p as any} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}
      </motion.div>
    </main>
  );
}
