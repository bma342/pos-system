const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadToS3 = async (buffer, originalname, tenantId) => {
  const key = `${tenantId}/${uuidv4()}-${originalname}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: buffer
  };

  const { Location } = await s3.upload(params).promise();
  return Location;
};

const deleteFromS3 = async (url) => {
  const key = url.split('/').slice(-1)[0];
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key
  };

  await s3.deleteObject(params).promise();
};

module.exports = {
  uploadToS3,
  deleteFromS3
};