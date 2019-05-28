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
                    const sales = await Sale.getSaleList(sellerId);
                    // var groups = {};
                    // for(let i=0; i<sales.length; i++){
                    //     var date = (sales[i].saleDate+'').split('T')[0];
                    //     if (date in groups) {
                    //         groups[date].push(sales[i]);
                    //     } else {
                    //         groups[date] = new Array(sales[i]);
                    //     }
                    // }
                    resolve(sales);
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
