const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testFrontendAuth() {
    console.log('🔐 Testando autenticação para frontend...\n');

    try {
        // 1. Testar login
        console.log('1️⃣ Fazendo login...');
        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: 'admin@example.com',
            senha: '123456'
        });

        const token = loginResponse.data.token;
        console.log('✅ Login realizado com sucesso');
        console.log(`   Token: ${token.substring(0, 20)}...`);

        // 2. Testar endpoints com token
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        console.log('\n2️⃣ Testando endpoints protegidos...');

        // Testar produtos
        const produtosResponse = await axios.get(`${API_BASE_URL}/produtos`, { headers });
        console.log(`✅ Produtos: ${produtosResponse.data.length} encontrados`);

        // Testar movimentos
        const movimentosResponse = await axios.get(`${API_BASE_URL}/movimentos`, { headers });
        console.log(`✅ Movimentos: ${movimentosResponse.data.length} encontrados`);

        // Testar relatórios
        const relatoriosResponse = await axios.get(`${API_BASE_URL}/relatorios/resumo`, { headers });
        console.log(`✅ Relatórios: ${JSON.stringify(relatoriosResponse.data)}`);

        console.log('\n🎉 Autenticação funcionando perfeitamente!');
        console.log('\n📋 Para o frontend funcionar:');
        console.log('1. Acesse http://localhost:3001');
        console.log('2. Faça login com: admin@example.com / 123456');
        console.log('3. O token será armazenado automaticamente');
        console.log('4. Todas as requisições incluirão o token');

    } catch (error) {
        console.error('\n❌ Erro durante o teste:', error.response?.data || error.message);

        if (error.response?.status === 401) {
            console.log('\n🔧 Problema de autenticação:');
            console.log('1. Verifique se as credenciais estão corretas');
            console.log('2. Verifique se o banco de dados tem os dados de exemplo');
        }
    }
}

testFrontendAuth(); 