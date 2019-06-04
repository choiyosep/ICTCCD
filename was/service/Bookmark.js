const bookmark = require('../model/bookmark')
,DB = require('../core/Database')
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

    },
    hasBookmark:(buyerId)=>{

        return new Promise(async (resolve, reject) => {
            try {
                DB.conn.getConnection((err, conn) => {
                    //console.log(buyerId)
                    const query = `SELECT COUNT(*) AS count FROM bookmark WHERE buyerId = '${buyerId}'`;
                    conn.query(query, null, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            conn.release();
                            if(results[0].count>0) {
                                //console.log(results[0].count)
                                resolve(true);
                            }else {
                                //console.log(results[0].count)
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
    },
    bookmarkObject: (buyerId, sellerId) => {
        const product_obj = {
            buyerId : buyerId,
            sellerId : sellerId,
            
        };
        return bookmark.create(product_obj);
    },

    getBookmarker : (sellerId) =>{
        return new Promise(async (resolve, reject) => {
            try {
                DB.conn.getConnection((err, conn) => {
                    //console.log(buyerId)
                    const query = `SELECT nickname, token from soborrow.user, bookmark where soborrow.user.id = bookmark.buyerId and bookmark.sellerId = '${sellerId}' and push_con = 1 and token is not null`;
                    conn.query(query, null, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            conn.release();
                            // console.log(results);
                            resolve(results);
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
