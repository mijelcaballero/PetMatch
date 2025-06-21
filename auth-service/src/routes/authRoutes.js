// src/routes/authRoutes.js
const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas
router.get('/profile', authenticate, getProfile);

module.exports = router;