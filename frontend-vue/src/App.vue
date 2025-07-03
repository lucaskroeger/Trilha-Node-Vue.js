<template>
  <v-app>
    <!-- Layout para usuários autenticados -->
    <template v-if="userStore.isAuthenticated">
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          :title="userStore.user?.nome || 'Usuário'"
          :subtitle="userStore.user?.email || ''"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            value="dashboard"
            to="/dashboard"
          ></v-list-item>
          
          <v-list-item
            prepend-icon="mdi-package-variant"
            title="Produtos"
            value="produtos"
            to="/produtos"
          ></v-list-item>
          
          <v-list-item
            prepend-icon="mdi-arrow-up-down"
            title="Movimentos"
            value="movimentos"
            to="/movimentos"
          ></v-list-item>
          
          <v-list-item
            prepend-icon="mdi-chart-bar"
            title="Relatórios"
            value="relatorios"
            to="/relatorios"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>TechStore - Gestão de Estoque</v-app-bar-title>
        <v-spacer></v-spacer>
        
        <v-btn
          @click="logout"
          prepend-icon="mdi-logout"
          variant="text"
        >
          Sair
        </v-btn>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </template>

    <!-- Layout para usuários não autenticados (login/register) -->
    <template v-else>
      <v-main>
        <router-view />
      </v-main>
    </template>
  </v-app>
</template>

<script>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

export default {
  name: 'App',
  setup() {
    const drawer = ref(true)
    const rail = ref(false)
    const userStore = useUserStore()
    const toast = useToast()

    const logout = () => {
      userStore.logout()
      toast.success('Logout realizado com sucesso!')
      // O redirecionamento já é feito no store
    }

    return {
      drawer,
      rail,
      userStore,
      logout
    }
  }
}
</script> 