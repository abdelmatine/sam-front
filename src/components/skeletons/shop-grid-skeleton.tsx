
"use client";

import React from 'react';
import ProductCardSkeleton from './product-card-skeleton';
import { cn } from '@/lib/utils';

interface ShopGridSkeletonProps {
  count?: number;
  layout?: 'grid' | 'list';
}

export default function ShopGridSkeleton({ count = 8, layout = 'grid' }: ShopGridSkeletonProps) {
  return (
    <div className={cn(
      "grid gap-8",
      layout === 'grid' ? "sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
    )}>
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} layout={layout} />
      ))}
    </div>
  );
}
