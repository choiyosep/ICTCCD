import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";
export class Review extends Serializable implements IModel{

  //후기번호
  reviewNum: string;

  //구매자 아이디
  buyerId: string;

  //판매자 아이디
  sellerId: string;

  //후기내용
  content: string;

  //별점
  rating: number;


  toObject(): object {
      return {
        reviewNum: this.reviewNum,
        buyerId: this.buyerId,
        sellerId: this.sellerId,
        content: this.content,
        rating: this.rating
    }
  }

}


