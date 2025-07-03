## ✅ Questões Teóricas

1. **O que é o Node.js e por que ele é popular no back-end?**
   Node.js é um ambiente de execução JavaScript no lado do servidor, baseado no motor V8. É popular por sua performance assíncrona, escalabilidade, uso de JavaScript full-stack e vasta comunidade.

2. **Papel do Express.js e vantagens:**
   Framework minimalista para Node.js que facilita o desenvolvimento de APIs.
   **Vantagens:**

   * Roteamento simples
   * Middleware flexível
   * Amplo suporte da comunidade

3. **O que é um ORM e vantagem do Sequelize:**
   ORM (Object-Relational Mapper) permite manipular bancos relacionais via objetos JavaScript.
   **Vantagens do Sequelize:**

   * Mapeamento automático de tabelas
   * Suporte a validações, associações, migrações
   * Evita SQL manual

4. **Comunicação entre Vue.js e Node.js com Axios:**
   Vue envia requisições HTTP para a API Node.js. Axios facilita esse processo com métodos como `axios.get()`, `axios.post()`, etc.

5. **APIs RESTful e métodos HTTP:**
   API RESTful organiza endpoints com base em recursos.

   * `GET`: obter dados
   * `POST`: criar recurso
   * `PUT`: atualizar
   * `DELETE`: remover

6. **Middleware no Express.js:**
   Função intermediária executada entre a requisição e a resposta. Pode ser usada para autenticação, logs, validação, etc.

7. **Benefícios do JWT na autenticação:**

   * Stateless: não exige sessões no servidor
   * Seguro e fácil de transmitir via headers
   * Permite autenticar e autorizar com um único token

8. **Requisição síncrona vs assíncrona em Node.js:**

   * Síncrona: bloqueia a execução
   * Assíncrona: não bloqueia o fluxo, ideal em Node
     `async/await` facilita a leitura e o controle de erros com código mais linear.

9. **Desafios na integração com MySQL e como o Sequelize ajuda:**

   * Complexidade do SQL puro
   * Tratamento de conexões
   * Mapeamento de dados
     Sequelize abstrai essas tarefas com uma interface JS simples e reutilizável.

10. **Boas práticas com Express e Sequelize:**

* Separar camadas: models, controllers, routes
* Usar middlewares
* Tratar erros de conexão e requisições
* Documentar e validar entradas

---

## 🛠 Questões Práticas

### 1. **Servidor Express básico**

```js
// server.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Servidor rodando corretamente!');
});

app.listen(3000, () => console.log('Servidor online na porta 3000'));
```

---

### 2. **Conexão Sequelize com MySQL**

```js
// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('meubanco', 'root', 'senha', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Conexão com o MySQL estabelecida!'))
  .catch(err => console.error('Erro na conexão:', err));

module.exports = sequelize;
```

---

### 3. **Modelo Sequelize de Usuário**

```js
// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING
});

module.exports = Usuario;
```

---

### 4. **POST /usuarios – criar usuário**

```js
// routes/usuarios.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.post('/', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

module.exports = router;
```

---

### 5. **GET /usuarios – listar usuários**

```js
router.get('/', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});
```

---

### 6. **Vue.js + Axios – listar usuários**

```vue
<template>
  <div>
    <h3>Usuários</h3>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id">{{ usuario.nome }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { usuarios: [] };
  },
  mounted() {
    axios.get('http://localhost:3000/usuarios')
      .then(res => this.usuarios = res.data);
  }
};
</script>
```

---

### 7. **PUT /usuarios/\:id – atualizar dados**

```js
router.put('/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).send('Usuário não encontrado');
  await usuario.update(req.body);
  res.json(usuario);
});
```

---

### 8. **Login com JWT**

```js
// auth/login.js
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario || usuario.senha !== senha)
    return res.status(401).json({ erro: 'Credenciais inválidas' });

  const token = jwt.sign({ id: usuario.id }, 'segredo123', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
```

---

### 9. **Middleware JWT de proteção**

```js
// middlewares/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Token não fornecido');

  try {
    const decoded = jwt.verify(token, 'segredo123');
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    res.status(401).send('Token inválido');
  }
};
```

**Uso:**

```js
const auth = require('./middlewares/auth');
app.get('/protegido', auth, (req, res) => res.send('Acesso autorizado'));
```

---

### 10. **Formulário de login no Vue.js**

```vue
<template>
  <form @submit.prevent="login">
    <input v-model="email" placeholder="Email" />
    <input v-model="senha" type="password" placeholder="Senha" />
    <button type="submit">Entrar</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { email: '', senha: '' };
  },
  methods: {
    async login() {
      const res = await axios.post('http://localhost:3000/login', {
        email: this.email,
        senha: this.senha
      });
      localStorage.setItem('token', res.data.token);
      this.$router.push('/pagina-protegida');
    }
  }
}
</script>
```

