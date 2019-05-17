const Store = require('../model/Store'),
    Store_Review = require('../model/review')
    

//route -> controller -> service -> model

//Service 계층 : 테이블 질의를 위한 테이블 이름, 컬럼명 또는 where 조건절에 들어갈 변수명을 지정해준다.

module.exports = {

    
    getReviewById:(sellerId)=>{
        const reviews = Store_Review.getList('sellerId',sellerId);
        return reviews;
    }, 
    
   

    update: (reviewNum,buyerId,sellerId,content,rating) => {
        const review__obj = {
             reviewNum: reviewNum,
             buyerId: buyerId,
             sellerId: sellerId,
             content: content,
             rating: rating
         }
        const review_update =Store_Review.update(review__obj,'reviewNum',reviewNum);
        return review_update;
    },

    create: (buyerId,sellerId,content,rating) => {
        
        const review__obj = {
           
            buyerId: buyerId,
            sellerId: sellerId,
            content: content,
            rating: rating
        }
        const review_create = Store_Review.create(review__obj);
        return review_create;

    },

    delete: (reviewNum) => {
        const review_delete =Store_Review.delete('reviewNum',reviewNum);
        return review_delete;

    },

    list: () => {

    }

}
