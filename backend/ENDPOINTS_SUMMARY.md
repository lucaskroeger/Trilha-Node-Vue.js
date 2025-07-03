# 📋 Resumo Completo de Endpoints

## 🔐 Autenticação
| Método | Endpoint | Descrição | Payload |
|--------|----------|-----------|---------|
| POST | `/api/auth/login` | Login | `{"email": "admin@example.com", "senha": "123456"}` |
| POST | `/api/auth/register` | Registro | `{"nome": "Nome", "email": "email@ex.com", "senha": "123456", "role": "user"}` |

## 📦 Produtos (`/api/produtos`)
| Método | Endpoint | Descrição | Payload |
|--------|----------|-----------|---------|
| GET | `/api/produtos` | Listar produtos | - |
| GET | `/api/produtos/categorias` | Listar categorias | - |
| GET | `/api/produtos/:id` | Obter produto | - |
| POST | `/api/produtos` | Criar produto | `{"nome": "Nome", "descricao": "Desc", "quantidade": 10, "preco": 99.99, "categoria_id": 1, "estoque_minimo": 5}` |
| PUT | `/api/produtos/:id` | Atualizar produto | `{"nome": "Nome", "descricao": "Desc", "quantidade": 10, "preco": 99.99, "categoria_id": 1, "estoque_minimo": 5}` |
| DELETE | `/api/produtos/:id` | Excluir produto | - |

## 📈 Movimentos (`/api/movimentos`)
| Método | Endpoint | Descrição | Payload |
|--------|----------|-----------|---------|
| GET | `/api/movimentos` | Listar movimentos | - |
| POST | `/api/movimentos/entrada` | Registrar entrada | `{"produto_id": 1, "quantidade": 10}` |
| POST | `/api/movimentos/saida` | Registrar saída | `{"produto_id": 1, "quantidade": 5}` |

## 📊 Relatórios (`/api/relatorios`)
| Método | Endpoint | Descrição | Payload |
|--------|----------|-----------|---------|
| GET | `/api/relatorios/mais-vendidos` | Produtos mais vendidos | - |
| GET | `/api/relatorios/estoque-baixo` | Produtos com estoque baixo | - |
| GET | `/api/relatorios/por-categoria` | Produtos por categoria | - |
| GET | `/api/relatorios/valor-estoque` | Valor total em estoque | - |
| GET | `/api/relatorios/resumo` | Resumo geral | - |

## 🔧 Headers Necessários
```
Authorization: Bearer <token>
Content-Type: application/json
```

## 🚀 Como Testar
```bash
# Instalar dependências
npm install axios

# Executar teste completo
node test-all-endpoints.js

# Ou teste individual
node test-integration.js
```

## 📞 Status da API
- ✅ **Backend**: Rodando na porta 5000
- ✅ **Frontend**: Rodando na porta 3001
- ✅ **MySQL**: Rodando na porta 3307
- ✅ **Todos os endpoints**: Funcionando

## 🎯 Endpoints Principais para Frontend
1. **Login**: `POST /api/auth/login`
2. **Produtos**: `GET /api/produtos`
3. **Categorias**: `GET /api/produtos/categorias`
4. **Movimentos**: `GET /api/movimentos`
5. **Relatórios**: `GET /api/relatorios/*`

## 🔒 Permissões
- **admin**: Acesso total
- **user**: Acesso de leitura 