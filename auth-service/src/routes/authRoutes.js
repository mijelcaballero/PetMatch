// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { login, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth'); // valida JWT


router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
