
"use client";

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
      {/* Clinical Lateral Accent Skeleton */}
      <div className="absolute top-0 left-0 w-[2.5px] h-full bg-primary/10" />

      {/* Image Sector Skeleton */}
      <div className={cn(
        "relative overflow-hidden bg-accent/5 shrink-0 flex items-center justify-center border-border/40",
        isList ? "w-full md:w-64 h-64 md:h-auto border-b md:border-b-0 md:border-r" : "h-56 border-b"
      )}>
        <Skeleton className="h-full w-full bg-primary/5 rounded-none" />
        <div className="absolute top-5 left-5 flex flex-col gap-2">
           <Skeleton className="h-6 w-16 bg-primary/10 rounded-none" />
        </div>
      </div>

      {/* Content Sector Skeleton */}
      <CardContent className="p-8 flex flex-col flex-1 relative gap-6">
        <div className="space-y-4 flex-1">
          {/* Brand & Ref */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-2 w-24 bg-primary/10 rounded-none" />
          </div>
          
          {/* Title */}
          <Skeleton className={cn("bg-primary/5 rounded-none", isList ? "h-10 w-3/4" : "h-6 w-full")} />
          
          {/* Description (List mode only) */}
          {isList && (
            <div className="space-y-2">
              <Skeleton className="h-3 w-full bg-primary/5 rounded-none" />
              <Skeleton className="h-3 w-2/3 bg-primary/5 rounded-none" />
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-20 bg-primary/5 rounded-none" />
            <div className="h-3 w-[1px] bg-border/40" />
            <Skeleton className="h-3 w-16 bg-primary/5 rounded-none" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-border/10">
          <div className="space-y-2">
            <Skeleton className="h-2 w-16 bg-primary/10 rounded-none" />
            <Skeleton className="h-8 w-24 bg-primary/5 rounded-none" />
          </div>
          <Skeleton className={cn("bg-primary/10 rounded-none", isList ? "h-16 w-40" : "h-12 w-12")} />
        </div>
      </CardContent>
    </Card>
  );
}
