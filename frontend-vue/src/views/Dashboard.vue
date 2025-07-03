<template>
  <div class="page-container">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4 dashboard-title">TechStore Dashboard</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-card class="dashboard-card">
          <v-card-text class="text-center">
            <div class="icon-container primary-gradient">
              <v-icon size="48" color="white">mdi-package-variant</v-icon>
            </div>
            <div class="dashboard-value">{{ stats.totalProdutos }}</div>
            <div class="dashboard-label">Total de Produtos</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="dashboard-card">
          <v-card-text class="text-center">
            <div class="icon-container warning-gradient">
              <v-icon size="48" color="white">mdi-alert</v-icon>
            </div>
            <div class="dashboard-value">{{ stats.estoqueBaixo }}</div>
            <div class="dashboard-label">Estoque Baixo</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="dashboard-card">
          <v-card-text class="text-center">
            <div class="icon-container success-gradient">
              <v-icon size="48" color="white">mdi-arrow-up</v-icon>
            </div>
            <div class="dashboard-value">{{ stats.entradasHoje }}</div>
            <div class="dashboard-label">Entradas Hoje</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="dashboard-card">
          <v-card-text class="text-center">
            <div class="icon-container error-gradient">
              <v-icon size="48" color="white">mdi-arrow-down</v-icon>
            </div>
            <div class="dashboard-value">{{ stats.saidasHoje }}</div>
            <div class="dashboard-label">Saídas Hoje</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="feature-card">
          <v-card-title class="card-title">
            <div class="title-icon primary-gradient">
              <v-icon color="white">mdi-chart-line</v-icon>
            </div>
            Produtos Mais Vendidos
          </v-card-title>
          <v-card-text>
            <v-list v-if="produtosMaisVendidos.length > 0">
              <v-list-item
                v-for="(produto, index) in produtosMaisVendidos"
                :key="produto.id"
                class="list-item-modern"
              >
                <v-list-item-title class="font-weight-bold">{{ produto.nome }}</v-list-item-title>
                <v-list-item-subtitle class="text-primary">
                  Quantidade vendida: {{ produto.quantidadeVendida }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <v-alert v-else type="info" class="modern-alert">
              Nenhum produto vendido ainda.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="feature-card">
          <v-card-title class="card-title">
            <div class="title-icon warning-gradient">
              <v-icon color="white">mdi-alert-circle</v-icon>
            </div>
            Produtos com Estoque Baixo
          </v-card-title>
          <v-card-text>
            <v-list v-if="estoqueBaixo.length > 0">
              <v-list-item
                v-for="produto in estoqueBaixo"
                :key="produto.id"
                class="list-item-modern"
              >
                <v-list-item-title class="font-weight-bold">{{ produto.nome }}</v-list-item-title>
                <v-list-item-subtitle class="text-warning">
                  Estoque atual: {{ produto.quantidade }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <v-alert v-else type="success" class="modern-alert">
              Todos os produtos estão com estoque adequado.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="feature-card">
          <v-card-title class="card-title">
            <div class="title-icon info-gradient">
              <v-icon color="white">mdi-clock-outline</v-icon>
            </div>
            Últimos Movimentos
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="movimentosHeaders"
              :items="ultimosMovimentos"
              :loading="loading"
              class="modern-table"
            >
              <template v-slot:item.tipo="{ item }">
                <v-chip
                  :color="item.tipo === 'entrada' ? 'success' : 'error'"
                  class="modern-chip"
                >
                  {{ item.tipo === 'entrada' ? 'Entrada' : 'Saída' }}
                </v-chip>
              </template>
              <template v-slot:item.data="{ item }">
                {{ formatDate(item.data) }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

export default {
  name: 'Dashboard',
  setup() {
    const loading = ref(false)
    const toast = useToast()

    const stats = ref({
      totalProdutos: 0,
      estoqueBaixo: 0,
      entradasHoje: 0,
      saidasHoje: 0
    })

    const produtosMaisVendidos = ref([])
    const estoqueBaixo = ref([])
    const ultimosMovimentos = ref([])

    const movimentosHeaders = [
      { title: 'Produto', key: 'produto_nome' },
      { title: 'Tipo', key: 'tipo' },
      { title: 'Quantidade', key: 'quantidade' },
      { title: 'Data', key: 'data' }
    ]

    const loadDashboardData = async () => {
      loading.value = true
      
      try {
        const [
          produtosRes,
          maisVendidosRes,
          estoqueBaixoRes,
          movimentosRes,
          resumoRes
        ] = await Promise.all([
          api.get('/produtos'),
          api.get('/relatorios/mais-vendidos'),
          api.get('/relatorios/estoque-baixo'),
          api.get('/movimentos'),
          api.get('/relatorios/resumo')
        ])

        const produtos = produtosRes.data || []
        produtosMaisVendidos.value = maisVendidosRes.data || []
        estoqueBaixo.value = estoqueBaixoRes.data || []
        ultimosMovimentos.value = (movimentosRes.data || []).slice(0, 10)

        const resumo = resumoRes.data || {}
        stats.value = {
          totalProdutos: resumo.totalProdutos || produtos.length,
          estoqueBaixo: resumo.produtosEstoqueBaixo || estoqueBaixo.value.length,
          entradasHoje: 0, // Implementar filtro por data
          saidasHoje: 0    // Implementar filtro por data
        }

        // Calcular entradas e saídas de hoje
        const hoje = new Date().toDateString()
        const movimentosHoje = ultimosMovimentos.value.filter(m => 
          new Date(m.data).toDateString() === hoje
        )
        
        stats.value.entradasHoje = movimentosHoje.filter(m => m.tipo === 'entrada').length
        stats.value.saidasHoje = movimentosHoje.filter(m => m.tipo === 'saida').length

      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error)
        toast.error('Erro ao carregar dados do dashboard')
      } finally {
        loading.value = false
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleString('pt-BR')
    }

    onMounted(() => {
      loadDashboardData()
    })

    return {
      loading,
      stats,
      produtosMaisVendidos,
      estoqueBaixo,
      ultimosMovimentos,
      movimentosHeaders,
      formatDate
    }
  }
}
</script>

<style scoped>
.dashboard-title {
  background: linear-gradient(135deg, #6B46C1, #9F7AEA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.dashboard-card {
  transition: all 0.3s ease;
  border-radius: 20px !important;
  overflow: hidden;
}

.dashboard-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(107, 70, 193, 0.2) !important;
}

.icon-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.primary-gradient {
  background: linear-gradient(135deg, #6B46C1, #9F7AEA);
}

.warning-gradient {
  background: linear-gradient(135deg, #D69E2E, #F6E05E);
}

.success-gradient {
  background: linear-gradient(135deg, #38A169, #68D391);
}

.error-gradient {
  background: linear-gradient(135deg, #E53E3E, #FC8181);
}

.info-gradient {
  background: linear-gradient(135deg, #3182CE, #63B3ED);
}

.feature-card {
  border-radius: 20px !important;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(107, 70, 193, 0.15) !important;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: #2D3748;
}

.title-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.list-item-modern {
  border-radius: 12px !important;
  margin: 4px 0 !important;
  transition: all 0.2s ease;
}

.list-item-modern:hover {
  background: rgba(107, 70, 193, 0.05) !important;
  transform: translateX(4px);
}

.modern-alert {
  border-radius: 12px !important;
  border: none !important;
}

.modern-table {
  border-radius: 16px !important;
  overflow: hidden;
}

.modern-chip {
  border-radius: 20px !important;
  font-weight: 600 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}
</style> 