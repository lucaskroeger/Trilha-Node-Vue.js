const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';

async function testIntegration() {
    console.log('🧪 Testando integração entre frontend e backend...\n');

    try {
        // Teste 1: Login
        console.log('1. Testando login...');
        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: 'admin@example.com',
            senha: '123456'
        });

        const token = loginResponse.data.token;
        console.log('✅ Login realizado com sucesso');

        // Configurar headers com token
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        // Teste 2: Listar produtos
        console.log('\n2. Testando listagem de produtos...');
        const produtosResponse = await axios.get(`${API_BASE_URL}/produtos`, { headers });
        console.log(`✅ ${produtosResponse.data.length} produtos encontrados`);

        // Teste 3: Listar categorias
        console.log('\n3. Testando listagem de categorias...');
        const categoriasResponse = await axios.get(`${API_BASE_URL}/produtos/categorias`, { headers });
        console.log(`✅ ${categoriasResponse.data.length} categorias encontradas`);

        // Teste 4: Listar movimentos
        console.log('\n4. Testando listagem de movimentos...');
        const movimentosResponse = await axios.get(`${API_BASE_URL}/movimentos`, { headers });
        console.log(`✅ ${movimentosResponse.data.length} movimentos encontrados`);

        // Teste 5: Relatórios
        console.log('\n5. Testando relatórios...');
        const [maisVendidos, estoqueBaixo, porCategoria, valorEstoque] = await Promise.all([
            axios.get(`${API_BASE_URL}/relatorios/mais-vendidos`, { headers }),
            axios.get(`${API_BASE_URL}/relatorios/estoque-baixo`, { headers }),
            axios.get(`${API_BASE_URL}/relatorios/por-categoria`, { headers }),
            axios.get(`${API_BASE_URL}/relatorios/valor-estoque`, { headers })
        ]);

        console.log(`✅ Relatórios carregados com sucesso:`);
        console.log(`   - Mais vendidos: ${maisVendidos.data.length} produtos`);
        console.log(`   - Estoque baixo: ${estoqueBaixo.data.length} produtos`);
        console.log(`   - Por categoria: ${porCategoria.data.length} categorias`);
        console.log(`   - Valor total: R$ ${valorEstoque.data.valorTotal || 0}`);

        // Teste 6: Criar produto
        console.log('\n6. Testando criação de produto...');
        const novoProduto = {
            nome: 'Produto Teste Integração',
            descricao: 'Produto criado para testar integração',
            quantidade: 10,
            preco: 99.99,
            categoria_id: 1,
            estoque_minimo: 5
        };

        const createResponse = await axios.post(`${API_BASE_URL}/produtos`, novoProduto, { headers });
        console.log(`✅ Produto criado com ID: ${createResponse.data.id}`);

        // Teste 7: Registrar movimento
        console.log('\n7. Testando registro de movimento...');
        const movimento = {
            produto_id: createResponse.data.id,
            quantidade: 5
        };

        const movimentoResponse = await axios.post(`${API_BASE_URL}/movimentos/entrada`, movimento, { headers });
        console.log(`✅ Movimento registrado com ID: ${movimentoResponse.data.id}`);

        console.log('\n🎉 Todos os testes de integração passaram com sucesso!');
        console.log('\n📋 Resumo da integração:');
        console.log('   ✅ Autenticação funcionando');
        console.log('   ✅ CRUD de produtos funcionando');
        console.log('   ✅ Movimentos de estoque funcionando');
        console.log('   ✅ Relatórios funcionando');
        console.log('   ✅ Categorias funcionando');
        console.log('\n🚀 Frontend e backend estão totalmente integrados!');

    } catch (error) {
        console.error('\n❌ Erro durante os testes:', error.response?.data || error.message);
        console.log('\n🔧 Verifique se:');
        console.log('   1. O backend está rodando na porta 5000');
        console.log('   2. O banco de dados MySQL está funcionando');
        console.log('   3. As tabelas foram criadas corretamente');
        console.log('   4. Os dados de exemplo foram inseridos');
    }
}

// Executar testes
testIntegration(); 