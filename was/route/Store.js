const Router = require('express').Router()
    , Ctrl = require('../controller/Store')
    , Handler = require('../middleware/Handler')
    , Request = require('../middleware/Request');

/**
 * @desc Logout
 */
console.log('initialized store router');
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

module.exports = Router;
