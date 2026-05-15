"use client";

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchFilterSkeleton() {
  return (
    <div className="border border-border/40 p-1 mb-12 bg-card">
      <div className="flex flex-col lg:flex-row items-stretch gap-1">
        {/* Search Bar */}
        <div className="flex-1">
          <Skeleton className="h-16 w-full rounded-none" />
        </div>
        
        {/* Controls */}
        <div className="flex items-stretch gap-1 p-1 bg-muted/20">
          <Skeleton className="h-14 w-40 rounded-none" />
          <div className="w-[1px] bg-border/40" />
          <div className="flex gap-1 px-2 items-center">
            <Skeleton className="h-12 w-12 rounded-none" />
            <Skeleton className="h-12 w-12 rounded-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
