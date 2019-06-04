const DB = require('../core/Database')
    , Response = require('../core/Response');

//route -> controller -> service -> model

//Model 계층 : Database에 직접 접근해 쿼리문을 실행한다.

const BaseModelForMySql = function (table){
    //테이블명 지정
    this.table = table;
}


BaseModelForMySql.prototype = {

    getOne: function(field, value) {
        return new Promise(async (resolve, reject) => {
            try {
                DB.conn.getConnection((err, conn) =>{
                    const query = 'SELECT * FROM ' + this.table + ' WHERE ' + field + ' = ?';
                        conn.query(query, [value], (err, results, fields) => {
                            if (err) {
                                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                            } else {
                                conn.release();
                                resolve(results[0])
                            }
                        });
                    }
                );
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        });
    },


    getList: function(field, value) {
        return new Promise(async (resolve, reject) => {
            try {
                DB.conn.getConnection((err, conn) =>{
                    const query = 'SELECT * FROM ' + this.table + ' WHERE ' + field + ' = ?';
                    conn.query(query, [value], (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            conn.release();
                            resolve(results)
                        }
                    });
                });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        });
    },



    create: function(object){
        return new Promise(async (resolve, reject) => {
            try {
                DB.conn.getConnection((err,conn)=>{
                    const query = 'INSERT INTO ' + this.table + ' SET ?';
                    conn.query(query, object, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            conn.release();
                            resolve(results);
                        }
                    });
                });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        });
    },

    update: function(object, field, value){
        //console.log(object)
        return new Promise(async (resolve, reject) => {
            try {
                DB.conn.getConnection((err,conn)=>{
                    const query = 'UPDATE ' + this.table + ' SET ?' +  ' WHERE ' + field + ' = ?';
                    conn.query(query, [object,value], (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            conn.release();
                            resolve(results);
                            console.log("업데이트 완료")
                        }
                    });
                });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        });
    },

    delete: function(field, value){
        return new Promise(async (resolve, reject) => {
            try {
                DB.conn.getConnection((err,conn)=>{
                    const query = 'DELETE FROM ' + this.table + ' WHERE ' + field + '=?';
                    conn.query(query, [value], (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            conn.release();
                            resolve(results);
                        }
                    });
                });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        });
    },

    count: function(field, value) {
        return new Promise(async (resolve, reject) => {
            try {
                 DB.conn.getConnection((err, conn) => {
                     const query = 'SELECT COUNT(*) AS count FROM ' + this.table + ' WHERE ' + field + ' = ?';
                     conn.query(query, [value], (err, results, fields) => {
                         if (err) {
                             reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                         } else {
                             conn.release();
                             resolve(results[0].count)
                         }
                     });
                 });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        });
    }



};

module.exports = BaseModelForMySql;
