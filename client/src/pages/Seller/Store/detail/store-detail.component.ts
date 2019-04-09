import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {SessionService} from "../../../../core/service/session.service";
import {UserStore} from "../../../../core/model/UserStore";
import {Product} from "../../../../core/model/Product";
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
  private products: Array<Product>;

  constructor(
              protected session: SessionService,
              public navCtrl : NavController,
              public navParams : NavParams
              ) {


    this.contents = "menu";
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

      this.products=[product,product,product,product];

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
      case 'modify' :
        this.navCtrl.push('StoreModifyComponent');
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
