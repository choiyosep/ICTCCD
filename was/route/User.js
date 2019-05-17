const Router = require('express').Router()
    , Ctrl = require('../controller/User')
    , Handler = require('../middleware/Handler')
    , Request = require('../middleware/Request');


    Router.get(
        '/:id',
        [
        ],
       
        Handler.request(
            
            Ctrl.get,
            (req, res, next) => [
                req.params['id']
            ]
        ));
    

    module.exports = Router;
