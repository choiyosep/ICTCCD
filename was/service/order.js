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
    },

    getOrderById:(buyerId) => {
        const order_record = Order.getList('buyerId',buyerId)
        //const saleList = Sale.getList('sellerId',sellerId);
        return order_record
    }


}
