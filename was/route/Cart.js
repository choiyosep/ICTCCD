const Router = require('express').Router()
    , Ctrl = require('../controller/Cart')
    , Handler = require('../middleware/Handler')
    , Request = require('../middleware/Request');


Router.put(
    '',
    [

    ],
    Handler.request(
        Ctrl.update,
        (req, res, next) => [

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
