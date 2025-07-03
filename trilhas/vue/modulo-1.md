## ✅ Parte 1 – Questões Teóricas

1. **Defina o conceito de Vue.js e cite três características:**
   Vue.js é um framework JavaScript progressivo para construção de interfaces de usuário.
   **Características:**

   * Curva de aprendizado fácil
   * Sistema reativo de dados
   * Versatilidade (usado em SPAs ou projetos pequenos)

2. **Importância do Node.js e diferença para PHP:**
   Node.js permite o uso de JavaScript no back-end com alta performance e I/O assíncrono.
   Diferente do PHP, que é síncrono e baseado em threads, o Node.js é event-driven e single-thread.

3. **O que são APIs RESTful e vantagens:**
   Interfaces HTTP baseadas em recursos e métodos (GET, POST...).
   **Vantagens:**

   * Integração entre diferentes plataformas
   * Modularidade e escalabilidade
   * Uso do formato JSON

4. **Função do npm:**
   Gerenciador de pacotes do Node.js.
   Permite instalar bibliotecas e gerenciar dependências com `npm install`.

5. **Diferença entre GET, POST, PUT e DELETE:**

   * `GET`: busca dados
   * `POST`: cria novo recurso
   * `PUT`: atualiza recurso existente
   * `DELETE`: remove recurso

6. **Vue CLI e sua função:**
   Ferramenta para scaffolding de projetos Vue.js com configurações prontas, hot reload e build integrado.

7. **Propósito do JSON em APIs RESTful:**
   JSON é leve, legível e amplamente suportado, ideal para troca de dados entre front-end e back-end.

8. **Vue.js vs jQuery:**
   Vue é reativo, modular e orientado a componentes.
   jQuery manipula o DOM diretamente, o que é mais verboso e menos eficiente.

9. **Cenários para preferir PHP:**

   * Sistemas legados que já usam PHP (ex.: WordPress)
   * Projetos em servidores com Apache/Nginx configurado para PHP

10. **Vue.js e DOM reativo:**
    Atualiza automaticamente a interface sempre que os dados mudam, sem manipulação direta do DOM → performance otimizada.

11. **Separar front-end e back-end – importância:**

    * Facilita manutenção e escalabilidade
    * Permite múltiplos front-ends (web, mobile) consumirem a mesma API

12. **npm install vs npm install -g:**

    * `npm install`: instala localmente no projeto
    * `npm install -g`: instala globalmente (acessível no terminal)

13. **POST para criação de recursos:**
    Envia dados ao servidor para criação.
    **Exemplo:**
    `POST /usuarios` com `{ nome: "João" }` cria um novo usuário.

14. **Modularidade em APIs RESTful:**
    Separar recursos em endpoints distintos facilita manutenção e escalabilidade.
    Exemplo: `/produtos`, `/usuarios`, `/pedidos`

15. **Papel do yarn e comparação com npm:**
    Yarn é um gerenciador de pacotes alternativo ao npm.
    **Comparação:**

    * Mais rápido com cache offline
    * Melhor controle de versões com `yarn.lock`

---

## 🛠 Parte 2 – Questões Práticas

1. **Instalar Node.js e verificar versão:**

```bash
node -v
```

(Solicitado print — o comando exibirá a versão instalada.)

---

2. **Criar projeto Vue com Vue CLI:**

```bash
npm install -g @vue/cli
vue create meu-projeto
cd meu-projeto
npm run serve
```

---

3. **Instalar Axios e realizar requisição GET:**

```bash
npm install axios
```

**No Vue:**

```js
import axios from 'axios';

axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => console.log(response.data));
```

---

4. **API RESTful com Node.js e Express**

```bash
npm init -y
npm install express
```

**index.js**

```js
const express = require('express');
const app = express();
app.use(express.json());

let usuarios = [];

app.get('/usuarios', (req, res) => res.json(usuarios));
app.post('/usuarios', (req, res) => {
  usuarios.push(req.body);
  res.status(201).send('Usuário adicionado');
});

app.listen(3000);
```

---

5. **Vue.js consumindo e exibindo usuários**

```vue
<template>
  <table>
    <tr v-for="user in usuarios" :key="user.nome">
      <td>{{ user.nome }}</td>
    </tr>
  </table>
</template>

<script>
import axios from 'axios';
export default {
  data() { return { usuarios: [] }; },
  mounted() {
    axios.get('http://localhost:3000/usuarios')
      .then(res => this.usuarios = res.data);
  }
}
</script>
```

---

6. **Adicionar endpoint DELETE na API**

```js
app.delete('/usuarios/:id', (req, res) => {
  usuarios = usuarios.filter((_, i) => i != req.params.id);
  res.send('Usuário removido');
});
```

---

7. **Interface para adicionar e remover usuários**

```vue
<template>
  <div>
    <input v-model="nome" placeholder="Nome" />
    <button @click="adicionar">Adicionar</button>
    <ul>
      <li v-for="(user, index) in usuarios" :key="index">
        {{ user.nome }} <button @click="remover(index)">Remover</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return { usuarios: [], nome: '' };
  },
  methods: {
    adicionar() {
      axios.post('http://localhost:3000/usuarios', { nome: this.nome })
        .then(() => this.listar());
    },
    remover(i) {
      axios.delete(`http://localhost:3000/usuarios/${i}`)
        .then(() => this.listar());
    },
    listar() {
      axios.get('http://localhost:3000/usuarios')
        .then(res => this.usuarios = res.data);
    }
  },
  mounted() {
    this.listar();
  }
}
</script>
```

---

8. **API PHP para listar produtos**

```php
<?php
header('Content-Type: application/json');
$conn = new PDO("mysql:host=localhost;dbname=banco", "root", "");

$stmt = $conn->query("SELECT * FROM produtos");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
```

---

9. **Formulário Vue reativo (Nome, Email, Telefone)**

```vue
<template>
  <form @submit.prevent="enviar">
    <input v-model="form.nome" placeholder="Nome" />
    <input v-model="form.email" placeholder="Email" />
    <input v-model="form.telefone" placeholder="Telefone" />
    <button type="submit">Enviar</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: { nome: '', email: '', telefone: '' }
    };
  },
  methods: {
    enviar() {
      console.log(this.form);
    }
  }
}
</script>
```

---

10. **Consumo da API ViaCEP**

```vue
<template>
  <div>
    <input v-model="cep" @blur="buscarCEP" placeholder="CEP" />
    <div v-if="endereco">
      <p>{{ endereco.logradouro }}</p>
      <p>{{ endereco.bairro }}</p>
      <p>{{ endereco.localidade }} - {{ endereco.uf }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return { cep: '', endereco: null };
  },
  methods: {
    buscarCEP() {
      axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
        .then(res => this.endereco = res.data);
    }
  }
}
</script>
```

