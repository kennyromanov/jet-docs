import { createApp } from 'vue';
import { Obj } from '@/types';
import { useI18nCache, useI18nReactivity } from '@/i18n/lib';
import store from '@/pinia/store';
import i18n from '@/i18n';
import router from '@/router';
import App from './App.vue';
import './index.css';


// Third-parties

export const appStore = store.useApp();


// Constants

export const MOBILE_WIDTH = 1024;


// Functions

export function updIsMobile(): void {
    appStore.setIsMobile(window.innerWidth < MOBILE_WIDTH);
}

export function createEditor(el: string | HTMLElement): Obj {

    // Getting the cache

    useI18nCache();

    useI18nReactivity();


    // Setting the listeners

    window.addEventListener('resize', updIsMobile);


    // Defining the functions

    const clear = () => window.removeEventListener('resize', updIsMobile);


    // Initializing the app

    updIsMobile();

    createApp(App)
        .use(i18n)
        .use(router)
        .mount(el);


    return { clear };
}


export default createEditor;
