const Store = require('../model/Store'),
    product_picture = require('../model/product_picture'),
    Store_product = require('../model/product')
    

//route -> controller -> service -> model

//Service 계층 : 테이블 질의를 위한 테이블 이름, 컬럼명 또는 where 조건절에 들어갈 변수명을 지정해준다.

module.exports = {

    
    getProductsById:(sellerId)=>{
        const products = Store_product.getList('sellerId',sellerId);
        return products;
    }, 
    getProductPictureById:(prodNum)=>{
        const pictures = product_picture.getList('prodNum', prodNum);
        //사진들은 getList로 불러온다.
        
        return pictures;
    },
   

    update: (sellerId) => {
        const product_update =Store_product.update('sellerId',sellerId);
        return product_update;

    },

    create: (sellerId) => {
        const product_create =Store_product.update('sellerId',sellerId);
        return product_create;

    },

    delete: (sellerId) => {
        const product_delete =Store_product.update('sellerId',sellerId);
        return product_delete;

    },

    list: () => {

    }

}
