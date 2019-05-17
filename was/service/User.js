const 
     DB = require('../core/Database')
    , Response = require('../core/Response')


module.exports = {

    getUserById: (id) => {

        return new Promise(async (resolve, reject) => {
            console.log("1")
            try {
                console.log(id);
                
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

    }
}