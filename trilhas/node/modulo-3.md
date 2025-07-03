## ✅ Questões Teóricas

1. **Explique a diferença entre `mysql2` e `mysql2/promise`**

   * `mysql2`: usa callbacks para operações assíncronas, mais verboso.
   * `mysql2/promise`: oferece uma interface baseada em Promises, permitindo uso com `async/await`, tornando o código mais limpo e moderno.

2. **Quais as vantagens de usar variáveis de ambiente na conexão com o banco de dados?**

   * Maior segurança: evita expor credenciais no código.
   * Flexibilidade: facilita trocar configurações entre ambientes (dev, prod).
   * Manutenção: centraliza e organiza as configurações sensíveis.

3. **O que é um prepared statement e como ele ajuda na segurança da aplicação?**
   É uma consulta SQL pré-compilada que aceita parâmetros como entrada.
   Ajuda a evitar **SQL Injection**, pois os valores são tratados como dados, não como comandos SQL.

4. **Por que é recomendável usar conexões em pool em aplicações Node.js?**

   * Melhora a performance: reutiliza conexões em vez de criar novas.
   * Escalabilidade: permite múltiplas conexões simultâneas.
   * Evita sobrecarga do banco por excesso de conexões abertas.

5. **Descreva o papel do módulo `dotenv` em projetos Node.js**
   Permite carregar variáveis de ambiente definidas em um arquivo `.env`, tornando a configuração do projeto mais segura e organizada.

6. **Qual é a estrutura básica para realizar uma consulta SELECT com o pacote mysql2?**

   ```js
   const mysql = require('mysql2');
   const connection = mysql.createConnection({ host, user, password, database });

   connection.query('SELECT * FROM usuarios', (err, results) => {
     if (err) throw err;
     console.log(results);
   });
   ```

7. **Liste três boas práticas ao conectar o Node.js com o MySQL**

   * Usar variáveis de ambiente para credenciais.
   * Utilizar prepared statements para evitar SQL Injection.
   * Organizar o código em módulos (ex: `db.js`, `usuarios.js`).

8. **Explique o conceito de transações no MySQL e como ele pode ser implementado em Node.js**
   Transações garantem que um conjunto de operações SQL seja executado de forma atômica — ou todas são executadas com sucesso ou nenhuma é.
   Em Node.js com `mysql2/promise`:

   ```js
   const conn = await pool.getConnection();
   try {
     await conn.beginTransaction();
     await conn.query(...);
     await conn.commit();
   } catch (err) {
     await conn.rollback();
   } finally {
     conn.release();
   }
   ```

9. **Quais erros podem ocorrer ao conectar ao MySQL, e como tratá-los no Node.js?**

   * Conexão recusada, senha incorreta, banco inexistente, tempo limite.
   * Tratamento:

     ```js
     connection.connect(err => {
       if (err) {
         console.error('Erro ao conectar:', err.message);
       }
     });
     ```

10. **Por que é importante organizar o código em módulos ao trabalhar com bancos de dados?**

* Facilita a manutenção e reutilização do código.
* Melhora a separação de responsabilidades (ex: conexão, lógica de negócio).
* Torna o código mais legível, testável e escalável.


