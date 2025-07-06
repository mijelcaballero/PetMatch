const express = require('express');
const { upload, handleUpload, handleGet } = require('../controllers/imageController');
const router = express.Router();

router.post('/images', upload.single('image'), handleUpload);
router.get('/images/:id', handleGet);

module.exports = router;
