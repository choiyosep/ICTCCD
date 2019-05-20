import { Component,Input, EventEmitter, Output } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
// import { Events } from 'ionic-angular';

import {FormGroup} from "@angular/forms";
import {UserStore} from "../../../core/model/UserStore";
import {Review} from "../../../core/model/Review";
import {SessionService} from "../../../core/service/session.service";
import {ToastService} from "../../../core/service/toast.service";
import {CartService} from "../../../core/api/cart.service";
import {ReviewService} from "../../../core/api/review.service";

/**
 * Generated class for the CreateReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'CreateReviewPage'
  }
)
@Component({
  selector: 'page-create-review',
  templateUrl: 'create-review.html',

})
export class CreateReviewPage {
  @Input() rating : number;
  @Output() ratingChange : EventEmitter<number> = new EventEmitter();

  contents: string;
  private userStore : UserStore;
  private review : Review;
  private data : {


    sellerId : string;
    buyerId : string;
    content : string;
    rating : number;

  };

  // rating : number= 4;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private sessionService : SessionService, private alertCtrl: AlertController,
              private toastService: ToastService, private ReviewService : ReviewService,
             ) {

    // events.subscribe('star-rating:changed', (starRating) => {
    //   console.log(starRating);
    //   this.rating = starRating;
    // });
    this.userStore = new UserStore();
    this.review = new Review();

    this.review.sellerId = this.navParams.get("sellerId");
    this.userStore.title=this.navParams.get("title");
  }

  rate(index : number){
    this.rating= index;
    this.ratingChange.emit(this.rating);
//console.log(this.rating);
  }

  getColor(index : number){
    if(this.isAboveRating(index)){
      return COLORS.GREY;
    }
    switch(this.rating) {
      case 1:
        case 2:
          return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;

    }
  }
  isAboveRating(index: number) : boolean{
    return index> this.rating;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateReviewPage');



  }
  back() {
    this.navCtrl.pop();
  }

  add(){

    this.review.buyerId =this.sessionService.getValue(("loginId"));
    this.review.rating=this.rating;
    this.review.content=this.contents;

    this.data = {

      "sellerId": this.review.sellerId,
      "buyerId": this.review.buyerId,
      "content": this.review.content,
      "rating": this.review.rating

    };

    console.log(this.data);

    let confirm = this.alertCtrl.create({
      title: '리뷰를 등록하시겠습니까?',
      subTitle: '',
      cssClass: 'storeDelete',
      buttons: [
        {
          text: '취소',
          cssClass: 'cancle',
          handler: () => {
            console.log("취소");
          }
        },
        {
          text: '확인',
          cssClass:'del',
          handler: () => {
            this.ReviewService.add(this.data).subscribe(
              (res) =>{
                //응답오면
                if(res&&res.code!=undefined){
                  //성공시
                  if(res.code==1) {
                    this.navCtrl.pop();
                    this.navCtrl.pop();
                    this.navCtrl.push('BuyerStoreDetailPage', {sellerId: this.review.sellerId});
                    this.toastService.presentToast("리뷰 작성 완료");
                  }else{
                    this.toastService.presentToast(res.msg);
                  }
                }
              }
            )
          }
        }
      ]
    });
    confirm.present();


  }


}

enum COLORS{

  GREY= "#E0E0E0",
  GREEN="#76FF03",
  YELLOW="#FFCA28",
  RED="#DD2C00"
}
