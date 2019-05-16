const Store = require('../service/Store')
    ,Product = require('../service/product')
    ,Review = require('../service/review') 
    ,Response = require('../core/Response')
    ,GeoPoint = require('geopoint')
    ,Bookmark = require('../service/Bookmark');

//route -> controller -> service -> model

//Controller 계층 : 가장 상위 레벨에서 핵심 비즈니스 로직을 수행한다.

module.exports = {

    get: (sellerId) => {
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
                            products[i].images.push(images[j].pic_src);
                        }
                     }
                     //상품을 store객체에 넣어준다.
                     store.products= products;

                     //리뷰 불러옴
                      const reviews = await Review.getReviewById(sellerId);
                      //리뷰를 store객체에 넣어준다.
                      store.reviews =reviews;

                    //상점 객체 반환
                    resolve(store);
                }else{//상점이 존재하지 않으면
                    //exception 발생시킴
                    throw Response.get(Response.type.STORE_NOT_FOUND, {});
                }
            }catch(err){
                console.log(err);
                reject(err);
            }
        });
    },



    create: (sellerId, title, sHour, sMinute, eHour, eMinute, tel, lat, lng, address, category, images) =>{
        return new Promise( async (resolve, reject ) =>{
            try{
                //등록된 상점이 있는지 검사한다.
                const hasStore = await Store.has(sellerId);
                //등록된 상점이 없으면 등록하자 ^^
                if(!hasStore){
                    //시간 변환 ( 09: 30 => 570)
                    const sTime = Number(sHour) * 60 + Number(sMinute);
                    const eTime = Number(eHour) * 60 + Number(eMinute);
                    //상점 등록
                    const rs = await Store.createStore(sellerId, title, sTime, eTime, tel, lat, lng, address, category);
                    //상점 사진 등록
                    for(let i=0; i< images.length; i++)
                        await Store.createStorePicture(sellerId, images[i]);
                    resolve("등록 완료");
                }else{//등록된 상점이 있으면
                    //exception 발생시킴
                    throw Response.get(Response.type.STORE_ALREADY_EXIST, {});
                }
            }catch(err){
                console.log(err);
                reject(err);
            }
        })
    },

    update: (sellerId, title, sHour, sMinute, eHour, eMinute, tel, lat, lng, address, category, images) => {
        return new Promise( async (resolve, reject ) =>{
            try{
                //등록된 상점이 있는지 검사한다.
                const hasStore = await Store.has(sellerId);
                //등록된 상점이 있으면 수정하자 ^^
                if(hasStore){
                    //시간 변환 ( 09: 30 => 570)
                    const sTime = Number(sHour) * 60 + Number(sMinute);
                    const eTime = Number(eHour) * 60 + Number(eMinute);
                    //상점 수정
                    const rs = await Store.updateStore(sellerId, title, sTime, eTime, tel, lat, lng, address, category);
                    //상점 사진 삭제
                    await Store.deleteStorePicture(sellerId);
                    //상점 사진 등록
                    for(let i=0; i< images.length; i++)
                        await Store.createStorePicture(sellerId, images[i]);
                    resolve("수정완료");
                }else{//등록된 상점이 없으면
                    //exception 발생시킴
                    throw Response.get(Response.type.STORE_NOT_FOUND, {});
                }
            }catch(err){
                console.log(err);
                reject(err);
            }
        })
    },

    delete: (sellerId) => {
        return new Promise( async (resolve, reject) =>{
            try{
                //등록된 상점이 있는지 검사한다.
                const hasStore = await Store.has(sellerId);
                //등록된 상점이 있으면 삭제하자 ^^
                if(hasStore){
                    //상점 삭제   ( 상점 삭제시 상점 사진도 삭제 됩니다. 외래키 ON DELETE CASCADE )
                    await Store.deleteStore(sellerId);
                    resolve("삭제 완료");
                }else{//등록된 상점이 없으면
                    //exception 발생시킴
                    throw Response.get(Response.type.STORE_NOT_FOUND, {});
                }
            }catch(err){
                console.log(err);
                reject(err);
            }
        })
    },

    list: (lat, lng, category, buyerId, radius) => {
        return new Promise(async (resolve, reject) =>{
            try{
                const stores = await Store.getStoreListByCategory(category);
                //console.log(JSON.stringify(stores));
                //const newStores = [];
                const sorting_Store = [];
                for(let i=0; i<stores.length; i++){
                   let point1 =  new GeoPoint(Number(lat), Number(lng));
                   let point2 = new GeoPoint(stores[i].lat, stores[i].lng);
                   var distance = point1.distanceTo(point2, true);
                   //point1과 point2 거리 계산해서 삽입
                   if(distance <radius){
                       //거리 설정(소수점 셋째자리)
                       stores[i].distance = distance.toFixed(3);
                       //즐겨찾기 여부 설정
                       const isBookmarked = await Bookmark.isBookMarked(buyerId, stores[i].sellerId);
                       stores[i].isBookMarked = isBookmarked;
                       //사진 정보
                       const images = await Store.getPicturesById(stores[i].sellerId);
                       stores[i].images=[];
                       //첫번째 사진
                        stores[i].images.push(images[0].pic_src);
                   
                        //sorting_Store
                        sorting_Store.push(stores[i]);
                    }
                    
                }//for 문끝남. 거리순으로 sorting

                const newStores = await Store.sortingStore(sorting_Store);
                //console.log(JSON.stringify(newStores))

                resolve(newStores);
            }catch(err){
                console.log(err);
                reject(err);
            }
        })
    }
    
}
