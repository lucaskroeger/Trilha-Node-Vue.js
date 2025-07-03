## ✅ Questões Teóricas

1. **O que são templating engines e qual sua utilidade?**
   São ferramentas que permitem gerar HTML dinâmico no servidor com base em dados fornecidos pela aplicação. Facilitam a separação entre lógica e apresentação.

2. **Explique as diferenças entre EJS e Pug.**

   * *EJS*: usa sintaxe HTML com inserções de JavaScript (`<%= %>`).
   * *Pug*: usa indentação em vez de tags HTML, com sintaxe minimalista.

3. **Como configurar o EJS em um projeto Express?**

   ```js
   const express = require('express');
   const app = express();
   app.set('view engine', 'ejs');
   ```

4. **O que são partials e como eles auxiliam na reutilização de código?**
   São trechos reutilizáveis de templates (como header, footer) que podem ser incluídos em várias páginas para evitar duplicação de código.

5. **Como os dados do MySQL podem ser renderizados em um template?**
   Após recuperar os dados com uma query, envie-os ao template:

   ```js
   db.query('SELECT * FROM usuarios', (err, results) => {
     res.render('usuarios', { usuarios: results });
   });
   ```

6. **Explique o papel do body-parser em aplicações Express.**
   Middleware usado para interpretar o corpo das requisições (ex: `application/x-www-form-urlencoded` ou `JSON`), tornando os dados acessíveis via `req.body`.

7. **Quais são as boas práticas ao organizar templates em um projeto?**

   * Usar pastas para `views`, `partials`, `layouts`
   * Separar lógica de apresentação
   * Evitar lógica complexa nos templates

8. **Como funciona a inclusão de placeholders em layouts do EJS?**
   Placeholders são blocos onde o conteúdo específico da página é injetado usando `<%- body %>` ou outras variáveis passadas ao `res.render`.

9. **Três aplicações práticas para formulários no Express:**

   * Cadastro de usuários
   * Filtros de pesquisa
   * Login e autenticação

10. **Por que é importante validar dados recebidos de formulários?**

* Garante integridade dos dados
* Evita falhas na aplicação
* Previne ataques como SQL Injection e XSS

---

## 🛠 Questões Práticas

### 1. **Configure o EJS e crie um template básico**

```js
// app.js
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { mensagem: 'Bem-vindo!' });
});

app.listen(3000);
```

**views/index.ejs**

```ejs
<!DOCTYPE html>
<html>
  <body>
    <h1><%= mensagem %></h1>
  </body>
</html>
```

---

### 2. **Template listando usuários do MySQL**

```js
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    res.render('usuarios', { usuarios: results });
  });
});
```

**views/usuarios.ejs**

```ejs
<ul>
  <% usuarios.forEach(user => { %>
    <li><%= user.nome %></li>
  <% }) %>
</ul>
```

---

### 3. **Layout com partials**

**views/partials/header.ejs**

```ejs
<header><h1>Meu Site</h1></header>
```

**views/partials/footer.ejs**

```ejs
<footer><p>Rodapé</p></footer>
```

**views/index.ejs**

```ejs
<%- include('partials/header') %>
<h2>Conteúdo da página</h2>
<%- include('partials/footer') %>
```

---

### 4. **Formulário para novo usuário**

**views/formulario.ejs**

```ejs
<form action="/usuarios" method="POST">
  <input type="text" name="nome" placeholder="Nome" required>
  <button type="submit">Cadastrar</button>
</form>
```

---

### 5. **Rota POST inserindo no MySQL**

```js
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/usuarios', (req, res) => {
  const { nome } = req.body;
  db.query('INSERT INTO usuarios (nome) VALUES (?)', [nome], err => {
    if (err) return res.send('Erro');
    res.redirect('/usuarios');
  });
});
```

---

### 6. **Template de erro**

**views/erro.ejs**

```ejs
<h2>Erro:</h2>
<p><%= mensagem %></p>
```

**Uso no código:**

```js
if (err) return res.render('erro', { mensagem: 'Falha na operação.' });
```

---

### 7. **Navegação entre páginas com layout reutilizável**

**views/layout.ejs**

```ejs
<%- include('partials/header') %>
<nav>
  <a href="/">Home</a>
  <a href="/usuarios">Usuários</a>
</nav>
<%- body %>
<%- include('partials/footer') %>
```

---

### 8. **Placeholder para título da página**

**views/layout.ejs**

```ejs
<title><%= titulo %></title>
```

**Ao renderizar:**

```js
res.render('index', { titulo: 'Página Inicial' });
```

---

### 9. **Menu dinâmico com dados do MySQL**

```js
app.get('/', (req, res) => {
  db.query('SELECT nome FROM categorias', (err, results) => {
    res.render('index', { categorias: results });
  });
});
```

**views/index.ejs**

```ejs
<ul>
  <% categorias.forEach(cat => { %>
    <li><%= cat.nome %></li>
  <% }) %>
</ul>
```

---

### 10. **Validação de formulário com mensagens**

```js
app.post('/usuarios', (req, res) => {
  const { nome } = req.body;
  if (!nome || nome.length < 3) {
    return res.render('formulario', { erro: 'Nome inválido' });
  }
  db.query('INSERT INTO usuarios (nome) VALUES (?)', [nome], err => {
    if (err) return res.send('Erro ao inserir');
    res.redirect('/usuarios');
  });
});
```

**views/formulario.ejs**

```ejs
<% if (erro) { %>
  <p style="color:red;"><%= erro %></p>
<% } %>
<form method="POST">
  <input type="text" name="nome">
  <button type="submit">Enviar</button>
</form>
```
