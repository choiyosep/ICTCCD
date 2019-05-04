const Router = require('express').Router()
    , Ctrl = require('../controller/Product')
    , Handler = require('../middleware/Handler')
    , Request = require('../middleware/Request');

/**
 * @desc Logout
 */

Router.post(
    '/create',
    [

    ],
    Handler.request(
        Ctrl.create,
        (req, res, next) => [
            req.body['prodNum'],
            req.body['sellerId'],
            req.body['prodName'],
            req.body['originalPrice'],
            req.body['discountRate'],
            req.body['salePrice'],
            req.body['stock'],
            req.body['state'],
            req.body['images']
            

        ]
    ));

module.exports = Router;
