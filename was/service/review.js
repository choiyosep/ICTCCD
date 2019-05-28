const //Store_C = require('../controller/Store')
    Store = require('../controller/Store'),//같은 서비스 폴더에 파일 사용하려면 router('./~~')
    Store_Review = require('../model/review'),
    
    DB = require('../core/Database'),
    Response = require('../core/Response')


//route -> controller -> service -> model

//Service 계층 : 테이블 질의를 위한 테이블 이름, 컬럼명 또는 where 조건절에 들어갈 변수명을 지정해준다.

module.exports = {

    
    getReviewById:(sellerId)=>{
        const reviews = Store_Review.getList('sellerId',sellerId);
        return reviews;
    }, 

    update: (reviewNum, buyerId, sellerId, content, rating) => {
        const review__obj = {
            reviewNum: reviewNum,
            buyerId: buyerId,
            sellerId: sellerId,
            content: content,
            rating: rating
        }
       // const review_update = Store_Review.update(review__obj, 'reviewNum', reviewNum);
        
        return new Promise(async (resolve, reject) => {
            try {
                //먼저 리뷰 업데이트 실행
                const review_update = await Store_Review.update(review__obj, 'reviewNum', reviewNum);
                //sellerId에 해당하는 review들의 평점 긁어모아 Store_grade setup!
                const review_rating = await Store.getReviewTotalgrade(sellerId);
                DB.conn.getConnection((err, conn) =>{
                    if(err){
                        console.log(err);
                    }
                    const query = `UPDATE store SET grade = '${review_rating}' WHERE sellerId = '${sellerId}'`;
                    conn.query(query, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {

                            conn.release(); 
                            resolve(review_update)

                        }
                    });
                }
            );
               // console.log(r)
               // resolve(review_update)
            } catch (err) {
                reject(err);
            }
        })

     
        

    },

    create: (buyerId,sellerId,content,rating) => {
        
        const review__obj = {
           
            buyerId: buyerId,
            sellerId: sellerId,
            content: content,
            rating: rating
        }
        return new Promise(async (resolve, reject) => {
            try {
                //리뷰를 생성하는 메서드
                const review_create = await Store_Review.create(review__obj);

                //리뷰 생성이 완료되면 평점 계산 후 store setup
                const review_rating = await Store.getReviewTotalgrade(sellerId);
                DB.conn.getConnection((err, conn) =>{
                    if(err){
                        console.log(err);
                    }
                    const query = `UPDATE store SET grade = '${review_rating}' WHERE sellerId = '${sellerId}'`;
                    conn.query(query, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {

                            conn.release(); 
                            resolve(review_create)

                        }
                    });
                }
            );
               
               
            } catch (err) {
                reject(err);
            }
        })

        //return review_create;

    },

    delete: (reviewNum) => {
        
        return new Promise(async (resolve, reject) => {
            try {
                //리뷰삭제
                const review_delete =Store_Review.delete('reviewNum',reviewNum);

                const review_rating = await Store.getReviewTotalgrade(sellerId);
                console.log(review_rating)
                DB.conn.getConnection((err, conn) =>{
                    if(err){
                        console.log(err);
                    }
                    const query = `UPDATE store SET grade = '${review_rating}' WHERE sellerId = '${sellerId}'`;
                    conn.query(query, (err, results, fields) => {
                        if (err) {
                            reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                        } else {

                            conn.release(); 
                            resolve(review_delete)

                        }
                    });
                }
            );
               // console.log(r)
                
            } catch (err) {
                reject(err);
            }
        })

       // return review_delete;
        

    },

    list: () => {

    }

}
