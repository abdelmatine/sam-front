import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { dictionaries } from '@/lib/i18n/dictionaries';

export function useTranslation() {
  const lang = useSelector((state: RootState) => state.i18n.lang);
  const t = dictionaries[lang];

  return { t, lang, isRTL: lang === 'ar' };
}