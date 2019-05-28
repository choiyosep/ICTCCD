const Router = require('express').Router()
    , Ctrl = require('../controller/User')
    , Handler = require('../middleware/Handler')
    , Request = require('../middleware/Request');


Router.get(
    '/:id',
    [
    ],

    Handler.request(

        Ctrl.get,
        (req, res, next) => [
            req.params['id']
        ]
    ));

Router.put(
    '/me/push',
    [
    ],
    Handler.request(
        Ctrl.updatePushCon,
        (req, res, next) => [
            req.body['buyerId'],
            req.body['push_con']
        ]
    ));

Router.put(
    '/me/token',
    [
    ],
    Handler.request(
        Ctrl.updateToken,
        (req, res, next) => [
            req.body['buyerId'],
            req.body['token']
        ]
    ));


module.exports = Router;
