import {IModel} from "./interface";
import {Serializable} from '../helper/serializable';

export enum UserLevel {
  BUYER = 1,
  SELLER = 2,
  MANAGER = 5
}

export class User extends Serializable implements IModel {
  _id: string;
  pass: string = undefined;
  name: string = undefined;
  phone: string;
  level: number;

  //위도
  lat: number;
  //경도
  lng: number;

  //주소
  myAddress: string='';

  toObject(): object {
    return {
      _id: this._id,
      pass: this.pass,
      name: this.name,
      phone: this.phone,
      level: this.level,
    }
  }
}

