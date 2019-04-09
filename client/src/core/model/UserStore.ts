import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";
import {Review} from "./Review";
import {Product} from "./Product";
export class UserStore extends Serializable implements IModel{
  _id: string = '';

  //상점명
  title: string = '';
  //전화번호
  tel: string = '';

  operatingHour: string='';

  sHour: number;
  sMinute: number;
  eHour: number;
  eMinute: number;

  mainAddr: string='';
  detailAddr: string='';
  fullAddr: string='';

  images= [

  ];


  reviews : Review[] = [];

  products: Product[] = [];

  category : string = '';

  lng: number;
  lat: number;

  toObject(): object {
    return {
      _id: this._id,
      title: this.title,
      tel: this.tel,
      operatingHour: this.operatingHour,
      sHour: this.sHour,
      sMinute: this.sMinute,
      eHour: this.eHour,
      eMinute: this.eMinute,
      mainAddr: this.mainAddr,
      detailAddr: this.detailAddr,
      fullAddr: this.fullAddr,
      category: this.category
    }
  }
}


