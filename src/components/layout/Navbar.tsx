
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setLanguage, Language } from '@/store/slices/i18nSlice';
import { useTranslation } from '@/hooks/use-translation';
import { ShoppingCart, Menu, Activity, Sun, Moon, Heart, Languages, ChevronDown, Plus, Minus, X, ShieldCheck, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  
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

  const menuItems = [
    { name: 'shop', href: '/shop', hasDropdown: true },
    { name: 'about', href: '/about' },
    { name: 'contact', href: '/contact' }
  ];

  // Animation variants
  const sidebarVariants = {
    closed: { x: isRTL ? '-100%' : '100%' },
    open: { 
      x: 0,
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 200,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 10 },
    open: { opacity: 1, y: 0 }
  };

  const subItemVariants = {
    closed: { height: 0, opacity: 0 },
    open: { 
      height: 'auto', 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
      isScrolled ? "bg-background/95 backdrop-blur-md py-2 border-b clinical-shadow" : "bg-background py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.2 }}
              className="p-2.5 rounded-full bg-primary/95 backdrop-blur-md border border-primary/20 shadow-[0_8px_20px_-5px_hsl(var(--primary)/0.3)] flex items-center justify-center relative cursor-pointer"
            >
              <Activity className="h-5 w-5 text-white" />
            </motion.div>
          </Link>
          
          <Link href="/">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="font-headline font-bold text-lg tracking-tighter text-foreground inline-block cursor-pointer"
            >
              SAM <span className="text-primary">Médicale</span>
            </motion.span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <div 
              key={item.name} 
              className="relative"
              onMouseEnter={() => item.hasDropdown && setIsShopDropdownOpen(true)}
              onMouseLeave={() => item.hasDropdown && setIsShopDropdownOpen(false)}
            >
              <Link 
                href={item.href} 
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.2em] transition-all py-2 group flex items-center gap-1.5",
                  isShopDropdownOpen && item.hasDropdown ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                {t.nav[item.name as keyof typeof t.nav]}
                {item.hasDropdown && <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", isShopDropdownOpen && "rotate-180")} />}
                <span className={cn("absolute -bottom-0.5 left-0 h-0.5 bg-primary transition-all", isShopDropdownOpen && item.hasDropdown ? "w-full" : "w-0 group-hover:w-full")} />
              </Link>

              {item.hasDropdown && (
                <AnimatePresence>
                  {isShopDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 0, scaleY: 0 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: 0, scaleY: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-0 mt-0 pt-2 min-w-[220px] origin-top z-50"
                    >
                      <div className="bg-background/98 backdrop-blur-xl border border-primary/10 shadow-2xl border-t-4 border-t-primary p-2 overflow-hidden">
                        {categories.map((cat, idx) => (
                          <motion.div
                            key={cat.value}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link 
                              href={`/shop?category=${cat.value}`}
                              onClick={() => setIsShopDropdownOpen(false)}
                              className="block px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] hover:bg-primary/5 hover:text-primary transition-all border-b border-border/5 last:border-none"
                            >
                              {cat.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
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
                  className={cn(
                    "cursor-pointer rounded-none text-[10px] font-bold uppercase tracking-widest p-3",
                    lang === l.code && "bg-primary text-primary-foreground"
                  )}
                >
                  {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/90 backdrop-blur-sm z-[140] lg:hidden"
            />
            <motion.div 
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={cn(
                "fixed top-0 bottom-0 w-[85%] max-w-[360px] bg-background border-l z-[150] lg:hidden flex flex-col p-6 overflow-y-auto clinical-shadow",
                isRTL ? "left-0" : "right-0"
              )}
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <Activity className="h-6 w-6 text-primary" />
                  <span className="font-headline font-bold text-xl tracking-tighter">SAM Médicale</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="rounded-full">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex flex-col gap-2 mb-10">
                {menuItems.map((item) => (
                  <motion.div key={item.name} variants={itemVariants} className="flex flex-col">
                    <div className="flex items-center justify-between py-1">
                      <Link 
                        href={item.href} 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-bold uppercase tracking-tight py-3 flex-1"
                      >
                        {t.nav[item.name as keyof typeof t.nav]}
                      </Link>
                      {item.hasDropdown && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-12 w-12"
                          onClick={() => setMobileShopOpen(!mobileShopOpen)}
                        >
                          {mobileShopOpen ? <Minus className="h-4 w-4 text-primary" /> : <Plus className="h-4 w-4" />}
                        </Button>
                      )}
                    </div>
                    
                    {item.hasDropdown && (
                      <AnimatePresence>
                        {mobileShopOpen && (
                          <motion.div 
                            variants={subItemVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="flex flex-col gap-1 pl-4 border-l-2 border-primary/20 overflow-hidden"
                          >
                            {categories.map((cat) => (
                              <motion.div key={cat.value} variants={itemVariants}>
                                <Link
                                  href={`/shop?category=${cat.value}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground py-3.5 block hover:text-primary transition-colors"
                                >
                                  {cat.label}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                    <Separator className="opacity-40" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto space-y-6 pb-6">
                <motion.div variants={itemVariants} className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Préférences</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="justify-start h-12 rounded-none gap-3 text-[10px] font-bold uppercase tracking-widest"
                    >
                      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      {theme === 'dark' ? 'Light' : 'Dark'}
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="justify-start h-12 rounded-none gap-3 text-[10px] font-bold uppercase tracking-widest"
                        >
                          <Globe className="h-4 w-4" />
                          {lang.toUpperCase()}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-none border-primary/20">
                        {languages.map((l) => (
                          <DropdownMenuItem 
                            key={l.code} 
                            onClick={() => {
                              dispatch(setLanguage(l.code));
                              setMobileMenuOpen(false);
                            }}
                            className={cn(
                              "text-[10px] font-bold uppercase tracking-widest p-3",
                              lang === l.code && "bg-primary text-primary-foreground"
                            )}
                          >
                            {l.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-6 border-t">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Clinical Grade Support
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
