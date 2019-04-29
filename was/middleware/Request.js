var Response = require('../core/Response')
    , MultiPart = require('multiparty');


module.exports = {
    /**
     *
     * @param params String Array
     * @returns {Function}
     */
    hasParams: (params) =>
        (req, res, next) => {
            var body = {};
            var isValid = true;
            if (req.is('multipart/form-data')) {
                var form = new MultiPart.Form();
                form.on('error', function (err) {
                    next(Response.type.FAILED);
                });
                form.on('field', function (name, value) {
                    try {
                        body[name] = JSON.parse(value);
                    } catch (e) {
                        body[name] = value;
                    }
                });
                form.on('part', function (part) {
                    if (!part.filename) {
                        part.resume();
                    }
                    var fileObject = {};
                    var tempArr = [];
                    fileObject.filename = part.filename;
                    fileObject.filedata = [];
                    part.on('data', function (chunk) {
                        tempArr.push(chunk);
                    });

                    part.on('end', function () {
                        var length = 0;
                        for (var i in tempArr) {
                            length += tempArr[i].length;
                        }
                        fileObject.filedata = Buffer.concat(tempArr, length);

                        if (typeof body[part.name] !== 'undefined') {
                            if (Array.isArray(body[part.name])) {
                                body[part.name].push(fileObject);
                            } else {
                                var tempFile = body[part.name];
                                body[part.name] = [tempFile, fileObject];
                            }
                        } else {
                            body[part.name] = fileObject;
                        }
                    });
                    part.on('error', function (err) {
                        next(Response.type.FAILED);
                    });
                });

                form.on('close', function () {
                    for (var i = 0; i < params.length; i++) {
                        if (!Object.prototype.hasOwnProperty.call(body, params[i])) {
                            isValid = false;
                            break;
                        }
                    }
                    if (isValid) {
                        req.body = body;
                        next();
                    } else {
                        next(Response.type.INVALID_PARAMETER);
                    }
                });

                form.parse(req);
            } else {
                if (req.method == 'GET' || req.method == 'DELETE') {
                    body = req.query;
                } else if (req.method == 'POST' || req.method == 'PUT') {
                    body = req.body
                }
                for (var i = 0; i < params.length; i++) {
                    if (!Object.prototype.hasOwnProperty.call(body, params[i])) {
                        isValid = false;
                        break;
                    }
                }
                if (isValid) {
                    next();
                } else{
                    next(Response.type.INVALID_PARAMETER);
                }
            }
        }
}
