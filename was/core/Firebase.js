var Q = require('q')
    , request = require('request')
    , google = require('googleapis');

module.exports = {

    getAccessToken: function() {
        const deferred = Q.defer();
        const key = require('../common/firebase-account.json');
        var jwtClient = new google.google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            ['https://www.googleapis.com/auth/firebase.messaging'],
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(tokens.access_token);
            }
        });
        return deferred.promise;
    },

    sendPushMessage: function(accessToken, target, title, body, data){
        const deferred = Q.defer();
        const key = require('../common/firebase-account.json');
        const options = {
            method:'POST',
            url: 'https://fcm.googleapis.com/v1/projects/' + key.project_id + '/messages:send',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            json: {
                "message":{
                    "token" : target,
                    "notification" : {
                        "title" : title,
                        "body" : body
                    },
                    "data": data
                }
            }
        };

        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200 && typeof body['error_code'] === 'undefined') {
                deferred.resolve(body);
            } else {
                deferred.reject(error);
            }
        });
        return deferred.promise;
    }
}