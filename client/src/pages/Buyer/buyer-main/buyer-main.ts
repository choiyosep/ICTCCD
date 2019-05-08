import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SessionService} from "../../../core/service/session.service";
import {DaumService} from "../../../core/service/daum.service";
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the BuyerMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyer-main',
  templateUrl: 'buyer-main.html',
})
export class BuyerMainPage {

  private myAddress;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private sessionService : SessionService,
              private daumService : DaumService,
              private geoLocation : Geolocation,
  ) {
    this.myAddress = this.sessionService.getLocation();
  }

  ionViewDidLoad() {
    if(this.sessionService.getLocation()==null){
      this.setLocationBySearch("경기 수원시 영통구 월드컵로 206");
    }
    console.log('ionViewDidLoad BuyerMainPage');
  }
  goToPage(str: string, catName: string) {
    switch (str) {
      case 'store-list':
        this.navCtrl.push("StoreListPage",{catName: catName});
        break;
      case 'cart-list':
        this.navCtrl.setRoot('CartListPage')
            break;
      case 'book-mark':
        this.navCtrl.setRoot('BookMarkPage')
        break;
    }
  }
  setLocationBySearch(address: string){
    this.sessionService.setAddress(address);
    //도로명 주소로 위도, 경도를 받아온다.
    this.daumService.getLocation(address).subscribe
    ( (res) =>{
      //위치정보를 기기에 저장
      this.sessionService.setLocation({lat: res.x, lng: res.y});
    });
  }

  setLocationByGPS(){
    //현재 기기의 위치값을 받아온다.
    this.geoLocation.getCurrentPosition().then(
      (position)=>{
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        //위치 정보를 기기에 저장
        this.sessionService.setLocation({lat: lat, lng: lng});
        // 위도 경도 정보 -> 도로명 주소로 변환
        this.daumService.getAddress(lng, lat).subscribe(
          (res)=>{
            if(res){
              this.sessionService.setAddress(res);
            }
          }
        )
      }
    );
  }


  getAddress() {
    return this.sessionService.getAddress();
  }
}
