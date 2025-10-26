import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/home';


// Variables

export const history = createWebHistory();

export const routes: RouteRecordRaw[] = [
    {
        name: 'Home',
        path: '/',
        component: HomeView,
    },
];

export const router = createRouter({ history, routes });


export default router;
