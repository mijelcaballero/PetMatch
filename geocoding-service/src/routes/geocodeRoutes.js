const express = require('express');
const { getGeocode } = require('../controllers/geocodeController');
const router = express.Router();

router.get('/geocode', getGeocode);

module.exports = router;
