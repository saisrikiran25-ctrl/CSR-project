import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import gu from './locales/gu.json';
import hi from './locales/hi.json';
import en from './locales/en.json';
import { extra } from './locales/extra';

const savedLanguage = localStorage.getItem('urja_language') || 'gu';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { ...en, ...extra.en } },
      hi: { translation: { ...hi, ...extra.hi } },
      gu: { translation: { ...gu, ...extra.gu } },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export const changeLanguage = (lang: 'gu' | 'hi' | 'en') => {
  localStorage.setItem('urja_language', lang);
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang;
};

export default i18n;
