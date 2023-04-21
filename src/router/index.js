import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '../views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ( /* webpackChunkName: "register" */ '../views/RegisterView.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () =>
            import ( /* webpackChunkName: "not-found" */ '../views/NotFoundView.vue')

    }
]

const isAuthenticated = () => {
    const token = localStorage.getItem('access_token')
    return !!token
}
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && to.name !== 'register' && !isAuthenticated()) {
        next({ name: 'login' })
    } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated()) {
        next({ name: 'home' })
    } else {
        next()
    }
})

export default router