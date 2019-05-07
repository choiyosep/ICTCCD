const Cart = require('../service/Cart')
   
    ,Sale = require('../service/sale')
    ,Response = require('../core/Response')
    ,GeoPoint = require('geopoint');

//route -> controller -> service -> model

//Controller 계층 : 가장 상위 레벨에서 핵심 비즈니스 로직을 수행한다.

module.exports = {
    saleList : (sellerId) => {
        return new Promise (async (resolve, reject ) =>{
            try{
                //판매이력 받아오기
                console.log(sellerId);
                const rs = await Sale.saleList(sellerId);
                console.log(rs);
                //판매이력 삭제
                await Sale.deleteSaleRecord(saleNum);
                
                resolve(rs);
            }catch(err){
                console.log(err);
                reject(err);
            }

        })
    }
}