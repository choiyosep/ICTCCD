const Store = require('../model/Store'),
    Store_picture = require('../model/Store_picture'),
    DB = require('../core/Database');
//route -> controller -> service -> model

//Service 계층 : 테이블 질의를 위한 테이블 이름, 컬럼명 또는 where 조건절에 들어갈 변수명을 지정해준다.

module.exports = {

    //상점 테이블에서 상점 정보 불러온다
    getStoreById: (sellerId)=> {
        const store = Store.getOne('sellerId', sellerId);
        return store;
    },

    getStoreListByCategory: (category)=>{
        const stores = Store.getList('category', category);
        return stores;
    },
    getBookmarkedStoreList: (buyerId) =>{
        return new Promise(async (resolve, reject) => {
            try {
                DB.conn.getConnection((err, conn) =>{
                    if(err){
                        console.log(err);
                    }
                    const query = `SELECT * FROM store,bookmark 
                                   WHERE store.sellerId=bookmark.sellerId 
                                   and bookmark.buyerId = '${buyerId}'`;
                        conn.query(query, (err, results, fields) => {
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

    },
    sortingStore: (sorting_Store) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newStores = [];
                for (let i = 1; i < sorting_Store.length; i++) {
                    const key = sorting_Store[i];
                    //console.log(i+":"+key)
                    let position = i - 1;
                    //console.log(key.distance)//12.222
                    while (position >= 0 && key.distance < sorting_Store[position].distance) {
                        sorting_Store[position + 1] = sorting_Store[position];
                        position--;
                    }
                    sorting_Store[position + 1] = key;
                    //console.log("111"+JSON.stringify(sorting_Store[position+1]))

                }

                //sorting한 데이터 삽입
                for (let i = 0; i < sorting_Store.length; i++) {
                    await newStores.push(sorting_Store[i]);
                    //console.log(sorting_Store[i].distance)
                }

                resolve(newStores);
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })
    },

   

}
    
    


