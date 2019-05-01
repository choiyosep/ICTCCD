import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";
import {Product} from "./Product";
export class CartProduct extends Serializable implements IModel {

  product: Product;
  quantity: number;
  checked: boolean;



  toObject(): object {
    return {

    };
  }


}
