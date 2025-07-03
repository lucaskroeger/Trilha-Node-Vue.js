#!/bin/bash

echo "🚀 Iniciando o frontend Vue.js..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado. Por favor, instale o npm primeiro."
    exit 1
fi

# Instalar dependências se node_modules não existir
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Verificar se a API está rodando
echo "🔍 Verificando se a API está rodando..."
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ API está rodando na porta 3001"
else
    echo "⚠️  API não está rodando na porta 3001. Certifique-se de que o backend está iniciado."
    echo "💡 Execute 'npm run dev' na pasta raiz do projeto para iniciar a API."
fi

# Iniciar o servidor de desenvolvimento
echo "🌐 Iniciando servidor de desenvolvimento..."
npm run dev 