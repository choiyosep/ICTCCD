import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserStore} from "../../../../../core/model/UserStore";
import {Product} from "../../../../../core/model/Product";
import {SessionService} from "../../../../../core/service/session.service";
import {Review} from "../../../../../core/model/Review";
import {ToastService} from "../../../../../core/service/toast.service";
import {StoreService} from "../../../../../core/api/store.service";
import {RESPONSE_CODE} from "../../../../../core/service/response.service";
import {Converter} from "../../../../../core/helper/converter";
import {ReviewService} from "../../../../../core/api/review.service";

/**
 * Generated class for the BuyerStoreDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare const naver:any;

@IonicPage()
@Component({
  selector: 'page-buyer-store-detail',
  templateUrl: 'buyer-store-detail.html',
})
export class BuyerStoreDetailPage {

  contents: String;

  private userStore : UserStore;

  private map;
  private marker;
  private products: Array<Product>;
  private deleltedata: { reviewNum : string ;    sellerId : string ;};
private myInput;
  private data : {  reviewNum : string ;
    buyerId : string ;
    sellerId : string ;
    content : string ;
    rating : number};

  constructor(
    protected session: SessionService,
    public navCtrl : NavController,
    public navParams : NavParams,
    private alertCtrl: AlertController,
    private toastService: ToastService,
    private storeService : StoreService,
    private sessionService: SessionService,
    private ReviewService : ReviewService
  ) {
    if(this.navParams.get("sellerId")!=undefined){
      const id = this.sessionService.getValue("loginId");
      console.log(id);
      console.log(this.navParams.get("sellerId"))
      this.storeService.getStoresDetailsById(this.navParams.get("sellerId"))
        .subscribe((res)=>{
          if(res && res.code ==RESPONSE_CODE.SUCCESS) {
            this.userStore = res.data;
            // console.log(this.userStore);
            this.userStore.operatingHour =
              Converter.timesTohours(this.userStore.sHour, this.userStore.sMinute, this.userStore.eHour, this.userStore.eMinute)

            this.makeMap(this.userStore.lat, this.userStore.lng);
            if (document.getElementById("map")) {
              document.getElementById("map").style.display = "none";
            }
          }
        });
    }


    this.contents = "menu";

  }

  makeMap(lat, lng){
    this.map = new naver.maps.Map('map',
      {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 10,
      }
    );
    this.marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      map: this.map
    });
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad StoreDetailPage');
    if(document.getElementById("map")){
      document.getElementById("map").style.display="none";
    }
  }

  goToPage(str: string,  product?: Product) {

    // console.log(title);
    // console.log(product);
    switch (str) {
      case 'store-create':
        this.navCtrl.push('StoreCreateComponent');
        break;
      case 'store-modify' :
        this.navCtrl.push('StoreModifyComponent');
        break;

      case 'product-detail' :
        this.navCtrl.push('ProductDetailPage', {product: product});
        break;

      // case 'review-create':
      //   this.navCtrl.push('CreateReviewPage',{title :title, sellerId: sellerId});
      //   break;
      //
      // case 'review-revise':
      //   this.navCtrl.push('ReviseReviewPage',{i : i ,title :title, sellerId: sellerId, content : content, k : k});
      //   break;

    }
  }

  goToReviewRevise(i : number, title:string, sellerId: string, content:string , k:string){
    k = this.userStore.reviews[i].reviewNum;
    content=this.userStore.reviews[i].content;
    let rating = this.userStore.reviews[i].rating;
    sellerId=this.userStore.sellerId;
    title =this.userStore.title;

      this.navCtrl.push('ReviseReviewPage',{i : i ,title :title, sellerId: sellerId, content : content, k : k, rating: rating});


  }

  goToReviewCreate(title:string, sellerId: string){
    sellerId=this.userStore.sellerId;
    title =this.userStore.title;
        this.navCtrl.push('CreateReviewPage',{title :title, sellerId: sellerId});

  }

  change(contents: string){
    switch(contents){
      case 'menu':
        if(document.getElementById("map")){
          document.getElementById("map").style.display="none";
        }
        document.getElementById("product-add-button").style.display="none";
        break;
      case 'info':
        if(document.getElementById("map")) {
          document.getElementById("map").style.display="";
        }
        document.getElementById("product-add-button").style.display="none";
        break;
      case 'review':
        if(document.getElementById("map")){
          document.getElementById("map").style.display="none";

        }
        if (!this.check())
          document.getElementById("product-add-button").style.display="";
        break;


    }
  }

  revise(i){


    console.log(i);
    this.myInput=this.userStore.reviews[i].content;
    console.log(this.myInput)
    document.getElementById(`revise${i}`).style.display = "none";
    document.getElementById(`delete${i}`).style.display = "none";
    document.getElementById(`content${i}`).style.display = "none";
    document.getElementById(`complete${i}`).style.display = "";
    document.getElementById(`revise_clicked${i}`).style.display = "";




  }

  showUpdatedItem(i){
    // let updateItem = this.userStore.reviews.find(this.findIndexToUpdate, newItem.id);
    //
    // let index = this.userStore.reviews.indexOf(updateItem);
    console.log(i);
    let k =this.userStore.reviews[i].reviewNum;
    this.userStore.reviews[i].content = this.myInput;
    this.data = {
      "reviewNum" : k,
      "buyerId": this.userStore.reviews[i].buyerId,
      "sellerId":this.userStore.reviews[i].sellerId,
      "content":this.userStore.reviews[i].content ,
      "rating":this.userStore.reviews[i].rating

    }
    //this.userStore.reviews[i].content = this.myInput;
    document.getElementById(`revise${i}`).style.display = "";
    document.getElementById(`delete${i}`).style.display = "";
    document.getElementById(`content${i}`).style.display = "";
    document.getElementById(`complete${i}`).style.display = "none";
    document.getElementById(`revise_clicked${i}`).style.display = "none";

    let confirm = this.alertCtrl.create({
      title: '수정하시겠습니까??',
      subTitle: '',
      cssClass: '',
      buttons: [
        {
          text: '확인',
          cssClass: '',
          handler: () => {
            this.ReviewService.revise(k,this.data).subscribe(
              (res) =>{
                //응답오면
                if(res&&res.code!=undefined){
                  //성공시
                  if(res.code==1) {
                    // this.navCtrl.push('BuyerStoreDetailPage', {sellerId: this.userStore.sellerId});

                    this.toastService.presentToast("리뷰 수정 완료");
                  }else{
                    this.toastService.presentToast(res.msg);
                  }
                }
              }
            )


          }
        },
        {
          text: '취소',
          cssClass:'',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();

  }

check() :boolean {
  const loginId = this.session.getValue("loginId");
  let flag = false;
            for(let i=0; i< this.userStore.reviews.length; i++){
              console.log(this.userStore.reviews[i].buyerId)
              if(loginId==this.userStore.reviews[i].buyerId)
                flag=true;
            }
            console.log(flag)
            return flag;


}
/*  hide(){
    document.getElementById('content').style.display = "none";

  }*/
  revise1(i:number){
    let confirm = this.alertCtrl.create({
      title: ''
    })
  }
  delete(i:number) {
    this.deleltedata = {
      "reviewNum": this.userStore.reviews[i].reviewNum,
      "sellerId":this.userStore.sellerId
    };

    let confirm = this.alertCtrl.create({
      title: '삭제하시겠습니까??',
      subTitle: '',
      cssClass: '',
      buttons: [
        {
          text: '확인',
          cssClass: '',
          handler: () => {

           // console.log(k);
            this.ReviewService.delete(this.deleltedata).subscribe(
              (res) =>{
                //응답오면
                if(res&&res.code!=undefined){
                  //성공시
                  if(res.code==1) {
                   // this.navCtrl.push('BuyerStoreDetailPage', {sellerId: this.userStore.sellerId});
                    this.userStore.reviews.splice(i,1);
                    this.toastService.presentToast("리뷰 삭제 완료");
                  }else{
                    this.toastService.presentToast(res.msg);
                  }
                }
              }
            )


          }
        },
        {
          text: '취소',
          cssClass:'',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();

  }

  getId(){

    const loginId = this.session.getValue("loginId");
    return loginId;

  }



}
