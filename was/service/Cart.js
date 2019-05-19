const Cart = require('../model/Cart')
    , DB = require('../core/Database')
    , Response = require('../core/Response')
    , Cart_product = require('../model/Cart_product')
    , Me = require('./Cart.js');
;

//route -> controller -> service -> model

//Service 계층 : 테이블 질의를 위한 테이블 이름, 컬럼명 또는 where 조건절에 들어갈 변수명을 지정해준다.

module.exports = {

    getCartByCartNum: (cartNum)=>{
       return  Cart.getOne("cartNum", cartNum);
    },

    getCartByBuyerId: (buyerId)=>{
        return new Promise( async(resolve, reject) =>{
            try {
                DB.conn.getConnection((err, conn) => {
                    const query = `SELECT cartNum, sellerId FROM cart WHERE buyerId = '${buyerId}'`;
                    conn.query(query, null, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            conn.release();
                            if(results.length >0){
                                let cart = {};
                                cart.cartNum = results[0].cartNum;
                                cart.sellerId = results[0].sellerId;
                                resolve(cart);
                            }else{
                                resolve(false);
                            }
                        }
                    });
                });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }



        })

    },

    createCart: (buyerId, sellerId)=>{
        let obj = {
            buyerId: buyerId,
            sellerId: sellerId
        }
        return Cart.create(obj);
    },

    createCartProduct: (cartNum, prodNum, quantity)=>{
        let obj = {
            cartNum : cartNum,
            prodNum : prodNum,
            quantity: quantity
        }
        return Cart_product.create(obj);
    },

    isExistProduct: (cartNum, prodNum) =>{
        return new Promise( async(resolve, reject) =>{
            try {
                DB.conn.getConnection((err, conn) => {
                    const query = `SELECT count(*) AS count FROM cart_product WHERE cartNum = '${cartNum}' and prodNum = '${prodNum}'`;
                    conn.query(query, null, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            conn.release();
                            if(results[0].count >0){
                                resolve(true);
                            }else{
                                resolve(false);
                            }
                        }
                    });
                });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }



        })
    },

    updateCartProduct: (cartNum, prodNum, quantity)=>{
        return new Promise( async(resolve, reject) =>{
            try {
                DB.conn.getConnection((err, conn) => {
                    const query = `update cart_product set quantity = quantity + ${quantity} WHERE cartNum = '${cartNum}' and prodNum = '${prodNum}'`;
                    conn.query(query, null, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            resolve(results);
                        }
                    });
                });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        })
    },


    reduceProductQuantity : (prodNum, quantity) =>{
        return new Promise( async(resolve, reject) =>{
            try {
                DB.conn.getConnection((err, conn) => {
                    const query = `update product set stock = stock - ${quantity} WHERE prodNum = '${prodNum}'`;
                    conn.query(query, null, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            resolve(results);
                        }
                    });
                });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        })
    },

    increaseProductQuantity : (prodNum, quantity) =>{
        return new Promise( async(resolve, reject) =>{
            try {
                DB.conn.getConnection((err, conn) => {
                    const query = `update product set stock = stock + ${quantity} WHERE prodNum = '${prodNum}'`;
                    conn.query(query, null, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            resolve(results);
                        }
                    });
                });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        })
    },


    deleteCart: (cartNum) =>{
        return Cart.delete("cartNum", cartNum);
    },


    update: () => {

    },

    getCartProductList: (cartNum) =>{
        return  Cart_product.getList("cartNum", cartNum);
    },

    getCartProduct: (cartNum, prodNum)=>{
        return new Promise( async(resolve, reject) =>{
            try {
                DB.conn.getConnection((err, conn) => {
                    const query = `select * from cart_product WHERE cartNum = '${cartNum}' and prodNum = '${prodNum}'`;
                    conn.query(query, null, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            resolve(results[0]);
                        }
                    });
                });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        })
    },

    deleteProduct: (cartNum, prodNum) =>{
        return new Promise( async(resolve, reject) =>{
            try {
                DB.conn.getConnection((err, conn) => {
                    const query = `delete from cart_product WHERE cartNum = '${cartNum}' and prodNum = '${prodNum}'`;
                    conn.query(query, null, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {
                            resolve(results);
                        }
                    });
                });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        })
    }






}
