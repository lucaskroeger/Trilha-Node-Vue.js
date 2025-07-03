<template>
  <div class="page-container">
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center mb-4">
          <v-btn
            icon="mdi-arrow-left"
            variant="text"
            @click="$router.go(-1)"
            class="mr-4"
          />
          <h1 class="text-h4">Novo Produto</h1>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title>Informações do Produto</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit" ref="form">
              <v-text-field
                v-model="formData.nome"
                label="Nome do Produto"
                :rules="[rules.required]"
                required
              />



              <v-select
                v-model="formData.categoria_id"
                label="Categoria"
                :items="categorias"
                item-title="nome"
                item-value="id"
                :rules="[rules.required]"
                required
              />

              <v-text-field
                v-model="formData.preco"
                label="Preço"
                type="number"
                step="0.01"
                min="0"
                prefix="R$"
                :rules="[rules.required, rules.positive]"
                required
              />

              <v-text-field
                v-model="formData.quantidade"
                label="Quantidade em Estoque"
                type="number"
                min="0"
                :rules="[rules.required, rules.positive]"
                required
              />

              <v-text-field
                v-model="formData.estoque_minimo"
                label="Estoque Mínimo"
                type="number"
                min="0"
                hint="Quantidade mínima para alerta de estoque baixo"
                persistent-hint
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              @click="$router.go(-1)"
              variant="outlined"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              :loading="loading"
              @click="handleSubmit"
            >
              Salvar Produto
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

export default {
  name: 'NovoProduto',
  setup() {
    const router = useRouter()
    const toast = useToast()
    
    const loading = ref(false)
    const categorias = ref([])
    const form = ref(null)

    const formData = reactive({
      nome: '',
      categoria_id: null,
      preco: '',
      quantidade: '',
      estoque_minimo: ''
    })

    const rules = {
      required: v => !!v || 'Campo obrigatório',
      positive: v => v > 0 || 'Valor deve ser maior que zero'
    }

    const loadCategorias = async () => {
      try {
        const response = await api.get('/produtos/categorias')
        categorias.value = response.data || []
      } catch (error) {
        console.error('Erro ao carregar categorias:', error)
        toast.error('Erro ao carregar categorias')
      }
    }

    const handleSubmit = async () => {
      if (!form.value.validate()) return

      loading.value = true
      
      try {
        const data = {
          ...formData,
          preco: parseFloat(formData.preco),
          quantidade: parseInt(formData.quantidade),
          estoque_minimo: formData.estoque_minimo ? parseInt(formData.estoque_minimo) : null
        }

        await api.post('/produtos', data)
        toast.success('Produto criado com sucesso!')
        router.push('/produtos')
      } catch (error) {
        console.error('Erro ao criar produto:', error)
        toast.error(error.response?.data?.error || 'Erro ao criar produto')
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadCategorias()
    })

    return {
      loading,
      categorias,
      form,
      formData,
      rules,
      handleSubmit
    }
  }
}
</script> 