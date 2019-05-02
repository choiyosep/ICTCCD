const Router = require('express').Router()
    , Ctrl = require('../controller/Store')
    , Handler = require('../middleware/Handler')
    , Request = require('../middleware/Request');

/**
 * @desc Logout
 */
Router.get(
    '/:sellerId',
    [
    ],
   
    Handler.request(
        Ctrl.get,
        (req, res, next) => [
            req.params['sellerId']
        ]
    ));


Router.get(
    '',
    [

    ],
    Handler.request(
        Ctrl.list,
        (req, res, next) => [
            req
        ]
    ));

Router.post(
    '',
    [

    ],
    Handler.request(
        Ctrl.create,
        (req, res, next) => [
            req.body['sellerId'],
            req.body['title'],
            req.body['sHour'],
            req.body['sMinute'],
            req.body['eHour'],
            req.body['eMinute'],
            req.body['tel'],
            req.body['lat'],
            req.body['lng'],
            req.body['address'],
            req.body['category'],
            req.body['images']

        ]
    ));

module.exports = Router;
