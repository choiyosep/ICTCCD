var serviceAccount = require('../config/firebase.json')
    ,admin = require('firebase-admin')
    , Response = require('../core/Response');


module.exports = {

    initialize: () => {
        return new Promise(async (resolve, reject) => {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            resolve();
        });
    },


    sendPushTest: () =>{
        const message = {
            token : 'fiyMyIjuwrs:APA91bFF5LlT3YtVLnEVXvu6XkgdbJCebg1xoO9RUWwwbp9GKsyavLlf3T040SSUAlkcpN0Dir_wHO1DUfHh-Vn4tZnxQ_joElE91ZAlVL48s0noF_kRJft6-VYvGY5DIBfesZMVpJoX',
            data: {
                title: "제목",
                message: '내용'
            },
            notification:{
                title: '제목',
                body: '내용'
            }
        };
        admin.messaging().send(message).
        then( console.log).
        catch(console.log).
        finally(console.log);
    },

    sendPushMessage: function(token, title, body){
        return new Promise(async (resolve, reject) => {
            try {
                // for (let i=0; i<tokens.length; i++)
                // {
                    const message = {
                        token : token,
                        data: {
                            title: title,
                            message: body
                        },
                        notification:{
                            title: title,
                            body: body
                        }
                    };
                    await admin.messaging().send(message);
                // }
                resolve();
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FIREBASE_MESSAGE_FAILED, err));
            }
        });
    }

}
