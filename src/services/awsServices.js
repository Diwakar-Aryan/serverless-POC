const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const {
  getSignedUrl,
  S3RequestPresigner,
} = require("@aws-sdk/s3-request-presigner");
const { awsEnv } = require("../config/envConfig");
let s3Client;
const getS3Client = async () => {
  if (!s3Client) {
    s3Client = new S3Client({
      region: awsEnv.region,
      credentials: {
        accessKeyId: awsEnv.accessId,
        secretAccessKey: awsEnv.secretAccessKey,
      },
    });
  }
  return s3Client;
};

const putObject = async (bucket, key, object) => {
  try {
    const client = getS3Client();
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: object,
    });
    return await client.send(command);
  } catch (error) {
    throw new error();
  }
};

const getObject = async (bucket, key) => {
  try {
    const client = getS3Client();
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    const object = await client.send(command);

    return object;
  } catch (error) {
    throw error;
  }
};

const putPreSignedUrl = async (bucket, key) => {
  try {
    const client = getS3Client();
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    return getSignedUrl(client, command, { expiresIn: 3600 });
  } catch (error) {
    throw new error();
  }
};

const getPreSignedUrl = async (bucket, key) => {
    try {
      const client = getS3Client();
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });
      return getSignedUrl(client, command, { expiresIn: 3600 });
    } catch (error) {
      throw new error();
    }
  };
module.exports = { putObject, getObject, putPreSignedUrl, getPreSignedUrl };
