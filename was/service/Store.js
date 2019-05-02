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

    create: (sellerId) => {
        const store_create =Store.update('sellerId',sellerId);
        return store_create;

    },

    delete: (sellerId) => {
        const store_delete =Store.update('sellerId',sellerId);
        return store_delete;

    },

    list: () => {

    }

}
