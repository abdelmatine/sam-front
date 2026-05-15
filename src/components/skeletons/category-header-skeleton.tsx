"use client";

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryHeaderSkeleton() {
  return (
    <div className="mb-16 border-l-4 border-muted pl-8 space-y-4">
      {/* Technical ID */}
      <Skeleton className="h-4 w-32" />

      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-12 w-full max-w-md" />
        <Skeleton className="h-12 w-2/3 max-w-md" />
      </div>

      {/* Description */}
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-full max-w-lg" />
        <Skeleton className="h-4 w-5/6 max-w-lg" />
      </div>
    </div>
  );
}
