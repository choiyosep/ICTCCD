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


Router.delete(
    '/product',
    [

    ],
    Handler.request(
        Ctrl.deleteProduct,
        (req, res, next) => [
            req.body['cartNum'],
            req.body['prodNumList']

        ]
    ));

Router.delete(
    '/:cartNum',
    [

    ],
    Handler.request(
        Ctrl.delete,
        (req, res, next) => [
            req.params['cartNum']

        ]
    ));


Router.post(
    '/order',
    [

    ],
    Handler.request(
        Ctrl.order,
        (req, res, next) => [
            req.body['cartNum']
        ]
    ));


module.exports = Router;
