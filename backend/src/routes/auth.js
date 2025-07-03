const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { validate, schemas } = require('../middlewares/validation');

// /**
//  * @swagger
//  * tags:
//  *   name: Auth
//  *   description: Endpoints de autenticação
//  */

router.post('/login', validate(schemas.login), AuthController.login);
router.post('/register', validate(schemas.register), AuthController.register); // opcional para admins

module.exports = router;
