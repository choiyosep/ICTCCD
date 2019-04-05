import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";
export class Product extends Serializable implements IModel{
  _id: string = '';

  //상점아이디
  owner_id: string = '';

  //상품명
  name: string = '';
  //가격
  originalPrice: number;
  discountPrice: number;
  discountRate: number;

  stock : number;

  //이미지
  images =[];
  state: string = '1';


  toObject(): object {
    return {
      _id: this._id,
      name: this.name,

      product_id: this._id,
      originalPrice: this.originalPrice,
      discountPrice: this.discountPrice,
      discountRate: this.discountRate,
      stock: this.stock,
      image: this.images,
      state: this.state
    }
  }

}


