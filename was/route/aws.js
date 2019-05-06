const Router = require('express').Router()
    , Ctrl = require('../controller/Aws')
    , Handler = require('../middleware/Handler')

/**
 * @desc Logout
 */


Router.get(
    '/uploadUrl/:userId',
    [
    ],
    Handler.request(
        Ctrl.getUploadUrl,
        (req, res, next) => [
            req.params['userId']
        ]
    ));

module.exports = Router;
