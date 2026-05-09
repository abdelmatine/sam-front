"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setLanguage, Language } from '@/store/slices/i18nSlice';
import { useTranslation } from '@/hooks/use-translation';
import { ShoppingCart, Search, Menu, User, X, ChevronDown, Activity, Sun, Moon, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const { t, lang, isRTL } = useTranslation();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const languages: { label: string; code: Language }[] = [
    { label: 'Français', code: 'fr' },
    { label: 'English', code: 'en' },
    { label: 'العربية', code: 'ar' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled ? "bg-background/80 backdrop-blur-xl border-b py-3 shadow-sm" : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="bg-primary rounded-xl p-2 shadow-lg shadow-primary/20">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <span className="font-headline font-bold text-2xl tracking-tight hidden sm:inline-block">
            Respira<span className="text-primary">Med</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/shop" className="text-sm font-semibold hover:text-primary transition-colors">{t.nav.shop}</Link>
          <Link href="/about" className="text-sm font-semibold hover:text-primary transition-colors">{t.nav.about}</Link>
          <Link href="/contact" className="text-sm font-semibold hover:text-primary transition-colors">{t.nav.contact}</Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Languages className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl">
              {languages.map((l) => (
                <DropdownMenuItem 
                  key={l.code} 
                  onClick={() => dispatch(setLanguage(l.code))}
                  className={cn("cursor-pointer", lang === l.code && "bg-accent text-primary font-bold")}
                >
                  {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <ShoppingCart className="h-5 w-5" />
              {cartQuantity > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary border-2 border-background">
                  {cartQuantity}
                </Badge>
              )}
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden rounded-full"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-xl z-[60] lg:hidden transition-all duration-500",
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="bg-primary rounded-xl p-2">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="font-headline font-bold text-2xl">RespiraMed</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="rounded-full">
              <X className="h-7 w-7" />
            </Button>
          </div>

          <div className="flex flex-col gap-8 text-center">
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">{t.nav.shop}</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">{t.nav.about}</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold">{t.nav.contact}</Link>
            
            <Button className="mt-8 bg-primary text-white py-8 rounded-2xl text-xl font-bold shadow-xl">
              {t.nav.consultation}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;