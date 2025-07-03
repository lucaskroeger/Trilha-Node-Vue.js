## ✅ Questões Teóricas

1. **O que é o Vuetify e suas vantagens:**
   Vuetify é uma biblioteca de componentes para Vue.js baseada em Material Design.
   **Vantagens:**

   * Componentes pré-estilizados e responsivos
   * Sistema de grade poderoso (Grid System)
   * Suporte a temas customizáveis
   * Produtividade elevada no desenvolvimento de UI

2. **Configuração inicial do Vuetify:**

   * Via CLI: `vue add vuetify`
   * Ou manualmente com `npm install vuetify`
   * Importar no `main.js` e usar com `createVuetify()`
   * Registrar o plugin no app com `app.use(vuetify)`

3. **Sistema de Grid do Vuetify:**
   Baseado em Flexbox com 12 colunas, semelhante ao Bootstrap.
   Diferenças: mais integrado ao Vue, mais responsivo por padrão, usa `v-container`, `v-row` e `v-col`.

4. **Três componentes principais:**

   * `v-btn`: botão com estilos e ações personalizadas
   * `v-card`: exibe conteúdo organizado com imagem, título e ações
   * `v-dialog`: modal interativo para exibir alertas, formulários ou confirmações

5. **Diferença entre v-btn, v-card e v-dialog:**

   * `v-btn`: ação rápida (ex.: salvar)
   * `v-card`: estrutura de conteúdo (ex.: perfil, produto)
   * `v-dialog`: modal sobreposto (ex.: confirmação, formulário)

6. **Validação de formulários e uso de `rules`:**
   `rules` são funções que validam os campos do formulário.
   Exibem mensagens de erro personalizadas quando os dados estão incorretos ou ausentes.

7. **Funcionamento das Data Tables:**
   Exibem dados tabulares com suporte a ordenação, paginação e filtros.
   Ideal para exibir listas grandes com recursos integrados de interação.

8. **Temas customizados no Vuetify:**
   Definidos no `vuetify.js` com `theme: { themes: { light: { primary, secondary, ... } } }`
   Permite alterar cores globais para se adequar à identidade visual da aplicação.

9. **Importância do SCSS no Vuetify:**
   SCSS permite sobrepor estilos globais e personalizar variáveis.
   Exemplo: redefinir estilo de botão, fontes ou espaços com maior controle.

10. **Integração com APIs:**
    Utiliza-se `axios` ou `fetch` em `mounted()` para carregar dados.
    Os dados recebidos populam `v-data-table`, `v-select`, `v-form` dinamicamente.
    **Exemplo:**

    ```js
    axios.get('https://api.exemplo.com/produtos').then(res => this.produtos = res.data);
    ```

---

## 🛠 Questões Práticas

### 1. **Projeto com Grid de 3 colunas**

```vue
<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">Coluna 1</v-col>
      <v-col cols="12" sm="4">Coluna 2</v-col>
      <v-col cols="12" sm="4">Coluna 3</v-col>
    </v-row>
  </v-container>
</template>
```

---

### 2. **Botão personalizado com evento**

```vue
<v-btn color="purple" @click="console.log('Botão clicado')">
  Clique aqui
</v-btn>
```

---

### 3. **v-card com imagem, título e botão**

```vue
<v-card>
  <v-img src="https://picsum.photos/300/150" height="150px" />
  <v-card-title>Meu Card</v-card-title>
  <v-card-actions>
    <v-btn @click="alert('Botão clicado')">Ação</v-btn>
  </v-card-actions>
</v-card>
```

---

### 4. **Modal com v-dialog**

```vue
<template>
  <v-btn @click="dialog = true">Abrir Modal</v-btn>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>Título</v-card-title>
      <v-card-text>Mensagem aqui</v-card-text>
      <v-card-actions>
        <v-btn @click="dialog = false">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default { data: () => ({ dialog: false }) }
</script>
```

---

### 5. **v-toolbar com menu lateral**

```vue
<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title class="text-center">Meu App</v-toolbar-title>
  </v-app-bar>

  <v-navigation-drawer app v-model="drawer">
    <v-list><v-list-item title="Menu" /></v-list>
  </v-navigation-drawer>
</template>

<script>
export default { data: () => ({ drawer: false }) }
</script>
```

---

### 6. **v-data-table com produtos**

```vue
<v-data-table :headers="headers" :items="produtos" />

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Nome', value: 'nome' },
        { text: 'Preço', value: 'preco' },
        { text: 'Estoque', value: 'estoque' }
      ],
      produtos: [
        { nome: 'Caneta', preco: 2, estoque: 100 },
        { nome: 'Caderno', preco: 15, estoque: 50 }
      ]
    }
  }
}
</script>
```

---

### 7. **Formulário de login com validação**

```vue
<v-form ref="form" v-model="valid">
  <v-text-field
    label="Email"
    v-model="email"
    :rules="[v => !!v || 'Email obrigatório']"
  />
  <v-text-field
    label="Senha"
    v-model="senha"
    type="password"
    :rules="[v => v.length >= 6 || 'Mínimo 6 caracteres']"
  />
  <v-btn @click="enviar">Entrar</v-btn>
</v-form>

<script>
export default {
  data: () => ({
    valid: false,
    email: '',
    senha: ''
  }),
  methods: {
    enviar() {
      if (this.$refs.form.validate()) alert('Logado com sucesso');
    }
  }
}
</script>
```

---

### 8. **Tema customizado com cores**

**vuetify.js**

```js
import { createVuetify } from 'vuetify'
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#4CAF50', // verde
          secondary: '#FFEB3B' // amarelo
        }
      }
    }
  }
})
```

---

### 9. **Botões com SCSS**

**App.vue**

```scss
<style lang="scss">
.v-btn {
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
</style>
```

---

### 10. **Data Table com dados de API**

```vue
<template>
  <v-data-table :headers="headers" :items="produtos" />
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      headers: [
        { text: 'Nome', value: 'title' },
        { text: 'ID', value: 'id' }
      ],
      produtos: []
    }
  },
  mounted() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => this.produtos = res.data)
  }
}
</script>
```
