const multer = require('multer');
const { uploadImage, getImage } = require('../services/imageService');
const upload = multer();

async function handleUpload(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const meta = await uploadImage(req.file);
    res.status(201).json(meta);
  } catch (err) {
    next(err);
  }
}

async function handleGet(req, res, next) {
  try {
    const { id } = req.params;
    const meta = await getImage(id);
    if (!meta) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(meta);
  } catch (err) {
    next(err);
  }
}

module.exports = { upload, handleUpload, handleGet };
