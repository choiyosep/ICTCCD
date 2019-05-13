import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";
export class Product extends Serializable implements IModel{

  //상품번호
  prodNum: string;

  //판매자아이디
  sellerId: string;

  //상품명
  prodName: string = '';

  //정상가격
  originalPrice: number;

  //할인률
  discountRate: number;

  //판매가격
  salePrice: number;

  //재고량
  stock : number = 0 ;

  //구매한 양에 쓰일 변수

  qty: number;
  //이미지
  images =[];


  //상품상태
  state: string = '1';


  toObject(): object {
    return {
      prodNum: this.prodNum,
      sellerId: this.sellerId,
      prodName: this.prodName,
      originalPrice: this.originalPrice,
      discountRate: this.discountRate,
      salePrice: this.salePrice,
      stock: this.stock,
      state: this.state,
      images: this.images
    }
  }

}


