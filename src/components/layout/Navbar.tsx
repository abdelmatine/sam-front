
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ShoppingCart, Heart, Search, Menu, User, X, ChevronDown, Activity, Sun, Moon } from 'lucide-react';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const shopCategories = [
    { name: 'All Products', href: '/shop' },
    { name: 'CPAP/BPAP', href: '/shop?category=respiratory' },
    { name: 'Concentrators', href: '/shop?category=oxygen' },
    { name: 'Accessories', href: '/shop?category=accessories' },
    { name: 'Others', href: '/shop?category=others' },
  ];

  if (!mounted) return null;

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md border-b py-2 shadow-sm" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-1.5">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight hidden sm:inline-block">
            Respira<span className="text-primary">Med</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                Shop <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {shopCategories.map((cat) => (
                <DropdownMenuItem key={cat.name} asChild>
                  <Link href={cat.href}>{cat.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem>Wishlist</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartQuantity > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary">
                  {cartQuantity}
                </Badge>
              )}
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-background z-[60] lg:hidden transition-transform duration-300",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-4 flex justify-between items-center border-b bg-background">
           <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="bg-primary rounded-lg p-1.5">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="font-headline font-bold text-xl">RespiraMed</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-6 flex flex-col gap-4 bg-background h-full overflow-y-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="shop" className="border-none">
              <AccordionTrigger className="text-lg font-semibold py-2 hover:no-underline">
                Shop
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3 pl-4 pt-2">
                {shopCategories.map((cat) => (
                  <Link 
                    key={cat.name} 
                    href={cat.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link 
            href="/about" 
            className="text-lg font-semibold py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="text-lg font-semibold py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          
          <Button className="w-full mt-4 bg-primary text-white py-6 rounded-xl">
            Book Consultation
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
