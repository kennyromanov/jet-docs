import { createI18n } from 'vue-i18n';
import { Locale } from '@/types';
import * as enUs from './messages/en-US';
import * as kkKz from './messages/kk-KZ';
import * as ruRu from './messages/ru-RU';
import * as uzUz from './messages/uz-UZ';


// Constants

export const DEFAULT_LANG: Locale = 'en-US';


// Variables

export const i18n = createI18n({
  locale: DEFAULT_LANG,
  fallbackLocale: DEFAULT_LANG,
  messages: {
    'en-US': enUs,
    'kk-KZ': kkKz,
    'ru-RU': ruRu,
    'uz-UZ': uzUz,
  },
});


export default i18n;
