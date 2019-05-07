import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";
import {CartProduct} from "./CartProduct";
export class Cart extends Serializable implements IModel{

  //장바구니 번호
  cartNum: number;

  //구매자아이디
  buyerId: string;

  //상품 목록
  products: CartProduct[] = [];



  toObject(): object {
    return {

    }
  }
z
}


