// src/routes/authRoutes.js
const express = require('express');
const { register } = require('../controllers/registrationController');
const { validateRegistration } = require('../middlewares/validateInput');

const router = express.Router();

// Rutas públicas
router.post('/', validateRegistration, register);


// Rutas protegidas


module.exports = router;