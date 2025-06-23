const express = require('express');
const router = express.Router();
const { checkEmail, checkName } = require('../controllers/validationController');

router.get('/validate/email', checkEmail);
router.get('/validate/name', checkName);

module.exports = router;
