import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'fr' | 'en' | 'ar';

interface I18nState {
  lang: Language;
}

const initialState: I18nState = {
  lang: 'fr',
};

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.lang = action.payload;
    },
  },
});

export const { setLanguage } = i18nSlice.actions;
export default i18nSlice.reducer;