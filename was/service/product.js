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
   
//상품,상품 사진 삭제_F
   

    deleteProduct: (prodNum) => {
        const product_delete =Store_product.delete('prodNum',prodNum);
        return product_delete;

    },
    deleteProductPicture:(prodNum) =>{
        const product_picture_delete =product_picture.delete('prodNum',prodNum);
        return product_picture_delete;

    },

    list: () => {

    },
    has: (prodNum) =>{
        return new Promise( async (resolve, reject) =>{
            try{
                const count = await Store_product.count('prodNum', prodNum);
                resolve((count>0)? true: false);
            }catch(err){
                reject(err);
            }
        })

    },
//상품,상품 사진 추가
    createProduct: (prodNum, sellerId, prodName, originalPrice, discountRate, salePrice, stock, state) => {
        //객체 생성
        const product_obj = {
            prodNum : prodNum,
            sellerId : sellerId,
            prodName : prodName,
            originalPrice : originalPrice,
            discountRate : discountRate,
            salePrice : salePrice,
            stock : stock,
            state : state
        };
        return Store_product.create(product_obj);
    },

    createProductPicture: (prodNum, image) => {
        //객체 생성
        const product_obj = {
            prodNum : prodNum,
            pic_src : image
        };
        return product_picture.create(product_obj);
    },
    //상품 update
    //상품 사진은 삭제후 재createProductPicture
    updateProduct:(prodNum, sellerId, prodName, originalPrice, discountRate, salePrice, stock, state)=>{
        const product_obj = {
            prodNum : prodNum,
            sellerId : sellerId,
            prodName : prodName,
            originalPrice : originalPrice,
            discountRate : discountRate,
            salePrice : salePrice,
            stock : stock,
            state : state
        };
        return Store_product.update(product_obj,'prodNum', prodNum);
       // return Store.update(store_obj,"sellerId", sellerId);
    },
    /* updateProductPicture:(prodNum, image) =>{
        //객체 생성
        const product_obj = {
            prodNum : prodNum,
            pic_src : image
        };
        return product_picture.update(product_obj);
    } */

}
