const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    async login({ email, senha }) {
        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        const usuario = rows[0];
        if (!usuario || !await bcrypt.compare(senha, usuario.senha)) {
            throw new Error('Credenciais inválidas');
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, role: usuario.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return token;
    },

    async register({ nome, email, senha, role = 'user' }) {
        const [check] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (check.length) throw new Error('Email já cadastrado');

        const senhaHash = await bcrypt.hash(senha, 10);

        const [result] = await db.query(`
      INSERT INTO usuarios (nome, email, senha, role)
      VALUES (?, ?, ?, ?)
    `, [nome, email, senhaHash, role]);

        return { id: result.insertId, nome, email, role };
    }
};
