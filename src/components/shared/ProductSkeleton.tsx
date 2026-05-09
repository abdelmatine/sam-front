import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="border bg-card p-6 flex flex-col gap-4">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-1/4 rounded-none" />
        <Skeleton className="h-5 w-3/4 rounded-none" />
        <Skeleton className="h-3 w-1/2 rounded-none" />
      </div>
      <div className="mt-auto pt-4 border-t flex items-center justify-between">
        <Skeleton className="h-6 w-1/3 rounded-none" />
        <Skeleton className="h-8 w-8 rounded-none" />
      </div>
    </div>
  );
}

export function ShopSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}