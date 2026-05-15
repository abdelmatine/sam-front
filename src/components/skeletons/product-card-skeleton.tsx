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
      {/* Image Sector */}
      <div className={cn(
        "relative overflow-hidden shrink-0 flex items-center justify-center border-border/40 bg-muted/30",
        isList ? "w-full md:w-64 h-64 md:h-auto border-b md:border-b-0 md:border-r" : "h-56 border-b"
      )}>
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      {/* Content Sector */}
      <CardContent className="p-8 flex flex-col flex-1 gap-6">
        <div className="space-y-4 flex-1">
          {/* Brand & Badge */}
          <div className="flex justify-between items-start">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-12" />
          </div>
          
          {/* Title */}
          <div className="space-y-2">
            <Skeleton className={cn("h-6", isList ? "w-3/4" : "w-full")} />
            {!isList && <Skeleton className="h-6 w-1/2" />}
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="space-y-2">
            <Skeleton className="h-2 w-16" />
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className={cn("rounded-none", isList ? "h-14 w-40" : "h-12 w-12")} />
        </div>
      </CardContent>
    </Card>
  );
}
