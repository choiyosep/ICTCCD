const Cart = require('../service/Cart')
    ,Product = require('../service/product')
    ,Sale = require('../service/sale')
    ,Order = require('../service/order')
    ,Store = require('../service/Store')
    ,Response = require('../core/Response')
    ,GeoPoint = require('geopoint');

//route -> controller -> service -> model

//Controller 계층 : 가장 상위 레벨에서 핵심 비즈니스 로직을 수행한다.

module.exports = {

    get: (buyerId) =>{
        return new Promise (async (resolve, reject) =>{
            try{
                const cart = await Cart.getCartByBuyerId(buyerId);
                cart.products = [];
                cart.totalPrice = 0;
                const cartProducts = await Cart.getCartProductList(cart.cartNum);
                for(let i=0; i<cartProducts.length; i++){
                    const cartProduct = {};
                    //장바구니에 담긴 수량
                    cartProduct.quantity = cartProducts[i].quantity;
                    //상품 상세정보
                    cartProduct.product =  await Product.getProductByProdNum(cartProducts[i].prodNum);
                    cart.products.push(cartProduct);
                    //총 가격 가산
                    cart.totalPrice += cartProduct.quantity * cartProduct.product.salePrice;
                }
                //장바구니 반환
                resolve(cart);
            }catch(err){
                console.log(err);
                reject(err);
            }
        })
    },


    //장바구니 너무 복잡해서 console.log 지우지 말아주세요!
    update: (buyerId, sellerId, prodNum, quantity) => {
        return new Promise( async (resolve, reject ) =>{
            try{
                console.log("장바구니 추가 시작");
                //장바구니가 있는지 확인한다.
                const cart = await Cart.getCartByBuyerId(buyerId);
                //장바구니가 존재하지 않으면
                if(! cart){
                    console.log("장바구니 존재하지 않음");
                    //장바구니를 생성한다
                    let newCart = await Cart.createCart(buyerId, sellerId);
                    //장바구니_상품에 상품을 넣는다.
                    await Cart.createCartProduct( newCart.insertId, prodNum, quantity);
                    // product 수량을 감소시킨다.
                    await Cart.reduceProductQuantity(prodNum, quantity);
                    resolve("추가 성공");
                }else {//장바구니가 존재하면
                    console.log("장바구니 존재함");
                    //존재하는 장바구니의 상점 아이디가 해당 상품의 상점아이디랑 같으면
                    if (cart.sellerId == sellerId) {
                        console.log("장바구니와 상품의 상점주 일치");
                        //해당 상품이 장바구니에 이미 존재하는지 검사한다
                        const isExistProduct = await Cart.isExistProduct(cart.cartNum, prodNum);
                        //있으면
                        if (isExistProduct) {
                            console.log("이미 같은 상품이 존재!! 수량 증가시키겠음");
                            // cart_product수량을 증가시킨다.
                            await Cart.updateCartProduct(cart.cartNum, prodNum, quantity);
                            // product 수량을 감소시킨다.
                            await Cart.reduceProductQuantity(prodNum, quantity);
                        }else {//없으면
                            console.log("같은 상품이 없음!! 상품 추가");
                            //장바구니_상품에 상품을 추가한다
                            await Cart.createCartProduct(cart.cartNum, prodNum, quantity);
                            // product 수량을 감소시킨다.
                            await Cart.reduceProductQuantity(prodNum, quantity);
                        }
                        resolve("추가 성공");
                    }else{//존재하는 장바구니의 상점과 다른 상점의 상품이면
                        console.log("다른 상점의 장바구니가 존재!!");
                        //일단 거절(보류)
                        // reject(Response.get(Response.type.IS_EXIST_OTHER_CART,{}))

                        //장바구니를 삭제하기 전에, 장바구니에 담겨있던 상품 내역을 불러온다.
                        const cartProducts = await Cart.getCartProductList(cart.cartNum);
                        for(let i=0; i<cartProducts.length; i++){
                            //장바구니에 담겨있던 상품의 수량을 상품테이블의 재고량에 다시 더해준다.
                            await Cart.increaseProductQuantity(cartProducts[i].prodNum, cartProducts[i].quantity);
                            console.log("증가");
                        }
                        //기존 장바구니를 삭제한다.
                        rs = await Cart.deleteCart(cart.cartNum);
                        console.log(rs);

                        //장바구니를 생성한다
                        let newCart = await Cart.createCart(buyerId, sellerId);
                        //장바구니_상품에 상품을 넣는다.
                        await Cart.createCartProduct( newCart.insertId, prodNum, quantity);
                        // product 수량을 감소시킨다.
                        await Cart.reduceProductQuantity(prodNum, quantity);
                        resolve("기존 장바구니 삭제하여 추가 성공");
                    }
                }
            }catch(err){
                console.log(err);
                reject(err);
            }
        })
    },

    delete: (cartNum) =>{
        return new Promise( async (resolve, reject) =>{
            try{

                //장바구니를 삭제하기 전에, 장바구니에 담겨있던 상품 내역을 불러온다.
                const cartProducts = await Cart.getCartProductList(cartNum);
                for(let i=0; i<cartProducts.length; i++){
                    //장바구니에 담겨있던 상품의 수량을 상품테이블의 재고량에 다시 더해준다.
                    await Cart.increaseProductQuantity(cartProducts[i].prodNum, cartProducts[i].quantity);
                    console.log("증가");
                }
                //기존 장바구니를 삭제한다.
                rs = await Cart.deleteCart(cartNum);
                resolve(rs);
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

    },

    deleteProduct : (cartNum, prodNumList) =>{
        return new Promise (async (resolve, reject) =>{
            try{
                console.log(cartNum, prodNumList);

                for(let i=0; i<prodNumList.length; i++){
                    //장바구니와 상품번호로 장바구니에 담긴 상품을 불러온다
                    const product = await Cart.getCartProduct(cartNum, prodNumList[i]);
                    //장바구니에 담겨있던 상품의 수량을 상품테이블의 재고량에 다시 더해준다.
                    await Cart.increaseProductQuantity(prodNumList[i], product.quantity);
                    //장바구니에서 상품을 삭제한다
                    await Cart.deleteProduct(cartNum, prodNumList[i]);
                }

                const cartProducts = await Cart.getCartProductList(cartNum);
                console.log("length:"+cartProducts.length);
                //장바구니가 비어있으면 장바구니를 삭제한다.
                if(cartProducts.length==0){
                    await Cart.deleteCart(cartNum);
                }

                resolve("삭제 성공");
            }catch(err){
                console.log(err);
                reject(err);
            }

        });
    },


    order :(cartNum) =>{
        return new Promise( async (resolve, reject) =>{

            try{
                //판매이력 저장
                const cart = await Cart.getCartByCartNum(cartNum);
                cart.totalPrice = 0;
                const cartProducts = await Cart.getCartProductList(cartNum);
                const saleDate = new Date();
                let product;
                for(let i= 0; i<cartProducts.length; i++){
                    product = await Product.getProductByProdNum(cartProducts[i].prodNum);
                    // await Sale.createSale(cart.sellerId, product.prodName, cartProducts[i].quantity, product.salePrice * cartProducts[i].quantity, saleDate);
                    cart.totalPrice += cartProducts[i].quantity * product.salePrice;
                }
                console.log("totalPrice:"+cart.totalPrice);

                //구매이력 저장
                const store = await Store.getStoreById(cart.sellerId);
                const orderDetail = product.prodName + " 등 " + cartProducts.length + "개 " + cart.totalPrice+ "원";
                console.log(orderDetail);
                rs= await Order.createOrder(cart.buyerId, store.title, orderDetail, saleDate);
                console.log(rs);

                resolve("성공");
            }catch(err){
                console.log(err);
                reject(err);
            }
        })

    }



}
