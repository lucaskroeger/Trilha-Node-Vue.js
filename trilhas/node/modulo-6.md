## ✅ Questões Teóricas

1. **O que é JWT e quais são suas vantagens?**
   JWT (JSON Web Token) é um padrão para troca segura de informações entre partes.
   **Vantagens:**

   * Stateless (não exige sessão no servidor)
   * Fácil de transmitir via header HTTP
   * Assinado com segredo ou chave pública/privada

2. **Qual a diferença entre sessões e cookies?**

   * *Sessões*: armazenadas no servidor, associadas a um ID enviado via cookie
   * *Cookies*: armazenados no navegador, contêm dados como tokens ou preferências

3. **Defina CORS e por que é importante configurá-lo corretamente.**
   Cross-Origin Resource Sharing controla o acesso de recursos entre diferentes domínios. Uma má configuração pode expor a aplicação a ataques ou falhas de segurança.

4. **O que é CSRF e como prevenir este tipo de ataque?**
   Cross-Site Request Forgery envia comandos indesejados a um sistema autenticado.
   **Prevenção:**

   * Tokens CSRF únicos por sessão
   * Validação no servidor

5. **Explique o conceito de SQL Injection e seus riscos.**
   É a injeção de comandos SQL maliciosos em campos de entrada.
   **Riscos:**

   * Roubo de dados
   * Alteração ou exclusão de tabelas
   * Acesso não autorizado

6. **Como o atributo HttpOnly ajuda a proteger cookies?**
   Impede o acesso aos cookies via JavaScript, protegendo contra ataques XSS.

7. **Quais são as principais partes de um token JWT?**

   * **Header**: tipo de token e algoritmo
   * **Payload**: dados (claims)
   * **Signature**: assinatura criptográfica

8. **Três boas práticas para evitar SQL Injection:**

   * Usar *prepared statements*
   * Validar dados de entrada
   * Evitar concatenação de strings em consultas SQL

9. **O que é autenticação baseada em roles e seus benefícios?**
   Controle de acesso com base no papel do usuário (admin, editor, etc).
   **Benefícios:**

   * Segurança granular
   * Melhoria na organização de permissões
   * Flexibilidade para crescer o sistema

10. **Como o middleware `csrf` auxilia na proteção?**
    Gera tokens únicos por sessão e os valida nas requisições POST, impedindo submissões não autorizadas de formulários por sites externos.

---

## 🛠 Questões Práticas

### 1. **Servidor Express com JWT**

```js
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
  const user = { id: 1, nome: "Lucas" };
  const token = jwt.sign(user, 'segredo', { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protegido', (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, 'segredo');
    res.json({ msg: "Acesso autorizado", user: decoded });
  } catch {
    res.status(403).send("Token inválido");
  }
});

app.listen(3000);
```

---

### 2. **Sistema de sessão**

```js
const session = require('express-session');

app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: true
}));

app.get('/set', (req, res) => {
  req.session.nome = 'Lucas';
  res.send('Sessão criada');
});

app.get('/get', (req, res) => {
  res.send(req.session.nome);
});
```

---

### 3. **CORS para domínio específico**

```js
const cors = require('cors');

app.use(cors({
  origin: 'https://meusite.com.br'
}));
```

---

### 4. **Rota com CSRF**

```js
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.get('/form', (req, res) => {
  res.render('formulario', { csrfToken: req.csrfToken() });
});

app.post('/enviar', (req, res) => {
  res.send('Formulário protegido enviado!');
});
```

---

### 5. **Função com prepared statement**

```js
app.post('/buscar', (req, res) => {
  const { nome } = req.body;
  db.query('SELECT * FROM usuarios WHERE nome = ?', [nome], (err, results) => {
    if (err) return res.status(500).send('Erro');
    res.json(results);
  });
});
```

---

### 6. **Cookies com HttpOnly e Secure**

```js
app.get('/set-cookie', (req, res) => {
  res.cookie('token', 'abc123', {
    httpOnly: true,
    secure: true
  });
  res.send('Cookie seguro setado');
});
```

---

### 7. **Tabela de usuários com roles**

```sql
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50),
  role VARCHAR(20)
);

INSERT INTO usuarios (nome, role) VALUES
('Admin', 'admin'),
('Editor', 'editor'),
('Visitante', 'user');
```

---

### 8. **Middleware de role**

```js
function autorizacao(roleEsperado) {
  return (req, res, next) => {
    if (req.user?.role === roleEsperado) next();
    else res.status(403).send("Acesso negado");
  };
}
```

---

### 9. **Simulação de ataque CSRF + proteção**

* **Ataque:** envio de formulário POST de outro domínio
* **Proteção:** middleware `csrf` e verificação de tokens nos formulários e headers

---

### 10. **Login com JWT e proteção de rotas**

```js
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  if (usuario === 'admin' && senha === '123') {
    const token = jwt.sign({ role: 'admin' }, 'segredo');
    res.json({ token });
  } else {
    res.status(401).send('Credenciais inválidas');
  }
});

function autenticar(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    req.user = jwt.verify(token, 'segredo');
    next();
  } catch {
    res.status(401).send('Token inválido');
  }
}

app.get('/admin', autenticar, autorizacao('admin'), (req, res) => {
  res.send('Área de admin');
});
```
