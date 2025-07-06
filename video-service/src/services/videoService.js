const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { aws } = require('../config/index');
const Video = require('../models/video');
const { v4: uuidv4 } = require('uuid');

const s3 = new S3Client({ region: aws.region });

async function uploadVideo(file) {
  const id = uuidv4();
  const Key = `${id}-${file.originalname}`;
  const command = new PutObjectCommand({
    Bucket: aws.bucket,
    Key,
    Body: file.buffer,
    ContentType: file.mimetype
  });
  await s3.send(command);
  const url = `https://${aws.bucket}.s3.${aws.region}.amazonaws.com/${Key}`;
  const uploadedAt = new Date().toISOString();
  const meta = { id, key: Key, url, uploadedAt };
  await Video.create(meta);
  return meta;
}

async function getVideo(id) {
  return await Video.findById(id);
}

module.exports = { uploadVideo, getVideo };
