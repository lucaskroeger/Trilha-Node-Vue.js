import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
    // Rotas de autenticação (sem layout)
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: {
            requiresGuest: true,
            layout: 'auth'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
        meta: {
            requiresGuest: true,
            layout: 'auth'
        }
    },

    // Rota raiz - redireciona para dashboard se autenticado, login se não
    {
        path: '/',
        redirect: to => {
            const userStore = useUserStore()
            return userStore.isAuthenticated ? '/dashboard' : '/login'
        }
    },

    // Rotas protegidas (com layout)
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
            requiresAuth: true,
            layout: 'app'
        }
    },
    {
        path: '/produtos',
        name: 'Produtos',
        component: () => import('@/views/Produtos.vue'),
        meta: {
            requiresAuth: true,
            layout: 'app'
        }
    },
    {
        path: '/produtos/novo',
        name: 'NovoProduto',
        component: () => import('@/views/NovoProduto.vue'),
        meta: {
            requiresAuth: true,
            layout: 'app'
        }
    },
    {
        path: '/produtos/:id/editar',
        name: 'EditarProduto',
        component: () => import('@/views/EditarProduto.vue'),
        meta: {
            requiresAuth: true,
            layout: 'app'
        }
    },
    {
        path: '/movimentos',
        name: 'Movimentos',
        component: () => import('@/views/Movimentos.vue'),
        meta: {
            requiresAuth: true,
            layout: 'app'
        }
    },
    {
        path: '/relatorios',
        name: 'Relatorios',
        component: () => import('@/views/Relatorios.vue'),
        meta: {
            requiresAuth: true,
            layout: 'app'
        }
    },

    // Rota 404
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        meta: {
            layout: 'auth'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    // Se a rota requer autenticação e o usuário não está autenticado
    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        next('/login')
    }
    // Se a rota é para convidados e o usuário está autenticado
    else if (to.meta.requiresGuest && userStore.isAuthenticated) {
        next('/dashboard')
    }
    // Caso contrário, permite a navegação
    else {
        next()
    }
})

export default router 