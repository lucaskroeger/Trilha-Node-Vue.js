## ✅ Questões Teóricas

1. **O que é o Pinia e vantagens sobre o Vuex:**
   Pinia é a biblioteca oficial de gerenciamento de estado no Vue 3.
   **Vantagens:**

   * Sintaxe mais simples
   * Integração nativa com Composition API
   * Reatividade automática
   * Melhor suporte a TypeScript

2. **state, actions, mutations e getters no Pinia:**

   * `state`: dados reativos da aplicação
   * `getters`: funções computadas baseadas no state
   * `actions`: métodos (assíncronos ou não) para alterar o state
   * *mutations* não existem no Pinia (ações fazem isso diretamente)

3. **Modularização do Pinia:**
   Permite separar cada contexto da aplicação (auth, produtos, carrinho) em uma store distinta dentro da pasta `stores/`, tornando o projeto escalável e organizado.

4. **Gerenciar métodos assíncronos:**
   Ações assíncronas são importantes para interações com APIs.
   **Exemplo:**

   ```js
   async fetchProdutos() {
     this.produtos = await axios.get('/api/produtos');
   }
   ```

5. **Vue DevTools e monitoramento do Pinia:**
   Extensão que permite inspecionar o estado das stores em tempo real. Ajuda no debug e análise de fluxo de dados reativos do Pinia.

6. **Princípios de Clean Code aplicados ao Vue.js:**

   * **DRY:** crie componentes reutilizáveis
   * **KISS:** mantenha componentes simples e coesos
   * **SOLID:** use separação de responsabilidades (ex: services, stores, etc.)

7. **Estrutura ideal de projeto Vue.js escalável:**

   ```
   src/
   ├── components/
   ├── views/
   ├── stores/
   ├── services/
   ├── router/
   └── App.vue, main.js
   ```

8. **ESLint e Prettier:**

   * **ESLint:** valida e padroniza código (detecta erros)
   * **Prettier:** formata automaticamente o código com base em regras

9. **Importância de padronização de código:**
   Garante leitura e manutenção mais fácil por toda a equipe.
   Prettier padroniza automaticamente espaçamentos, aspas, indentação, etc.

10. **Composition API e relação com Pinia:**
    A Composition API permite organizar lógica por funcionalidade e não por tipo (data, methods, etc.).
    O Pinia é totalmente compatível com Composition API e facilita o uso de stores dentro de `setup()`.

---

## 🛠 Questões Práticas

### 1. **Instalar Pinia e criar `authStore`**

```bash
npm install pinia
```

**main.js**

```js
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)
```

**stores/authStore.js**

```js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: null,
    token: null
  }),
  actions: {
    login(usuario, token) {
      this.usuario = usuario;
      this.token = token;
    },
    logout() {
      this.usuario = null;
      this.token = null;
    }
  }
});
```

---

### 2. **Criar `produtoStore` com fetch**

```js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProdutoStore = defineStore('produto', {
  state: () => ({ produtos: [] }),
  actions: {
    async fetchProdutos() {
      const res = await axios.get('/api/produtos');
      this.produtos = res.data;
    }
  }
});
```

---

### 3. **Componente `ListaProdutos.vue`**

```vue
<template>
  <ul>
    <li v-for="p in produtos" :key="p.id">{{ p.nome }}</li>
  </ul>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProdutoStore } from '@/stores/produtoStore';

const store = useProdutoStore();
const { produtos, fetchProdutos } = store;

onMounted(() => fetchProdutos());
</script>
```

---

### 4. **Store `carrinhoStore` com add/remove**

```js
export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({ itens: [] }),
  actions: {
    adicionar(produto) {
      this.itens.push(produto);
    },
    remover(id) {
      this.itens = this.itens.filter(p => p.id !== id);
    }
  }
});
```

---

### 5. **Getter com valor total do carrinho**

```js
getters: {
  total: (state) => state.itens.reduce((soma, p) => soma + p.preco, 0)
}
```

---

### 6. **Habilitar Vue DevTools**

* Instale a extensão Vue DevTools no navegador
* Ative em modo desenvolvimento
* O Pinia será exibido automaticamente na aba "Pinia"

---

### 7. **Configurar ESLint e Prettier**

```bash
npm install eslint prettier eslint-plugin-vue eslint-config-prettier --save-dev
npx eslint --init
```

**.eslintrc.js**

```js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ]
}
```

**.prettierrc**

```json
{
  "singleQuote": true,
  "semi": false
}
```

---

### 8. **Ajuste de estrutura de projeto**

```
src/
├── components/
│   └── ListaProdutos.vue
├── stores/
│   ├── authStore.js
│   ├── produtoStore.js
│   └── carrinhoStore.js
├── services/
│   └── api.js
├── views/
├── router/
└── App.vue
```

---

### 9. **Middleware de autenticação com Pinia**

```js
// router/index.js
import { useAuthStore } from '@/stores/authStore'

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requerLogin && !auth.token) {
    next('/login')
  } else {
    next()
  }
})
```

---

### 10. **Apresentação: Beautifully Designed para Vue**

**Pontos para abordar:**

* Utilize **Vuetify**, **BootstrapVue** ou **Tailwind** para design responsivo
* Use **transições animadas** com `<transition>`
* Aplique boas práticas de **UI/UX**: feedback visual, acessibilidade
* **Evite poluição visual**: espaços adequados, tipografia legível
* **Componentização visual**: crie botões, cards, inputs reutilizáveis
* Demonstre em slides ou em um mini-projeto com exemplos visuais

