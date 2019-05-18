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

    createSale: (sellerId, prodName, quantity, price, saleDate) =>{
        const sale_obj = {
            sellerId : sellerId,
            prodName : prodName,
            quantity : quantity,
            price : price,
            saleDate : saleDate
        };
        return Sale.create(sale_obj);
    }
}
