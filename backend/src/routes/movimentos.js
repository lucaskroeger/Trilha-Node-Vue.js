const express = require('express');
const router = express.Router();
const MovimentoController = require('../controllers/MovimentoController');
const auth = require('../middlewares/auth');

router.get('/', auth(['admin', 'user']), MovimentoController.listar);
router.post('/entrada', auth(['admin']), MovimentoController.registrarEntrada);
router.post('/saida', auth(['admin']), MovimentoController.registrarSaida);

module.exports = router;
