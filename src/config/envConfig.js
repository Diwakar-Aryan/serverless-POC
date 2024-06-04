require('dotenv').config()
const mongoEnv = {
    mongoUri : process.env.MONGOURI
}

const awsEnv = {
    region: process.env.AWSREGION,
    accessId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    notesBucketName: process.env.AWS_NOTES_BUCKET,
    documentaryBucketName: process.env.AWS_DOCUMENTARY_BUCKET
}
module.exports = { mongoEnv, awsEnv }