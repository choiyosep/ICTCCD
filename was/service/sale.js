const Sale = require("../model/sale")

module.exports ={

   

    getSaleList:(sellerId)=>{
        const saleList = Sale.getList('sellerId',sellerId);
        return saleList;
    },
    deleteSaleRecord: (saleNum) => {
        const record_delete =Sale.delete('saleNum',saleNum);
        return record_delete;

    },
}