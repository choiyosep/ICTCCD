const Router = require('express').Router()


Router.get('/', function(req,res) {
    res.sendfile('juso/juso.html');
});


module.exports = Router;