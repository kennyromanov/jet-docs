import { defineStore } from 'pinia';
import { Obj, Locale } from '@/types';

export default defineStore('app', {
  state: (): Obj => ({
    lang: null,

    isMobile: null,

    errors: [],
  }),
  actions: {

    // Globals

    getLang(): Locale | null {
      return this.lang;
    },
    setLang(val: Locale): void {
      this.lang = val;
    },


    // Mobile

    getIsMobile(): boolean|null {
      return this.isMobile;
    },
    setIsMobile(val: boolean): void {
      this.isMobile = val;
    },


    // Errors

    logError(e: Error): void {
      this.errors.push(e);
    },
    flushErrors(): void {
      this.errors = [];
    },
  }
});
