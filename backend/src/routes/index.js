const express = require('express');
const router = express.Router();

const productRoutes = require('./products');
const authRoutes = require('./auth');
const movimentoRoutes = require('./movimentos');
const relatorioRoutes = require('./relatorios');

router.use('/auth', authRoutes);
router.use('/produtos', productRoutes);
router.use('/movimentos', movimentoRoutes);
router.use('/relatorios', relatorioRoutes);

module.exports = router;
