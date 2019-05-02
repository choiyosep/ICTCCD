const Store = require('../service/Store')
    , Response = require('../core/Response')
//route -> controller -> service -> model

//Controller 계층 : 가장 상위 레벨에서 핵심 비즈니스 로직을 수행한다.

module.exports = {
    get: (sellerId) => {
        return new Promise(async (resolve, reject) => {
            try{
                //상점 정보 불러옴
                const store = await Store.getStoreById(sellerId);

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
                        store.images.push(images[i].pic_src);
                    }

                    //상품 정보 불러옴

                    //상품을 store객체에 넣어준다.


                    //리뷰 불러옴

                    //리뷰를 store객체에 넣어준다.

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

    create: (sellerId, title, sHour, sMinute, eHour, eMinute, tel, lat, lng, address, category, images) =>{
        return new Promise( async (resolve, reject ) =>{
            try{
                //등록된 상점이 있는지 검사한다.
                const hasStore = await Store.has(sellerId);
                console.log(hasStore);
                //등록된 상점이 없으면
                if(!hasStore){

                    //시간 변환 ( 09: 30 => 570)
                    const sTime = Number(sHour) * 60 + Number(sMinute);
                    const eTime = Number(eHour) * 60 + Number(eMinute);

                    //상점 등록
                    const rs = await Store.create(sellerId, title, sTime, eTime, tel, lat, lng, address, category);

                    //상점 사진 등록
                    // const rs2 = await Store_Picture.create(sellerId, images);

                    resolve(rs);
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

    delete: () => {
        return Store.delete();
    },

    list: () => {
        return Store.list();
    }

}
