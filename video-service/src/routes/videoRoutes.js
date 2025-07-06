const express = require('express');
const { upload, handleUpload, handleGet } = require('../controllers/videoController');
const router = express.Router();

router.post('/videos', upload.single('video'), handleUpload);
router.get('/videos/:id', handleGet);

module.exports = router;
