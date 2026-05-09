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
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
      isScrolled ? "bg-white/95 backdrop-blur-md py-4 border-b shadow-sm" : "bg-white py-6"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-headline font-bold text-xl tracking-tight text-primary">
            RespiraMed <span className="text-slate-400 font-normal">Respiratory</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/shop" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">CPAP</Link>
          <Link href="/shop" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">BPAP</Link>
          <Link href="/shop" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Oxygen</Link>
          <Link href="/shop" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Protective Gear</Link>
          <Link href="/about" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Certifications</Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <Languages className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-none border-primary/20">
              {languages.map((l) => (
                <DropdownMenuItem 
                  key={l.code} 
                  onClick={() => dispatch(setLanguage(l.code))}
                  className={cn("cursor-pointer rounded-none text-xs", lang === l.code && "bg-primary text-white")}
                >
                  {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative h-8 w-8 text-slate-400">
              <ShoppingCart className="h-4 w-4" />
              {cartQuantity > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[8px] bg-emerald-400 text-slate-900 rounded-full font-bold">
                  {cartQuantity}
                </Badge>
              )}
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-slate-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-[110] lg:hidden transition-transform duration-300",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <span className="font-headline font-bold text-xl text-primary">RespiraMed</span>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex flex-col gap-8">
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold text-slate-900">Catalogue</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold text-slate-900">Certifications</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold text-slate-900">Support</Link>
            
            <Button className="mt-12 bg-primary text-white py-8 rounded-none text-lg font-bold uppercase tracking-widest">
              Consultation
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
