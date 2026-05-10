
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setLanguage, Language } from '@/store/slices/i18nSlice';
import { useTranslation } from '@/hooks/use-translation';
import { ShoppingCart, Menu, Activity, Sun, Moon, Heart, Languages, ChevronDown, Plus, Minus, X, ShieldCheck } from 'lucide-react';
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

  const dropdownVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: { 
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 }
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
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="p-2 rounded-full transition-all bg-primary/95 backdrop-blur-md border-2 border-primary/20 shadow-lg flex items-center justify-center relative cursor-pointer"
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

        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <div 
              key={item.name} 
              className="relative"
              onMouseEnter={() => item.hasDropdown && setIsShopDropdownOpen(true)}
              onMouseLeave={() => item.hasDropdown && setIsShopDropdownOpen(false)}
            >
              {item.hasDropdown ? (
                <DropdownMenu open={isShopDropdownOpen} onOpenChange={setIsShopDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary focus:outline-none flex items-center gap-1.5 cursor-pointer py-2">
                      {t.nav[item.name as keyof typeof t.nav]}
                      <ChevronDown className={cn("h-3 w-3 transition-transform", isShopDropdownOpen && "rotate-180 text-primary")} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="start" 
                    sideOffset={10}
                    className="rounded-none border-primary/20 bg-background/98 backdrop-blur-xl min-w-[220px] p-1 shadow-2xl border-t-2 border-t-primary"
                  >
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={dropdownVariants}
                    >
                      {categories.map((cat) => (
                        <motion.div key={cat.value} variants={itemVariants}>
                          <DropdownMenuItem asChild>
                            <Link 
                              href={`/shop?category=${cat.value}`}
                              onClick={() => setIsShopDropdownOpen(false)}
                              className="cursor-pointer rounded-none text-[9px] font-bold uppercase tracking-[0.15em] px-4 py-3 hover:bg-primary/5 hover:text-primary transition-all block border-b border-border/5 last:border-none"
                            >
                              {cat.label}
                            </Link>
                          </DropdownMenuItem>
                        </motion.div>
                      ))}
                    </motion.div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  href={item.href} 
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all relative py-2 group"
                >
                  {t.nav[item.name as keyof typeof t.nav]}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
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
                "fixed top-0 bottom-0 w-[85%] max-w-[360px] bg-background border-l z-[120] lg:hidden flex flex-col p-8",
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

              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <Link 
                        href={item.href} 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-bold uppercase tracking-tight py-2"
                      >
                        {t.nav[item.name as keyof typeof t.nav]}
                      </Link>
                      {item.hasDropdown && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setMobileShopOpen(!mobileShopOpen)}
                        >
                          {mobileShopOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                        </Button>
                      )}
                    </div>
                    
                    {item.hasDropdown && mobileShopOpen && (
                      <div className="flex flex-col gap-2 pl-4 border-l-2 border-primary/20 mt-2">
                        {categories.map((cat) => (
                          <Link
                            key={cat.value}
                            href={`/shop?category=${cat.value}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground py-3"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
