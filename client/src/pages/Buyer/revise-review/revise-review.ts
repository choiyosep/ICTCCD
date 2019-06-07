import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserStore} from "../../../core/model/UserStore";
import {Review} from "../../../core/model/Review";
import {SessionService} from "../../../core/service/session.service";
import {ToastService} from "../../../core/service/toast.service";
import {ReviewService} from "../../../core/api/review.service";

/**
 * Generated class for the ReviseReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-revise-review',
  templateUrl: 'revise-review.html',
})
export class ReviseReviewPage {
  @Input() rating : number;
  @Output() ratingChange : EventEmitter<number> = new EventEmitter();

  private userStore : UserStore;
  private review : Review;
  // private i : number;
  private data : {

    reviewNum : string;
    sellerId : string;
    buyerId : string;
    content : string;
    rating : number;

  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private sessionService : SessionService, private alertCtrl: AlertController,
  private toastService: ToastService, private ReviewService : ReviewService,) {


    this.userStore = new UserStore();
    this.review = new Review();

    this.review.sellerId = this.navParams.get("sellerId");
    this.userStore.title=this.navParams.get("title");
    this.review.content=this.navParams.get("content");
    this.review.reviewNum= this.navParams.get("k");
    this.rate(this.navParams.get("rating"));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviseReviewPage');
    console.log(this.navParams.get("k"));
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
  back() {
    this.navCtrl.pop();
  }

  add(){

    this.review.buyerId =this.sessionService.getValue(("loginId"));
    this.review.rating=this.rating;
    let k=this.review.reviewNum;
    this.data = {

      "reviewNum": this.review.reviewNum,
      "sellerId": this.review.sellerId,
      "buyerId": this.review.buyerId,
      "content": this.review.content,
      "rating": this.review.rating

    };

    console.log(this.data);

    let confirm = this.alertCtrl.create({
      title: '리뷰를 수정하시겠습니까?',
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
            this.ReviewService.revise(k,this.data).subscribe(
              (res) =>{
                //응답오면
                if(res&&res.code!=undefined){
                  //성공시
                  if(res.code==1) {
                    this.navCtrl.pop();
                    this.navCtrl.pop();
                    this.navCtrl.push('BuyerStoreDetailPage', {sellerId: this.review.sellerId});
                    this.toastService.presentToast("리뷰 수정 완료");
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

