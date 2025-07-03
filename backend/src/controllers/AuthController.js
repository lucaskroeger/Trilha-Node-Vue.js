const AuthService = require('../services/AuthService');
const logger = require('../utils/logger');

module.exports = {
    async login(req, res, next) {
        try {
            const { email, senha } = req.body;
            const token = await AuthService.login({ email, senha });

            logger.info('User logged in successfully', { email });
            res.json({ token });
        } catch (error) {
            logger.warn('Login failed', { email: req.body.email, error: error.message });
            next(error);
        }
    },

    async register(req, res, next) {
        try {
            const { nome, email, senha, role } = req.body;
            const usuario = await AuthService.register({ nome, email, senha, role });

            logger.info('User registered successfully', { email, role });
            res.status(201).json(usuario);
        } catch (error) {
            logger.warn('Registration failed', { email: req.body.email, error: error.message });
            next(error);
        }
    }
};
