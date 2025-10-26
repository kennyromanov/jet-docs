import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Obj, Locale, Nullable } from '@/types';
import { Cache } from '@/lib';
import store from '@/pinia/store';
import i18n, { DEFAULT_LANG } from '.';


// Third-parties

const appStore = store.useApp();


// Functions

export function te(key: string): boolean {
  return i18n.global.te(key);
}

export function t(key: string, data: Obj = {}, locale?: Nullable<Locale>): string|null {
  if (!te(key))
    return null;

  else if (locale)
    return i18n.global.t(key, data, { locale });

  else
    return i18n.global.t(key, data);
}

export function useI18nCache(): void {
  let lang = Cache.get('lang');


  // If the lang cache was not found

  if (!lang) {
    lang = appStore.getLang() ?? DEFAULT_LANG;
    Cache.set('lang', lang, true);
  }


  appStore.setLang(lang);
}

export function useI18nReactivity(): void {
  const { lang } = storeToRefs(appStore);

  watch(lang, (val: Locale): void => {
    i18n.global.locale = val;
    Cache.set('lang', val, true);
  }, { immediate: true });
}
