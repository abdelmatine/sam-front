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
  Activity, 
  Sun, 
  Moon, 
  Heart, 
  ChevronDown, 
  Globe, 
  ShieldCheck,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
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
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
      isScrolled ? "bg-background/95 backdrop-blur-md py-2 border-b clinical-shadow" : "bg-background py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo textClassName="hidden sm:inline-block" />

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
            <SheetContent side={isRTL ? "left" : "right"} className="w-[85%] max-w-[400px] p-0 flex flex-col h-full">
              <SheetHeader className="text-left p-8 pb-4">
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-8 py-6">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  <AccordionItem value="shop" className="border-none">
                    <div className="flex items-center justify-between py-2 border-b">
                      <Link href="/shop" className="text-lg font-bold uppercase tracking-tight flex-1">
                        {t.nav.shop}
                      </Link>
                      <AccordionTrigger className="p-2 hover:no-underline [&[data-state=open]>svg]:rotate-45" />
                    </div>
                    <AccordionContent className="pt-4 pl-4 pb-0">
                      <div className="grid grid-cols-1 gap-2">
                        {categories.map((cat, idx) => (
                          <motion.div
                            key={cat.value}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link 
                              href={`/shop?category=${cat.value}`}
                              className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground py-2 block hover:text-primary"
                            >
                              {cat.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="contact" className="border-none">
                    <div className="flex items-center justify-between py-2 border-b">
                      <Link href="/contact" className="text-lg font-bold uppercase tracking-tight flex-1">
                        {t.nav.contact}
                      </Link>
                      <AccordionTrigger className="p-2 hover:no-underline [&[data-state=open]>svg]:rotate-45" />
                    </div>
                    <AccordionContent className="pt-4 pl-4 pb-0">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-primary" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">+33 (0) 1 23 45 67 89</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">support@sam-medicale.fr</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Paris, France</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="mt-auto p-8 flex items-center justify-between border-t bg-accent/10">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="h-10 w-10 rounded-full border-primary/20"
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>

                  <ClinicalDropdown 
                    align="end"
                    side="top"
                    trigger={
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-primary/20 group">
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