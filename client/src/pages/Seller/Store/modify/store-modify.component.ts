import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, ToastController} from "ionic-angular";
import {SessionService} from "../../../../core/service/session.service";
import {UserStore} from "../../../../core/model/UserStore";
import {TimePick} from "../../../../core/model/timePick";
import {environment} from "../../../../environments/environment";

/**
 * Generated class for the StoreDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var daum: any;

@IonicPage({
    name: 'StoreModifyComponent',
    segment: 'store/modify'
})
@Component({
  selector: 'page-store-modify',
  templateUrl: 'store-modify.component.html',
})
export class StoreModifyComponent{
  contents: String;
  private userStore: UserStore;
  private items = [];

  private tempAddress;
  private openTime : TimePick;
  private closingTime : TimePick;

  private endPoint: string = environment.API_ENDPOINT;

  element: any;



  constructor
  (
   protected session: SessionService,
   private alertCtrl: AlertController,
   private toastCtrl: ToastController,
   private navCtrl : NavController
  )
  {

    this.items.push(1);

    this.userStore= new UserStore();

    window.addEventListener( 'message', (e) =>{
      console.log("메세지:"+e.data);
      if(e.data !=="close"){
        // (document.getElementById("mainAddr") as HTMLInputElement).value =  e.data;
        this.userStore.mainAddr=e.data;
      }
      // this.back();
      this.closeDaumIframe();

    } );


  }



  toast(str: string = '') {
    this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: 'top'
    }).present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreModifyPage');
  }

  goToPage(str: string) {
    switch (str) {
      case 'main' :
        this.navCtrl.push('MainComponent');
        break;
    }
  }

  timeToString( num : number): string{
    return num<10? '0'+num : num.toString();
  }

  modify() {

    if (this.items.length < 2) {
      this.toast("사진을 1장 이상 등록해주세요");
      return false;
    }

    if (this.userStore.title == undefined || this.userStore.title == '') {
      this.toast("상점명을 입력해주세요");
      return false;
    }

    if (this.openTime == null || this.closingTime == null) {
      this.toast("상점 운영시간을 입력해주세요");
      return false;
    }

    if (this.userStore.tel == undefined || this.userStore.tel == '') {
      this.toast("연락처를 입력해주세요");
      return false;
    }

    if (this.userStore.mainAddr == undefined || this.userStore.mainAddr == '') {
      this.toast("주소를 입력해주세요");
      return false;
    }

    if (this.userStore.detailAddr == undefined || this.userStore.detailAddr == '') {
      this.toast("상세 주소를 입력해주세요");
      return false;
    }

    if (this.userStore.category == undefined || this.userStore.category == '') {
      this.toast("카테고리를 선택해주세요");
      return false;
    }
    this.userStore.sHour = this.openTime.hour;
    this.userStore.sMinute = this.openTime.minute;
    this.userStore.eHour = this.closingTime.hour;
    this.userStore.eMinute = this.closingTime.minute;


    //위도 경도 받아옴

    //상점 수정 작업

    //페이지 이동
    this.navCtrl.setRoot('MainComponent');


  }




  delete() {
    let confirm = this.alertCtrl.create({
      title: '상점을 삭제 하시겠습니까?',
      subTitle: '상점 삭제시 저장된<br>모든 상품과 데이터가 삭제됩니다',
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
          text: '삭제',
          cssClass:'del',
          handler: () => {
            //삭제작업

          }
        }
      ]
    });
    confirm.present();
  }

  back() {
    this.navCtrl.setRoot("MainComponent");
  }

  startJusoSearch(){
    let frameElement: HTMLElement = document.getElementById('daumIframe');
    frameElement.setAttribute(
      'src',
      environment.API_ENDPOINT+'daumJuso'
    );
    frameElement.style.display='block';
    frameElement.style.height="100%";

    document.getElementById('formContent').style.display="none";
  }

  closeDaumIframe(){
    let frame = document.getElementById("daumIframe");
    frame.setAttribute('src','about:blank');
    document.getElementById('daumIframe').setAttribute('height','0px');
    document.getElementById('daumIframe').style.height="0px";
    document.getElementById('formContent').style.display="block";

  }
}
