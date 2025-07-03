<template>
  <div class="page-container">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Movimentos de Estoque</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-arrow-up</v-icon>
            Registrar Entrada
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleEntrada" ref="entradaForm">
              <v-select
                v-model="entradaData.produto_id"
                label="Produto"
                :items="produtos"
                item-title="nome"
                item-value="id"
                :rules="[rules.required]"
                required
              />

              <v-text-field
                v-model="entradaData.quantidade"
                label="Quantidade"
                type="number"
                min="1"
                :rules="[rules.required, rules.positive]"
                required
              />

              <v-textarea
                v-model="entradaData.observacao"
                label="Observação"
                rows="3"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="success"
              :loading="entradaLoading"
              @click="handleEntrada"
            >
              Registrar Entrada
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-arrow-down</v-icon>
            Registrar Saída
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSaida" ref="saidaForm">
              <v-select
                v-model="saidaData.produto_id"
                label="Produto"
                :items="produtos"
                item-title="nome"
                item-value="id"
                :rules="[rules.required]"
                required
              />

              <v-text-field
                v-model="saidaData.quantidade"
                label="Quantidade"
                type="number"
                min="1"
                :rules="[rules.required, rules.positive]"
                required
              />

              <v-textarea
                v-model="saidaData.observacao"
                label="Observação"
                rows="3"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="error"
              :loading="saidaLoading"
              @click="handleSaida"
            >
              Registrar Saída
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-history</v-icon>
            Histórico de Movimentos
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  v-model="filtroTipo"
                  label="Filtrar por tipo"
                  :items="tiposMovimento"
                  clearable
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="filtroProduto"
                  label="Filtrar por produto"
                  :items="produtos"
                  item-title="nome"
                  item-value="id"
                  clearable
                />
              </v-col>
            </v-row>

            <v-data-table
              :headers="headers"
              :items="movimentosFiltrados"
              :loading="loading"
              class="elevation-1 mt-4"
            >
              <template v-slot:item.tipo="{ item }">
                <v-chip
                  :color="item.tipo === 'entrada' ? 'success' : 'error'"
                  small
                >
                  {{ item.tipo === 'entrada' ? 'Entrada' : 'Saída' }}
                </v-chip>
              </template>

              <template v-slot:item.data="{ item }">
                {{ formatDate(item.data) }}
              </template>

              <template v-slot:item.quantidade="{ item }">
                <span :class="item.tipo === 'entrada' ? 'text-success' : 'text-error'">
                  {{ item.tipo === 'entrada' ? '+' : '-' }}{{ item.quantidade }}
                </span>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

export default {
  name: 'Movimentos',
  setup() {
    const toast = useToast()
    
    const loading = ref(false)
    const entradaLoading = ref(false)
    const saidaLoading = ref(false)
    const produtos = ref([])
    const movimentos = ref([])
    const filtroTipo = ref(null)
    const filtroProduto = ref(null)

    const entradaForm = ref(null)
    const saidaForm = ref(null)

    const entradaData = reactive({
      produto_id: null,
      quantidade: '',
      observacao: ''
    })

    const saidaData = reactive({
      produto_id: null,
      quantidade: '',
      observacao: ''
    })

    const headers = [
      { title: 'Data', key: 'data' },
      { title: 'Produto', key: 'produto_nome' },
      { title: 'Tipo', key: 'tipo' },
      { title: 'Quantidade', key: 'quantidade' }
    ]

    const tiposMovimento = [
      { title: 'Entrada', value: 'entrada' },
      { title: 'Saída', value: 'saida' }
    ]

    const rules = {
      required: v => !!v || 'Campo obrigatório',
      positive: v => v > 0 || 'Valor deve ser maior que zero'
    }

    const movimentosFiltrados = computed(() => {
      let filtered = movimentos.value

      if (filtroTipo.value) {
        filtered = filtered.filter(m => m.tipo === filtroTipo.value)
      }

      if (filtroProduto.value) {
        filtered = filtered.filter(m => m.produto_id === filtroProduto.value)
      }

      return filtered
    })

    const loadProdutos = async () => {
      try {
        const response = await api.get('/produtos')
        produtos.value = response.data || []
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
        toast.error('Erro ao carregar produtos')
      }
    }

    const loadMovimentos = async () => {
      loading.value = true
      
      try {
        const response = await api.get('/movimentos')
        movimentos.value = response.data || []
      } catch (error) {
        console.error('Erro ao carregar movimentos:', error)
        toast.error('Erro ao carregar movimentos')
        movimentos.value = []
      } finally {
        loading.value = false
      }
    }

    const handleEntrada = async () => {
      if (!entradaForm.value.validate()) return

      entradaLoading.value = true
      
      try {
        const data = {
          produto_id: parseInt(entradaData.produto_id),
          quantidade: parseInt(entradaData.quantidade)
        }

        await api.post('/movimentos/entrada', data)
        toast.success('Entrada registrada com sucesso!')
        
        // Limpar formulário
        entradaData.produto_id = null
        entradaData.quantidade = ''
        entradaData.observacao = ''
        entradaForm.value.reset()
        
        // Recarregar dados
        await loadMovimentos()
        await loadProdutos()
      } catch (error) {
        console.error('Erro ao registrar entrada:', error)
        toast.error(error.response?.data?.error || 'Erro ao registrar entrada')
      } finally {
        entradaLoading.value = false
      }
    }

    const handleSaida = async () => {
      if (!saidaForm.value.validate()) return

      saidaLoading.value = true
      
      try {
        const data = {
          produto_id: parseInt(saidaData.produto_id),
          quantidade: parseInt(saidaData.quantidade)
        }

        await api.post('/movimentos/saida', data)
        toast.success('Saída registrada com sucesso!')
        
        // Limpar formulário
        saidaData.produto_id = null
        saidaData.quantidade = ''
        saidaData.observacao = ''
        saidaForm.value.reset()
        
        // Recarregar dados
        await loadMovimentos()
        await loadProdutos()
      } catch (error) {
        console.error('Erro ao registrar saída:', error)
        toast.error(error.response?.data?.error || 'Erro ao registrar saída')
      } finally {
        saidaLoading.value = false
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleString('pt-BR')
    }

    onMounted(() => {
      loadProdutos()
      loadMovimentos()
    })

    return {
      loading,
      entradaLoading,
      saidaLoading,
      produtos,
      movimentos,
      filtroTipo,
      filtroProduto,
      entradaForm,
      saidaForm,
      entradaData,
      saidaData,
      headers,
      tiposMovimento,
      rules,
      movimentosFiltrados,
      handleEntrada,
      handleSaida,
      formatDate
    }
  }
}
</script> 