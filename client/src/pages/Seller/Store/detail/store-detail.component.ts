import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {SessionService} from "../../../../core/service/session.service";
import {UserStore} from "../../../../core/model/UserStore";
import {Product} from "../../../../core/model/Product";
import {Review} from "../../../../core/model/Review";
import {StoreService} from "../../../../core/api/store.service";
import {Converter} from "../../../../core/helper/converter";
/**
 * Generated class for the StoreDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare const naver:any;

@IonicPage({
    name: 'StoreDetailComponent',
    segment: 'store/detail'
})
@Component({
  selector: 'page-store-detail',
  templateUrl: 'store-detail.component.html',
})
export class StoreDetailComponent{
  contents: String;

  private userStore : UserStore;

  private map;
  private marker;

  constructor(
              protected session: SessionService,
              public navCtrl : NavController,
              public navParams : NavParams,
              private storeService : StoreService,
              private sessionService: SessionService
              )
  {
    this.contents = "menu";
    //   var product:Product = new Product();
    //   product.prodName = "소보로빵";
    //   product.salePrice = 1000;
    //   product.stock = 10;
    //   product.discountRate = 20 ;
    //
    //   this.userStore.products.push(product);
    // this.userStore.products.push(product);
    // this.userStore.products.push(product);
    // this.userStore.products.push(product);

    // var review: Review = new Review();
    // review.buyerId = 'zmfl1230';
    // review.content = '짱~ 너무 좋았습니다. 사장님도 친절하시구오래된 제품같지  않았어요 ~~ 잘먹었네여.';
    // review.rating = 4.7;
    //
    // var review2: Review = new Review();
    // review2.buyerId = 'dlgusdn753';
    // review2.content = '사장님이 너무 친절하시네요~' +
    //   '제품도 슈크림도 촉촉하고 맛있었네요!!';
    // review2.rating = 5.0;
    //
    // this.userStore.reviews.push(review);
    // this.userStore.reviews.push(review2);
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

  ionViewDidEnter(){

    const id = this.sessionService.getValue("loginId");
    this.storeService.get(id).subscribe((res) =>{
      if(res && res.code==1){
        this.userStore=res.data;
        this.userStore.operatingHour =
          Converter.timesTohours(this.userStore.sHour, this.userStore.sMinute, this.userStore.eHour, this.userStore.eMinute)

        this.makeMap(this.userStore.lat, this.userStore.lng);
        if(document.getElementById("map")){
          document.getElementById("map").style.display="none";
        }
      }
    });
  }



  goToPage(str: string, productId: string) {
    switch (str) {
      case 'store-create':
        this.navCtrl.push('StoreCreateComponent');
        break;
      case 'store-modify' :
        this.navCtrl.push('StoreModifyComponent');
        break;

      case 'product-create' :
        this.navCtrl.push('ProductCreateComponent');
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
