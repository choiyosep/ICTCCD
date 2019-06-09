import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SessionService} from "../../../core/service/session.service";
import {DaumService} from "../../../core/service/daum.service";
import { Geolocation } from '@ionic-native/geolocation';
import {environment} from "../../../environments/environment";
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
  private radius: string;

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
        let addressElement : any = document.getElementById('address-finder');
        addressElement.value=e.data;
        //this.setLocationBySearch(this.myAddress);
      }
      this.closeDaumIframe();

      //console.log(this.myAddress);
    } ,false);


  }

  ionViewDidLoad() {
    console.log("반경");
    console.log(this.sessionService.getRadius());
    if(this.sessionService.getLocation()==null || this.sessionService.getLocation()==undefined){
      this.setLocationBySearch("경기 수원시 영통구 월드컵로 206");
    }
    if(this.sessionService.getRadius()==null || this.sessionService.getRadius() ==undefined){
      this.setRadius("1");
      this.radius = "1";
    }else{
      this.radius = this.sessionService.getRadius();
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

    let searchElement: HTMLElement = document.getElementById('searchContent');

    let frameElement: HTMLElement = document.getElementById('daumIframe');
    searchElement.style.display='block';

    searchElement.style.height="100%";
    frameElement.style.height="100%";
    frameElement.setAttribute('src',`${environment.API_ENDPOINT}daumJuso`);
    // frameElement.setAttribute('src','assets/juso.html');
    document.getElementById('formContent').style.display="none";
   // this.setLocationBySearch(this.myAddress);

  }

  closeDaumIframe(){
    let searchElement: HTMLElement = document.getElementById('searchContent');

    searchElement.style.display='none';

    let frameElement = document.getElementById("daumIframe");
    frameElement.setAttribute('height','0px');
    searchElement.style.height="0px";
    frameElement.style.height="0px";

    frameElement.style.border="0px";
    document.getElementById('formContent').style.display="block";

  }

  getRadius() {
    return this.sessionService.getRadius();

  }

  setRadius(radius : any){
    this.sessionService.setRadius(radius);
  }
}


