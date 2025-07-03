## ✅ Questões Teóricas

1. **O que é o Express.js e quais suas principais vantagens?**
   É um framework minimalista para Node.js que simplifica a criação de servidores web e APIs.
   **Vantagens**:

   * Roteamento simplificado
   * Suporte a middlewares
   * Fácil integração com banco de dados
   * Comunidade ativa e vasto ecossistema

2. **Quais são os quatro principais tipos de rotas HTTP?**

   * `GET`: busca dados
   * `POST`: envia/cria dados
   * `PUT`: atualiza dados existentes
   * `DELETE`: remove dados

3. **Explique o conceito de middleware no Express.js**
   Middleware é uma função executada entre a requisição e a resposta. Pode modificar objetos `req` e `res`, terminar o ciclo de resposta ou passar para o próximo middleware.

4. **Como criar uma conexão básica entre Node.js e MySQL?**

   ```js
   const mysql = require('mysql2');
   const conn = mysql.createConnection({
     host: 'localhost', user: 'root', database: 'meubanco'
   });
   ```

5. **O que é um prepared statement e como ele protege contra SQL Injection?**
   É uma consulta com placeholders (`?`) que evita inserção direta de dados, impedindo que scripts maliciosos sejam interpretados como comandos SQL.

6. **Qual é a estrutura básica de um servidor Express.js?**

   ```js
   const express = require('express');
   const app = express();

   app.get('/', (req, res) => res.send('Hello, World!'));

   app.listen(3000);
   ```

7. **Explique a diferença entre rotas globais e rotas específicas**

   * *Globais*: se aplicam a todas as requisições (ex: middlewares `app.use()`)
   * *Específicas*: respondem apenas a determinados caminhos ou métodos (ex: `app.get('/user')`)

8. **Liste três boas práticas ao manipular dados em bancos de dados**

   * Utilizar prepared statements
   * Validar entradas do usuário
   * Separar lógica de banco em módulos próprios

9. **Por que é importante usar variáveis de ambiente em aplicações Node.js?**

   * Evita exposição de credenciais
   * Facilita configuração entre diferentes ambientes
   * Centraliza parâmetros sensíveis do sistema

10. **Como tratar erros em consultas SQL dentro do Node.js?**

* Usar `try/catch` com `async/await`
* Verificar o objeto `err` no callback de consultas
* Retornar mensagens de erro amigáveis sem vazar dados sensíveis

---

## 🛠 Questões Práticas

1. **Servidor Express com "Hello, World!"**

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello, World!'));

app.listen(3000, () => console.log('Servidor rodando'));
```

---

2. **Rota GET listando usuários do MySQL**

```js
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).send('Erro na consulta');
    res.json(results);
  });
});
```

---

3. **Middleware que registra método e URL**

```js
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});
```

---

4. **Rota POST para inserir usuário**

```js
app.use(express.json());

app.post('/usuarios', (req, res) => {
  const { nome } = req.body;
  db.query('INSERT INTO usuarios (nome) VALUES (?)', [nome], (err) => {
    if (err) return res.status(500).send('Erro ao inserir');
    res.send('Usuário inserido com sucesso');
  });
});
```

---

5. **Rota PUT para atualizar nome por ID**

```js
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  db.query('UPDATE usuarios SET nome = ? WHERE id = ?', [nome, id], (err) => {
    if (err) return res.status(500).send('Erro ao atualizar');
    res.send('Usuário atualizado');
  });
});
```

---

6. **Rota DELETE por ID**

```js
app.delete('/usuarios/:id', (req, res) => {
  db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send('Erro ao deletar');
    res.send('Usuário excluído');
  });
});
```

---

7. **Prepared statement para buscar usuário por nome**

```js
app.get('/usuarios/nome/:nome', (req, res) => {
  const nome = req.params.nome;
  db.query('SELECT * FROM usuarios WHERE nome = ?', [nome], (err, results) => {
    if (err) return res.status(500).send('Erro');
    res.json(results);
  });
});
```

---

8. **Uso de variáveis de ambiente**
   `.env`

```
DB_HOST=localhost
DB_USER=root
DB_PASS=senha
DB_NAME=meubanco
```

`db.js`

```js
require('dotenv').config();
const mysql = require('mysql2');
module.exports = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
```

---

9. **Tratamento de erro em consulta**

```js
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar dados');
    }
    res.json(results);
  });
});
```

---

10. **CRUD com módulos separados**

**Estrutura:**

```
/projeto
 ├── db.js
 ├── server.js
 └── routes/
     └── usuarios.js
```

**`db.js`**

```js
require('dotenv').config();
const mysql = require('mysql2');
module.exports = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
```

**`routes/usuarios.js`**

```js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { nome } = req.body;
  db.query('INSERT INTO usuarios (nome) VALUES (?)', [nome], err => {
    if (err) return res.status(500).send(err.message);
    res.send('Usuário criado');
  });
});

router.put('/:id', (req, res) => {
  const { nome } = req.body;
  db.query('UPDATE usuarios SET nome = ? WHERE id = ?', [nome, req.params.id], err => {
    if (err) return res.status(500).send(err.message);
    res.send('Usuário atualizado');
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).send(err.message);
    res.send('Usuário excluído');
  });
});

module.exports = router;
```

**`server.js`**

```js
const express = require('express');
const app = express();
const usuarios = require('./routes/usuarios');

app.use(express.json());
app.use('/usuarios', usuarios);

app.listen(3000, () => console.log('Servidor rodando'));
```

---
