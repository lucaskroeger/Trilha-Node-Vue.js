const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
require('dotenv').config();

function authenticateRole(roles = []) {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                logger.warn('Authentication failed: No authorization header', {
                    ip: req.ip,
                    url: req.url
                });
                return res.status(401).json({
                    error: 'Token não fornecido',
                    message: 'Authorization header is required'
                });
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                logger.warn('Authentication failed: Invalid authorization format', {
                    ip: req.ip,
                    url: req.url
                });
                return res.status(401).json({
                    error: 'Token inválido',
                    message: 'Bearer token format is required'
                });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (!roles.includes(decoded.role)) {
                logger.warn('Authorization failed: Insufficient permissions', {
                    user: decoded.email,
                    requiredRoles: roles,
                    userRole: decoded.role,
                    url: req.url
                });
                return res.status(403).json({
                    error: 'Acesso negado',
                    message: 'Insufficient permissions for this operation'
                });
            }

            req.user = decoded;
            logger.debug('Authentication successful', {
                user: decoded.email,
                role: decoded.role,
                url: req.url
            });
            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                logger.warn('Authentication failed: Invalid token', {
                    ip: req.ip,
                    url: req.url,
                    error: error.message
                });
                return res.status(401).json({
                    error: 'Token inválido',
                    message: 'Invalid or malformed token'
                });
            }

            if (error.name === 'TokenExpiredError') {
                logger.warn('Authentication failed: Expired token', {
                    ip: req.ip,
                    url: req.url
                });
                return res.status(401).json({
                    error: 'Token expirado',
                    message: 'Token has expired'
                });
            }

            logger.error('Authentication error', {
                ip: req.ip,
                url: req.url,
                error: error.message
            });
            return res.status(500).json({
                error: 'Erro interno',
                message: 'Internal authentication error'
            });
        }
    };
}

module.exports = authenticateRole;
