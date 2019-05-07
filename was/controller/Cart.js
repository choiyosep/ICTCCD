const Cart = require('../service/Cart')
    ,Product = require('../service/product')
    ,Response = require('../core/Response')
    ,GeoPoint = require('geopoint');

//route -> controller -> service -> model

//Controller 계층 : 가장 상위 레벨에서 핵심 비즈니스 로직을 수행한다.

module.exports = {

    update: (buyerId, sellerId, prodNum, quantity) => {
        return new Promise( async (resolve, reject ) =>{
            try{
                //장바구니 번호
                const cartNum = Cart.getCartNum(buyerId, sellerId);
                //장바구니 존재하면
                if(cartNum){
                    await Cart.updateCartProduct(cartNum, prodNum, quantity);
                }else{//존재하지 않으면
                    const newCartNum = await Cart.createCart(prodNum, quantity);
                    await Cart.createCartProduct(newCartNum, prodNum, quantity);
                }
                //상품 수량 차감
                await Product.update(prodNum, quantity);
                resolve("추가 성공");
            }catch(err){
                console.log(err);
                reject(err);
            }
        })
    },

    cartOrder : (cartNum) =>{
        return new Promise (async (resolve, reject ) =>{
            try{
                const buyerId = await Cart.getBuyerId(cartNum);
                const storeName = await Cart.getStoreName(cartNum);
                const orderDetail = await Cart.getOrderDetail(cartNum);
                const orderDate = new Date();
                //구매이력 추가
                rs = await Cart.createOrder(buyerId, storeName, orderDetail, orderDate);
                //장바구니 삭제
                await Cart.deleteCart(cartNum);
                resolve(rs);
            }catch(err){
                console.log(err);
                reject(err);
            }

        })

    }



}
