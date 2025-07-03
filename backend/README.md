# API de Gerenciamento de Estoque

Uma API RESTful para gerenciamento de estoque desenvolvida com Node.js, Express e MySQL.

## 🚀 Funcionalidades

- **Autenticação JWT** com roles (admin/user)
- **CRUD de Produtos** com categorias
- **Movimentações de Estoque** (entrada/saída)
- **Relatórios** de movimentações
- **Validação de Dados** com Joi
- **Logging Estruturado** com Winston
- **Documentação Swagger** automática
- **Rate Limiting** para proteção contra abuso
- **CORS** configurável
- **Segurança** com Helmet

## 📋 Pré-requisitos

- Node.js (v16 ou superior)
- Docker e Docker Compose
- MySQL 8.3.0

## 🛠️ Instalação

1. **Clone o repositório:**
```bash
git clone <repository-url>
cd projeto
```

2. **Configure as variáveis de ambiente:**
```bash
cp env.example .env
# Edite o arquivo .env com suas configurações
```

3. **Instale as dependências:**
```bash
npm install
```

4. **Inicie os serviços com Docker:**
```bash
docker-compose up -d
```

5. **Execute as migrações:**
O banco de dados será inicializado automaticamente com o script `docker/mysql/init.sql`.

## 🚀 Uso

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

### Testes
```bash
npm test
```

## 📚 Documentação da API

A documentação interativa está disponível em:
- **Swagger UI**: http://localhost:3000/api-docs

### Endpoints Principais

#### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de usuário

#### Produtos
- `GET /api/produtos` - Listar produtos
- `GET /api/produtos/:id` - Obter produto específico
- `POST /api/produtos` - Criar produto (admin)
- `PUT /api/produtos/:id` - Atualizar produto (admin)
- `DELETE /api/produtos/:id` - Remover produto (admin)

#### Movimentações
- `POST /api/movimentos/entrada` - Registrar entrada
- `POST /api/movimentos/saida` - Registrar saída

#### Relatórios
- `GET /api/relatorios/movimentacoes` - Relatório de movimentações

### Autenticação

A API usa JWT Bearer tokens. Inclua o header:
```
Authorization: Bearer <seu-token>
```

## 🔧 Configuração

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `DB_HOST` | Host do banco de dados | localhost |
| `DB_PORT` | Porta do banco de dados | 3306 |
| `DB_USER` | Usuário do banco | root |
| `DB_PASSWORD` | Senha do banco | mysql |
| `DB_NAME` | Nome do banco | estoque |
| `JWT_SECRET` | Chave secreta do JWT | - |
| `PORT` | Porta da aplicação | 3000 |
| `NODE_ENV` | Ambiente | development |
| `LOG_LEVEL` | Nível de log | info |

## 📊 Estrutura do Projeto

```
src/
├── config/          # Configurações (banco, etc.)
├── controllers/     # Controladores da API
├── middlewares/     # Middlewares (auth, validation, etc.)
├── models/          # Modelos de dados
├── routes/          # Rotas da API
├── services/        # Lógica de negócio
└── utils/           # Utilitários (logger, etc.)
```

## 🔒 Segurança

- **Helmet**: Headers de segurança
- **CORS**: Controle de origem
- **Rate Limiting**: Proteção contra abuso
- **JWT**: Autenticação segura
- **Validação**: Validação de entrada
- **Logging**: Auditoria de ações

## 📝 Logs

Os logs são salvos em:
- `logs/error.log` - Erros
- `logs/combined.log` - Todos os logs

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch
```

## 🐳 Docker

### Desenvolvimento
```bash
docker-compose up -d
```

### Produção
```bash
docker build -t estoque-api .
docker run -p 3000:3000 estoque-api
```

## 📈 Monitoramento

### Health Check
```
GET /health
```

Retorna o status da aplicação, uptime e informações do ambiente.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 🆘 Suporte

Para suporte, abra uma issue no repositório ou entre em contato. 