# 🚀 Guia Completo de Endpoints da API

## 🔐 Autenticação

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "senha": "123456"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nome": "Administrador",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Registro
```http
POST /api/auth/register
Content-Type: application/json

{
  "nome": "Novo Usuário",
  "email": "user@example.com",
  "senha": "123456",
  "role": "user"
}
```

---

## 📦 PRODUTOS (`/api/produtos`)

### 1. Listar Produtos
```http
GET /api/produtos
Authorization: Bearer <token>
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Smartphone Samsung Galaxy",
    "descricao": "Smartphone com câmera de alta resolução",
    "quantidade": 25,
    "preco": 1299.99,
    "estoque_minimo": 5,
    "categoria": "Eletrônicos",
    "categoria_id": 1
  }
]
```

### 2. Listar Categorias
```http
GET /api/produtos/categorias
Authorization: Bearer <token>
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Eletrônicos"
  },
  {
    "id": 2,
    "nome": "Roupas"
  }
]
```

### 3. Obter Produto por ID
```http
GET /api/produtos/1
Authorization: Bearer <token>
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "Smartphone Samsung Galaxy",
  "descricao": "Smartphone com câmera de alta resolução",
  "quantidade": 25,
  "preco": 1299.99,
  "estoque_minimo": 5,
  "categoria": "Eletrônicos",
  "categoria_id": 1
}
```

### 4. Criar Produto
```http
POST /api/produtos
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Novo Produto",
  "descricao": "Descrição do produto",
  "quantidade": 10,
  "preco": 99.99,
  "categoria_id": 1,
  "estoque_minimo": 5
}
```

**Resposta:**
```json
{
  "id": 11,
  "nome": "Novo Produto",
  "descricao": "Descrição do produto",
  "quantidade": 10,
  "preco": 99.99,
  "categoria_id": 1,
  "estoque_minimo": 5
}
```

### 5. Atualizar Produto
```http
PUT /api/produtos/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Produto Atualizado",
  "descricao": "Nova descrição",
  "quantidade": 15,
  "preco": 89.99,
  "categoria_id": 1,
  "estoque_minimo": 3
}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "Produto Atualizado",
  "descricao": "Nova descrição",
  "quantidade": 15,
  "preco": 89.99,
  "categoria_id": 1,
  "estoque_minimo": 3
}
```

### 6. Excluir Produto
```http
DELETE /api/produtos/1
Authorization: Bearer <token>
```

**Resposta:**
```json
{
  "message": "Produto excluído com sucesso"
}
```

---

## 📊 RELATÓRIOS (`/api/relatorios`)

### 1. Produtos Mais Vendidos
```http
GET /api/relatorios/mais-vendidos
Authorization: Bearer <token>
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Smartphone Samsung Galaxy",
    "quantidadeVendida": 15
  },
  {
    "id": 3,
    "nome": "Camiseta Básica",
    "quantidadeVendida": 10
  }
]
```

### 2. Produtos com Estoque Baixo
```http
GET /api/relatorios/estoque-baixo
Authorization: Bearer <token>
```

**Resposta:**
```json
[
  {
    "id": 8,
    "nome": "Ferramenta Multiuso",
    "quantidade": 5,
    "estoqueMinimo": 10
  },
  {
    "id": 10,
    "nome": "Raquete de Tênis",
    "quantidade": 3,
    "estoqueMinimo": 5
  }
]
```

### 3. Produtos por Categoria
```http
GET /api/relatorios/por-categoria
Authorization: Bearer <token>
```

**Resposta:**
```json
[
  {
    "nome": "Eletrônicos",
    "quantidade": 2
  },
  {
    "nome": "Roupas",
    "quantidade": 2
  },
  {
    "nome": "Livros",
    "quantidade": 2
  }
]
```

### 4. Valor Total em Estoque
```http
GET /api/relatorios/valor-estoque
Authorization: Bearer <token>
```

**Resposta:**
```json
{
  "valorTotal": 125000.50,
  "totalProdutos": 10,
  "produtosSemEstoque": 0,
  "produtosEstoqueBaixo": 2
}
```

### 5. Resumo Geral
```http
GET /api/relatorios/resumo
Authorization: Bearer <token>
```

**Resposta:**
```json
{
  "totalProdutos": 10,
  "produtosSemEstoque": 0,
  "produtosEstoqueBaixo": 2,
  "valorTotalEstoque": 125000.50,
  "totalCategorias": 5
}
```

---

## 📈 MOVIMENTOS (`/api/movimentos`)

