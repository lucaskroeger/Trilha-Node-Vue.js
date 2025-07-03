<template>
  <div class="page-container">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Relatórios</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Produtos Mais Vendidos
          </v-card-title>
          <v-card-text>
            <v-list v-if="produtosMaisVendidos.length > 0">
              <v-list-item
                v-for="(produto, index) in produtosMaisVendidos"
                :key="produto.id"
              >
                <template v-slot:prepend>
                  <v-avatar color="primary" size="32">
                    {{ index + 1 }}
                  </v-avatar>
                </template>
                <v-list-item-title>{{ produto.nome }}</v-list-item-title>
                <v-list-item-subtitle>
                  Quantidade vendida: {{ produto.quantidadeVendida }}
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-chip color="success" small>
                    {{ produto.quantidadeVendida }} un
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>
            <v-alert v-else type="info">
              Nenhum produto vendido ainda.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-alert-circle</v-icon>
            Produtos com Estoque Baixo
          </v-card-title>
          <v-card-text>
            <v-list v-if="estoqueBaixo.length > 0">
              <v-list-item
                v-for="produto in estoqueBaixo"
                :key="produto.id"
              >
                <template v-slot:prepend>
                  <v-icon color="warning">mdi-alert</v-icon>
                </template>
                <v-list-item-title>{{ produto.nome }}</v-list-item-title>
                <v-list-item-subtitle>
                  Estoque atual: {{ produto.quantidade }} | Mínimo: {{ produto.estoqueMinimo }}
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-chip 
                    :color="produto.quantidade <= 5 ? 'error' : 'warning'" 
                    small
                  >
                    {{ produto.quantidade }} un
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>
            <v-alert v-else type="success">
              Todos os produtos estão com estoque adequado.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-chart-pie</v-icon>
            Produtos por Categoria
          </v-card-title>
          <v-card-text>
            <v-list v-if="produtosPorCategoria.length > 0">
              <v-list-item
                v-for="categoria in produtosPorCategoria"
                :key="categoria.nome"
              >
                <v-list-item-title>{{ categoria.nome }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ categoria.quantidade }} produtos
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-progress-linear
                    :model-value="(categoria.quantidade / totalProdutos) * 100"
                    color="primary"
                    height="8"
                    rounded
                  />
                </template>
              </v-list-item>
            </v-list>
            <v-alert v-else type="info">
              Nenhum produto cadastrado.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-currency-usd</v-icon>
            Valor Total em Estoque
          </v-card-title>
          <v-card-text>
            <div class="text-center">
              <div class="text-h3 text-primary mb-2">
                R$ {{ formatPrice(valorTotalEstoque) }}
              </div>
              <div class="text-body-2 text-medium-emphasis">
                Valor total dos produtos em estoque
              </div>
            </div>
            
            <v-divider class="my-4" />
            
            <v-list>
              <v-list-item>
                <v-list-item-title>Total de Produtos</v-list-item-title>
                <template v-slot:append>
                  <v-chip color="primary">{{ totalProdutos }}</v-chip>
                </template>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Produtos com Estoque Baixo</v-list-item-title>
                <template v-slot:append>
                  <v-chip color="warning">{{ estoqueBaixo.length }}</v-chip>
                </template>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Produtos Sem Estoque</v-list-item-title>
                <template v-slot:append>
                  <v-chip color="error">{{ produtosSemEstoque }}</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-download</v-icon>
            Exportar Relatórios
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <v-btn
                  block
                  color="primary"
                  prepend-icon="mdi-file-pdf-box"
                  @click="exportarPDF"
                  :loading="exportandoPDF"
                >
                  Exportar PDF
                </v-btn>
              </v-col>
              <v-col cols="12" md="3">
                <v-btn
                  block
                  color="success"
                  prepend-icon="mdi-file-excel"
                  @click="exportarExcel"
                  :loading="exportandoExcel"
                >
                  Exportar Excel
                </v-btn>
              </v-col>
              <v-col cols="12" md="3">
                <v-btn
                  block
                  color="info"
                  prepend-icon="mdi-file-csv"
                  @click="exportarCSV"
                  :loading="exportandoCSV"
                >
                  Exportar CSV
                </v-btn>
              </v-col>
              <v-col cols="12" md="3">
                <v-btn
                  block
                  color="warning"
                  prepend-icon="mdi-printer"
                  @click="imprimirRelatorio"
                >
                  Imprimir
                </v-btn>
              </v-col>
            </v-row>
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
  name: 'Relatorios',
  setup() {
    const toast = useToast()
    
    const loading = ref(false)
    const exportandoPDF = ref(false)
    const exportandoExcel = ref(false)
    const exportandoCSV = ref(false)
    
    const produtosMaisVendidos = ref([])
    const estoqueBaixo = ref([])
    const produtosPorCategoria = ref([])
    const valorTotalEstoque = ref(0)
    const totalProdutos = ref(0)
    const produtosSemEstoque = ref(0)

    const loadRelatorios = async () => {
      loading.value = true
      
      try {
        const [
          maisVendidosRes,
          estoqueBaixoRes,
          porCategoriaRes,
          valorEstoqueRes
        ] = await Promise.all([
          api.get('/relatorios/mais-vendidos'),
          api.get('/relatorios/estoque-baixo'),
          api.get('/relatorios/por-categoria'),
          api.get('/relatorios/valor-estoque')
        ])

        produtosMaisVendidos.value = maisVendidosRes.data || []
        estoqueBaixo.value = estoqueBaixoRes.data || []
        produtosPorCategoria.value = porCategoriaRes.data || []
        
        const valorData = valorEstoqueRes.data
        valorTotalEstoque.value = valorData?.valorTotal || 0
        totalProdutos.value = valorData?.totalProdutos || 0
        produtosSemEstoque.value = valorData?.produtosSemEstoque || 0
      } catch (error) {
        console.error('Erro ao carregar relatórios:', error)
        toast.error('Erro ao carregar relatórios')
      } finally {
        loading.value = false
      }
    }

    const formatPrice = (price) => {
      return parseFloat(price || 0).toFixed(2)
    }

    const exportarPDF = async () => {
      exportandoPDF.value = true
      try {
        // Implementar exportação PDF
        toast.info('Funcionalidade de exportação PDF em desenvolvimento')
      } catch (error) {
        toast.error('Erro ao exportar PDF')
      } finally {
        exportandoPDF.value = false
      }
    }

    const exportarExcel = async () => {
      exportandoExcel.value = true
      try {
        // Implementar exportação Excel
        toast.info('Funcionalidade de exportação Excel em desenvolvimento')
      } catch (error) {
        toast.error('Erro ao exportar Excel')
      } finally {
        exportandoExcel.value = false
      }
    }

    const exportarCSV = async () => {
      exportandoCSV.value = true
      try {
        // Implementar exportação CSV
        toast.info('Funcionalidade de exportação CSV em desenvolvimento')
      } catch (error) {
        toast.error('Erro ao exportar CSV')
      } finally {
        exportandoCSV.value = false
      }
    }

    const imprimirRelatorio = () => {
      window.print()
    }

    onMounted(() => {
      loadRelatorios()
    })

    return {
      loading,
      exportandoPDF,
      exportandoExcel,
      exportandoCSV,
      produtosMaisVendidos,
      estoqueBaixo,
      produtosPorCategoria,
      valorTotalEstoque,
      totalProdutos,
      produtosSemEstoque,
      formatPrice,
      exportarPDF,
      exportarExcel,
      exportarCSV,
      imprimirRelatorio
    }
  }
}
</script> 