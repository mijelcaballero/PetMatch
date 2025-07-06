require('dotenv').config();
module.exports = {
  port: process.env.PORT || 3013,
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    bucket: process.env.S3_VIDEO_BUCKET || 'petmatch-videos'
  },
  sqlite: {
    storage: process.env.DB_STORAGE || './video_metadata.db'
  }
};
