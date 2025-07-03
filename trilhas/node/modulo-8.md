## ✅ Questões Teóricas

1. **O que caracteriza uma API RESTful?**
   Uma API RESTful segue os princípios REST: uso de verbos HTTP (GET, POST, PUT, DELETE), URIs organizadas, respostas padronizadas e comunicação stateless.

2. **Quais são os verbos HTTP mais usados em APIs e suas funções?**

   * `GET`: busca dados
   * `POST`: cria dados
   * `PUT`: atualiza dados
   * `DELETE`: remove dados

3. **Vantagem de estruturar projetos com `controllers`, `models` e `routes`:**

   * Organização e separação de responsabilidades
   * Código mais reutilizável e manutenível
   * Facilita testes e crescimento do projeto

4. **O que é Joi e para que serve?**
   É uma biblioteca que valida dados recebidos via requisições HTTP com base em esquemas predefinidos.

5. **Como a paginação melhora a performance da API?**
   Reduz a carga no servidor e no cliente ao limitar o número de registros retornados por requisição.

6. **Finalidade do Swagger:**
   Documentar e testar endpoints de forma interativa. Melhora a compreensão da API por desenvolvedores e facilita a integração com outros sistemas.

7. **O que é o conceito de filtros em consultas?**
   Permite buscar registros com base em critérios específicos (ex: nome, data), tornando a API mais flexível.

8. **Como implementar um endpoint seguro para criação de registros:**

   * Validar dados com Joi
   * Usar prepared statements
   * Proteger contra SQL Injection e autenticar usuários

9. **Benefícios de validar dados na API:**

   * Garante integridade dos dados
   * Previne erros e falhas no banco
   * Melhora segurança e experiência do usuário

10. **Como o Express simplifica o desenvolvimento de APIs RESTful?**
    Fornece roteamento simples, middleware integrável e facilidade para lidar com JSON, requisições e respostas HTTP.

---

## 🛠 Questões Práticas

### 1. **Estrutura de projeto RESTful**

```
/api
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── validators/
 ├── swagger/
 └── app.js
```

---

### 2. **Endpoint GET listar todos**

```js
router.get('/usuarios', async (req, res) => {
  const [results] = await db.query('SELECT * FROM usuarios');
  res.json(results);
});
```

---

### 3. **POST com Joi**

```js
const Joi = require('joi');
const schema = Joi.object({ nome: Joi.string().min(3).required() });

router.post('/usuarios', async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  await db.query('INSERT INTO usuarios (nome) VALUES (?)', [req.body.nome]);
  res.status(201).send('Usuário criado');
});
```

---

### 4. **Paginação**

```js
router.get('/usuarios', async (req, res) => {
  const pagina = parseInt(req.query.pagina) || 1;
  const limite = 5;
  const offset = (pagina - 1) * limite;

  const [results] = await db.query('SELECT * FROM usuarios LIMIT ? OFFSET ?', [limite, offset]);
  res.json(results);
});
```

---

### 5. **PUT atualizar por ID**

```js
router.put('/usuarios/:id', async (req, res) => {
  await db.query('UPDATE usuarios SET nome = ? WHERE id = ?', [req.body.nome, req.params.id]);
  res.send('Atualizado com sucesso');
});
```

---

### 6. **DELETE por ID**

```js
router.delete('/usuarios/:id', async (req, res) => {
  await db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
  res.send('Removido com sucesso');
});
```

---

### 7. **Filtro por nome**

```js
router.get('/usuarios/filtro', async (req, res) => {
  const nome = req.query.nome;
  const [results] = await db.query('SELECT * FROM usuarios WHERE nome LIKE ?', [`%${nome}%`]);
  res.json(results);
});
```

---

### 8. **Swagger com Swagger-UI**

**Instalação:**

```bash
npm install swagger-ui-express swagger-jsdoc
```

**Configuração em `app.js`:**

```js
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Minha API', version: '1.0.0' }
  },
  apis: ['./routes/*.js']
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```

---

### 9. **Testando com dados inválidos (exemplo usando Postman)**

Envie um `POST /usuarios` com `{ "nome": "" }` e veja a resposta de erro `400`.

---

### 10. **Middleware global de logs**

```js
app.use((req, res, next) => {
  console.log(`[${new Date()}] ${req.method} ${req.url}`);
  next();
});
```

