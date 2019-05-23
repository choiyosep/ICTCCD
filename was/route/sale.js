const Router = require('express').Router()
    , Ctrl = require('../controller/Sale')
    , Handler = require('../middleware/Handler')




Router.get(
    '/:sellerId',
    [

    ],
    Handler.request(
        Ctrl.saleList,
        (req, res, next) => [
            req.params['sellerId']

        ]
    ));



module.exports = Router;
