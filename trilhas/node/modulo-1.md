## ✅ Questões Teóricas

1. **O que é Node.js e suas principais características**
   Node.js é uma plataforma que permite executar código JavaScript fora do navegador, baseada no motor V8 do Google.
   **Características**:

   * Arquitetura *single-threaded* e *non-blocking*
   * Programação assíncrona com callbacks, promises e async/await
   * Ideal para apps em tempo real
   * Ecossistema vasto com o npm
   * Motor V8 para execução eficiente do JS

2. **Diferença entre single-threaded e multi-threaded**

   * *Single-threaded*: Um único fluxo de execução. Node.js processa requisições de forma assíncrona usando Event Loop.
   * *Multi-threaded*: Múltiplos fluxos simultâneos. Usado em operações mais complexas via Thread Pool ou `worker_threads`.

3. **O que é o Event Loop**
   É o mecanismo central do Node.js que lida com operações assíncronas, permitindo que múltiplas tarefas sejam processadas sem bloquear a execução principal.

4. **Três aplicações onde Node.js é amplamente utilizado**

   * APIs REST/GraphQL
   * Aplicações em tempo real (chats, jogos, streaming)
   * Microserviços e sistemas de fila

5. **Como o npm facilita o desenvolvimento**
   Gerencia dependências, instala bibliotecas, scripts e facilita automações com comandos simples.

6. **Passos para criar um projeto Node.js**

   * Instalar Node.js
   * Criar uma pasta
   * Executar `npm init -y`
   * Criar um `index.js`
   * Executar com `node index.js`

7. **Dois pacotes populares no npm**

   * `express`: framework para criar APIs e servidores
   * `axios`: biblioteca para fazer requisições HTTP

8. **O que é o package.json e sua importância**
   Arquivo que registra informações do projeto (nome, versão, scripts, dependências), fundamental para gerenciar o ciclo de vida da aplicação.

9. **Conceito de callback**
   Função passada como argumento para outra função e executada após o término de uma operação assíncrona.

10. **Papel do motor V8 no Node.js**
    Compila e executa o JavaScript diretamente em código máquina, garantindo alta performance.

---

## 🛠 Questões Práticas

1. **Instalar o Node.js e verificar a versão**

   ```bash
   node -v
   ```

2. **Criar projeto e exibir mensagem**

   ```bash
   mkdir projeto-node && cd projeto-node
   npm init -y
   echo "console.log('Bem-vindo ao Node.js!')" > index.js
   node index.js
   ```

3. **Mensagem com atraso de 3 segundos**

   ```js
   setTimeout(() => {
     console.log("Mensagem após 3 segundos");
   }, 3000);
   ```

4. **Requisição GET com axios**

   ```bash
   npm install axios
   ```

   ```js
   const axios = require('axios');

   axios.get('https://jsonplaceholder.typicode.com/posts/1')
     .then(response => console.log(response.data))
     .catch(err => console.error(err));
   ```

5. **Mensagem de erro com chalk**

   ```bash
   npm install chalk
   ```

   ```js
   const chalk = require('chalk');
   console.log(chalk.red('Erro: operação não permitida!'));
   ```

6. **Ler arquivo texto.txt**

   ```js
   const fs = require('fs');
   fs.readFile('texto.txt', 'utf8', (err, data) => {
     if (err) throw err;
     console.log(data);
   });
   ```

7. **Função com callback para somar dois números**

   ```js
   function somar(a, b, callback) {
     const resultado = a + b;
     callback(resultado);
   }

   somar(5, 3, (resultado) => {
     console.log(`Resultado: ${resultado}`);
   });
   ```

8. **Adicionar dependência de desenvolvimento**

   ```bash
   npm install --save-dev nodemon
   ```

   Verificação no `package.json`:

   ```json
   "devDependencies": {
     "nodemon": "^x.x.x"
   }
   ```

9. **Arquivo JSON e leitura com Node.js**
   `usuario.json`:

   ```json
   { "nome": "João", "idade": 30 }
   ```

   Leitura:

   ```js
   const fs = require('fs');

   fs.readFile('usuario.json', 'utf8', (err, data) => {
     if (err) throw err;
     const usuario = JSON.parse(data);
     console.log(usuario);
   });
   ```

10. **Exibir data e hora atuais formatadas**

```js
const data = new Date();
console.log(`Data e hora atuais: ${data.toLocaleString()}`);
```

---
