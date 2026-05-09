"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setLanguage, Language } from '@/store/slices/i18nSlice';
import { useTranslation } from '@/hooks/use-translation';
import { ShoppingCart, Menu, X, Languages, Activity, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const { t, lang } = useTranslation();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b",
      isScrolled ? "bg-background/95 backdrop-blur-md py-2 shadow-sm" : "bg-background py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="font-headline font-bold text-xl tracking-tighter uppercase">
            Respira<span className="text-primary">Med</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/shop" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">{t.nav.shop}</Link>
          <Link href="/about" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">{t.nav.about}</Link>
          <Link href="/contact" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">{t.nav.contact}</Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="square-btn">
                <Languages className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-none border-primary/20">
              {languages.map((l) => (
                <DropdownMenuItem 
                  key={l.code} 
                  onClick={() => dispatch(setLanguage(l.code))}
                  className={cn("cursor-pointer rounded-none", lang === l.code && "bg-primary text-white")}
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
            className="square-btn"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative square-btn">
              <ShoppingCart className="h-4 w-4" />
              {cartQuantity > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[9px] bg-primary text-white rounded-none">
                  {cartQuantity}
                </Badge>
              )}
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden square-btn"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-background z-[110] lg:hidden transition-transform duration-300",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-headline font-bold text-xl uppercase tracking-tighter">RespiraMed</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="square-btn">
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex flex-col gap-6">
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold uppercase tracking-tight border-b pb-4">{t.nav.shop}</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold uppercase tracking-tight border-b pb-4">{t.nav.about}</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold uppercase tracking-tight border-b pb-4">{t.nav.contact}</Link>
            
            <Button className="mt-8 bg-primary text-white py-6 rounded-none text-lg font-bold uppercase tracking-widest">
              {t.nav.consultation}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;