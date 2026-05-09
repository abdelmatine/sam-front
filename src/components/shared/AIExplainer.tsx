"use client";

import React, { useState } from 'react';
import { explainMedicalContent } from '@/ai/flows/medical-content-explainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2, Info } from 'lucide-react';

interface AIExplainerProps {
  content: string;
}

const AIExplainer = ({ content }: AIExplainerProps) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    <Card className="border-primary/20 bg-primary/5 overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="p-2 bg-primary rounded-lg">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <CardTitle className="text-lg">AI Product Assistant</CardTitle>
          <p className="text-sm text-muted-foreground">Simplify complex medical specifications</p>
        </div>
      </CardHeader>
      <CardContent>
        {!summary ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Have questions about technical specs or usage? Our medical assistant can explain this device in simple terms for you.
            </p>
            <Button 
              onClick={handleExplain} 
              disabled={loading}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing device specs...
                </>
              ) : (
                'Explain in Plain English'
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="flex gap-2 items-start text-sm bg-background p-4 rounded-xl border border-primary/10">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                {summary}
              </div>
            </div>
            <Button 
              variant="link" 
              onClick={() => setSummary(null)} 
              className="text-primary p-0 h-auto"
            >
              Regenerate summary
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIExplainer;