const Order = require("../model/order")
    , DB = require('../core/Database')
    , Response = require('../core/Response')

module.exports ={



    createOrder: (buyerId, storeName, orderDetail, orderDate) =>{
        const order_obj = {
            buyerId : buyerId,
            storeName : storeName,
            orderDetail : orderDetail,
            orderDate : orderDate
        };
        console.log(order_obj);
        return Order.create(order_obj);
    }
}
