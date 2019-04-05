import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from "ionic-angular";
import {UserStore} from "../../../../core/model/UserStore";
import {TimePick} from "../../../../core/model/timePick";
import {environment} from "../../../../environments/environment";

/**
 * Generated class for the StoreDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'StoreCreateComponent',
    segment: 'store/create'
})
@Component({
  selector: 'page-store-create',
  templateUrl: 'store-create.component.html',
})
export class StoreCreateComponent {
  contents: String;
  private userStore : UserStore;
  private items = [];

  private openTime :TimePick;
  private closingTime :TimePick;



  constructor(
              private toastCtrl : ToastController,
              public navCtrl: NavController,
              public navParams : NavParams
) {

    window.addEventListener( 'message', (e) =>{
      console.log("메세지:"+e.data);
      if(e.data !=="close"){
        this.userStore.mainAddr= e.data;
      }
      this.closeDaumIframe();
    } );
    this.userStore = new UserStore();

    this.openTime= new TimePick(9,0);
    this.closingTime = new TimePick(22,30);

    this.items.push(1);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreCreatePage');
  }

  timeToString( num : number): string{
    return num<10? '0'+num : num.toString();
  }

  toast(str: string = '') {
    this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: 'top'
    }).present();
  }

  add() {

    if(this.items.length<2){
      this.toast("사진을 1장 이상 등록해주세요");
      return false;
    }

    if(this.userStore.title==undefined || this.userStore.title == ''){
      this.toast("상점명을 입력해주세요");
      return false;
    }

    if(this.openTime==null || this.closingTime==null){
      this.toast("상점 운영시간을 입력해주세요");
      return false;
    }

    if(this.userStore.tel==undefined || this.userStore.tel == ''){
      this.toast("연락처를 입력해주세요");
      return false;
    }

    if(this.userStore.mainAddr==undefined || this.userStore.mainAddr == ''){
      this.toast("주소를 입력해주세요");
      alert(this.userStore.mainAddr);
      return false;
    }

    if(this.userStore.detailAddr==undefined || this.userStore.detailAddr == ''){
      this.toast("상세 주소를 입력해주세요");
      return false;
    }

    if(this.userStore.category==undefined || this.userStore.category == ''){
      this.toast("카테고리를 선택해주세요");
      return false;
    }
    //
    // this.userStore.hours
    //   = this.timeToString(this.openTime.hour)
    //   + ":"
    //   + this.timeToString(this.openTime.minute)
    //   + "~"
    //   + this.timeToString(this.closingTime.hour)
    //   + ":"
    //   + this.timeToString(this.closingTime.minute);


    this.userStore.sHour=this.openTime.hour;
    this.userStore.sMinute=this.openTime.minute;
    this.userStore.eHour=this.closingTime.hour;
    this.userStore.eMinute=this.closingTime.minute;



    //위도 경도 받아옴


    //상점 추가작업
    this.navCtrl.setRoot('MainComponent');
  }

  goToMain(){
    this.navCtrl.setRoot('MainComponent');
  }



  back(){
    this.navCtrl.pop();
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
