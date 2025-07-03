import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)
    const token = ref(localStorage.getItem('token') || null)

    const isAuthenticated = computed(() => !!token.value)

    const login = async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials)
            const { token: authToken } = response.data

            token.value = authToken

            // Decodificar o token JWT para obter informações do usuário
            const payload = JSON.parse(atob(authToken.split('.')[1]))
            user.value = {
                id: payload.id,
                email: payload.email,
                role: payload.role,
                nome: payload.nome || payload.email.split('@')[0]
            }

            localStorage.setItem('token', authToken)
            api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao fazer login'
            }
        }
    }

    const register = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao registrar usuário'
            }
        }
    }

    const logout = () => {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
        delete api.defaults.headers.common['Authorization']

        // Redirecionar para login
        if (window.location.pathname !== '/login') {
            window.location.href = '/login'
        }
    }

    const initializeAuth = () => {
        if (token.value) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
        }
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout,
        initializeAuth
    }
}) 