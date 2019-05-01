const MySQL = require('mysql')
    , Config = require('../config/Constant');

module.exports = {
    conn: {},
    initialize: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const mysqlClient = MySQL.createPool({
                    port: Config.DATABASE.PORT,
                    connectionLimit: Config.DATABASE.POOL_SIZE,
                    host: Config.DATABASE.HOST,
                    user: Config.DATABASE.USER_ID,
                    password: Config.DATABASE.USER_PASS,
                    database: Config.DATABASE.NAME
                });
                resolve(mysqlClient);
            } catch (err) {
                reject(err);
            }
        })
    }
};

