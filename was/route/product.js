const Router = require('express').Router()
    , Ctrl = require('../controller/Product')
    , Handler = require('../middleware/Handler')
    , Request = require('../middleware/Request');

/**
 * @desc Logout
 */
/* Router.get(
    '/:prodNum',
    [
    ],
   
    Handler.request(
        Ctrl.get,
        (req, res, next) => [
            req.params['prodNum']
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
    )); */

Router.post(
    '',
    [

    ],
    Handler.request(
        Ctrl.create,
        (req, res, next) => [
            //req.body['prodNum'],
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
Router.put(
    '/:prodNum',
    [

    ],
    Handler.request(
        Ctrl.update,
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

Router.delete(
    '/:prodNum',
    [

    ],
    Handler.request(
        Ctrl.delete,
        (req, res, next) => [
            req.params['prodNum'],
        ]
    ));

module.exports = Router;
