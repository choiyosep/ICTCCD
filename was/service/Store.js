const Store = require('../model/Store'),
    Store_picture = require('../model/Store_picture')
//route -> controller -> service -> model

//Service 계층 : 테이블 질의를 위한 테이블 이름, 컬럼명 또는 where 조건절에 들어갈 변수명을 지정해준다.

module.exports = {

    //상점 테이블에서 상점 정보 불러온다
    getStoreById: (sellerId)=> {
        const store = Store.getOne('sellerId', sellerId);
        return store;
    },

    //상점_사진 테이블에서 상점의 사진 파일 정보를 불러온다
    getPicturesById: (sellerId)=> {
        const pictures = Store_picture.getList('sellerId', sellerId);
        return pictures;
    },

    update: () => {

    },

    create: (sellerId, title, sTime, eTime, tel, lat, lng, address, category) => {
        //객체 생성
        const store_obj = {
            sellerId : sellerId,
            title : title,
            sTime : sTime,
            eTime : eTime,
            tel : tel,
            lat : lat,
            lng : lng,
            address : address,
            category : category,
            grade : 0
        };
        return Store.create(store_obj);
    },

    delete: () => {

    },

    list: () => {

    }
    ,
    has: (sellerId) =>{
        return new Promise( async (resolve, reject) =>{
            try{
                const count = await Store.count('sellerId', sellerId);
                console.log("개수");
                console.log(count);
                resolve((count>0)? true: false);
            }catch(err){
                reject(err);
            }
        })

    }

}
