
"use client";

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryHeaderSkeleton() {
  return (
    <div className="mb-16 border-l-4 border-primary/20 pl-8 space-y-6">
      {/* Technical ID Node */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-7 w-7 bg-primary/10 rounded-sm" />
        <Skeleton className="h-3 w-40 bg-primary/5 rounded-none" />
      </div>

      {/* Title */}
      <Skeleton className="h-14 w-full max-w-xl bg-primary/5 rounded-none" />

      {/* Subtitle / Description */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full max-w-lg bg-primary/5 rounded-none" />
        <Skeleton className="h-3 w-3/4 max-w-lg bg-primary/5 rounded-none" />
      </div>
    </div>
  );
}
