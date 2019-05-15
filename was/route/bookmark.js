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
    '',
    [

    ],
    Handler.request(
        Ctrl.BookmarkDelete,
        (req, res, next) => [
            req.query["buyerId"],
            req.query["sellerId"]

        ]
    ));

Router.get(
    '/:buyerId',
    [

    ],
    Handler.request(
        Ctrl.BookmarkedList,
        (req, res, next) => [
            req.body['buyerId']
           
        ]
    ));




module.exports = Router;
