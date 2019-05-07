import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";
import {Product} from "./Product";
export class CartProduct extends Serializable implements IModel {

  //구매자 아이디
  buyerId: string;
  //판매자 아이디
  sellerId: string;
  //상품 번호
  prodNum: string;

  product: Product;
  //수량
  quantity: number;
  checked: boolean;



  toObject(): object {
    return {

    };
  }


}
