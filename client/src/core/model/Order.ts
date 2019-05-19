import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";
import {CartProduct} from "./CartProduct";

export class Order extends Serializable implements IModel {


    //주문 번호
    orderNum: string;
    //구매자 아이디
    buyerId: string;
    //주문 상점명 
    storeName: string = '';
    //주문 내역
    orderDetail: CartProduct[] = [];
    //주문 날짜
    orderDate: string;


    toObject(): object {
        return {
            orderNum: this.orderNum,
            buyerId: this.buyerId,
            storeName: this.storeName,
            orderDetail: this.orderDetail,
            orderDate: this.orderDate
        };
    }
}