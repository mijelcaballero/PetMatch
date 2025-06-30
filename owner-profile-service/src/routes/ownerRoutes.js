// src/routes/owner.routes.js
const r = require('express').Router();
const ctrl = require('../controllers/ownerController');

r.post('/owners',   ctrl.create);
r.get('/owners/:id',ctrl.get);
r.put('/owners/:id',ctrl.update);
r.delete('/owners/:id',ctrl.remove);

module.exports = r;
