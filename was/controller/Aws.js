const Config = require('../config/Constant')
    , Aws = require('../core/AWS')

module.exports = {

    getUploadUrl: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {

                const key =userId + "-" + Date.now() ;
                const url = await Aws.getSignedUploadUrl(Config.S3_BUCKET.NAME, null, key);
                resolve({key: key, url: url});
            } catch (err) {
                reject(err);
            }
        });
    },
}
