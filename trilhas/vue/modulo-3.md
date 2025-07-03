## ✅ Questões Teóricas

1. **Estrutura básica de um arquivo `.vue`:**

   * `<template>`: HTML que define a estrutura visual.
   * `<script>`: lógica do componente, incluindo dados, métodos, etc.
   * `<style>`: estilos CSS (pode ser local com `scoped`).

2. **O que são props:**
   Props são propriedades que permitem que componentes pais passem dados para os filhos. São definidas no `props: []` do filho e usadas como variáveis no template.

3. **Props vs Eventos personalizados:**

   * *Props*: Pai → Filho (fluxo descendente)
   * *Eventos*: Filho → Pai (fluxo ascendente com `$emit`)
     Use props para enviar valores e eventos para receber ações.

4. **O que são slots e sua utilidade:**
   Slots permitem que um componente receba conteúdo dinâmico.
   **Exemplo:**

   ```html
   <slot></slot> <!-- slot padrão -->
   <slot name="header"></slot> <!-- slot nomeado -->
   ```

5. **Mixins:**
   São objetos reutilizáveis com dados, métodos ou hooks, que podem ser compartilhados entre componentes.
   *Vantagem:* reutilização de lógica.
   *Problema:* conflitos se métodos ou dados tiverem o mesmo nome.

6. **Importância do `v-bind:key`:**
   Garante que cada item em uma lista tenha uma identidade única para otimização de renderizações e evitar bugs.

7. **Vantagens da estrutura organizada (components/, views/, router/, store/):**

   * Clareza e separação de responsabilidades
   * Facilita manutenção e escalabilidade
   * Melhora a colaboração em equipe

8. **Mixins com conflitos:**
   Em conflitos de métodos ou dados entre mixin e componente, o Vue dá prioridade ao componente, sobrescrevendo o do mixin.

9. **Diferença entre slot simples e nomeado:**

   * Slot simples (`<slot></slot>`): recebe conteúdo genérico
   * Slot nomeado (`<slot name="header"></slot>`): permite múltiplos blocos dinâmicos em diferentes partes do layout

10. **Comunicação pai-filho:**
    Pai → Filho: via props
    Filho → Pai: via `$emit()`
    Essa comunicação é importante para manter a modularidade e a responsabilidade clara entre os componentes.

---

## 🛠 Questões Práticas

### 1. **Componente básico com dado e estilo**

```vue
<template>
  <div class="mensagem">{{ texto }}</div>
</template>

<script>
export default {
  data() {
    return { texto: 'Olá, componente Vue!' }
  }
}
</script>

<style scoped>
.mensagem {
  color: blue;
  font-weight: bold;
}
</style>
```

---

### 2. **Pai envia prop para filho**

**Pai.vue**

```vue
<template>
  <Filho :mensagem="'Mensagem do Pai'" />
</template>

<script>
import Filho from './Filho.vue';
export default { components: { Filho } }
</script>
```

**Filho.vue**

```vue
<template>
  <p>{{ mensagem }}</p>
</template>

<script>
export default { props: ['mensagem'] }
</script>
```

---

### 3. **Filho envia evento para pai**

**Pai.vue**

```vue
<template>
  <Filho @enviar="receber" />
</template>

<script>
import Filho from './Filho.vue';
export default {
  components: { Filho },
  methods: {
    receber(dado) {
      alert('Pai recebeu: ' + dado);
    }
  }
}
</script>
```

**Filho.vue**

```vue
<template>
  <button @click="$emit('enviar', 'Olá, Pai!')">Enviar</button>
</template>
```

---

### 4. **Componente com slot simples**

**Componente.vue**

```vue
<template>
  <div><slot></slot></div>
</template>
```

**Uso**

```vue
<Componente><p>Conteúdo personalizado</p></Componente>
```

---

### 5. **Slots nomeados**

**Componente.vue**

```vue
<template>
  <header><slot name="cabecalho" /></header>
  <main><slot /></main>
  <footer><slot name="rodape" /></footer>
</template>
```

**Uso**

```vue
<Componente>
  <template v-slot:cabecalho><h1>Título</h1></template>
  <p>Corpo</p>
  <template v-slot:rodape><small>Rodapé</small></template>
</Componente>
```

---

### 6. **Mixin reutilizado em dois componentes**

**meuMixin.js**

```js
export default {
  data() {
    return { contador: 0 }
  },
  methods: {
    incrementar() { this.contador++ }
  }
}
```

**ComponenteA.vue e ComponenteB.vue**

```vue
<script>
import mixin from './meuMixin'
export default {
  mixins: [mixin]
}
</script>
```

---

### 7. **Estrutura do projeto Vue**

```
src/
├── components/
│   ├── Header.vue
│   └── Footer.vue
├── views/
│   ├── Home.vue
│   └── About.vue
├── router/
│   └── index.js
```

**router/index.js**

```js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]
});
```

---

### 8. **Lista com `v-for` e key**

```vue
<template>
  <ul>
    <li v-for="item in itens" :key="item.id">{{ item.nome }}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      itens: [
        { id: 1, nome: 'Item 1' },
        { id: 2, nome: 'Item 2' }
      ]
    }
  }
}
</script>
```

---

### 9. **Botão envia prop ao filho**

**Pai.vue**

```vue
<template>
  <button @click="mensagem = 'Nova mensagem'">Enviar</button>
  <Filho :texto="mensagem" />
</template>

<script>
import Filho from './Filho.vue';
export default {
  components: { Filho },
  data() {
    return { mensagem: '' }
  }
}
</script>
```

**Filho.vue**

```vue
<template><p>{{ texto }}</p></template>
<script>export default { props: ['texto'] }</script>
```

---

### 10. **Formulário com slots personalizados**

**Formulario.vue**

```vue
<template>
  <form>
    <slot name="cabecalho" />
    <slot name="campos" />
    <slot name="botao" />
  </form>
</template>
```

**Uso**

```vue
<Formulario>
  <template v-slot:cabecalho><h2>Cadastro</h2></template>
  <template v-slot:campos>
    <input placeholder="Nome" />
    <input placeholder="Email" />
  </template>
  <template v-slot:botao>
    <button>Enviar</button>
  </template>
</Formulario>
```

