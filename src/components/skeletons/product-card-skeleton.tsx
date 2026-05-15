
"use client";

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';

interface ProductCardSkeletonProps {
  layout?: 'grid' | 'list';
}

export default function ProductCardSkeleton({ layout = 'grid' }: ProductCardSkeletonProps) {
  const isList = layout === 'list';

  return (
    <Card className={cn(
      "rounded-none overflow-hidden border border-border/40 flex bg-card relative",
      isList ? "flex-col md:flex-row h-auto min-h-[220px]" : "flex-col h-full"
    )}>
      {/* Clinical Lateral Accent */}
      <div className="absolute top-0 left-0 w-[2.5px] h-full bg-primary/10" />

      {/* Image Sector: Simulating a diagnostic scan area */}
      <div className={cn(
        "relative overflow-hidden bg-accent/[0.02] shrink-0 flex items-center justify-center border-border/40",
        isList ? "w-full md:w-64 h-64 md:h-auto border-b md:border-b-0 md:border-r" : "h-56 border-b"
      )}>
        <div className="absolute inset-0 bg-primary/[0.02] animate-pulse" />
        <Activity className="h-8 w-8 text-primary/10" />
        <div className="absolute top-5 left-5">
           <Skeleton className="h-5 w-12 bg-primary/10 rounded-none" />
        </div>
      </div>

      {/* Content Sector: High-density minimal placeholders */}
      <CardContent className="p-8 flex flex-col flex-1 relative gap-8">
        <div className="space-y-5 flex-1">
          {/* Brand ID Placeholder */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-1.5 w-20 bg-primary/10 rounded-none" />
          </div>
          
          {/* Title Placeholder */}
          <div className="space-y-2">
            <Skeleton className={cn("bg-primary/5 rounded-none", isList ? "h-8 w-3/4" : "h-5 w-full")} />
            {!isList && <Skeleton className="h-5 w-2/3 bg-primary/5 rounded-none" />}
          </div>
          
          {/* Rating Placeholder */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-2.5 w-2.5 bg-primary/5 rounded-full" />
              ))}
            </div>
            <div className="h-3 w-[1px] bg-border/40" />
            <Skeleton className="h-2 w-10 bg-primary/10 rounded-none" />
          </div>
        </div>

        {/* Footer: Acquisition Terminal simulation */}
        <div className="flex items-center justify-between pt-6 border-t border-border/10">
          <div className="space-y-2">
            <Skeleton className="h-1.5 w-16 bg-primary/10 rounded-none opacity-40" />
            <Skeleton className="h-7 w-28 bg-primary/5 rounded-none" />
          </div>
          <Skeleton className={cn("bg-primary/10 rounded-none", isList ? "h-14 w-40" : "h-12 w-12")} />
        </div>
      </CardContent>
    </Card>
  );
}
