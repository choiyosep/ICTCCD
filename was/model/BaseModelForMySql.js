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
            let conn = null;
            try {
                DB.conn.getConnection((err, conn) =>{
                        const query = 'SELECT * FROM ' + this.table + ' WHERE ' + field + ' = ?';
                        //BaseModelForMySql.call(this, 'review');에서 받아온 'review'값으로
                        //this.table = review
                        //const store = Store.getOne('sellerId', sellerId);
                        //각각 field=sellerId (attribute값)이
                        //받아온 sellerId(value값)과 일치 하느냐
                        conn.query(query, [value], (err, results, fields) => {
                            if (err) {
                                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                            } else {
                                resolve(results[0])
                            }
                        });
                    }

                );
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            } finally {
                if (conn != null) {
                    conn.release();
                }
            }
        });
    },


    getList: function(field, value) {
        return new Promise(async (resolve, reject) => {
            let conn = null;
            try {
                DB.conn.getConnection((err, conn) =>{
                        const query = 'SELECT * FROM ' + this.table + ' WHERE ' + field + ' = ?';
                        conn.query(query, [value], (err, results, fields) => {
                            if (err) {
                                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                            } else {
                                resolve(results)
                            }
                        });
                    }

                );
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            } finally {
                if (conn != null) {
                    conn.release();
                }
            }
        });
    },



    create: function(object){
        return new Promise(async (resolve, reject) => {
            let conn = null;
            try {
                DB.conn.getConnection((err,conn)=>{
                    const query = 'INSERT INTO ' + this.table + ' SET ?';
                    conn.query(query, object, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            resolve(results);
                        }
                    });
                });
            } catch (err) {
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            } finally {
                if (conn != null) {
                    conn.release();
                }
            }
        });
    },

    update: function(object, field, value){
        return new Promise(async (resolve, reject) => {
            let conn = null;
            try {
                DB.conn.getConnection((err,conn)=>{
                    const query = 'UPDATE ' + this.table + ' SET ?' +  ' WHERE ' + field + ' = ?';
                    conn.query(query, [object,value], (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            resolve(results);
                        }
                    });
                });
            } catch (err) {
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            } finally {
                if (conn != null) {
                    conn.release();
                }
            }
        });
    },

    delete: function(field, value){
        return new Promise(async (resolve, reject) => {
            let conn = null;
            try {
                DB.conn.getConnection((err,conn)=>{
                    const query = 'DELETE FROM ' + this.table + ' WHERE ' + field + '=?';
                    conn.query(query, [value], (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            resolve(results);
                        }
                    });
                });
            } catch (err) {
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            } finally {
                if (conn != null) {
                    conn.release();
                }
            }
        });
    },

    count: function(field, value) {
        return new Promise(async (resolve, reject) => {
            let conn = null;
            try {
                 DB.conn.getConnection((err, conn) => {
                     const query = 'SELECT COUNT(*) AS count FROM ' + this.table + ' WHERE ' + field + ' = ?';
                     conn.query(query, [value], (err, results, fields) => {
                         if (err) {
                             reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                         } else {
                             resolve(results[0].count)
                         }
                     });
                 });
            } catch (err) {
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            } finally {
                if (conn != null) {
                    conn.release();
                }
            }
        });
    }



};

module.exports = BaseModelForMySql;
