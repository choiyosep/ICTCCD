const Store = require('../model/Store'),
    Store_picture = require('../model/Store_picture')
//route -> controller -> service -> model

//Service 계층 : 테이블 질의를 위한 테이블 이름, 컬럼명 또는 where 조건절에 들어갈 변수명을 지정해준다.

module.exports = {

    //상점 테이블에서 상점 정보 불러온다
    getStoreById: (sellerId)=> {
        const store = Store.getOne('seller_id', sellerId);
        return store;
    },

    //상점_사진 테이블에서 상점의 사진 파일 정보를 불러온다
    getPicturesById: (sellerId)=> {
        const pictures = Store_picture.getList('seller_id', sellerId);
        return pictures;
    },

    update: () => {

    },

    create: () => {

    },

    delete: () => {

    },

    list: () => {

    }

}
