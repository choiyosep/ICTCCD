const Store = require('../service/Store')
    ,Product = require('../service/product')
    ,Response = require('../core/Response')
  
//route -> controller -> service -> model

//Controller 계층 : 가장 상위 레벨에서 핵심 비즈니스 로직을 수행한다.

module.exports = {


    update: (prodNum, sellerId, prodName, originalPrice, discountRate, salePrice, stock, state,images) => {
        return new Promise( async (resolve, reject ) =>{
            try{
                //등록된 상품이 있는지 검사한다.
                const hasProduct = await Product.has(prodNum);
                //등록된 상품이 있으면 수정하자 ^^
                if(hasProduct){
                    //상품 수정
                    const rs = await Product.updateProduct(prodNum, sellerId, prodName, originalPrice, discountRate, salePrice, stock, state);
                    //상품 사진 삭제
                    await Product.deleteProductPicture(prodNum);
                    //상품 사진 등록
                    for(let i=0; i< images.length; i++)
                        await Product.createProductPicture(prodNum, images[i]);
                    resolve("수정완료");
                }else{//등록된 상품이 없으면
                    //exception 발생시킴
                    throw Response.get(Response.type.PRODUCT_NOT_FOUND, {});
                }
            }catch(err){
                console.log(err);
                reject(err);
            }
        })
       
    },

    create: ( sellerId, prodName, originalPrice, discountRate, salePrice, stock, state,images) =>{
    
        return new Promise( async (resolve, reject ) =>{
            try{
                console.log(sellerId, prodName, originalPrice, discountRate, salePrice, stock, state,images);
                //상품 등록
                const rs = await Product.createProduct( sellerId, prodName, originalPrice, discountRate, salePrice, stock, state);
                //상품 사진 등록
                const prodNum =rs.insertId;
                console.log(rs);
                for(let i=0; i< images.length; i++)
                    await Product.createProductPicture(prodNum, images[i]);
                resolve(rs);
               /*  }else{//등록된 상품이 있으면
                    //exception 발생시킴
                    throw Response.get(Response.type.PRODUCT_ALREADY_EXIST, {});
                } */
            }catch(err){
                console.log(err);
                reject(err);
            }
        })
    },

    delete: (prodNum) => {
        return new Promise( async (resolve, reject) =>{
            try{
                //등록된 상품이 있는지 검사한다.
                const hasProduct = await Product.has(prodNum);
                //등록된 상품이 있으면 삭제하자 ^^
                if(hasProduct){
                    //상품 삭제   ( 상품 삭제시 상품 사진도 삭제 됩니다. 외래키 ON DELETE CASCADE )
                    await Product.deleteProduct(prodNum);
                    resolve("삭제 완료");
                }else{//등록된 상품이 없으면
                    //exception 발생시킴
                    throw Response.get(Response.type.PRODUCT_NOT_FOUND, {});
                }
            }catch(err){
                console.log(err);
                reject(err);
            }
        })
    },

    list: () => {
        return Store.list();
    }
    

}
