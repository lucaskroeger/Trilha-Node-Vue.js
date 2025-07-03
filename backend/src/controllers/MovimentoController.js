const MovimentoService = require('../services/MovimentoService');

module.exports = {
    async listar(req, res, next) {
        try {
            const movimentos = await MovimentoService.listar();
            res.json(movimentos);
        } catch (error) {
            next(error);
        }
    },

    async registrarEntrada(req, res, next) {
        try {
            const entrada = await MovimentoService.registrarEntrada(req.body);
            res.status(201).json(entrada);
        } catch (error) {
            next(error);
        }
    },

    async registrarSaida(req, res, next) {
        try {
            const saida = await MovimentoService.registrarSaida(req.body);
            res.status(201).json(saida);
        } catch (error) {
            next(error);
        }
    }
};
