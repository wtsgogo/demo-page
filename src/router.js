import { createRouter, createWebHistory } from 'vue-router'
import utils from './utils'

const routes = [
    {
        path: '/',
        component: () => import('./components/Home.vue')
    },
    {
        path: '/login',
        component: () => import('./components/Login.vue')
    },
    {
        path: '/edit',
        component: () => import('./components/Edit.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/msg',
        component: () => import('./components/Msg.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const instance = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({
        top: 0,
        behavior: 'smooth'
    })
})

instance.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !utils.getToken()) {
        return {
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        }
    }
})

export default instance
