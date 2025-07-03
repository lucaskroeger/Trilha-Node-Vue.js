<template>
  <v-container fluid class="fill-height auth-container">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-8 auth-card" elevation="8">
          <div class="text-center mb-8">
            <div class="logo-container">
              <v-icon size="80" color="white">mdi-store</v-icon>
            </div>
            <h1 class="text-h3 font-weight-bold app-title">TechStore</h1>
            <p class="text-body-1 text-medium-emphasis mt-2">Gestão de Estoque Inteligente</p>
          </div>

          <v-form @submit.prevent="handleLogin" ref="form">
            <v-text-field
              v-model="formData.email"
              label="Email"
              type="email"
              prepend-icon="mdi-email"
              :rules="[rules.required, rules.email]"
              variant="outlined"
              class="mb-4 modern-input"
              :error-messages="errors.email"
              @input="clearError('email')"
            ></v-text-field>

            <v-text-field
              v-model="formData.senha"
              label="Senha"
              type="password"
              prepend-icon="mdi-lock"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-6 modern-input"
              :error-messages="errors.password"
              @input="clearError('password')"
            ></v-text-field>

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              :loading="loading"
              :disabled="loading"
              class="mb-4 login-btn"
            >
              <v-icon left>mdi-login</v-icon>
              Entrar
            </v-btn>
          </v-form>

          <v-divider class="my-6"></v-divider>

          <div class="text-center">
            <p class="text-body-2 text-medium-emphasis">
              Não tem uma conta?
              <router-link to="/register" class="text-primary text-decoration-none font-weight-medium">
                Registre-se aqui
              </router-link>
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const toast = useToast()
    const form = ref(null)
    const loading = ref(false)

    const formData = reactive({
      email: '',
      senha: ''
    })

    const errors = reactive({
      email: '',
      password: ''
    })

    const rules = {
      required: v => !!v || 'Campo obrigatório',
      email: v => /.+@.+\..+/.test(v) || 'Email deve ser válido'
    }

    const clearError = (field) => {
      errors[field] = ''
    }

    const handleLogin = async () => {
      const { valid } = await form.value.validate()
      
      if (!valid) return

      loading.value = true
      
      try {
        const result = await userStore.login(formData)
        
        if (result.success) {
          toast.success('Login realizado com sucesso!')
          router.push('/dashboard')
        } else {
          toast.error(result.error)
        }
      } catch (error) {
        toast.error('Erro ao fazer login')
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      formData,
      loading,
      rules,
      errors,
      clearError,
      handleLogin
    }
  }
}
</script>

<style scoped>
.auth-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  position: relative;
}

.auth-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.auth-card {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

.logo-container {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #6B46C1, #9F7AEA);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: 0 12px 32px rgba(107, 70, 193, 0.3);
}

.app-title {
  background: linear-gradient(135deg, #6B46C1, #9F7AEA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
}

.modern-input {
  border-radius: 12px;
}

.modern-input .v-field {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
}

.login-btn {
  border-radius: 12px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 24px rgba(107, 70, 193, 0.3);
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(107, 70, 193, 0.4);
}
</style> 