const DB = require('../core/Database')
    , Response = require('../core/Response');


module.exports = {

    isBookMarked: (buyerId, sellerId) =>{
        return new Promise(async (resolve, reject) => {
            try {
                DB.conn.getConnection((err, conn) => {
                    const query = `SELECT COUNT(*) AS count FROM bookmark WHERE buyerId = '${buyerId}' and sellerId = '${sellerId}'`;
                    conn.query(query, null, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            conn.release();
                            if(results[0].count>0) {
                                resolve(true);
                            }else {
                                resolve(false);
                            }
                        }
                    });
                });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        });

    }



}