Segue a resolução da **Trilha 06 – Integração com Back-End (Node.js e MySQL)**, com as atividades separadas em **questões teóricas** e **questões práticas**, conforme solicitado:

---

## ✅ Questões Teóricas

1. **O que é o Node.js e por que ele é popular no back-end?**
   Node.js é um ambiente de execução JavaScript no lado do servidor, baseado no motor V8. É popular por sua performance assíncrona, escalabilidade, uso de JavaScript full-stack e vasta comunidade.

2. **Papel do Express.js e vantagens:**
   Framework minimalista para Node.js que facilita o desenvolvimento de APIs.
   **Vantagens:**

   * Roteamento simples
   * Middleware flexível
   * Amplo suporte da comunidade

3. **O que é um ORM e vantagem do Sequelize:**
   ORM (Object-Relational Mapper) permite manipular bancos relacionais via objetos JavaScript.
   **Vantagens do Sequelize:**

   * Mapeamento automático de tabelas
   * Suporte a validações, associações, migrações
   * Evita SQL manual

4. **Comunicação entre Vue.js e Node.js com Axios:**
   Vue envia requisições HTTP para a API Node.js. Axios facilita esse processo com métodos como `axios.get()`, `axios.post()`, etc.

5. **APIs RESTful e métodos HTTP:**
   API RESTful organiza endpoints com base em recursos.

   * `GET`: obter dados
   * `POST`: criar recurso
   * `PUT`: atualizar
   * `DELETE`: remover

6. **Middleware no Express.js:**
   Função intermediária executada entre a requisição e a resposta. Pode ser usada para autenticação, logs, validação, etc.

7. **Benefícios do JWT na autenticação:**

   * Stateless: não exige sessões no servidor
   * Seguro e fácil de transmitir via headers
   * Permite autenticar e autorizar com um único token

8. **Requisição síncrona vs assíncrona em Node.js:**

   * Síncrona: bloqueia a execução
   * Assíncrona: não bloqueia o fluxo, ideal em Node
     `async/await` facilita a leitura e o controle de erros com código mais linear.

9. **Desafios na integração com MySQL e como o Sequelize ajuda:**

   * Complexidade do SQL puro
   * Tratamento de conexões
   * Mapeamento de dados
     Sequelize abstrai essas tarefas com uma interface JS simples e reutilizável.

10. **Boas práticas com Express e Sequelize:**

* Separar camadas: models, controllers, routes
* Usar middlewares
* Tratar erros de conexão e requisições
* Documentar e validar entradas

---

## 🛠 Questões Práticas

### 1. **Servidor Express básico**

```js
// server.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Servidor rodando corretamente!');
});

app.listen(3000, () => console.log('Servidor online na porta 3000'));
```

---

### 2. **Conexão Sequelize com MySQL**

```js
// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('meubanco', 'root', 'senha', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Conexão com o MySQL estabelecida!'))
  .catch(err => console.error('Erro na conexão:', err));

module.exports = sequelize;
```

---

### 3. **Modelo Sequelize de Usuário**

```js
// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING
});

module.exports = Usuario;
```

---

### 4. **POST /usuarios – criar usuário**

```js
// routes/usuarios.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.post('/', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

module.exports = router;
```

---

### 5. **GET /usuarios – listar usuários**

```js
router.get('/', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});
```

---

### 6. **Vue.js + Axios – listar usuários**

```vue
<template>
  <div>
    <h3>Usuários</h3>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id">{{ usuario.nome }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { usuarios: [] };
  },
  mounted() {
    axios.get('http://localhost:3000/usuarios')
      .then(res => this.usuarios = res.data);
  }
};
</script>
```

---

### 7. **PUT /usuarios/\:id – atualizar dados**

```js
router.put('/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).send('Usuário não encontrado');
  await usuario.update(req.body);
  res.json(usuario);
});
```

---

### 8. **Login com JWT**

```js
// auth/login.js
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario || usuario.senha !== senha)
    return res.status(401).json({ erro: 'Credenciais inválidas' });

  const token = jwt.sign({ id: usuario.id }, 'segredo123', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
```

---

### 9. **Middleware JWT de proteção**

```js
// middlewares/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Token não fornecido');

  try {
    const decoded = jwt.verify(token, 'segredo123');
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    res.status(401).send('Token inválido');
  }
};
```

**Uso:**

```js
const auth = require('./middlewares/auth');
app.get('/protegido', auth, (req, res) => res.send('Acesso autorizado'));
```

---

### 10. **Formulário de login no Vue.js**

```vue
<template>
  <form @submit.prevent="login">
    <input v-model="email" placeholder="Email" />
    <input v-model="senha" type="password" placeholder="Senha" />
    <button type="submit">Entrar</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { email: '', senha: '' };
  },
  methods: {
    async login() {
      const res = await axios.post('http://localhost:3000/login', {
        email: this.email,
        senha: this.senha
      });
      localStorage.setItem('token', res.data.token);
      this.$router.push('/pagina-protegida');
    }
  }
}
</script>
```
