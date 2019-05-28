const 
     DB = require('../core/Database')
    , Response = require('../core/Response')
    ,User = require('../model/User')


module.exports = {

    getUserById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                    DB.conn.getConnection((err, conn) =>{
                    const query = `SELECT id, nickname, level, push_con FROM user WHERE id = '${id}'`;
                    conn.query(query, null, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            conn.release();
                            resolve(results)
                        }
                    })
                })
               
            }catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
                
            });

    },

    updatePushCon: (buyerId, push_con) =>{
        console.log(buyerId,push_con);
        const user_obj = {
            id: buyerId,
            push_con: push_con
        }
        return User.update(user_obj, 'id', buyerId);
    },

    updateToken: (buyerId, token) =>{
        const user_obj = {
            id: buyerId,
            token: token
        }
        return User.update(user_obj, 'id', buyerId);
    }
}
