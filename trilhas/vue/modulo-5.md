## ✅ Questões Teóricas

1. **O que é Bootstrap e vantagens com Vue.js:**
   Framework CSS para criar UIs responsivas e modernas.
   **Vantagens com Vue.js:**

   * Criação rápida de interfaces
   * Componentes prontos e responsivos
   * Menos necessidade de CSS personalizado
   * Padrão visual consistente

2. **Formas de integrar Bootstrap ao Vue.js:**

   * **Via CDN**: mais rápido, sem instalação
   * **Via NPM**: mais completo e integrável com SCSS, ideal para projetos profissionais
     **Diferença:** CDN é temporário e menos flexível, NPM é personalizável.

3. **Classes utilitárias:**
   São classes que aplicam estilos diretamente sem escrever CSS.
   **Exemplos:**

   * `p-3`: padding
   * `text-center`: centraliza texto
   * `bg-primary`: fundo com cor primária
     Facilitam estilização rápida e padronizada.

4. **Grid System do Bootstrap:**
   Baseado em Flexbox, divide a tela em 12 colunas.
   Permite criar layouts responsivos com classes como `col-md-6`, `row`, `container`.

5. **Importância de `col-`, `row`, `container`, `container-fluid`:**

   * `container`: largura fixa
   * `container-fluid`: largura total
   * `row`: agrupa colunas
   * `col-*`: define o tamanho de cada coluna em diferentes tamanhos de tela

6. **Navbar, Card e Modal:**

   * `Navbar`: navegação do site
   * `Card`: exibe conteúdo com imagem, título e texto
   * `Modal`: janela sobreposta, útil para formulários, alertas, confirmações

7. **Breakpoints no Bootstrap:**
   Permitem adaptar layouts para diferentes tamanhos de tela.
   **Exemplos:** `col-sm-6`, `col-lg-4`
   Tornam o layout flexível e mobile-first.

8. **Vantagem de SCSS sobre CSS puro:**

   * Variáveis, aninhamento, funções
   * Permite alterar temas globalmente (ex: cor primária)
   * Mais organizado e reaproveitável

9. **Importância dos modais em Vue.js:**
   Permitem exibir conteúdo temporário sem sair da página.
   **Exemplo:** modal para confirmar exclusão de um registro.

10. **Como Vue.js e Bootstrap se combinam:**
    Vue controla a lógica e estado, Bootstrap fornece os estilos.
    Juntos criam interfaces interativas e responsivas rapidamente.

---

## 🛠 Questões Práticas

### 1. **Grid System com três colunas**

```html
<div class="container">
  <div class="row">
    <div class="col-lg-3 col-sm-12 bg-primary">Coluna 1</div>
    <div class="col-lg-6 col-sm-12 bg-secondary">Coluna 2</div>
    <div class="col-lg-3 col-sm-12 bg-success">Coluna 3</div>
  </div>
</div>
```

---

### 2. **Navbar responsiva com colapso**

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">MeuApp</a>
  <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="menu">
    <ul class="navbar-nav">
      <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="#">Sobre</a></li>
      <li class="nav-item"><a class="nav-link" href="#">Contato</a></li>
    </ul>
  </div>
</nav>
```

---

### 3. **Botão que muda de cor com Vue.js**

```html
<div id="app">
  <button :class="btnClass" @click="trocarCor" class="btn">Clique</button>
</div>

<script>
new Vue({
  el: '#app',
  data: { ativo: false },
  computed: {
    btnClass() {
      return this.ativo ? 'btn-danger' : 'btn-primary';
    }
  },
  methods: {
    trocarCor() { this.ativo = !this.ativo }
  }
});
</script>
```

---

### 4. **Card com imagem, título e botão**

```html
<div class="card" style="width: 18rem;">
  <img src="https://picsum.photos/200" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">Título</h5>
    <button class="btn btn-success" onclick="alert('Clicado')">Clique</button>
  </div>
</div>
```

---

### 5. **Layout adaptável com container, row e col**

```html
<div class="container">
  <div class="row">
    <div class="col-md-6 col-sm-12 bg-warning">Conteúdo A</div>
    <div class="col-md-6 col-sm-12 bg-info">Conteúdo B</div>
  </div>
</div>
```

---

### 6. **Modal com botão**

```html
<!-- Botão -->
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#meuModal">Abrir</button>

<!-- Modal -->
<div class="modal fade" id="meuModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">Título</h5></div>
      <div class="modal-body">Mensagem no modal</div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>
```

---

### 7. **Formulário responsivo com validação**

```html
<form class="container needs-validation" novalidate>
  <div class="mb-3">
    <label class="form-label">Nome</label>
    <input type="text" class="form-control" required>
    <div class="invalid-feedback">Campo obrigatório</div>
  </div>
  <div class="mb-3">
    <label class="form-label">Email</label>
    <input type="email" class="form-control" required>
    <div class="invalid-feedback">Email inválido</div>
  </div>
  <div class="mb-3">
    <label class="form-label">Senha</label>
    <input type="password" class="form-control" required>
    <div class="invalid-feedback">Informe a senha</div>
  </div>
  <button class="btn btn-success" type="submit">Entrar</button>
</form>
```

---

### 8. **SCSS customizando botão e Card**

**custom.scss**

```scss
$primary: #28a745;

.btn {
  border-radius: 25px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.card {
  border: 2px solid $primary;
}
```

Importar no projeto com:

```js
import './custom.scss'
```

---

### 9. **Página Vue.js com Bootstrap**

```html
<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <span class="navbar-brand mb-0 h1">Cabeçalho</span>
    </nav>
    <main class="container text-center my-5">
      <h2>Conteúdo Centralizado</h2>
    </main>
    <footer class="bg-dark text-white text-center fixed-bottom p-2">
      Rodapé fixo
    </footer>
  </div>
</template>
```

---

### 10. **Sistema de abas com Vue e Bootstrap**

```html
<div id="app">
  <ul class="nav nav-tabs">
    <li class="nav-item" v-for="(tab, i) in abas" :key="i">
      <a :class="['nav-link', { active: ativa === i }]" href="#" @click="ativa = i">{{ tab }}</a>
    </li>
  </ul>
  <div class="p-3">{{ abas[ativa] }} selecionado</div>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    ativa: 0,
    abas: ['Home', 'Perfil', 'Configurações']
  }
});
</script>
```

