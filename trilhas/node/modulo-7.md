## ✅ Questões Teóricas

1. **Diferença entre callbacks, promises e async/await:**

   * *Callbacks*: funções passadas como argumento para outra função assíncrona.
   * *Promises*: representam uma operação assíncrona com três estados: pendente, resolvida ou rejeitada.
   * *Async/Await*: sintaxe moderna baseada em promises, mais legível e próxima do código síncrono.

2. **O que é Worker Threads no Node.js?**
   São threads separadas para executar código em paralelo ao main thread. Ideais para tarefas pesadas que não devem bloquear o Event Loop.

3. **Como o Socket.io facilita a comunicação em tempo real?**
   Fornece uma API simples para comunicação bidirecional (cliente-servidor) via WebSocket, com fallback automático para outras tecnologias.

4. **Papel dos clusters em Node.js:**
   Permitem criar múltiplas instâncias da aplicação utilizando todos os núcleos da CPU, aumentando a escalabilidade.

5. **Três vantagens do PM2:**

   * Monitoramento em tempo real
   * Reinício automático em falhas
   * Suporte a clusters e logs centralizados

6. **O que é um child process e como é utilizado?**
   Processo filho executado de forma independente. Usado para rodar scripts ou comandos externos sem bloquear a aplicação principal.

7. **Conceito de logging estruturado:**
   Registro de logs com informações formatadas (nível, timestamp, contexto). Facilita análise, depuração e integração com sistemas de monitoramento.

8. **Vantagem de usar o Winston:**

   * Suporte a múltiplos destinos (arquivo, console, cloud)
   * Personalização de formato e níveis de log
   * Logs estruturados com metadados

9. **Importância de escalar aplicações em produção:**
   Garante alta disponibilidade, performance e balanceamento de carga, especialmente sob picos de acesso.

10. **Como a programação assíncrona melhora a performance:**
    Evita bloqueio do Event Loop, permitindo que múltiplas operações I/O ocorram em paralelo, aumentando a eficiência.

---

## 🛠 Questões Práticas

### 1. **Função com async/await para buscar de API**

```js
const fetch = require('node-fetch');

async function buscarDados() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const dados = await res.json();
    console.log(dados);
  } catch (err) {
    console.error('Erro:', err);
  }
}

buscarDados();
```

---

### 2. **Worker Thread com tarefa independente**

**index.js**

```js
const { Worker } = require('worker_threads');

new Worker('./worker.js');
```

**worker.js**

```js
console.log('Worker executando tarefa...');
```

---

### 3. **Servidor Socket.io**

```js
const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', socket => {
  console.log('Cliente conectado');
  socket.on('mensagem', msg => {
    console.log('Mensagem:', msg);
  });
});

server.listen(3000);
```

---

### 4. **Cluster usando todos os núcleos**

```js
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  os.cpus().forEach(() => cluster.fork());
} else {
  require('./app'); // seu app Express ou outro
}
```

---

### 5. **Child process executando comando**

```js
const { exec } = require('child_process');

exec('ls', (err, stdout, stderr) => {
  if (err) return console.error('Erro:', err);
  console.log('Resultado:\n', stdout);
});
```

---

### 6. **Instalação e monitoramento com PM2**

```bash
npm install -g pm2
pm2 start app.js
pm2 list
pm2 logs
```

---

### 7. **Logger com Winston salvando logs**

```js
const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'app.log' })
  ]
});

logger.info('Aplicação iniciada');
```

---

### 8. **Aplicação registrando logs**

```js
const express = require('express');
const winston = require('winston');

const app = express();
const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

app.get('/', (req, res) => {
  logger.info('Rota acessada');
  res.send('Olá mundo!');
});

app.listen(3000);
```

---

### 9. **Chat com Socket.io**

```js
io.on('connection', socket => {
  console.log('Usuário entrou');
  socket.on('chat', msg => {
    io.emit('chat', msg); // envia para todos
  });
});
```

---

### 10. **Combinação Worker + Winston**

**worker.js**

```js
const winston = require('winston');

const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'worker.log' })]
});

logger.info('Worker iniciou uma tarefa pesada');
```

**index.js**

```js
const { Worker } = require('worker_threads');
new Worker('./worker.js');
```

---
