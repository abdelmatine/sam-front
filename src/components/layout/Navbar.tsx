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
  Activity,
  X,
  Database,
  Headset,
  ShieldCheck,
  Phone,
  Mail
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
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
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

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[0.22, 1, 0.36, 1]",
      isScrolled 
        ? "bg-background/80 backdrop-blur-2xl py-3 border-b border-primary/10 clinical-shadow" 
        : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-3 items-center">
        {/* Left: Brand Sector */}
        <div className="flex justify-start items-center gap-4">
          <Logo />
          {isScrolled && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden xl:flex items-center gap-2 px-3 py-1 border border-primary/10 bg-primary/5 rounded-none"
            >
              <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
              <span className="text-[7px] font-black uppercase tracking-[0.4em] text-primary/60">SYS_STABLE_v4.2</span>
            </motion.div>
          )}
        </div>

        {/* Center: Navigation Sector */}
        <div className="hidden lg:flex justify-center">
          <nav className="flex items-center gap-10">
            <ClinicalDropdown 
              isHoverable={true}
              trigger={
                <Link href="/shop">
                  <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-primary gap-2 h-auto py-2 group">
                    {t.nav.catalogue}
                    <ChevronDown className="h-3 w-3 transition-transform duration-500 group-data-[state=open]:rotate-180" />
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
                className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-all relative group py-2"
              >
                {link.label}
                <motion.span 
                  className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-primary -translate-x-1/2" 
                  whileHover={{ width: '100%' }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Actions Sector */}
        <div className="flex justify-end items-center gap-3">
          <div className="hidden lg:flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all rounded-none border border-transparent hover:border-primary/10"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ y: 5, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -5, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.3 }}
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
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all group rounded-none border border-transparent hover:border-primary/10">
                  <Globe className="h-4 w-4 transition-transform duration-700 group-hover:rotate-[360deg]" />
                </Button>
              }
              items={languageItems}
            />

            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-none border border-transparent hover:border-primary/10">
                <Heart className={cn("h-4 w-4 transition-all", wishlistCount > 0 && "fill-primary text-primary")} />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-3.5 w-3.5 flex items-center justify-center p-0 text-[6px] bg-primary text-white rounded-full font-black border-none ring-2 ring-background">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          <div className="hidden lg:block h-5 w-[1px] bg-primary/10 mx-2" />

          <Link href="/cart" className="hidden lg:block">
            <Button 
              className="relative h-11 px-7 bg-primary text-white rounded-none text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 active:scale-95 group/cart overflow-hidden"
            >
              <ShoppingCart className="h-4 w-4 group-hover/cart:-translate-y-1 group-hover/cart:translate-x-1 transition-transform" />
              {t.nav.cart}
              {cartQuantity > 0 && (
                <span className="bg-white text-primary rounded-none px-2 py-0.5 text-[8px] font-black ml-1">
                  {cartQuantity}
                </span>
              )}
              {/* Premium Glow Layer */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/cart:opacity-100 transition-opacity" />
            </Button>
          </Link>

          {/* Mobile UI Sector */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-10 w-10 border border-primary/10">
                <ShoppingCart className="h-5 w-5" />
                {cartQuantity > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[7px] bg-primary text-white rounded-full font-black ring-2 ring-background">
                    {cartQuantity}
                  </Badge>
                )}
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 border border-primary/20 bg-primary/5 rounded-none">
                  <Menu className="h-5 w-5 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "left" : "right"} className="w-full sm:max-w-xs p-0 flex flex-col h-full bg-background border-primary/10 [&>button]:hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
                />
                
                <SheetHeader className="p-8 pb-4 flex flex-row items-center justify-between relative z-10">
                  <Logo />
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 border border-primary/10 rounded-none hover:bg-destructive/5 hover:text-destructive">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto px-8 py-10 relative z-10">
                  {/* Technical Navigation Section */}
                  <div className="mb-10">
                    <div className="flex items-center gap-2 mb-6 opacity-40">
                      <Database className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[9px] font-black uppercase tracking-[0.5em]">{t.nav.menu_title}</span>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full space-y-6">
                      <AccordionItem value="shop" className="border-none">
                        <AccordionTrigger className="p-0 hover:no-underline font-headline font-bold text-2xl uppercase tracking-tighter hover:text-primary transition-colors">
                          {t.nav.catalogue}
                        </AccordionTrigger>
                        <AccordionContent className="pt-6 pl-4 space-y-4 border-l-2 border-primary/10">
                          {categories.map((cat) => (
                            <SheetClose asChild key={cat.value}>
                              <Link 
                                href={cat.value ? `/shop/${cat.value}` : '/shop'}
                                className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary block py-1.5 transition-all hover:translate-x-2"
                              >
                                {cat.label}
                              </Link>
                            </SheetClose>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                      
                      <div className="space-y-8 pt-4">
                        <SheetClose asChild>
                          <Link href="/services" className="block text-2xl font-headline font-bold uppercase tracking-tighter hover:text-primary transition-colors">{t.nav.services}</Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/about" className="block text-2xl font-headline font-bold uppercase tracking-tighter hover:text-primary transition-colors">{t.nav.about}</Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/contact" className="block text-2xl font-headline font-bold uppercase tracking-tighter hover:text-primary transition-colors">{t.nav.contact}</Link>
                        </SheetClose>
                      </div>
                    </Accordion>
                  </div>

                  <Separator className="bg-primary/10 mb-10" />

                  {/* Actions Grid Section */}
                  <div className="space-y-6 mb-10">
                    <div className="flex items-center gap-2 mb-4 opacity-40">
                      <Activity className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[9px] font-black uppercase tracking-[0.5em]">Actions_Module</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <SheetClose asChild>
                        <Link href="/cart">
                          <Button variant="outline" className="w-full h-24 rounded-none flex flex-col items-center justify-center gap-2 border-primary/10 bg-accent/5 hover:bg-primary/5 hover:border-primary/30 transition-all">
                            <div className="relative">
                              <ShoppingCart className="h-6 w-6 text-primary" />
                              {cartQuantity > 0 && (
                                <Badge className="absolute -top-3 -right-3 h-4 w-4 p-0 flex items-center justify-center bg-primary text-white text-[8px] border-none rounded-full">
                                  {cartQuantity}
                                </Badge>
                              )}
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">{t.nav.cart}</span>
                          </Button>
                        </Link>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Link href="/wishlist">
                          <Button variant="outline" className="w-full h-24 rounded-none flex flex-col items-center justify-center gap-2 border-primary/10 bg-accent/5 hover:bg-primary/5 hover:border-primary/30 transition-all">
                            <div className="relative">
                              <Heart className={cn("h-6 w-6 text-primary", wishlistCount > 0 && "fill-primary")} />
                              {wishlistCount > 0 && (
                                <Badge className="absolute -top-3 -right-3 h-4 w-4 p-0 flex items-center justify-center bg-primary text-white text-[8px] border-none rounded-full">
                                  {wishlistCount}
                                </Badge>
                              )}
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">{t.nav.wishlist}</span>
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>

                  <Separator className="bg-primary/10 mb-10" />

                  {/* Clinical Contact Section */}
                  <div className="space-y-6 mb-10">
                    <div className="flex items-center gap-2 mb-4 opacity-40">
                      <Headset className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[9px] font-black uppercase tracking-[0.5em]">{t.contact_info.support_title}</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-5 p-5 border border-primary/5 bg-accent/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 -translate-y-1/2 translate-x-1/2 rounded-full" />
                        <Phone className="h-5 w-5 text-primary relative z-10" />
                        <div className="relative z-10">
                          <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-0.5">Direct_Support</p>
                          <p className="text-xs font-bold tracking-tight">{t.contact_info.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 p-5 border border-primary/5 bg-accent/5 relative overflow-hidden group">
                        <div className="absolute bottom-0 right-0 w-12 h-12 bg-primary/5 translate-y-1/2 translate-x-1/2 rounded-full" />
                        <Mail className="h-5 w-5 text-primary relative z-10" />
                        <div className="relative z-10">
                          <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-0.5">Email_Protocol</p>
                          <p className="text-xs font-bold tracking-tight">{t.contact_info.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-primary/10 mb-10" />

                  {/* Region Control Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4 opacity-40">
                      <Globe className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[9px] font-black uppercase tracking-[0.5em]">Region_Protocol</span>
                    </div>
                    
                    <div className="flex gap-3">
                      {languages.map((l) => (
                        <Button 
                          key={l.code}
                          variant={lang === l.code ? "default" : "outline"}
                          size="sm"
                          onClick={() => dispatch(setLanguage(l.code))}
                          className={cn(
                            "flex-1 rounded-none text-[10px] font-black uppercase tracking-[0.2em] h-12 transition-all",
                            lang === l.code 
                              ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                              : "border-primary/10 hover:bg-primary/5"
                          )}
                        >
                          {l.label}
                        </Button>
                      ))}
                    </div>

                    <div className="pt-8">
                      <Button 
                        variant="ghost" 
                        className="w-full h-12 border border-primary/10 rounded-none text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary hover:bg-primary/5"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      >
                        {theme === 'dark' ? <Sun className="h-4 w-4 mr-3" /> : <Moon className="h-4 w-4 mr-3" />}
                        {theme === 'dark' ? 'Light_Mode_Switch' : 'Dark_Mode_Switch'}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-accent/5 border-t border-primary/10 flex items-center justify-between grayscale opacity-40">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3 text-primary" />
                    <span className="text-[8px] font-black uppercase tracking-[0.4em]">SAM_MED_v4.2</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em]">ISO-13485</span>
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