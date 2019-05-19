const Router = require('express').Router()
    , Ctrl = require('../service/order')
    , Handler = require('../middleware/Handler')
    , Request = require('../middleware/Request');



Router.get(
    '/:buyerId',
    [

    ],
    Handler.request(
        Ctrl.getReviewById,
        (req, res, next) => [
            req.params['buyerId']

        ]
    ));
