import { Serializable } from "../helper/serializable";
import { IModel } from "./interface";

export class Sale extends Serializable implements IModel {

    //판매번호
    saleNum: number;

    //판매자아이디
    sellerId: string;

    //상품명
    prodName: string = '';

    //판매가격
    price: number;

    //판매한 양에 쓰일 변수
    quantity: number;

    //판매일시
    saleDate: string;



    toObject(): object {
        return {
            saleNum: this.saleNum,
            sellerId: this.sellerId,
            prodName: this.prodName,
            price: this.price,
            quantity: this.quantity,
            saleDate: this.saleDate

        }
    }

}


