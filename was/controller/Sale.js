const Sale = require('../service/sale')
    , Store = require('../service/Store')
    , Response = require('../core/Response')


//route -> controller -> service -> model

//Controller 계층 : 가장 상위 레벨에서 핵심 비즈니스 로직을 수행한다.

module.exports = {
    saleList : (sellerId) => {
        return new Promise (async (resolve, reject ) =>{
            try{
                const hasStore = await Store.has(sellerId);
                if (hasStore) {
                    //판매이력 받아오기
                    const rs = await Sale.getSaleList(sellerId);

                    resolve(rs);
                }else
                    throw Response.get(Response.type.STORE_NOT_FOUND,{});
                //판매이력 삭제
                //await Sale.deleteSaleRecord(saleNum);
           
            }catch(err){
                console.log(err);
                reject(err);
            }

        })
    }
}