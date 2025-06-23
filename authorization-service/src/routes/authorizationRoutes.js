const express = require('express');
const router = express.Router();
const { createRole, verify } = require('../controllers/authorizationController');

router.post('/roles', createRole);
router.post('/authorize', verify);

module.exports = router;
