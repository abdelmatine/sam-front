"use client";

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function LanguageHandler() {
  const lang = useSelector((state: RootState) => state.i18n.lang);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

  return null;
}