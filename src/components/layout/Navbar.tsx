
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
import { Separator } from "@/components/ui/separator";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? -30 : 30, filter: 'blur(4px)' },
    show: { 
      opacity: 1, 
      x: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

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
                <Link href="/shop">
                  <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-primary gap-1.5 h-auto py-2 group">
                    {t.nav.catalogue}
                    <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Button>
                </Link>
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
          <div className="hidden lg:flex items-center gap-2">
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
              variant="compact"
              className="min-w-[120px]"
              trigger={
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all group">
                  <Globe className="h-4 w-4 transition-transform duration-500 group-hover:rotate-12" />
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

          {/* Desktop Only: Large Cart Button */}
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 text-muted-foreground hover:text-primary transition-all"
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
                <Button variant="ghost" size="icon" className="h-10 w-10 border border-primary/10 rounded-none hover:bg-primary/5 transition-colors">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side={isRTL ? "left" : "right"} 
                className="w-full sm:max-w-md p-0 flex flex-col h-full bg-background/98 backdrop-blur-3xl border-primary/10 group z-[160] [&>button]:hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              >
                <SheetHeader className="p-8 pb-4 border-b border-primary/5 flex flex-row items-center justify-between bg-accent/5">
                  <Logo />
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none hover:bg-primary/10 group/close transition-all">
                      <X className="h-6 w-6 text-primary transition-transform duration-500 group-hover/close:rotate-90" />
                    </Button>
                  </SheetClose>
                  <SheetTitle className="sr-only">{t.nav.menu_title}</SheetTitle>
                </SheetHeader>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar"
                >
                  <Accordion type="single" collapsible className="w-full space-y-6">
                    <motion.div variants={itemVariants}>
                      <AccordionItem value="shop" className="border-none">
                        <AccordionTrigger className="flex-row-reverse gap-4 p-0 hover:no-underline font-headline font-bold text-3xl uppercase tracking-tighter text-foreground group/trigger">
                          <span className="flex-1 text-left group-data-[state=open]/trigger:text-primary transition-colors">{t.nav.catalogue}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pt-8 pl-4 space-y-5 border-l-2 border-primary/10 ml-1">
                          <Link 
                            href="/shop"
                            className="text-xs font-bold uppercase tracking-[0.2em] text-primary py-2 block hover:opacity-80 transition-all flex items-center gap-4 group/link"
                          >
                            <motion.div 
                              whileHover={{ scale: 1.5 }}
                              className="h-1.5 w-1.5 bg-primary rounded-full" 
                            />
                            {t.categories.view_all}
                          </Link>
                          {categories.filter(c => c.value !== '').map((cat) => (
                            <Link 
                              key={cat.value}
                              href={`/shop/${cat.value}`}
                              className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80 py-2 block hover:text-primary transition-all flex items-center gap-4 group/link"
                            >
                              <div className="h-1.5 w-1.5 bg-primary/20 rounded-full group-hover/link:bg-primary transition-colors" />
                              {cat.label}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>

                    <div className="space-y-8 pt-4">
                      <motion.div variants={itemVariants}>
                        <Link href="/about" className="block text-3xl font-headline font-bold uppercase tracking-tighter text-foreground hover:text-primary transition-all hover:translate-x-2">
                          {t.nav.about}
                        </Link>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <Link href="/contact" className="block text-3xl font-headline font-bold uppercase tracking-tighter text-foreground hover:text-primary transition-all hover:translate-x-2">
                          {t.nav.contact}
                        </Link>
                      </motion.div>
                    </div>
                  </Accordion>

                  <motion.div variants={itemVariants} className="mt-16 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-[1px] flex-1 bg-primary/10" />
                      <span className="text-[9px] font-black uppercase tracking-[0.5em] text-primary/40">Action Module</span>
                      <div className="h-[1px] flex-1 bg-primary/10" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Link href="/wishlist" className="w-full">
                        <Button variant="outline" className="w-full rounded-none h-20 flex flex-col items-center justify-center gap-2 border-primary/10 bg-accent/5 hover:bg-primary/5 group transition-all">
                          <Heart className={cn("h-5 w-5 transition-all group-hover:scale-110", wishlistCount > 0 && "fill-primary text-primary")} />
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest">{t.nav.wishlist}</span>
                            {wishlistCount > 0 && <Badge className="h-4 w-4 p-0 flex items-center justify-center text-[8px] bg-primary text-white rounded-full border-none ring-2 ring-background">{wishlistCount}</Badge>}
                          </div>
                        </Button>
                      </Link>
                      <Link href="/cart" className="w-full">
                        <Button variant="default" className="w-full rounded-none h-20 flex flex-col items-center justify-center gap-2 shadow-xl shadow-primary/10 group transition-all">
                          <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest">{t.nav.cart}</span>
                            {cartQuantity > 0 && <Badge className="h-4 w-4 p-0 flex items-center justify-center text-[8px] bg-white text-primary rounded-full border-none font-black">{cartQuantity}</Badge>}
                          </div>
                        </Button>
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mt-16 space-y-8">
                    <div className="space-y-5">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary border-l-2 border-primary pl-4">{t.contact_info.support_title}</h4>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-5 text-sm font-medium text-muted-foreground group">
                          <div className="p-3 bg-primary/5 rounded-none border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
                            <Phone className="h-4.5 w-4.5" />
                          </div>
                          <span className="tracking-tight">{t.contact_info.phone}</span>
                        </div>
                        <div className="flex items-center gap-5 text-sm font-medium text-muted-foreground group">
                          <div className="p-3 bg-primary/5 rounded-none border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
                            <Mail className="h-4.5 w-4.5" />
                          </div>
                          <span className="tracking-tight truncate">{t.contact_info.email}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <div className="p-8 bg-accent/20 border-t border-primary/10 flex flex-col gap-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center border border-primary/10 bg-background shadow-inner flex-1 h-12 overflow-hidden">
                      {languages.map((l, i) => (
                        <React.Fragment key={l.code}>
                          <button
                            onClick={() => dispatch(setLanguage(l.code))}
                            className={cn(
                              "flex-1 h-full text-[10px] font-bold transition-all uppercase tracking-widest",
                              lang === l.code ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-primary/5"
                            )}
                          >
                            {l.label}
                          </button>
                          {i < languages.length - 1 && <div className="h-4 w-[1px] bg-primary/10 shrink-0" />}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                        <ShieldCheck className="h-4 w-4" />
                        {t.common.grade_medical}
                      </div>
                      <span className="text-[8px] text-muted-foreground/60 font-bold uppercase tracking-widest">ISO 13485:2016</span>
                    </div>
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