### 1. Listar Movimentos
```http
GET /api/movimentos
Authorization: Bearer <token>
```

**Resposta:**
```json
[
  {
    "id": 1,
    "produto_id": 1,
    "produto_nome": "Smartphone Samsung Galaxy",
    "quantidade": 30,
    "data": "2025-07-01T22:00:00.000Z",
    "tipo": "entrada"
  },
  {
    "id": 2,
    "produto_id": 1,
    "produto_nome": "Smartphone Samsung Galaxy",
    "quantidade": 5,
    "data": "2025-07-01T23:00:00.000Z",
    "tipo": "saida"
  }
]
```

### 2. Registrar Entrada
```http
POST /api/movimentos/entrada
Authorization: Bearer <token>
Content-Type: application/json

{
  "produto_id": 1,
  "quantidade": 10
}
```

**Resposta:**
```json
{
  "id": 3,
  "produto_id": 1,
  "quantidade": 10,
  "nova_quantidade": 35
}
```

### 3. Registrar Saída
```http
POST /api/movimentos/saida
Authorization: Bearer <token>
Content-Type: application/json

{
  "produto_id": 1,
  "quantidade": 5
}
```

**Resposta:**
```json
{
  "id": 4,
  "produto_id": 1,
  "quantidade": 5,
  "nova_quantidade": 30
}
```

---

## 🔧 Exemplos de Uso com cURL

### Login e Obter Token
```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","senha":"123456"}' \
  | jq -r '.token')

echo "Token: $TOKEN"
```

### Listar Produtos
```bash
curl -X GET http://localhost:5000/api/produtos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

### Criar Produto
```bash
curl -X POST http://localhost:5000/api/produtos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Produto Teste",
    "descricao": "Descrição do produto",
    "quantidade": 10,
    "preco": 99.99,
    "categoria_id": 1,
    "estoque_minimo": 5
  }'
```

### Registrar Entrada
```bash
curl -X POST http://localhost:5000/api/movimentos/entrada \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "produto_id": 1,
    "quantidade": 10
  }'
```

### Obter Relatórios
```bash
# Produtos mais vendidos
curl -X GET http://localhost:5000/api/relatorios/mais-vendidos \
  -H "Authorization: Bearer $TOKEN"

# Estoque baixo
curl -X GET http://localhost:5000/api/relatorios/estoque-baixo \
  -H "Authorization: Bearer $TOKEN"

# Valor total
curl -X GET http://localhost:5000/api/relatorios/valor-estoque \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📋 Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `401` - Não autorizado
- `404` - Não encontrado
- `500` - Erro interno do servidor

## 🔒 Permissões

- **admin**: Acesso total a todos os endpoints
- **user**: Acesso de leitura a produtos, relatórios e movimentos

## 🚨 Tratamento de Erros

### Erro de Validação
```json
{
  "error": "Validation Error",
  "details": [
    "Nome é obrigatório",
    "Preço deve ser maior que zero"
  ]
}
```

### Erro de Autenticação
```json
{
  "error": "Unauthorized",
  "message": "Token inválido ou expirado"
}
```

### Erro de Produto não encontrado
```json
{
  "error": "Produto não encontrado"
}
```

### Erro de Estoque insuficiente
```json
{
  "error": "Quantidade insuficiente em estoque"
}
```

---

## 🎯 Teste Rápido

Execute este script para testar todos os endpoints:

```bash
#!/bin/bash

# Login
echo "🔐 Fazendo login..."
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","senha":"123456"}' \
  | jq -r '.token')

if [ "$TOKEN" = "null" ]; then
  echo "❌ Falha no login"
  exit 1
fi

echo "✅ Login realizado com sucesso"

# Testar endpoints
echo "📦 Testando produtos..."
curl -s -X GET http://localhost:5000/api/produtos \
  -H "Authorization: Bearer $TOKEN" | jq '.[0:2]'

echo "📊 Testando relatórios..."
curl -s -X GET http://localhost:5000/api/relatorios/mais-vendidos \
  -H "Authorization: Bearer $TOKEN" | jq '.[0:2]'

echo "📈 Testando movimentos..."
curl -s -X GET http://localhost:5000/api/movimentos \
  -H "Authorization: Bearer $TOKEN" | jq '.[0:2]'

echo "🎉 Todos os testes concluídos!"
```

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique se o backend está rodando: `docker ps`
2. Verifique os logs: `docker logs backend-node`
3. Teste a conectividade: `curl http://localhost:5000/health`
4. Verifique o token de autenticação
5. Confirme se os dados de exemplo foram inseridos no banco 