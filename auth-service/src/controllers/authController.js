// src/controllers/authController.js
const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

// Registrar un nuevo usuario
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validar campos obligatorios
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Crear y guardar nuevo usuario
    const newUser = new User({ email, password, name });
    await newUser.save();

    // Generar token JWT
    const token = generateToken(newUser);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        userId: newUser.userId,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Iniciar sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos obligatorios
    if (!email || !password) {
      return res.status(400).json({ error: 'Correo electrónico y contraseña son obligatorios' });
    }

    // Buscar usuario por email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = generateToken(user);

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Obtener perfil de usuario
const getProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error al obtener perfil de usuario' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};