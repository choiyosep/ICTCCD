const Router = require('express').Router()
    , Ctrl = require('../controller/Cart')
    , Handler = require('../middleware/Handler')
    , Request = require('../middleware/Request');

Router.get(
    '/:buyerId',
    [

    ],
    Handler.request(
        Ctrl.get,
        (req, res, next) => [
            req.params['buyerId']
        ]
    ));


Router.put(
    '',
    [

    ],
    Handler.request(
        Ctrl.update,
        (req, res, next) => [
            req.body['buyerId'],
            req.body['sellerId'],
            req.body['prodNum'],
            req.body['quantity']
        ]
    ));

Router.post(
    '/order',
    [

    ],
    Handler.request(
        Ctrl.cartOrder,
        (req, res, next) => [

        ]
    ));



module.exports = Router;
