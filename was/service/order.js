const Order = require("../model/order")

module.exports ={



    createOrder: (buyerId, storeName, orderDetail, saleDate) =>{
        const order_obj = {
            buyerId : buyerId,
            storeName : storeName,
            orderDetail : orderDetail,
            saleDate : saleDate
        };
        console.log(order_obj);
        return Order.create(order_obj);
    }
}
