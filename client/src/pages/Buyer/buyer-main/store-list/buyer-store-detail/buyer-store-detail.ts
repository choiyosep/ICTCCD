import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserStore} from "../../../../../core/model/UserStore";
import {Product} from "../../../../../core/model/Product";
import {SessionService} from "../../../../../core/service/session.service";
import {Review} from "../../../../../core/model/Review";

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

  constructor(
    protected session: SessionService,
    public navCtrl : NavController,
    public navParams : NavParams
  ) {


    this.contents = "review";
    this.userStore= new UserStore();

    this.userStore.title="이솝베이커리";
    this.userStore.operatingHour = "09:00~22:00";
    this.userStore.tel="010-123-1234";
    this.userStore.mainAddr ="수원시 팔달구 우만동 11";
    this.userStore.detailAddr="이솝베이커리";



    var product:Product = new Product();
    product.name = "소보로빵";
    product.discountPrice = 1000;
    product.stock = 10;
    product.discountRate = 20 ;

    this.userStore.products.push(product);
    this.userStore.products.push(product);
    this.userStore.products.push(product);
    this.userStore.products.push(product);


    var review: Review = new Review();
    review.buyerId = 'zmfl1230';
    review.content = '짱~ 너무 좋았습니다. 사장님도 친절하시구오래된 제품같지  않았어요 ~~ 잘먹었네여.';
    review.grade = 4.7;

    var review2: Review = new Review();
    review2.buyerId = 'dlgusdn753';
    review2.content = '사장님이 너무 친절하시네요~' +
      '제품도 슈크림도 촉촉하고 맛있었네요!!';
    review2.grade = 5.0;

    this.userStore.reviews.push(review);
    this.userStore.reviews.push(review2);





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
    this.makeMap(37,127 );
    if(document.getElementById("map")){
      document.getElementById("map").style.display="none";
    }

  }

  goToPage(str: string, productId: string) {
    switch (str) {
      case 'store-create':
        this.navCtrl.push('StoreCreateComponent');
        break;
      case 'store-modify' :
        this.navCtrl.push('StoreModifyComponent');
        break;

      case 'product-detail' :
        this.navCtrl.push('ProductDetailPage');
        break;
    }
  }

  change(contents: string){
    switch(contents){
      case 'menu':
        if(document.getElementById("map")){
          document.getElementById("map").style.display="none";
        }
        document.getElementById("product-add-button").style.display="";
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
        document.getElementById("product-add-button").style.display="none";
        break;
    }
  }


}
