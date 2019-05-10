import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";

export class Bookmark extends Serializable implements IModel{

    //구매자 아이디
  buyerId: string;
  //판매자 아이디
  sellerId: string;

  toObject(): object {
    return {
        buyerId : this.buyerId,
        sellerId : this.sellerId
    };
  }

}