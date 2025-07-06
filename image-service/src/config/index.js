require('dotenv').config();
module.exports = {
  port: process.env.PORT || 3012,
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    bucket: process.env.S3_BUCKET || 'petmatch-images'
  },
  sqlite: {
    storage: process.env.DB_STORAGE || './metadata.db'
  }
};
