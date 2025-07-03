## ✅ Questões Teóricas

1. **O que é uma API RESTful e por que ela é amplamente usada?**
   API RESTful segue os princípios REST (representação de estado), permitindo operações via HTTP.
   **É amplamente usada porque:**

   * É padronizada
   * Fácil de consumir em front-ends modernos
   * Suporta múltiplos clientes (web, mobile, etc.)

2. **O que é Axios e suas vantagens sobre Fetch API:**
   Axios é uma biblioteca baseada em Promises para requisições HTTP.
   **Vantagens:**

   * Sintaxe mais limpa
   * Suporte a interceptadores, timeout, headers globais
   * Tratamento automático de JSON

3. **Principais métodos HTTP e usos:**

   * `GET`: obter dados
   * `POST`: enviar/criar dados
   * `PUT`: atualizar dados
   * `DELETE`: remover dados

4. **O que é timeout no Axios:**
   É o tempo limite (em milissegundos) para aguardar resposta da API.
   Evita travamento da aplicação em caso de falha na rede.

5. **O que é CORS:**
   Mecanismo de segurança dos navegadores que impede requisições de domínios diferentes sem permissão.
   Requer configuração no servidor com headers `Access-Control-Allow-Origin`.

6. **API pública vs API com autenticação:**

   * *Pública*: não requer login (ex: ViaCEP)
   * *Autenticada*: exige token ou login (ex: API do GitHub com dados privados)

7. **Importância de tratar erros:**
   Melhora a experiência do usuário e evita travamentos.
   **Tipos comuns:**

   * Erros de rede
   * 400 (dados inválidos)
   * 401 (não autorizado)
   * 500 (erro do servidor)

8. **Cabeçalhos HTTP:**
   Contêm metadados da requisição/resposta.
   **Exemplos:**

   * `Content-Type`: tipo de dado enviado
   * `Authorization`: token JWT

9. **Papel do `baseURL`:**
   Define o domínio base de todas as requisições.
   Facilita reutilização e evita repetição de URLs.

10. **`async/await` vs `.then/.catch`:**

* `async/await`: sintaxe mais limpa, parece código síncrono
* `.then/.catch`: encadeamento de promessas
  Ambos tratam operações assíncronas, mas `async/await` é mais legível.

---

## 🛠 Questões Práticas

### 1. **Instalar e configurar Axios**

```bash
npm install axios
```

**Uso básico:**

```js
import axios from 'axios';
axios.get('https://viacep.com.br/ws/01001000/json/')
  .then(res => console.log(res.data));
```

---

### 2. **Criar `api.js` com baseURL**

```js
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
  timeout: 5000
});

export default api;
```

---

### 3. **Buscar endereço por CEP com ViaCEP**

```vue
<template>
  <div>
    <input v-model="cep" placeholder="Digite o CEP" />
    <button @click="buscarCep">Buscar</button>
    <p v-if="endereco.logradouro">Rua: {{ endereco.logradouro }}</p>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return { cep: '', endereco: {} };
  },
  methods: {
    async buscarCep() {
      const res = await api.get(`${this.cep}/json`);
      this.endereco = res.data;
    }
  }
};
</script>
```

---

### 4. **Componente com clima (OpenWeatherMap)**

```vue
<template>
  <div>
    <input v-model="cidade" placeholder="Cidade" />
    <button @click="buscarClima">Buscar</button>
    <p v-if="clima.temp">Temp: {{ clima.temp }}°C</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { cidade: '', clima: {} };
  },
  methods: {
    async buscarClima() {
      const apiKey = 'SUA_API_KEY';
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.cidade}&appid=${apiKey}&units=metric`
      );
      this.clima = { temp: res.data.main.temp };
    }
  }
};
</script>
```

---

### 5. **Exibir erro para CEP inválido**

```js
async buscarCep() {
  try {
    const res = await api.get(`${this.cep}/json`);
    if (res.data.erro) throw new Error('CEP inválido');
    this.endereco = res.data;
  } catch (err) {
    alert(err.message);
  }
}
```

---

### 6. **Selecionar Celsius ou Fahrenheit**

```vue
<select v-model="unidade">
  <option value="metric">Celsius</option>
  <option value="imperial">Fahrenheit</option>
</select>

<!-- ajuste na URL da API -->
`...&units=${this.unidade}`
```

---

### 7. **Sistema de loading**

```html
<div v-if="loading">Carregando...</div>
```

```js
data() {
  return { loading: false, clima: {} };
},
methods: {
  async buscarClima() {
    this.loading = true;
    try {
      const res = await axios.get(...);
      this.clima = res.data;
    } finally {
      this.loading = false;
    }
  }
}
```

---

### 8. **Tratamento de erros com mensagem amigável**

```js
try {
  const res = await axios.get(...);
} catch (err) {
  this.erro = 'Erro ao buscar dados. Tente novamente.';
}
```

---

### 9. **CRUD simples com API externa**

```js
// GET
axios.get('/itens')
// POST
axios.post('/itens', { nome: 'Item novo' })
// PUT
axios.put('/itens/1', { nome: 'Atualizado' })
// DELETE
axios.delete('/itens/1')
```

Em Vue:

```vue
<template>
  <div>
    <ul>
      <li v-for="item in itens" :key="item.id">
        {{ item.nome }}
        <button @click="remover(item.id)">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({ itens: [] }),
  mounted() {
    axios.get('/api/itens').then(res => this.itens = res.data);
  },
  methods: {
    remover(id) {
      axios.delete(`/api/itens/${id}`).then(() => {
        this.itens = this.itens.filter(i => i.id !== id);
      });
    }
  }
}
</script>
```

---

### 10. **Login com JWT e armazenamento**

```vue
<template>
  <form @submit.prevent="login">
    <input v-model="email" />
    <input type="password" v-model="senha" />
    <button>Entrar</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({ email: '', senha: '' }),
  methods: {
    async login() {
      const res = await axios.post('/api/login', {
        email: this.email, senha: this.senha
      });
      localStorage.setItem('token', res.data.token);
      this.$router.push('/dashboard');
    }
  }
}
</script>
```

