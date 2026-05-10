'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface DropdownItem {
  label: string;
  value?: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface ClinicalDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'start' | 'end' | 'center';
  className?: string;
  isHoverable?: boolean;
}

const ClinicalDropdown = ({ trigger, items, align = 'start', className, isHoverable = false }: ClinicalDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Hover logic for desktop only if enabled
  const handleMouseEnter = () => {
    if (isHoverable && typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isHoverable && typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setIsOpen(false);
    }
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          {trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={align} 
          sideOffset={8}
          className={cn(
            "z-[160] rounded-none border-primary/20 bg-background/80 backdrop-blur-xl min-w-[220px] p-2 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200",
            className
          )}
        >
          {/* Animated Top Bar */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 right-0 h-[3px] bg-primary origin-left"
          />

          <div className="pt-2 flex flex-col">
            {items.map((item, idx) => (
              <motion.div
                key={item.value || item.label || idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <DropdownMenuItem asChild className="p-0">
                  {item.href ? (
                    <Link 
                      href={item.href}
                      className={cn(
                        "flex w-full px-5 py-3.5 text-[8.5px] font-bold uppercase tracking-[0.25em] transition-all border-b border-primary/5 last:border-none cursor-pointer outline-none",
                        item.isActive ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div 
                      onClick={item.onClick}
                      className={cn(
                        "flex w-full px-5 py-3.5 text-[8.5px] font-bold uppercase tracking-[0.25em] transition-all border-b border-primary/5 last:border-none cursor-pointer outline-none",
                        item.isActive ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      {item.label}
                    </div>
                  )}
                </DropdownMenuItem>
              </motion.div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ClinicalDropdown;
