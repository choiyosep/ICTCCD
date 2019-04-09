import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";
export class Review extends Serializable implements IModel{
  _id: string;

  buyerId: string;
  content: string;

  grade: number;


  toObject(): object {
      return {
        _id: this._id,
        buyerId: this.buyerId,
        content: this.content,
        grade: this.grade
    }
  }

}


