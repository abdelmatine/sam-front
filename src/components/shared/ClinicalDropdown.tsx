'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from 'framer-motion';
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
}

const ClinicalDropdown = ({ trigger, items, align = 'start', className }: ClinicalDropdownProps) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={align} 
        sideOffset={8}
        className={cn(
          "z-[160] rounded-none border-primary/20 bg-background/98 backdrop-blur-xl min-w-[200px] p-2 shadow-2xl border-t-4 border-t-primary overflow-hidden",
          className
        )}
      >
        {items.map((item, idx) => (
          <motion.div
            key={item.value || item.label || idx}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <DropdownMenuItem asChild>
              {item.href ? (
                <Link 
                  href={item.href}
                  className={cn(
                    "flex w-full px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-all border-b border-border/5 last:border-none cursor-pointer outline-none",
                    item.isActive ? "bg-primary text-primary-foreground" : "hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <div 
                  onClick={item.onClick}
                  className={cn(
                    "flex w-full px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-all border-b border-border/5 last:border-none cursor-pointer outline-none",
                    item.isActive ? "bg-primary text-primary-foreground" : "hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  {item.label}
                </div>
              )}
            </DropdownMenuItem>
          </motion.div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ClinicalDropdown;