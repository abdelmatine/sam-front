
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ShopRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/shop/all');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary">SAM MÉDICALE CATALOGUE</span>
      </div>
    </div>
  );
}
