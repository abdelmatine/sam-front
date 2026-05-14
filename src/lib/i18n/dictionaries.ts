import { fr } from './fr';
import { en } from './en';
import { ar } from './ar';

export const dictionaries = {
  fr,
  en,
  ar,
} as const;

export type Dictionary = typeof fr;
