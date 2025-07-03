## ✅ Questões Teóricas

1. **O que é o loop de eventos e qual sua importância no Node.js?**
   É o mecanismo que monitora a *Call Stack* e a *Callback Queue*, garantindo que as operações assíncronas sejam executadas sem bloquear o fluxo principal. Ele permite alta performance em tarefas de I/O.

2. **Diferencie CommonJS de ES Modules.**

   * *CommonJS*: padrão tradicional, usa `require()` e `module.exports`, é síncrono.
   * *ES Modules (ESM)*: padrão moderno, usa `import` e `export`, é assíncrono e compatível com navegadores.

3. **O que são Streams e Buffers?**

   * *Streams*: permitem processar dados em pedaços.
   * *Buffers*: armazenam temporariamente dados binários enquanto são processados.

4. **Três tipos de Streams e aplicações:**

   * *Readable*: leitura de arquivos ou entrada de dados.
   * *Writable*: escrita de arquivos ou saídas.
   * *Duplex*: leitura e escrita simultâneas, como em sockets TCP.

5. **Diferença entre erros de runtime e erros de sintaxe:**

   * *Sintaxe*: ocorrem na interpretação do código (ex: parênteses mal fechados).
   * *Runtime*: ocorrem durante a execução (ex: variável não definida).

6. **Vantagens de usar Streams:**

   * Menor uso de memória
   * Processamento em tempo real
   * Ideal para arquivos grandes e dados contínuos

7. **Como o módulo fs pode ser usado para manipular arquivos?**
   Permite criar, ler, escrever, atualizar e deletar arquivos. Suporta métodos síncronos e assíncronos.

8. **O que acontece quando um erro não é tratado em um stream?**
   A aplicação pode travar ou encerrar. Deve-se usar `stream.on('error', ...)` para capturar erros.

9. **Função do módulo http:**
   Permite criar servidores web para responder a requisições HTTP, base para frameworks como Express.

10. **Papel do Thread Pool no Node.js:**
    Gerencia tarefas de I/O de forma assíncrona em segundo plano, sem bloquear o loop de eventos.

---

## 🛠 Questões Práticas

### 1. **Servidor HTTP com "Bem-vindo ao Node.js!"**

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.end("Bem-vindo ao Node.js!");
});

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
```

---

### 2. **Criar e ler um arquivo com fs**

```js
const fs = require('fs');

fs.writeFile('mensagem.txt', 'Olá, Node.js!', (err) => {
  if (err) throw err;

  fs.readFile('mensagem.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
});
```

---

### 3. **Stream para arquivo grande**

```js
const fs = require('fs');

const leitura = fs.createReadStream('arquivo-grande.txt', { encoding: 'utf8' });

leitura.on('data', (chunk) => {
  console.log('Chunk:', chunk);
});
```

---

### 4. **Buffer com string para binário**

```js
const buffer = Buffer.from("Olá, mundo!");
console.log(buffer); // Exibe em binário
console.log(buffer.toString()); // Converte de volta para string
```

---

### 5. **Módulo CommonJS**

**soma.js**

```js
function somar(a, b) {
  return a + b;
}

module.exports = somar;
```

**app.js**

```js
const somar = require('./soma');
console.log(somar(5, 3));
```

---

### 6. **Ler arquivo JSON com fs**

**usuario.json**

```json
{ "nome": "Lucas", "idade": 22 }
```

**leitor.js**

```js
const fs = require('fs');

fs.readFile('usuario.json', 'utf8', (err, data) => {
  if (err) throw err;
  const usuario = JSON.parse(data);
  console.log(usuario);
});
```

---

### 7. **try/catch para erro em arquivo inexistente**

```js
const fs = require('fs');

try {
  const data = fs.readFileSync('arquivo-inexistente.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error('Erro ao ler arquivo:', err.message);
}
```

---

### 8. **Stream Duplex para modificar dados**

```js
const { Duplex } = require('stream');

const duplex = new Duplex({
  write(chunk, encoding, callback) {
    console.log('Entrada:', chunk.toString().toUpperCase());
    callback();
  },
  read(size) {
    this.push(null);
  }
});

process.stdin.pipe(duplex);
```

---

### 9. **Servidor com múltiplas rotas**

```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Página inicial');
  } else if (req.url === '/sobre') {
    res.end('Sobre');
  } else {
    res.end('Rota não encontrada');
  }
});

server.listen(3000);
```

---

### 10. **Debug com `--inspect`**

1. Execute o script:

   ```bash
   node --inspect app.js
   ```
2. Acesse `chrome://inspect` no Chrome.
3. Clique em "Open dedicated DevTools for Node".

---
