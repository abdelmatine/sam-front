"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setLanguage, Language } from '@/store/slices/i18nSlice';
import { useTranslation } from '@/hooks/use-translation';
import { ShoppingCart, Menu, Activity, Sun, Moon, Heart, Languages, ChevronDown, Plus, Minus, X, Stethoscope, PhoneCall, ShieldCheck } from 'lucide-react';
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

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
      isScrolled ? "bg-background/95 backdrop-blur-md py-3 border-b clinical-shadow" : "bg-background py-5"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {/* Logo with Independent Hover - Circular 3D Glassmorphism */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className={cn(
              "p-2.5 rounded-full transition-all duration-500",
              "bg-primary/90 backdrop-blur-md",
              "border-4 border-primary/40",
              "shadow-[0_8px_25px_-5px_hsl(var(--primary)/0.4)]",
              "flex items-center justify-center relative overflow-hidden",
              "before:absolute before:inset-0 before:border-t-2 before:border-white/20 before:rounded-full",
              "after:absolute after:inset-0 after:border-b-2 after:border-black/30 after:rounded-full"
            )}
          >
            <Activity className="h-5 w-5 text-white relative z-10" />
          </motion.div>
          
          {/* Brand Text with Independent Hover */}
          <motion.span 
            whileHover={{ scale: 1.05, x: 5 }}
            className="font-headline font-bold text-xl tracking-tighter text-foreground transition-all duration-500 inline-block"
          >
            SAM <span className="text-primary">Médicale</span>
          </motion.span>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => (
            <div key={item.name} className="relative">
              {item.hasDropdown ? (
                <div 
                  className="relative h-full py-2"
                  onMouseEnter={() => setIsShopDropdownOpen(true)}
                  onMouseLeave={() => setIsShopDropdownOpen(false)}
                >
                  <DropdownMenu open={isShopDropdownOpen} onOpenChange={setIsShopDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                      <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary focus:outline-none flex items-center gap-1.5">
                        {t.nav[item.name as keyof typeof t.nav]}
                        <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", isShopDropdownOpen && "rotate-180 text-primary")} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start" 
                      sideOffset={0}
                      className="rounded-none border-primary/20 bg-background/98 backdrop-blur-xl min-w-[240px] p-2 shadow-2xl border-t-4 border-t-primary overflow-hidden"
                    >
                      <motion.div
                        initial="hidden"
                        animate={isShopDropdownOpen ? "visible" : "hidden"}
                        variants={{
                          hidden: { height: 0, opacity: 0 },
                          visible: {
                            height: 'auto',
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.05,
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1]
                            }
                          }
                        }}
                      >
                        {categories.map((cat) => (
                          <motion.div
                            key={cat.value}
                            variants={{
                              hidden: { opacity: 0, y: -10 },
                              visible: { opacity: 1, y: 0 }
                            }}
                          >
                            <DropdownMenuItem asChild>
                              <Link 
                                href={`/shop?category=${cat.value}`}
                                onClick={() => setIsShopDropdownOpen(false)}
                                className="cursor-pointer rounded-none text-[9px] font-bold uppercase tracking-[0.15em] px-5 py-3.5 hover:bg-primary/5 hover:text-primary transition-all block border-b border-border/5 last:border-none"
                              >
                                {cat.label}
                              </Link>
                            </DropdownMenuItem>
                          </motion.div>
                        ))}
                      </motion.div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Link 
                  href={item.href} 
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all relative py-2 group"
                >
                  {t.nav[item.name as keyof typeof t.nav]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 text-muted-foreground hidden sm:flex hover:bg-accent/50"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hidden sm:flex hover:bg-accent/50">
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

          <Link href="/wishlist" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:bg-accent/50">
              <Heart className={cn("h-4 w-4", wishlistCount > 0 && "fill-primary text-primary")} />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[8px] bg-primary text-white rounded-full font-bold border-none">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:bg-accent/50">
              <ShoppingCart className="h-4 w-4" />
              <AnimatePresence>
                {cartQuantity > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge className="h-4 w-4 flex items-center justify-center p-0 text-[8px] bg-primary text-white rounded-full font-bold border-none">
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
            className="lg:hidden text-foreground hover:bg-accent/50"
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

              <div className="flex flex-col gap-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center justify-between">
                      <Link 
                        href={item.href} 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-bold hover:text-primary transition-colors uppercase tracking-tighter block"
                      >
                        {t.nav[item.name as keyof typeof t.nav]}
                      </Link>
                      {item.hasDropdown && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileShopOpen(!mobileShopOpen);
                          }}
                        >
                          {mobileShopOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                        </Button>
                      )}
                    </div>
                    
                    {item.hasDropdown && (
                      <AnimatePresence>
                        {mobileShopOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col gap-2 mt-4 pl-4 border-l-2 border-primary/20"
                          >
                            {categories.map((cat) => (
                              <Link
                                key={cat.value}
                                href={`/shop?category=${cat.value}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary py-3 transition-colors"
                              >
                                {cat.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
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
                    className="w-full h-14 rounded-none uppercase text-[10px] font-bold tracking-[0.2em] flex items-center justify-between px-6 border-border"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  >
                    <span>{theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}</span>
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full h-14 rounded-none uppercase text-[10px] font-bold tracking-[0.2em] flex items-center justify-between px-6 border-border">
                        <span>Changer Langue</span>
                        <Languages className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[290px] rounded-none bg-background/95 backdrop-blur-md">
                      {languages.map((l) => (
                        <DropdownMenuItem 
                          key={l.code} 
                          onClick={() => dispatch(setLanguage(l.code))}
                          className="p-4 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-primary/5"
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
                  <Button variant="ghost" className="h-12 border bg-accent/30 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 rounded-none">
                    <PhoneCall className="h-3 w-3" />
                    Support
                  </Button>
                  <Button variant="ghost" className="h-12 border bg-accent/30 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 rounded-none">
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