import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";
export class Product extends Serializable implements IModel{

  //상품번호
  prodNum: string;

  //상점아이디
  ownerId: string;

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
  stock : number;

  //이미지
  images =[];

  //상품상태
  state: string = '1';


  toObject(): object {
    return {
      prodNum: this.prodNum,
      prodName: this.prodName,
      ownerId: this.ownerId,
      sellerId: this.sellerId,
      originalPrice: this.originalPrice,
      salePrice: this.salePrice,
      discountRate: this.discountRate,
      stock: this.stock,
      images: this.images,
      state: this.state
    }
  }

}


