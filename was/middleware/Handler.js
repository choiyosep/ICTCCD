const Response = require('../core/Response');

module.exports = {

    request: (promise, params, isJson) =>
        async (req, res, next) => {
            const boundParams = params ? params(req, res, next) : [];
            try {
                const result = await promise(...boundParams);

                if (typeof isJson === 'undefined' || isJson) {
                    res.json({"code": Response.type.SUCCESS.code, "msg": '', "data": result});
                } else {
                    res.send(result);
                }
            } catch (error) {
                next(error);
            }
        },

    /**
     * Cross-Domain Request Settings
     */
    response: () =>
        (req, res, next) => {
            if ('OPTIONS' == req.method) {
                res.header('Access-Control-Allow-Credentials', true);
                res.header('Access-Control-Allow-Origin', req.headers.origin);
                res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
                res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
                res.send(200);
            }
            else {
                next();
            }
        },

    error: () =>
        (err, req, res, next) => {
            if (err instanceof Error) {
                res.json(Response.get(Response.type.FAILED, err.message));
            } else {
                res.json(err)
            }
        }
}
