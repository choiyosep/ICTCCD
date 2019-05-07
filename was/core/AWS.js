const AWS_SDK = require('aws-sdk')
    , Response = require('../core/Response')
   , CONFIG_PATH = '../config/AWS.json';

module.exports = {

   // AWS.config.update({})

    getSignedUploadUrl: (bucket, folder, key) => {
        return new Promise((resolve, reject) => {
         AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            const path = (folder)? folder + '/' + key : key;
            const params = {
                Bucket: bucket,
                Key: path,
                Expires: 18000,
                ACL: 'public-read'
            };
            s3.getSignedUrl('putObject', params, function (err, url) {
                if (err) {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err.stack));
                } else {
                    resolve(url);
                }
            })
        });
    },


    /* get: (bucket, key) => {
        return new Promise((resolve, reject) => {
          AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            const params = {
                Bucket: bucket,
                Key: key
            };
            s3.getObject(params, function (err, data) {
                if (err) {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err.stack));
                } else {
                    resolve(data.Body);
                }
            });
        });
    } */
}
