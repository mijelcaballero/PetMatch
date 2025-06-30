// src/routes/pet.routes.js
const r = require('express').Router();
const ctrl = require('../controllers/petController');

r.post('/pets',   ctrl.create);
r.get('/pets/:id',ctrl.get);
r.put('/pets/:id',ctrl.update);
r.delete('/pets/:id',ctrl.remove);

module.exports = r;
