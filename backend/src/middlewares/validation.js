const Joi = require('joi');

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: 'Validation Error',
                details: error.details.map(detail => detail.message)
            });
        }
        next();
    };
};

// Validation schemas
const schemas = {
    login: Joi.object({
        email: Joi.string().email().required(),
        senha: Joi.string().min(6).required()
    }),

    register: Joi.object({
        nome: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required(),
        senha: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'user').default('user')
    }),

    produto: Joi.object({
        nome: Joi.string().min(2).max(100).required(),
        quantidade: Joi.number().integer().min(0).required(),
        preco: Joi.number().positive().precision(2).required(),
        categoria_id: Joi.number().integer().positive().required(),
        estoque_minimo: Joi.number().integer().min(0).optional()
    }),

    movimento: Joi.object({
        produto_id: Joi.number().integer().positive().required(),
        quantidade: Joi.number().integer().positive().required()
    }),

    categoria: Joi.object({
        nome: Joi.string().min(2).max(100).required()
    })
};

module.exports = {
    validate,
    schemas
}; 