const Router = require('express').Router()
    , Ctrl = require('../service/order')
    , Handler = require('../middleware/Handler')
   



Router.get(
    '/:buyerId',
    [

    ],
    Handler.request(
        Ctrl.getOrderById,
        (req, res, next) => [
            req.params['buyerId']

        ]
    ));

module.exports = Router;
