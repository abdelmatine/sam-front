"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setLanguage, Language } from '@/store/slices/i18nSlice';
import { useTranslation } from '@/hooks/use-translation';
import { ShoppingCart, Menu, Activity, Sun, Moon, Heart, ChevronDown, Plus, Minus, X, ShieldCheck, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import ClinicalDropdown from '@/components/shared/ClinicalDropdown';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);
  const { t, lang, isRTL } = useTranslation();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Lock for Mobile Sidebar
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  if (!mounted) return null;

  const languages: { label: string; code: Language }[] = [
    { label: 'Français', code: 'fr' },
    { label: 'English', code: 'en' },
    { label: 'العربية', code: 'ar' },
  ];

  const categories = [
    { label: t.categories.view_all, value: 'all' },
    { label: t.categories.respiratory, value: 'respiratory' },
    { label: t.categories.oxygen, value: 'oxygen' },
    { label: t.categories.accessories, value: 'accessories' },
    { label: t.categories.monitoring, value: 'monitoring' },
    { label: t.categories.others, value: 'others' },
  ];

  const sidebarVariants = {
    closed: { x: isRTL ? '-100%' : '100%' },
    open: { 
      x: 0,
      transition: { type: 'spring', damping: 35, stiffness: 300 }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 15 },
    open: { opacity: 1, y: 0 }
  };

  const categoryItems = categories.map(cat => ({
    label: cat.label,
    href: `/shop?category=${cat.value}`,
    value: cat.value
  }));

  const languageItems = languages.map(l => ({
    label: l.label,
    onClick: () => {
      dispatch(setLanguage(l.code));
      setMobileMenuOpen(false);
    },
    isActive: lang === l.code,
    value: l.code
  }));

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
      isScrolled ? "bg-background/95 backdrop-blur-md py-2 border-b clinical-shadow" : "bg-background py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-10 w-10 rounded-full bg-primary flex items-center justify-center relative overflow-hidden border-4 border-primary/20 clinical-shadow"
            >
              <Activity className="h-5 w-5 text-white" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
            </motion.div>
          </Link>
          
          <Link href="/">
            <motion.span 
              whileHover={{ scale: 1.05, x: 2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="font-headline font-bold text-lg tracking-tighter text-foreground inline-block"
            >
              SAM <span className="text-primary">Médicale</span>
            </motion.span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 h-full">
          <ClinicalDropdown 
            isHoverable={true}
            trigger={
              <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-primary gap-1.5 h-auto py-2 outline-none">
                {t.nav.shop}
                <ChevronDown className="h-3 w-3" />
              </Button>
            }
            items={categoryItems}
          />

          <Link href="/about" className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-all">
            {t.nav.about}
          </Link>
          <Link href="/contact" className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-all">
            {t.nav.contact}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 text-muted-foreground hidden sm:flex outline-none"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <div className="hidden sm:flex">
            <ClinicalDropdown 
              isHoverable={true}
              align="end"
              trigger={
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground outline-none">
                  <Globe className="h-4 w-4" />
                </Button>
              }
              items={languageItems}
            />
          </div>

          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground outline-none">
              <Heart className={cn("h-4 w-4", wishlistCount > 0 && "fill-primary text-primary")} />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[8px] bg-primary text-white rounded-full font-bold border-none">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground outline-none">
              <ShoppingCart className="h-4 w-4" />
              {cartQuantity > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[8px] bg-primary text-white rounded-full font-bold border-none">
                  {cartQuantity}
                </Badge>
              )}
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-foreground outline-none"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/90 backdrop-blur-md z-[140] lg:hidden"
            />
            <motion.div 
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={cn(
                "fixed top-0 bottom-0 w-[85%] max-w-[400px] bg-background border-l z-[150] lg:hidden flex flex-col p-8 overflow-y-auto",
                isRTL ? "left-0" : "right-0"
              )}
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <Activity className="h-6 w-6 text-primary" />
                  <span className="font-headline font-bold text-xl tracking-tighter uppercase">SAM Médicale</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="rounded-full hover:bg-accent">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                <motion.div variants={itemVariants} transition={{ delay: 0.1 }}>
                  <div className="flex items-center justify-between">
                    <Link 
                      href="/shop" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-bold uppercase tracking-tight py-4 flex-1"
                    >
                      {t.nav.shop}
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setMobileShopOpen(!mobileShopOpen)}>
                      {mobileShopOpen ? <Minus className="h-4 w-4 text-primary" /> : <Plus className="h-4 w-4" />}
                    </Button>
                  </div>
                  <AnimatePresence>
                    {mobileShopOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="flex flex-col gap-1 pl-4 border-l-2 border-primary/20 overflow-hidden"
                      >
                        {categories.map((cat, idx) => (
                          <motion.div
                            key={cat.value}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link
                              href={`/shop?category=${cat.value}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground py-4 block"
                            >
                              {cat.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Separator className="opacity-50" />
                </motion.div>

                <motion.div variants={itemVariants} transition={{ delay: 0.2 }}>
                  <Link 
                    href="/about" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-bold uppercase tracking-tight py-4 block"
                  >
                    {t.nav.about}
                  </Link>
                  <Separator className="opacity-50" />
                </motion.div>

                <motion.div variants={itemVariants} transition={{ delay: 0.3 }}>
                  <Link 
                    href="/contact" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-bold uppercase tracking-tight py-4 block"
                  >
                    {t.nav.contact}
                  </Link>
                  <Separator className="opacity-50" />
                </motion.div>
              </div>

              <div className="mt-auto pt-10 flex items-center justify-between border-t border-border/50">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="h-12 w-12 rounded-full border-border hover:bg-primary/5"
                  >
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>

                  <ClinicalDropdown 
                    align="end"
                    trigger={
                      <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-border outline-none hover:bg-primary/5">
                        <Globe className="h-5 w-5" />
                      </Button>
                    }
                    items={languageItems}
                  />
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest opacity-60">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Grade Médical
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
