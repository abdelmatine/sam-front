"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setLanguage, Language } from '@/store/slices/i18nSlice';
import { useTranslation } from '@/hooks/use-translation';
import { ShoppingCart, Menu, X, Languages, Activity, Sun, Moon, Heart, Stethoscope, PhoneCall, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
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
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);
  const { t, lang, isRTL } = useTranslation();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const menuItems = [
    { name: 'shop', href: '/shop' },
    { name: 'about', href: '/about' },
    { name: 'contact', href: '/contact' }
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
      isScrolled ? "bg-background/95 backdrop-blur-md py-3 border-b clinical-shadow" : "bg-background py-5"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-primary rounded-none transition-transform group-hover:scale-110">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tighter text-foreground">
            SAM <span className="text-primary">Médicale</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all relative group"
            >
              {t.nav[item.name as keyof typeof t.nav]}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 text-muted-foreground hidden sm:flex"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hidden sm:flex">
                <Languages className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-none border-primary/20 bg-background/95 backdrop-blur-md">
              {languages.map((l) => (
                <DropdownMenuItem 
                  key={l.code} 
                  onClick={() => dispatch(setLanguage(l.code))}
                  className={cn("cursor-pointer rounded-none text-xs font-bold uppercase tracking-widest", lang === l.code && "bg-primary text-primary-foreground")}
                >
                  {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/wishlist" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground">
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[8px] bg-primary text-white rounded-full font-bold">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground">
              <ShoppingCart className="h-4 w-4" />
              <AnimatePresence>
                {cartQuantity > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge className="h-4 w-4 flex items-center justify-center p-0 text-[8px] bg-primary text-white rounded-full font-bold">
                      {cartQuantity}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[110] lg:hidden"
            />
            <motion.div 
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                "fixed top-0 bottom-0 w-[85%] max-w-[360px] bg-background border-l z-[120] lg:hidden flex flex-col p-8 overflow-y-auto",
                isRTL ? "left-0" : "right-0"
              )}
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                  <Activity className="h-6 w-6 text-primary" />
                  <span className="font-headline font-bold text-xl tracking-tighter">SAM Médicale</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex flex-col gap-8">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-3xl font-bold hover:text-primary transition-colors uppercase tracking-tighter block"
                    >
                      {t.nav[item.name as keyof typeof t.nav]}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-8 border-t flex flex-col gap-4"
                >
                  <Button 
                    variant="outline" 
                    className="w-full h-14 rounded-none uppercase text-[10px] font-bold tracking-[0.2em] flex items-center justify-between px-6"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  >
                    <span>{theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}</span>
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full h-14 rounded-none uppercase text-[10px] font-bold tracking-[0.2em] flex items-center justify-between px-6">
                        <span>Changer Langue</span>
                        <Languages className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[290px] rounded-none">
                      {languages.map((l) => (
                        <DropdownMenuItem 
                          key={l.code} 
                          onClick={() => dispatch(setLanguage(l.code))}
                          className="p-4 rounded-none text-xs font-bold uppercase tracking-widest"
                        >
                          {l.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              </div>

              <div className="mt-auto pt-10 space-y-4">
                <Button className="w-full bg-primary text-white py-8 rounded-none text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center gap-3">
                  <Stethoscope className="h-4 w-4" />
                  {t.nav.consultation}
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" className="h-12 border bg-accent/30 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <PhoneCall className="h-3 w-3" />
                    Support
                  </Button>
                  <Button variant="ghost" className="h-12 border bg-accent/30 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3" />
                    Garantie
                  </Button>
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
