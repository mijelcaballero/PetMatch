const express = require('express');
const router = express.Router();
const { login, getProfile } = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth'); // Importa correctamente como función

router.post('/login', login);
router.get('/profile', authenticate, getProfile); // Usa la función directamente como middleware

module.exports = router;
