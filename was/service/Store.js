const Store = require('../model/Store'),
    Store_picture = require('../model/Store_picture'),
    Store_product = require('../model/product'),
    Store_review = require('../model/review')

//route -> controller -> service -> model

//Service 계층 : 테이블 질의를 위한 테이블 이름, 컬럼명 또는 where 조건절에 들어갈 변수명을 지정해준다.

module.exports = {

    //상점 테이블에서 상점 정보 불러온다
    getStoreById: (sellerId)=> {
        const store = Store.getOne('sellerId', sellerId);
        //Store.getOne은 basemodelformysql 
        //상점에 대한 정보를 getOne으로 불러온다.
        return store;
    },

    //상점_사진 테이블에서 상점의 사진 파일 정보를 불러온다
    getPicturesById: (sellerId)=> {
        const pictures = Store_picture.getList('sellerId', sellerId);
        //사진들은 getList로 불러온다.
        
        return pictures;
    },
   

    update: (sellerId) => {
        const store_update =Store.update('sellerId',sellerId);
        return store_update;

    },

    createStore: (sellerId, title, sTime, eTime, tel, lat, lng, address, category) => {
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

    updateStore: (sellerId, title, sTime, eTime, tel, lat, lng, address, category) => {
        //객체 생성
        const store_obj = {
            title : title,
            sTime : sTime,
            eTime : eTime,
            tel : tel,
            lat : lat,
            lng : lng,
            address : address,
            category : category,
        };
        console.log(store_obj);
        return Store.update(store_obj,"sellerId", sellerId);
    },

    createStorePicture: (sellerId, image) => {
        //객체 생성
        const store_obj = {
            sellerId : sellerId,
            pic_src : image
        };
        return Store_picture.create(store_obj);
    },

    deleteStorePicture: (sellerId) => {
        const rs =Store_picture.delete('sellerId',sellerId);
        return rs;

    },


    deleteStore: (sellerId) => {
        const rs =Store.delete('sellerId',sellerId);
        return rs;
    },

    list: () => {

    }
    ,
    has: (sellerId) =>{
        return new Promise( async (resolve, reject) =>{
            try{
                const count = await Store.count('sellerId', sellerId);
                resolve((count>0)? true: false);
            }catch(err){
                reject(err);
            }
        })

    }

}
