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
  Activity,
  X
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
  SheetClose,
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
    { label: 'FR', code: 'fr' },
    { label: 'EN', code: 'en' },
    { label: 'AR', code: 'ar' },
  ];

  const categories = [
    { label: t.categories.view_all, value: '' },
    { label: t.categories.cpap, value: 'cpap' },
    { label: t.categories.bpap, value: 'bpap' },
    { label: t.categories.oxygen, value: 'oxygen' },
    { label: t.categories.masks, value: 'masks' },
    { label: t.categories.accessories, value: 'accessories' },
    { label: t.categories.monitoring, value: 'monitoring' },
    { label: t.categories.consumables, value: 'consumables' },
    { label: t.categories.others, value: 'others' },
  ];

  const categoryItems = categories.map(cat => ({
    label: cat.label,
    href: cat.value ? `/shop/${cat.value}` : '/shop',
    value: cat.value
  }));

  const languageItems = languages.map(l => ({
    label: l.label,
    value: l.code,
    isActive: lang === l.code,
    onClick: () => dispatch(setLanguage(l.code))
  }));

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
      isScrolled 
        ? "bg-background/90 backdrop-blur-xl py-2 border-b border-primary/10 clinical-shadow" 
        : "bg-background py-4"
    )}>
      <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-3 items-center">
        <div className="flex justify-start">
          <Logo />
        </div>

        <div className="hidden lg:flex justify-center">
          <nav className="flex items-center gap-8">
            <ClinicalDropdown 
              isHoverable={true}
              trigger={
                <Link href="/shop">
                  <Button variant="ghost" className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary gap-1 h-auto py-1.5 group">
                    {t.nav.catalogue}
                    <ChevronDown className="h-2.5 w-2.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Button>
                </Link>
              }
              items={categoryItems}
            />
            {[
              { label: t.nav.services, href: '/services' },
              { label: t.nav.about, href: '/about' },
              { label: t.nav.contact, href: '/contact' }
            ].map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all relative group py-1.5"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex justify-end items-center gap-2">
          <div className="hidden lg:flex items-center gap-1.5">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ y: 5, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -5, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                </motion.div>
              </AnimatePresence>
            </Button>

            <ClinicalDropdown
              isHoverable={true}
              align="end"
              variant="compact"
              className="min-w-[100px]"
              trigger={
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all group">
                  <Globe className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-12" />
                </Button>
              }
              items={languageItems}
            />

            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5">
                <Heart className={cn("h-3.5 w-3.5 transition-all", wishlistCount > 0 && "fill-primary text-primary")} />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-3 w-3 flex items-center justify-center p-0 text-[6px] bg-primary text-white rounded-full font-black border-none ring-1 ring-background">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          <div className="hidden lg:block h-4 w-[1px] bg-primary/10 mx-1" />

          <Link href="/cart" className="hidden lg:block">
            <Button 
              className="relative h-9 px-5 bg-primary text-white rounded-none text-[9px] font-bold uppercase tracking-[0.15em] hover:bg-primary/90 transition-all shadow-lg flex items-center gap-2.5 active:scale-95"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              {t.nav.cart}
              {cartQuantity > 0 && (
                <span className="bg-white text-primary rounded-full px-1.5 py-0.5 text-[7px] font-black">
                  {cartQuantity}
                </span>
              )}
            </Button>
          </Link>

          <div className="flex lg:hidden items-center gap-1.5">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 text-muted-foreground"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <ShoppingCart className="h-4 w-4" />
                {cartQuantity > 0 && (
                  <Badge className="absolute top-1 right-1 h-3.5 w-3.5 flex items-center justify-center p-0 text-[7px] bg-primary text-white rounded-full">
                    {cartQuantity}
                  </Badge>
                )}
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 border border-primary/10 rounded-none">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "left" : "right"} className="w-full sm:max-w-xs p-0 flex flex-col h-full bg-background [&>button]:hidden">
                <SheetHeader className="p-6 pb-2 flex flex-row items-center justify-between">
                  <Logo />
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto px-6 py-8">
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    <AccordionItem value="shop" className="border-none">
                      <AccordionTrigger className="p-0 hover:no-underline font-headline font-bold text-xl uppercase tracking-tighter">
                        {t.nav.catalogue}
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pl-4 space-y-3 border-l border-primary/10">
                        {categories.map((cat) => (
                          <Link 
                            key={cat.value}
                            href={cat.value ? `/shop/${cat.value}` : '/shop'}
                            className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block py-1"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                    <div className="space-y-6 pt-2">
                      <Link href="/services" className="block text-xl font-headline font-bold uppercase tracking-tighter">{t.nav.services}</Link>
                      <Link href="/about" className="block text-xl font-headline font-bold uppercase tracking-tighter">{t.nav.about}</Link>
                      <Link href="/contact" className="block text-xl font-headline font-bold uppercase tracking-tighter">{t.nav.contact}</Link>
                    </div>
                  </Accordion>
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