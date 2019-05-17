const Router = require('express').Router()
    , Ctrl = require('../service/review')
    , Handler = require('../middleware/Handler');


    Router.post(
        '',
        [
    
        ],
        Handler.request(
            Ctrl.create,
            (req, res, next) => [
                req.body['buyerId'],
                req.body['sellerId'],
                req.body['content'],
                req.body['rating'],
            ]
        ));

        Router.put(
            '/:reviewNum',
            [
        
            ],
            Handler.request(
                Ctrl.update,
                (req, res, next) => [
                    req.params['reviewNum'],
                    req.body['buyerId'],
                    req.body['sellerId'],
                    req.body['content'],
                    req.body['rating'],
                   
                ]
            ));
        
        Router.delete(
            '/:reviewNum',
            [
        
            ],
            Handler.request(
                Ctrl.delete,
                (req, res, next) => [
                    req.params['reviewNum']
                ]
            ));
        
        module.exports = Router;
        