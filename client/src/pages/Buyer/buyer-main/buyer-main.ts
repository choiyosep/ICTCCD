import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SessionService} from "../../../core/service/session.service";
import {DaumService} from "../../../core/service/daum.service";
import { Geolocation } from '@ionic-native/geolocation';

import {user_FirstName} from "aws-sdk/clients/alexaforbusiness";
import {User} from "../../../core/model/user";


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

    window.addEventListener( 'message', (e) =>{
      console.log("메세지:"+e.data);
      if(e.data !=="close"){
        this.myAddress= e.data;
        this.setLocationBySearch(this.myAddress);
        //this.setLocationBySearch(this.myAddress);
      }
      this.closeDaumIframe();

      //console.log(this.myAddress);
    } ,false);


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
        this.navCtrl.setRoot('CartListPage');
            break;
      case 'book-mark':
        this.navCtrl.setRoot('BookMarkPage');
        break;
    }
  }
  setLocationBySearch(address: string){
    this.sessionService.setAddress(address);
    // string 형태 주소로 위도 경도 받아옴
    //도로명 주소로 위도, 경도를 받아온다.
    this.daumService.getLocation(address).subscribe
    ( (res) =>{
      if(res){
      let lng = res.x;
      let lat = res.y;
      //위치정보를 기기에 저장
      this.sessionService.setLocation({lat: lat , lng: lng});
    }});
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
    ).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  getAddress() {
    return this.sessionService.getAddress();
  }

  startSearch(){

    let frameElement: HTMLElement = document.getElementById('daumIframe');
    frameElement.style.display='block';
    frameElement.style.height="100%";
    frameElement.setAttribute('src','assets/juso.html');
    document.getElementById('formContent').style.display="none";
   // this.setLocationBySearch(this.myAddress);


  }

  closeDaumIframe(){
    let frame = document.getElementById("daumIframe");
    document.getElementById('daumIframe').setAttribute('height','0px');
    document.getElementById('daumIframe').style.height="0px";
    document.getElementById('daumIframe').style.border="0px";
    document.getElementById('formContent').style.display="block";

  }
}


