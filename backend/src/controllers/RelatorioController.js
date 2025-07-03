const RelatorioService = require('../services/RelatorioService');

module.exports = {
    async produtosMaisVendidos(req, res, next) {
        try {
            const dados = await RelatorioService.produtosMaisVendidos();
            res.json(dados);
        } catch (error) {
            next(error);
        }
    },

    async estoqueBaixo(req, res, next) {
        try {
            const dados = await RelatorioService.estoqueBaixo();
            res.json(dados);
        } catch (error) {
            next(error);
        }
    },

    async produtosPorCategoria(req, res, next) {
        try {
            const dados = await RelatorioService.produtosPorCategoria();
            res.json(dados);
        } catch (error) {
            next(error);
        }
    },

    async valorTotalEstoque(req, res, next) {
        try {
            const dados = await RelatorioService.valorTotalEstoque();
            res.json(dados);
        } catch (error) {
            next(error);
        }
    },

    async resumoGeral(req, res, next) {
        try {
            const dados = await RelatorioService.resumoGeral();
            res.json(dados);
        } catch (error) {
            next(error);
        }
    }
};
