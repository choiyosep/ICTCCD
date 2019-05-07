const Store = require('../service/Store')
    ,Product = require('../service/product')
    ,Response = require('../core/Response')
//route -> controller -> service -> model

//Controller 계층 : 가장 상위 레벨에서 핵심 비즈니스 로직을 수행한다.

module.exports = {

    get: (sellerId) => {
        return new Promise(async (resolve, reject) => {
            try{
                //상품 정보 불러옴
                const store = await Store.getStoreById(sellerId);
                
                //userstore에 지정된 변수 모두 사용가능?

                if(store){//상점이 존재하면
                    //시간 변환 (예) 540 -> 9시 0분)
                    store.sHour = Math.floor(store.sTime / 60);
                    store.sMinute = store.sTime % 60;
                    store.eHour = Math.floor(store.eTime / 60);
                    store.eMinute = store.eTime % 60;

                    //사진 파일 정보 불러옴
                    const images = await Store.getPicturesById(sellerId);
                    store.images=[];
                    //사진 파일 정보들을 store객체에 넣어준다.
                    for(let i=0; i<images.length; i++){
                        //일단 이미지 파일의 PK가 배열순으로 출력
                        store.images.push(images[i].pic_src);
                    }

                     //상품 정보 불러옴
                     const products = await Product.getProductsById(sellerId);

                     for(let i=0; i<products.length;i++){
                        products[i].images=[];
                        const images = await Product.getProductPictureById(products[i].prodNum);
                        for(let j=0; j<images.length; j++){
                            products[j].images.push(images[j].pic_src);
                        }
                     }
                     //상품을 store객체에 넣어준다.
                     store.products= products;     

                     //리뷰 불러옴
                      const reviews = await Review.getReviewById(sellerId);

                      //리뷰를 store객체에 넣어준다.
                      store.reviews =reviews

                    //상점 객체 반환
                    resolve(store);
                }else{//상점이 존재하지 않으면
                    //exception 발생시킴
                    throw Response.get(Response.type.INVALID_PARAMETER, {});
                }
            }catch(err){
                reject(err);
            }
        });
    },


    update: (prodNum, sellerId, prodName, originalPrice, discountRate, salePrice, stock, state,images) => {
        return new Promise( async (resolve, reject ) =>{
            try{
                console.log(prodNum, sellerId, prodName, originalPrice, discountRate, salePrice, stock, state,images);
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
                //등록된 상품이 있는지 검사한다.
                //const hasProduct = await Product.has(prodNum);
                //product.service파일로 넘긴다.
                //등록된 상품이 없으면 등록하자 ^^
                
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
