const AWS = require('aws-sdk');
require("dotenv").config();

const s3 = new AWS.S3({
    accessKeyId:process.env.ACCESSKEYID,
    secretAccessKey:process.env.SECRET_AWS,
    region :process.env.BUCKET
})

const uploadAudio = (filename, bucketname, file) => {

    return new Promise((resolve, reject) => {
        const params = {
            Key: filename,
            Bucket: bucketname,
            Body: file,
            ContentType: 'multipart/form-data',
            ACL: 'public-read'
        }

        s3.upload(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.Location)
            }
        })
    })
}

module.exports = uploadAudio
