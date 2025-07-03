# Frontend Vue.js - Sistema de Gerenciamento de Estoque

Este é o frontend do sistema de gerenciamento de estoque desenvolvido em Vue.js 3 com Vuetify, **totalmente integrado** com o backend Node.js.

## 🚀 Tecnologias Utilizadas

- **Vue.js 3** - Framework JavaScript progressivo
- **Vuetify 3** - Framework de componentes Material Design
- **Vue Router 4** - Roteamento oficial do Vue.js
- **Pinia** - Gerenciamento de estado
- **Axios** - Cliente HTTP
- **Vue Toastification** - Notificações toast
- **Vite** - Build tool e dev server

## 📋 Funcionalidades Integradas

- **✅ Autenticação**: Login e registro de usuários (JWT)
- **✅ Dashboard**: Visão geral do sistema com estatísticas
- **✅ Gestão de Produtos**: CRUD completo de produtos
- **✅ Movimentos de Estoque**: Registro de entradas e saídas
- **✅ Relatórios**: Relatórios de produtos mais vendidos e estoque baixo
- **✅ Interface Responsiva**: Design adaptável para diferentes dispositivos

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Backend Node.js rodando na porta 5000
- MySQL rodando (via Docker)

### Instalação

1. **Certifique-se de que o backend está rodando:**
   ```bash
   # Na pasta raiz do projeto
   docker compose up -d
   ```

2. **Navegue até a pasta do frontend:**
   ```bash
   cd frontend-vue
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Execute o projeto em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação em:** `http://localhost:3000`

## 🔐 Credenciais de Teste

### Usuário Admin
```json
{
  "email": "admin@admin.com",
  "senha": "123456"
}
```

### Registrar Novo Usuário
```json
{
  "nome": "João Silva",
  "email": "joao@test.com",
  "senha": "123456",
  "role": "admin"
}
```

## 🌐 Integração com a API

O frontend está **totalmente integrado** com a API Node.js:

### Endpoints Utilizados

- **Autenticação**: 
  - `POST /api/auth/login`
  - `POST /api/auth/register`
- **Produtos**: 
  - `GET /api/produtos`
  - `POST /api/produtos`
  - `PUT /api/produtos/:id`
  - `DELETE /api/produtos/:id`
- **Movimentos**: 
  - `POST /api/movimentos/entrada`
  - `POST /api/movimentos/saida`
- **Relatórios**: 
  - `GET /api/relatorios/mais-vendidos`
  - `GET /api/relatorios/estoque-baixo`

### Configuração do Proxy

O Vite está configurado para fazer proxy das requisições `/api` para `http://localhost:5000`:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código com Prettier
- `npm run test` - Executa os testes

## 📁 Estrutura do Projeto

```
frontend-vue/
├── src/
│   ├── assets/          # Recursos estáticos (CSS, imagens)
│   ├── plugins/         # Plugins (Vuetify)
│   ├── router/          # Configuração de rotas
│   ├── services/        # Serviços de API (Axios)
│   ├── stores/          # Stores do Pinia (Estado global)
│   ├── views/           # Páginas/Views da aplicação
│   ├── App.vue          # Componente raiz
│   └── main.js          # Ponto de entrada
├── tests/               # Testes unitários
├── public/              # Arquivos públicos
├── index.html           # Template HTML
├── package.json         # Dependências e scripts
├── vite.config.js       # Configuração do Vite
└── README.md           # Este arquivo
```

## 🎨 Design System

O projeto utiliza o Vuetify 3 com tema personalizado:

- **Cores Primárias**: Azul (#1976D2)
- **Cores de Status**: 
  - Sucesso: Verde (#4CAF50)
  - Aviso: Amarelo (#FFC107)
  - Erro: Vermelho (#FF5252)
  - Info: Azul (#2196F3)

## 📱 Responsividade

A interface é totalmente responsiva e funciona em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔐 Autenticação JWT

O sistema utiliza JWT (JSON Web Tokens) para autenticação:
- Tokens são armazenados no localStorage
- Interceptors do Axios adicionam automaticamente o token nas requisições
- Redirecionamento automático para login em caso de token expirado
- Decodificação automática do token para obter informações do usuário

## 🚀 Deploy

Para fazer o deploy em produção:

1. Execute o build:
   ```bash
   npm run build
   ```

2. Os arquivos de produção estarão na pasta `dist/`

3. Configure seu servidor web para servir os arquivos estáticos

## 🐳 Docker

Para rodar com Docker:

```bash
# Na pasta frontend-vue
docker compose up --build
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 🔗 Links Úteis

- [Vue.js 3 Documentation](https://vuejs.org/)
- [Vuetify 3 Documentation](https://vuetifyjs.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/) 