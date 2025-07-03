## ✅ Parte 1 – Questões Teóricas

1. **O que é o jsFiddle e sua utilidade no Vue.js:**
   É uma plataforma online para testar códigos HTML/CSS/JS. No Vue.js, é útil para aprender e testar interações simples sem precisar configurar um projeto local.

2. **Processo de configuração do Vue.js no jsFiddle:**

   * Acesse [jsfiddle.net](https://jsfiddle.net)
   * Vá em "Settings" da aba JavaScript
   * Adicione a URL do Vue (via CDN) em “External Resources”
   * Estruture o HTML com um `#app` e crie a instância Vue no JS

3. **"Hello World" no Vue.js e importância:**
   É o exemplo básico que mostra a reatividade entre a instância Vue e o DOM. Importante para entender como funciona o `data` e a interpolação `{{ }}`.

4. **Two-way data binding:**
   Ligação bidirecional entre dados (JS) e inputs do DOM. O Vue usa `v-model` para garantir que mudanças em um lado reflitam no outro automaticamente.

5. **Função do `v-for`:**
   Permite iterar sobre arrays/objetos e renderizar itens dinamicamente.
   **Exemplo:**

   ```html
   <li v-for="item in lista">{{ item }}</li>
   ```

6. **Propósito do `v-bind:key`:**
   Garante que o Vue rastreie os itens corretamente em listas dinâmicas, evitando problemas de performance e renderizações incorretas.

7. **Reatividade no Vue.js:**
   O Vue monitora dados declarados no `data()` e atualiza o DOM automaticamente ao detectar mudanças, simplificando o desenvolvimento.

8. **Vantagens do ciclo de vida e dois hooks:**
   Permite executar ações em momentos específicos da vida do componente.

   * `created`: executado após criação da instância
   * `mounted`: após renderização no DOM (ideal para requisições)

9. **Diferença entre `push` e `splice`:**

   * `push`: adiciona ao final do array
   * `splice`: insere ou remove itens em qualquer posição
     O Vue detecta ambos e atualiza a interface graças ao sistema de reatividade.

10. **Método `Vue.set`:**
    Necessário quando se adiciona uma nova propriedade a um objeto ou altera diretamente um índice de array, para que o Vue reaja corretamente.

11. **Uso de `.prevent` e `.stop`:**

* `.prevent`: evita o comportamento padrão (ex: envio de formulário)
* `.stop`: impede que o evento propague para elementos pai

12. **Modificadores de teclas `.enter` e `.esc`:**
    Usados em inputs para acionar métodos ao pressionar teclas específicas.
    **Exemplo:**

```html
<input @keyup.enter="salvar" @keyup.esc="cancelar" />
```

13. **Diferenças entre checkboxes, radios e selects:**

* *Checkbox*: múltiplas seleções (array ou boolean)
* *Radio*: única seleção entre opções
* *Select*: dropdown com uma ou várias seleções

14. **Importância do `v-model` em formulários:**
    Sincroniza o valor do campo com a variável do Vue, garantindo reatividade imediata sem necessidade de eventos extras.

15. **Virtual DOM e performance:**
    O Vue cria uma cópia virtual da DOM real e só aplica mudanças mínimas e precisas, aumentando a performance da renderização.

---

## 🛠 Parte 2 – Questões Práticas

### 1. **Exemplo "Olá, Vue.js!" com botão**

```html
<div id="app">
  <p>{{ mensagem }}</p>
  <button @click="mensagem = 'Vue.js é incrível!'">Alterar</button>
</div>

<script>
  Vue.createApp({
    data() {
      return { mensagem: 'Olá, Vue.js!' }
    }
  }).mount('#app');
</script>
```

---

### 2. **Contador interativo**

```html
<div id="app">
  <button @click="contador--">-</button>
  <span>{{ contador }}</span>
  <button @click="contador++">+</button>
</div>

<script>
  Vue.createApp({
    data() {
      return { contador: 0 }
    }
  }).mount('#app');
</script>
```

---

### 3. **Lista de tarefas com v-for**

```html
<div id="app">
  <input v-model="novaTarefa" @keyup.enter="adicionarTarefa" />
  <ul>
    <li v-for="(tarefa, index) in tarefas" :key="index">
      {{ tarefa }} <button @click="removerTarefa(index)">x</button>
    </li>
  </ul>
</div>

<script>
  Vue.createApp({
    data() {
      return {
        tarefas: [],
        novaTarefa: ''
      };
    },
    methods: {
      adicionarTarefa() {
        if (this.novaTarefa) {
          this.tarefas.push(this.novaTarefa);
          this.novaTarefa = '';
        }
      },
      removerTarefa(index) {
        this.tarefas.splice(index, 1);
      }
    }
  }).mount('#app');
</script>
```

---

### 4. **Uso de Vue.set para atualizar array**

```html
<div id="app">
  <ul>
    <li v-for="(item, index) in itens" :key="index">
      {{ item }} <button @click="atualizar(index)">Atualizar</button>
    </li>
  </ul>
</div>

<script>
  Vue.createApp({
    data() {
      return { itens: ['Maçã', 'Banana', 'Uva'] }
    },
    methods: {
      atualizar(i) {
        this.itens.splice(i, 1, 'Atualizado com Vue.set');
      }
    }
  }).mount('#app');
</script>
```

---

### 5. **Formulário dinâmico com inputs variados**

```html
<div id="app">
  <input v-model="nome" placeholder="Nome" />
  
  <div>
    <label><input type="radio" value="Masculino" v-model="genero" /> Masculino</label>
    <label><input type="radio" value="Feminino" v-model="genero" /> Feminino</label>
  </div>

  <div>
    <label><input type="checkbox" value="Esportes" v-model="interesses" /> Esportes</label>
    <label><input type="checkbox" value="Música" v-model="interesses" /> Música</label>
  </div>

  <select v-model="cidade">
    <option disabled value="">Escolha a cidade</option>
    <option>Joinville</option>
    <option>Blumenau</option>
  </select>

  <p>{{ nome }} - {{ genero }} - {{ interesses.join(', ') }} - {{ cidade }}</p>
</div>

<script>
  Vue.createApp({
    data() {
      return {
        nome: '',
        genero: '',
        interesses: [],
        cidade: ''
      }
    }
  }).mount('#app');
</script>
```

---

### 6. **Formulário com `.prevent` e alerta**

```html
<form @submit.prevent="enviar">
  <input v-model="nome" placeholder="Nome" />
  <button type="submit">Enviar</button>
</form>

<script>
  Vue.createApp({
    data() {
      return { nome: '' }
    },
    methods: {
      enviar() {
        alert(`Enviado: ${this.nome}`);
      }
    }
  }).mount('form');
</script>
```

---

### 7. **Eventos de teclado `.enter` e `.esc`**

```html
<input v-model="texto" @keyup.enter="salvar" @keyup.esc="apagar" />

<script>
  Vue.createApp({
    data() {
      return { texto: '' }
    },
    methods: {
      salvar() {
        alert('Salvo: ' + this.texto);
      },
      apagar() {
        this.texto = '';
      }
    }
  }).mount('input');
</script>
```

---

### 8. **Lista de produtos editável**

```html
<div id="app">
  <ul>
    <li v-for="(p, i) in produtos" :key="i">
      {{ p.nome }} - <input v-model.number="p.preco" /> - {{ p.quantidade }}
    </li>
  </ul>
</div>

<script>
  Vue.createApp({
    data() {
      return {
        produtos: [
          { nome: 'Teclado', preco: 150, quantidade: 1 },
          { nome: 'Mouse', preco: 90, quantidade: 2 }
        ]
      };
    }
  }).mount('#app');
</script>
```

---

### 9. **Página com ciclo de vida do componente**

```html
<div id="app">
  <p>{{ mensagem }}</p>
</div>

<script>
  Vue.createApp({
    data() {
      return { mensagem: 'Carregando...' };
    },
    mounted() {
      console.log('Componente montado');
      setTimeout(() => this.mensagem = 'Dados carregados!', 1000);
    }
  }).mount('#app');
</script>
```

---

### 10. **Carrinho de compras com v-for e v-bind\:key**

```html
<div id="app">
  <input v-model="novoItem" placeholder="Adicionar item" />
  <button @click="adicionar">Adicionar</button>
  <table>
    <tr v-for="(item, i) in carrinho" :key="i">
      <td>{{ item }}</td>
      <td><button @click="remover(i)">Remover</button></td>
    </tr>
  </table>
</div>

<script>
  Vue.createApp({
    data() {
      return { carrinho: [], novoItem: '' };
    },
    methods: {
      adicionar() {
        if (this.novoItem) this.carrinho.push(this.novoItem);
        this.novoItem = '';
      },
      remover(i) {
        this.carrinho.splice(i, 1);
      }
    }
  }).mount('#app');
</script>
```

