import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";
import {Review} from "./Review";
import {Product} from "./Product";
export class UserStore extends Serializable implements IModel{
  //판매자 아이디
  sellerId: string = '';

  //상점명
  title: string = '';

  //운영시간 09:00~ 23:00
  operatingHour: string='';

  //운영 시작 시각
  sHour: number;
  //운영 시작 분
  sMinute: number;
  //운영 종료 시각
  eHour: number;
  //운영 종료 분
  eMinute: number;

  //전화번호
  tel: string = '';

  //위도
  lat: number;
  //경도
  lng: number;

  //도로명 주소
  mainAddr: string='';
  //상세 주소
  detailAddr: string='';
  //전체 주소 ( 도로명주소 + 상세주소)
  fullAddr: string='';

  //카테고리
  category : string = '';

  //평점
  grade: number;

  //사진 파일
  images= [];

  //등록된 후기
  reviews : Review[] = [];

  //등록한 상품
  products: Product[] = [];

  //거리
  distance : number;

  //즐겨찾기 여부
  isBookMarked: boolean


  toObject(): object {
    return {
      sellerId: this.sellerId,
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


