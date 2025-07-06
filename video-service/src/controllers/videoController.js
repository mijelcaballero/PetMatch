const multer = require('multer');
const { uploadVideo, getVideo } = require('../services/videoService');
const upload = multer();

async function handleUpload(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const meta = await uploadVideo(req.file);
    res.status(201).json(meta);
  } catch (err) {
    next(err);
  }
}

async function handleGet(req, res, next) {
  try {
    const { id } = req.params;
    const meta = await getVideo(id);
    if (!meta) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(meta);
  } catch (err) {
    next(err);
  }
}

module.exports = { upload, handleUpload, handleGet };
