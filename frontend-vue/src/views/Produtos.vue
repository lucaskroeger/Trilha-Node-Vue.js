<template>
  <div class="page-container">
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h1 class="text-h4">Produtos</h1>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="$router.push('/produtos/novo')"
        >
          Novo Produto
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="search"
                  label="Buscar produtos"
                  prepend-icon="mdi-magnify"
                  clearable
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="selectedCategoria"
                  label="Filtrar por categoria"
                  :items="categorias"
                  clearable
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-data-table
            :headers="headers"
            :items="filteredProdutos"
            :loading="loading"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:item.quantidade="{ item }">
              <v-chip
                :color="getEstoqueColor(item.quantidade)"
                small
              >
                {{ item.quantidade }}
              </v-chip>
            </template>

            <template v-slot:item.preco="{ item }">
              R$ {{ formatPrice(item.preco) }}
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn
                icon="mdi-eye"
                size="small"
                variant="text"
                @click="viewProduto(item)"
              />
              <v-btn
                icon="mdi-pencil"
                size="small"
                variant="text"
                @click="editProduto(item)"
              />
              <v-btn
                icon="mdi-delete"
                size="small"
                variant="text"
                color="error"
                @click="deleteProduto(item)"
              />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog para visualizar produto -->
    <v-dialog v-model="viewDialog" max-width="500">
      <v-card>
        <v-card-title>Detalhes do Produto</v-card-title>
        <v-card-text v-if="selectedProduto">
          <v-list>
            <v-list-item>
              <v-list-item-title>Nome</v-list-item-title>
              <v-list-item-subtitle>{{ selectedProduto.nome }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Categoria</v-list-item-title>
              <v-list-item-subtitle>{{ selectedProduto.categoria }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Preço</v-list-item-title>
              <v-list-item-subtitle>R$ {{ formatPrice(selectedProduto.preco) }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Quantidade em Estoque</v-list-item-title>
              <v-list-item-subtitle>{{ selectedProduto.quantidade }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="viewDialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de confirmação de exclusão -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir o produto "{{ produtoToDelete?.nome }}"?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn
            color="error"
            :loading="deleting"
            @click="confirmDelete"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

export default {
  name: 'Produtos',
  setup() {
    const router = useRouter()
    const toast = useToast()
    
    const loading = ref(false)
    const deleting = ref(false)
    const produtos = ref([])
    const search = ref('')
    const selectedCategoria = ref(null)
    const viewDialog = ref(false)
    const deleteDialog = ref(false)
    const selectedProduto = ref(null)
    const produtoToDelete = ref(null)

    const headers = [
      { title: 'Nome', key: 'nome' },
      { title: 'Categoria', key: 'categoria' },
      { title: 'Preço', key: 'preco' },
      { title: 'Estoque', key: 'quantidade' },
      { title: 'Ações', key: 'actions', sortable: false }
    ]

    const categorias = computed(() => {
      const cats = [...new Set(produtos.value.map(p => p.categoria))]
      return cats.map(cat => ({ title: cat, value: cat }))
    })

    const filteredProdutos = computed(() => {
      let filtered = produtos.value

      if (selectedCategoria.value) {
        filtered = filtered.filter(p => p.categoria === selectedCategoria.value)
      }

      return filtered
    })

    const loadProdutos = async () => {
      loading.value = true
      
      try {
        const response = await api.get('/produtos')
        produtos.value = response.data || []
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
        toast.error('Erro ao carregar produtos')
        produtos.value = []
      } finally {
        loading.value = false
      }
    }

    const viewProduto = (produto) => {
      selectedProduto.value = produto
      viewDialog.value = true
    }

    const editProduto = (produto) => {
      router.push(`/produtos/${produto.id}/editar`)
    }

    const deleteProduto = (produto) => {
      produtoToDelete.value = produto
      deleteDialog.value = true
    }

    const confirmDelete = async () => {
      if (!produtoToDelete.value) return

      deleting.value = true
      
      try {
        await api.delete(`/produtos/${produtoToDelete.value.id}`)
        toast.success('Produto excluído com sucesso!')
        await loadProdutos()
        deleteDialog.value = false
        produtoToDelete.value = null
      } catch (error) {
        toast.error('Erro ao excluir produto')
        console.error(error)
      } finally {
        deleting.value = false
      }
    }

    const getEstoqueColor = (quantidade) => {
      if (quantidade <= 10) return 'error'
      if (quantidade <= 30) return 'warning'
      return 'success'
    }

    const formatPrice = (price) => {
      return parseFloat(price).toFixed(2)
    }

    onMounted(() => {
      loadProdutos()
    })

    return {
      loading,
      deleting,
      produtos,
      search,
      selectedCategoria,
      viewDialog,
      deleteDialog,
      selectedProduto,
      produtoToDelete,
      headers,
      categorias,
      filteredProdutos,
      viewProduto,
      editProduto,
      deleteProduto,
      confirmDelete,
      getEstoqueColor,
      formatPrice
    }
  }
}
</script> 