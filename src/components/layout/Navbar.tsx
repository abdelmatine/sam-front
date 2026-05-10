"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setLanguage, Language } from '@/store/slices/i18nSlice';
import { useTranslation } from '@/hooks/use-translation';
import { ShoppingCart, Menu, Activity, Sun, Moon, Heart, ChevronDown, Globe, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ClinicalDropdown from '@/components/shared/ClinicalDropdown';

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
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
      isScrolled ? "bg-background/95 backdrop-blur-md py-2 border-b clinical-shadow" : "bg-background py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="group flex items-center gap-3">
            <Link href="/" className="relative">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="p-2.5 rounded-full bg-primary/90 backdrop-blur-md border-4 border-primary/40 shadow-[0_8px_25px_-5px_hsl(var(--primary)/0.4)] flex items-center justify-center relative overflow-hidden"
              >
                <Activity className="h-5 w-5 text-white" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
              </motion.div>
            </Link>
            <Link href="/">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="font-headline font-bold text-lg tracking-tighter text-foreground hidden sm:inline-block"
              >
                SAM <span className="text-primary">Médicale</span>
              </motion.span>
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 h-full">
          <ClinicalDropdown 
            isHoverable={true}
            trigger={
              <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-primary gap-1.5 h-auto py-2 outline-none group">
                {t.nav.shop}
                <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
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
            className="h-9 w-9 text-muted-foreground hidden sm:flex"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <div className="hidden sm:flex">
            <ClinicalDropdown 
              isHoverable={true}
              align="end"
              trigger={
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground group">
                  <Globe className="h-4 w-4" />
                  <ChevronDown className="h-2.5 w-2.5 ml-0.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Button>
              }
              items={languageItems}
            />
          </div>

          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground">
              <Heart className={cn("h-4 w-4", wishlistCount > 0 && "fill-primary text-primary")} />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[8px] bg-primary text-white rounded-full font-bold border-none">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground">
              <ShoppingCart className="h-4 w-4" />
              {cartQuantity > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[8px] bg-primary text-white rounded-full font-bold border-none">
                  {cartQuantity}
                </Badge>
              )}
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isRTL ? "left" : "right"} className="w-[85%] max-w-[400px] p-8 flex flex-col">
              <SheetHeader className="text-left mb-12">
                <SheetTitle className="flex items-center gap-3 font-headline font-bold text-xl tracking-tighter uppercase">
                  <Activity className="h-6 w-6 text-primary" />
                  SAM Médicale
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6">
                <Link href="/shop" className="text-lg font-bold uppercase tracking-tight py-2 border-b">
                  {t.nav.shop}
                </Link>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  {categories.map((cat) => (
                    <Link 
                      key={cat.value} 
                      href={`/shop?category=${cat.value}`}
                      className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground py-2"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>

                <Link href="/about" className="text-lg font-bold uppercase tracking-tight py-2 border-b">
                  {t.nav.about}
                </Link>
                <Link href="/contact" className="text-lg font-bold uppercase tracking-tight py-2 border-b">
                  {t.nav.contact}
                </Link>
              </div>

              <div className="mt-auto pt-10 flex items-center justify-between border-t">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="h-10 w-10 rounded-full"
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>

                  <ClinicalDropdown 
                    align="end"
                    trigger={
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full group">
                        <Globe className="h-4 w-4" />
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
