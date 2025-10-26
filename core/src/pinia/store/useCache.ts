import { defineStore } from 'pinia';
import { Obj } from '@/types';

export default defineStore('cache', {
  state: (): Obj => ({
    data: {},
  }),
  actions: {
    get(name: string): any {
      return this.data[name] ?? null;
    },
    set(name: string, value: any): void {
      this.data[name] = value;
    },
    del(name: string): void {
      if (!this.get(name)) return;

      delete this.data[name];
    },
  }
});
