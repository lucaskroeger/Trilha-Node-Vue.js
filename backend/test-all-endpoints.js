const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Cores para console
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testAllEndpoints() {
    log('🚀 TESTANDO TODOS OS ENDPOINTS DA API', 'bright');
    log('=====================================', 'bright');

    let token = null;
    let testProductId = null;

    try {
        // 1. TESTE DE LOGIN
        log('\n1️⃣ Testando Login...', 'cyan');
        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: 'admin@example.com',
            senha: '123456'
        });

        token = loginResponse.data.token;
        log('✅ Login realizado com sucesso', 'green');
        log(`   Token: ${token.substring(0, 20)}...`, 'yellow');

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        // 2. TESTE DE PRODUTOS
        log('\n2️⃣ Testando Endpoints de Produtos...', 'cyan');

        // 2.1 Listar categorias
        log('   📋 Listando categorias...', 'blue');
        const categoriasResponse = await axios.get(`${API_BASE_URL}/produtos/categorias`, { headers });
        log(`   ✅ ${categoriasResponse.data.length} categorias encontradas`, 'green');

        // 2.2 Listar produtos
        log('   📦 Listando produtos...', 'blue');
        const produtosResponse = await axios.get(`${API_BASE_URL}/produtos`, { headers });
        log(`   ✅ ${produtosResponse.data.length} produtos encontrados`, 'green');

        // 2.3 Criar produto
        log('   ➕ Criando produto...', 'blue');
        const novoProduto = {
            nome: 'Produto Teste API',
            descricao: 'Produto criado para testar a API',
            quantidade: 15,
            preco: 149.99,
            categoria_id: 1,
            estoque_minimo: 5
        };

        const createResponse = await axios.post(`${API_BASE_URL}/produtos`, novoProduto, { headers });
        testProductId = createResponse.data.id;
        log(`   ✅ Produto criado com ID: ${testProductId}`, 'green');

        // 2.4 Obter produto específico
        log('   🔍 Obtendo produto específico...', 'blue');
        const produtoResponse = await axios.get(`${API_BASE_URL}/produtos/${testProductId}`, { headers });
        log(`   ✅ Produto encontrado: ${produtoResponse.data.nome}`, 'green');

        // 2.5 Atualizar produto
        log('   ✏️ Atualizando produto...', 'blue');
        const updateData = {
            ...novoProduto,
            nome: 'Produto Teste API - Atualizado',
            quantidade: 20
        };

        const updateResponse = await axios.put(`${API_BASE_URL}/produtos/${testProductId}`, updateData, { headers });
        log(`   ✅ Produto atualizado: ${updateResponse.data.nome}`, 'green');

        // 3. TESTE DE MOVIMENTOS
        log('\n3️⃣ Testando Endpoints de Movimentos...', 'cyan');

        // 3.1 Listar movimentos
        log('   📊 Listando movimentos...', 'blue');
        const movimentosResponse = await axios.get(`${API_BASE_URL}/movimentos`, { headers });
        log(`   ✅ ${movimentosResponse.data.length} movimentos encontrados`, 'green');

        // 3.2 Registrar entrada
        log('   📥 Registrando entrada...', 'blue');
        const entradaData = {
            produto_id: testProductId,
            quantidade: 10
        };

        const entradaResponse = await axios.post(`${API_BASE_URL}/movimentos/entrada`, entradaData, { headers });
        log(`   ✅ Entrada registrada com ID: ${entradaResponse.data.id}`, 'green');
        log(`   📈 Nova quantidade: ${entradaResponse.data.nova_quantidade}`, 'yellow');

        // 3.3 Registrar saída
        log('   📤 Registrando saída...', 'blue');
        const saidaData = {
            produto_id: testProductId,
            quantidade: 5
        };

        const saidaResponse = await axios.post(`${API_BASE_URL}/movimentos/saida`, saidaData, { headers });
        log(`   ✅ Saída registrada com ID: ${saidaResponse.data.id}`, 'green');
        log(`   📉 Nova quantidade: ${saidaResponse.data.nova_quantidade}`, 'yellow');

        // 4. TESTE DE RELATÓRIOS
        log('\n4️⃣ Testando Endpoints de Relatórios...', 'cyan');

        // 4.1 Produtos mais vendidos
        log('   🏆 Produtos mais vendidos...', 'blue');
        const maisVendidosResponse = await axios.get(`${API_BASE_URL}/relatorios/mais-vendidos`, { headers });
        log(`   ✅ ${maisVendidosResponse.data.length} produtos mais vendidos`, 'green');

        // 4.2 Estoque baixo
        log('   ⚠️ Produtos com estoque baixo...', 'blue');
        const estoqueBaixoResponse = await axios.get(`${API_BASE_URL}/relatorios/estoque-baixo`, { headers });
        log(`   ✅ ${estoqueBaixoResponse.data.length} produtos com estoque baixo`, 'green');

        // 4.3 Produtos por categoria
        log('   📊 Produtos por categoria...', 'blue');
        const porCategoriaResponse = await axios.get(`${API_BASE_URL}/relatorios/por-categoria`, { headers });
        log(`   ✅ ${porCategoriaResponse.data.length} categorias com produtos`, 'green');

        // 4.4 Valor total em estoque
        log('   💰 Valor total em estoque...', 'blue');
        const valorEstoqueResponse = await axios.get(`${API_BASE_URL}/relatorios/valor-estoque`, { headers });
        log(`   ✅ Valor total: R$ ${valorEstoqueResponse.data.valorTotal || 0}`, 'green');

        // 4.5 Resumo geral
        log('   📋 Resumo geral...', 'blue');
        const resumoResponse = await axios.get(`${API_BASE_URL}/relatorios/resumo`, { headers });
        log(`   ✅ Total de produtos: ${resumoResponse.data.totalProdutos}`, 'green');

        // 5. LIMPEZA - Excluir produto de teste
        log('\n5️⃣ Limpeza - Excluindo produto de teste...', 'cyan');
        await axios.delete(`${API_BASE_URL}/produtos/${testProductId}`, { headers });
        log('   ✅ Produto de teste excluído', 'green');

        // RESUMO FINAL
        log('\n🎉 TODOS OS TESTES CONCLUÍDOS COM SUCESSO!', 'bright');
        log('============================================', 'bright');
        log('✅ Autenticação funcionando', 'green');
        log('✅ CRUD de produtos funcionando', 'green');
        log('✅ Movimentos de estoque funcionando', 'green');
        log('✅ Relatórios funcionando', 'green');
        log('✅ Categorias funcionando', 'green');
        log('\n🚀 API está 100% funcional!', 'bright');

    } catch (error) {
        log('\n❌ ERRO DURANTE OS TESTES', 'red');
        log('==========================', 'red');

        if (error.response) {
            log(`Status: ${error.response.status}`, 'red');
            log(`URL: ${error.config.url}`, 'red');
            log(`Método: ${error.config.method}`, 'red');
            log(`Erro: ${error.response.data.error || error.response.data.message || 'Erro desconhecido'}`, 'red');

            if (error.response.data.details) {
                log('Detalhes:', 'red');
                error.response.data.details.forEach(detail => {
                    log(`  - ${detail}`, 'red');
                });
            }
        } else if (error.request) {
            log('Erro de conexão - Backend não está respondendo', 'red');
            log('Verifique se o backend está rodando: docker ps', 'yellow');
        } else {
            log(`Erro: ${error.message}`, 'red');
        }

        log('\n🔧 SOLUÇÃO DE PROBLEMAS:', 'yellow');
        log('1. Verifique se o backend está rodando: docker ps', 'yellow');
        log('2. Verifique os logs: docker logs backend-node', 'yellow');
        log('3. Verifique se o banco de dados está funcionando', 'yellow');
        log('4. Verifique se os dados de exemplo foram inseridos', 'yellow');
        log('5. Verifique as credenciais de login', 'yellow');
    }
}

// Executar testes
testAllEndpoints(); 