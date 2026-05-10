"use client";

import React, { useState } from 'react';
import { explainMedicalContent } from '@/ai/flows/medical-content-explainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2, Info } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface AIExplainerProps {
  content: string;
}

const AIExplainer = ({ content }: AIExplainerProps) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleExplain = async () => {
    setLoading(true);
    try {
      const result = await explainMedicalContent({ medicalContent: content });
      setSummary(result.summary);
    } catch (error) {
      console.error("AI explanation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border rounded-none clinical-shadow bg-accent/20 overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-3 pb-2 border-b mb-4">
        <Sparkles className="h-4 w-4 text-primary" />
        <CardTitle className="text-xs font-bold uppercase tracking-[0.2em]">{t.product.ai_assistant}</CardTitle>
      </CardHeader>
      <CardContent>
        {!summary ? (
          <div className="flex flex-col gap-4">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-relaxed">
              {t.product.ai_desc}
            </p>
            <Button 
              onClick={handleExplain} 
              disabled={loading}
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] py-5"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Expert Summary'
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-1000">
            <div className="flex gap-3 items-start text-[11px] bg-background p-4 border leading-relaxed border-primary/20">
              <span className="shrink-0 p-1 bg-primary/5">
                <Info className="h-4 w-4 text-primary" />
              </span>
              <div>{summary}</div>
            </div>
            <Button 
              variant="link" 
              onClick={() => setSummary(null)} 
              className="text-primary p-0 h-auto text-[10px] uppercase font-bold tracking-widest"
            >
              Request New Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIExplainer;