
"use client";

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchFilterSkeleton() {
  return (
    <div className="bg-accent/[0.02] border border-primary/10 p-1 mb-12 shadow-sm">
      <div className="flex flex-col lg:flex-row items-stretch gap-1">
        {/* Main Search Input placeholder */}
        <div className="flex-1">
          <Skeleton className="h-16 w-full bg-background rounded-none" />
        </div>
        
        {/* Action Group placeholder */}
        <div className="flex items-stretch gap-1 p-1 bg-primary/[0.02]">
          <Skeleton className="h-14 w-40 bg-background rounded-none border border-primary/5" />
          <div className="w-[1px] bg-primary/10" />
          <div className="flex gap-1 px-2 items-center bg-background">
            <Skeleton className="h-12 w-12 bg-primary/[0.03] rounded-none" />
            <Skeleton className="h-12 w-12 bg-primary/[0.03] rounded-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
