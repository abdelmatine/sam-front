'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
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
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  isHoverable?: boolean;
  modal?: boolean;
}

const ClinicalDropdown = ({ 
  trigger, 
  items, 
  align = 'start', 
  side = 'bottom',
  className, 
  isHoverable = false,
  modal
}: ClinicalDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
      className="relative inline-block"
    >
      <DropdownMenu 
        open={isOpen} 
        onOpenChange={setIsOpen} 
        modal={modal !== undefined ? modal : !isHoverable}
      >
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">{trigger}</div>
        </DropdownMenuTrigger>
        
        <DropdownMenuPortal>
          <DropdownMenuContent 
            align={align} 
            side={side}
            sideOffset={8}
            className={cn(
              "z-[160] min-w-[240px] overflow-hidden rounded-none border-none bg-transparent p-0 shadow-none",
              className
            )}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="relative overflow-hidden border border-primary/10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
                >
                  {/* Premium Accent Line */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="absolute top-0 left-0 right-0 h-[2px] bg-primary origin-left z-30"
                  />

                  <div className="py-1 flex flex-col relative z-10">
                    {items.map((item, idx) => (
                      <DropdownItemRow 
                        key={item.value || item.label || idx} 
                        item={item} 
                        idx={idx} 
                        closeMenu={() => setIsOpen(false)} 
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
};

const DropdownItemRow = ({ item, idx, closeMenu }: { item: DropdownItem, idx: number, closeMenu: () => void }) => {
  const contentClasses = cn(
    "group relative flex w-full items-center px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors outline-none",
    "border-b border-primary/[0.03] last:border-none",
    item.isActive 
      ? "bg-primary text-white" 
      : "text-muted-foreground hover:bg-primary/[0.02]"
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.03 + 0.1 }}
    >
      <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
        <motion.div
          whileHover={{ x: 8, color: 'hsl(var(--primary))' }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="w-full cursor-pointer"
        >
          {item.href ? (
            <Link href={item.href} className={contentClasses} onClick={closeMenu}>
               <ItemInner item={item} />
            </Link>
          ) : (
            <button 
              onClick={() => {
                item.onClick?.();
                closeMenu();
              }} 
              className={contentClasses}
            >
               <ItemInner item={item} />
            </button>
          )}
        </motion.div>
      </DropdownMenuItem>
    </motion.div>
  );
};

const ItemInner = ({ item }: { item: DropdownItem }) => (
  <div className="flex items-center gap-4">
    <motion.div 
      className={cn(
        "h-1.5 w-1.5 rounded-full transition-colors",
        item.isActive ? "bg-white" : "bg-primary/30 group-hover:bg-primary"
      )}
      whileHover={{ scale: 2 }}
    />
    <span className="relative z-10 transition-colors">
      {item.label}
    </span>
  </div>
);

export default ClinicalDropdown;