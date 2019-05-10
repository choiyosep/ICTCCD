const Router = require('express').Router()
    , Ctrl = require('../controller/bookMark')
    , Handler = require('../middleware/Handler')
    , Request = require('../middleware/Request');



Router.post(
    '',
    [

    ],
    Handler.request(
        Ctrl.BookmarkCreate,
        (req, res, next) => [
            req.body["buyerId"],
            req.body["sellerId"]
        ]
    ));
    Router.delete(
        '/:buyerId',
        [
    
        ],
        Handler.request(
            Ctrl.BookmarkDelete,
            (req, res, next) => [
                req.params["buyerId"],
                req.params["sellerId"]
            ]
        ));
    


module.exports = Router;
