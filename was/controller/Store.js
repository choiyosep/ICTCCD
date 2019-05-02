const Store = require('../service/Store')
    ,Product = require('../service/product')
    ,Review = require('../service/review') 
    ,Response = require('../core/Response')
//route -> controller -> service -> model

//Controller 계층 : 가장 상위 레벨에서 핵심 비즈니스 로직을 수행한다.

module.exports = {


    get: (sellerId) => {
        console.log(sellerId);
        //okay
        //sellerId까지 뜸.
        return new Promise(async (resolve, reject) => {
            try{
                //상점 정보 불러옴
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
                    console.log(images+"'첫번째images'");
                    //사진 파일 정보들을 store객체에 넣어준다.
                    for(let i=0; i<images.length; i++){
                        console.log(images[i].pic_src+'두번째 이미지');
                        //일단 이미지 파일의 PK가 배열순으로 출력
                        store.images.push(images[i].pic_src);
                        
                    }
                    

                     //상품 정보 불러옴
                     const products = await Product.getProductsById(sellerId);
                     console.log(1);
                     console.log(products);                
                     
                     for(let i=0; i<products.length;i++){
                        console.log(i+'번째'+JSON.stringify(products[i])); 
                        products[i].images=[];

                        const images = await Product.getProductPictureById(products[i].prodNum);
                        console.log(images);
                        for(let j=0; j<images.length; j++){
                            products[j].images.push(images[j].pic_src);
                        }
                        //store.products.push(products[i])
                     }
                     console.log(2);
                     console.log(products);  
                     //상품을 store객체에 넣어준다.   
                     store.products= products;     

                     //리뷰 불러옴
                      const reviews = await Review.getReviewById(sellerId);
                      console.log(reviews); 
 
                      //리뷰를 store객체에 넣어준다.
                      store.reviews =reviews
                     //console.log(reviews); 
 
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


    update: () => {
        return Store.update();
    },

    create: () =>{
        return Store.create();
    },

    delete: () => {
        return Store.delete();
    },

    list: () => {
        return Store.list();
    }

}
