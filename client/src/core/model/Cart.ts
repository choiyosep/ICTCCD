import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";
import {CartProduct} from "./CartProduct";
export class Cart extends Serializable implements IModel{

  //장바구니 번호
  cartNum: number;

  //구매자아이디
  buyerId: string;

  //판매자아이디
  sellerId : string;

  //상품 목록
  products: CartProduct[] = [];


  //총 상품 가격
  totalPrice : number;



  toObject(): object {
    return {

    }
  }
z
}


