"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setLanguage, Language } from '@/store/slices/i18nSlice';
import { useTranslation } from '@/hooks/use-translation';
import { 
  ShoppingCart, 
  Menu, 
  Sun, 
  Moon, 
  Heart, 
  ChevronDown, 
  Globe, 
  ShieldCheck,
  Phone,
  Mail,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ClinicalDropdown from '@/components/shared/ClinicalDropdown';
import Logo from '@/components/shared/Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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

  const categoryItems = categories.map(cat => ({
    label: cat.label,
    href: `/shop?category=${cat.value}`,
    value: cat.value
  }));

  const languageItems = languages.map(l => ({
    label: l.label,
    onClick: () => dispatch(setLanguage(l.code)),
    isActive: lang === l.code,
    value: l.code
  }));

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
      isScrolled 
        ? "bg-background/90 backdrop-blur-xl py-3 border-b border-primary/10 clinical-shadow" 
        : "bg-background py-5"
    )}>
      <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-3 items-center">
        {/* Left: Branding */}
        <div className="flex justify-start">
          <Logo />
        </div>

        {/* Center: Main Navigation (Desktop Only) */}
        <div className="hidden lg:flex justify-center">
          <nav className="flex items-center gap-10">
            <ClinicalDropdown 
              isHoverable={true}
              trigger={
                <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-primary gap-1.5 h-auto py-2 group">
                  {t.nav.shop}
                  <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Button>
              }
              items={categoryItems}
            />
            {[
              { label: t.nav.about, href: '/about' },
              { label: t.nav.contact, href: '/contact' }
            ].map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-all relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex justify-end items-center gap-3">
          <div className="hidden lg:flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ y: 10, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -10, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.div>
              </AnimatePresence>
            </Button>

            <ClinicalDropdown 
              isHoverable={true}
              align="end"
              trigger={
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/5 group">
                  <Globe className="h-4 w-4" />
                </Button>
              }
              items={languageItems}
            />

            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/5">
                <Heart className={cn("h-4 w-4 transition-all", wishlistCount > 0 && "fill-primary text-primary")} />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-3.5 w-3.5 flex items-center justify-center p-0 text-[7px] bg-primary text-white rounded-full font-black border-none ring-2 ring-background">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          <div className="hidden lg:block h-6 w-[1px] bg-primary/10 mx-1" />

          <Link href="/cart" className="hidden lg:block">
            <Button 
              className="relative h-11 px-7 bg-primary text-white rounded-none text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 active:scale-95"
            >
              <ShoppingCart className="h-4 w-4" />
              {t.nav.cart}
              {cartQuantity > 0 && (
                <span className="bg-white text-primary rounded-full px-2 py-0.5 text-[8px] font-black">
                  {cartQuantity}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Navigation Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-10 w-10 text-muted-foreground">
                <ShoppingCart className="h-5 w-5" />
                {cartQuantity > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[8px] bg-primary text-white rounded-full font-bold border-none">
                    {cartQuantity}
                  </Badge>
                )}
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 border border-primary/10 rounded-none">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "left" : "right"} className="w-full sm:max-w-md p-0 flex flex-col h-full bg-background/95 backdrop-blur-xl border-primary/10">
                <SheetHeader className="p-8 pb-4 border-b border-primary/5">
                  <div className="flex items-center justify-between">
                    <Logo />
                    <SheetTitle className="sr-only">Menu Clinique</SheetTitle>
                  </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-8 py-10">
                  <Accordion type="single" collapsible className="w-full space-y-6">
                    <AccordionItem value="shop" className="border-none">
                      <AccordionTrigger className="flex-row-reverse gap-4 p-0 hover:no-underline font-headline font-bold text-2xl uppercase tracking-tighter text-foreground">
                        <span className="flex-1 text-left">{t.nav.shop}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-6 pl-4 space-y-4">
                        {categories.map((cat, idx) => (
                          <motion.div
                            key={cat.value}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link 
                              href={`/shop?category=${cat.value}`}
                              className="text-xs font-bold uppercase tracking-widest text-muted-foreground py-2 block hover:text-primary transition-colors flex items-center gap-3"
                            >
                              <div className="h-1.5 w-1.5 bg-primary/20 rounded-full" />
                              {cat.label}
                            </Link>
                          </motion.div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    <div className="space-y-6 pt-2">
                      <Link href="/about" className="block text-2xl font-headline font-bold uppercase tracking-tighter text-foreground hover:text-primary transition-colors">
                        {t.nav.about}
                      </Link>
                      <Link href="/contact" className="block text-2xl font-headline font-bold uppercase tracking-tighter text-foreground hover:text-primary transition-colors">
                        {t.nav.contact}
                      </Link>
                      <Link href="/wishlist" className="block text-2xl font-headline font-bold uppercase tracking-tighter text-foreground hover:text-primary transition-colors flex items-center justify-between">
                        Wishlist
                        {wishlistCount > 0 && <Badge className="rounded-full bg-primary/10 text-primary border-none font-bold">{wishlistCount}</Badge>}
                      </Link>
                    </div>
                  </Accordion>

                  <div className="mt-16 space-y-8 pt-8 border-t border-primary/5">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Support Clinique</h4>
                      <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                        <div className="p-2.5 bg-primary/5 rounded-none border border-primary/10">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                        +33 (0) 1 23 45 67 89
                      </div>
                      <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                        <div className="p-2.5 bg-primary/5 rounded-none border border-primary/10">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        support@sam-medicale.fr
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-accent/20 border-t border-primary/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="h-10 w-10 rounded-none border-primary/10 bg-background"
                    >
                      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>

                    <ClinicalDropdown 
                      align="start"
                      side="top"
                      trigger={
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-none border-primary/10 bg-background">
                          <Globe className="h-4 w-4" />
                        </Button>
                      }
                      items={languageItems}
                      modal={false}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-primary/60">
                    <ShieldCheck className="h-4 w-4" />
                    Grade Médical
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
