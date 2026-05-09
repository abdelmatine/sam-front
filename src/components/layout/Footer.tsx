"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import { Activity, Mail, Facebook, Twitter, Instagram, ShieldCheck, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-background border-t py-16 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-headline font-bold text-xl tracking-tighter">
                SAM <span className="text-primary">Médicale</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Fournisseur global de solutions respiratoires cliniques et d'équipements médicaux spécialisés. Certifié ISO 13485.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
              <Twitter className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
              <Instagram className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-widest text-[10px]">{t.categories.title}</h4>
            <ul className="space-y-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              <li className="hover:text-primary cursor-pointer transition-colors">CPAP & BPAP</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Concentrateurs d'Oxygène</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Interfaces & Masques</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Monitoring</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-widest text-[10px]">Contact</h4>
            <ul className="space-y-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              <li className="flex items-center gap-3"><MapPin className="h-3.5 w-3.5 text-primary" /> Paris, France</li>
              <li className="flex items-center gap-3"><Phone className="h-3.5 w-3.5 text-primary" /> +33 (0) 1 23 45 67 89</li>
              <li className="flex items-center gap-3"><Mail className="h-3.5 w-3.5 text-primary" /> support@sam-medicale.fr</li>
            </ul>
          </div>

          <div className="bg-primary/5 p-6 border border-primary/10">
            <h4 className="font-bold text-primary mb-3 uppercase tracking-widest text-[10px] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Certifications
            </h4>
            <p className="text-[10px] text-muted-foreground leading-relaxed italic">
              Tous nos équipements sont conformes aux normes européennes CE et aux standards de qualité ISO 13485:2016.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.2em]">
            © {new Date().getFullYear()} SAM MÉDICALE. SOLUTIONS RESPIRATOIRES DE PRÉCISION.
          </p>
          <div className="flex gap-8 text-[9px] text-muted-foreground uppercase font-bold tracking-[0.2em]">
            <span className="hover:text-primary cursor-pointer">Confidentialité</span>
            <span className="hover:text-primary cursor-pointer">Conditions</span>
            <span className="hover:text-primary cursor-pointer">Sécurité</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;