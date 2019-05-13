const app = require('express')()
    , logger = require('morgan')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , fs = require('fs')
    , Handler = require('./middleware/Handler')
    , Response = require('./core/Response')
    , cors = require('cors')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.disable('etag');

/**
 * Route Init
 */

const files = fs.readdirSync('../route');
//fs.readdirSync('../route'); 지영

files.forEach(file => {
    const fileNameArr = file.split('.');
    app.use('/' + fileNameArr[0].toLowerCase(), require('./route/' + file));
});

/**
 * Cross-Domain Request Settings
 */
app.use(Handler.response());
/**
 * Not support protocol.
 */
app.use(function(req, res, next) {
    next(Response.type.NOT_SUPPORT);
});

/**
 * Error handler
 */
app.use(Handler.error());
module.exports = app;
