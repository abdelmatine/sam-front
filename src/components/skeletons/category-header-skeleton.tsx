
"use client";

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryHeaderSkeleton() {
  return (
    <div className="mb-16 border-l-4 border-primary/20 pl-8 space-y-6">
      {/* Technical ID Node */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-6 bg-primary/10 rounded-sm" />
        <Skeleton className="h-2 w-32 bg-primary/10 rounded-none" />
      </div>

      {/* Title block */}
      <div className="space-y-3">
        <Skeleton className="h-12 w-full max-w-md bg-primary/5 rounded-none" />
        <Skeleton className="h-12 w-3/4 max-w-md bg-primary/5 rounded-none" />
      </div>

      {/* Subtitle / Description lines */}
      <div className="space-y-2 pt-2">
        <Skeleton className="h-2 w-full max-w-lg bg-primary/5 rounded-none opacity-60" />
        <Skeleton className="h-2 w-5/6 max-w-lg bg-primary/5 rounded-none opacity-60" />
      </div>
    </div>
  );
}
