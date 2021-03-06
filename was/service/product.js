const Store = require('../model/Store'),
    product_picture = require('../model/product_picture'),
    Product = require('../model/product'),
    DB = require('../core/Database'), 
    Response = require('../core/Response');


//route -> controller -> service -> model

//Service 계층 : 테이블 질의를 위한 테이블 이름, 컬럼명 또는 where 조건절에 들어갈 변수명을 지정해준다.

module.exports = {

    getProductByProdNum:(prodNum)=>{
        return new Promise (async (resolve, reject) =>{
            try{
                const product = await Product.getOne('prodNum',prodNum);
                product.images = [];
                const image = await product_picture.getOne('prodNum',prodNum);
                product.images.push(image.pic_src);
                resolve(product);
            }catch(err){
                reject(err);
            }}
        );
    },


    getProductsById:(sellerId)=>{
        const products = Product.getList('sellerId',sellerId);
        return products;
    }, 
    getProductsBybuyerId:(sellerId)=>{
        return new Promise(async (resolve, reject) => {
            console.log("디비"+sellerId)
            try {
                DB.conn.getConnection((err, conn) =>{
                    if(err){
                        console.log(err);
                    }
                        const query = `SELECT * FROM product WHERE sellerId = '${sellerId}' AND state = 1`;
                        conn.query(query,null, (err, results, fields) => {
                            if (err) {
                                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                            } else {
                                conn.release();
                                resolve(results)
                            }
                        });
                    }
                );
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        });

    },
    getProductPictureById:(prodNum)=>{
        const pictures = product_picture.getList('prodNum', prodNum);
        //사진들은 getList로 불러온다.
        
        return pictures;
        
    },

   
//상품,상품 사진 삭제_F
   

    deleteProduct: (prodNum) => {
        const product_delete =Product.delete('prodNum',prodNum);
        return product_delete;

    },
    deleteProductPicture:(prodNum) =>{
        const product_picture_delete =product_picture.delete('prodNum',prodNum);
        return product_picture_delete;

    },

    getProductList: () => {

    },
    has: (prodNum) =>{
        return new Promise( async (resolve, reject) =>{
            try{
                const count = await Product.count('prodNum', prodNum);
                resolve((count>0)? true: false);
            }catch(err){
                reject(err);
            }
        })

    },
//상품,상품 사진 추가
    createProduct: (sellerId, prodName, originalPrice, discountRate, salePrice, stock, state) => {
        //객체 생성
        const product_obj = {
            //prodNum : prodNum,
            sellerId : sellerId,
            prodName : prodName,
            originalPrice : originalPrice,
            discountRate : discountRate,
            salePrice : salePrice,
            stock : stock,
            state : state
        };
        return Product.create(product_obj);
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
        return Product.update(product_obj,'prodNum', prodNum);
       // return Store.update(store_obj,"sellerId", sellerId);
    },
    checkingProductStock: (sellerId) => {
        //제품이 order될때 제품 제고 체크해서 0으로 만들기
        console.log(sellerId)

        return new Promise(async (resolve, reject) => {
            
            try {
                DB.conn.getConnection((err, conn) =>{
                    if(err){
                        console.log(err);
                    }
                    const query = `update product set state = 0 
                        where stock = 0 and sellerId ='${sellerId}'`;
                        conn.query(query,null, (err, results, fields) => {
                            if (err) {
                                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                            } else {
                                conn.release();
                                resolve(results)
                            }
                        });
                    }
                );
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        });


    }
  
    

}
