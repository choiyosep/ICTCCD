import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {SessionService} from "../../../../core/service/session.service";
import {UserStore} from "../../../../core/model/UserStore";
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
              public navParams : NavParams
              ) {

    this.userStore = new UserStore();
    this.userStore.operatingHour = "09:00~22:00";
    this.userStore.tel="010-123-1234";
    this.userStore.mainAddr ="수원시 팔달구 우만동 11";
    this.userStore.detailAddr="이솝베이커리";

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
    // this.makeMap(this.userStore.loc.coordinates[1], this.userStore.loc.coordinates[0]);
    this.makeMap(37,127 );

  }

  goToPage(str: string) {
    switch (str) {
      case 'modify' :
        this.navCtrl.push('StoreModifyComponent');
        break;
    }
  }

  back() {
    this.navCtrl.setRoot('MainComponent');
  }
}
