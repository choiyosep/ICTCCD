import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from "ionic-angular";
import {SessionService} from "../../../../core/service/session.service";
import {UserStore} from "../../../../core/model/UserStore";
import {TimePick} from "../../../../core/model/timePick";
import {environment} from "../../../../environments/environment";
import {Converter} from "../../../../core/helper/converter";
import {IResponse, RESPONSE_CODE} from "../../../../core/service/response.service";
import {AwsService} from "../../../../core/api/aws.service";
import {UploadService} from "../../../../core/service/upload.service";
import {DaumService} from "../../../../core/service/daum.service";
import {StoreService} from "../../../../core/api/store.service";
import {HttpResponse} from "@angular/common/http";

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

  private openTime : TimePick;
  private closingTime : TimePick;


  element: any;



  constructor
  (
   protected session: SessionService,
   private alertCtrl: AlertController,
   private toastCtrl: ToastController,
   private navCtrl : NavController,
   private navParam : NavParams,
   private sessionService : SessionService,
   private uploadService : UploadService,
   private awsService : AwsService,
   private daumService : DaumService,
   private storeService : StoreService
  )
  {
    // console.log(this.navParam.get("userStore"));
    this.userStore = new UserStore();

    //상점 상세 페이지에서 넘겨준 userStore 객체가 존재하면
    if(this.navParam.get("userStore")!=undefined){
      //Object type을 UserStore Class type으로 변환해준 뒤 저장한다.
      this.userStore= Converter.jsonToInstance(UserStore, this.navParam.get("userStore"));

      for(let i=0; i<this.userStore.images.length; i++) {
        this.items.push(1);
      }

      this.openTime = new TimePick(this.userStore.sHour, this.userStore.sMinute);
      this.closingTime = new TimePick(this.userStore.eHour, this.userStore.eMinute);
      const tempAddress = this.userStore.address.split("/");
      this.userStore.mainAddr = tempAddress[0];
      this.userStore.detailAddr = tempAddress[1];
    }

    this.items.push(1);

    window.addEventListener( 'message', (e) =>{
      if(e.data !=="close"&& e.data!=''){
        (document.getElementById("mainAddr") as HTMLInputElement).value =  e.data;
        this.userStore.mainAddr=e.data;
      }
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
      case 'store-detail' :
        this.navCtrl.setRoot('StoreDetailComponent');
        break;
    }
  }

  timeToString( num : number): string{
    return num<10? '0'+num : num.toString();
  }

  storeModify() {

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


    // 위도 경도 받아옴
    this.daumService.getLocation(this.userStore.mainAddr).subscribe(
      (res)=>
      {
        //경도
        this.userStore.lng = res.x;
        //위도
        this.userStore.lat = res.y;

        this.userStore.sHour=this.openTime.hour;
        this.userStore.sMinute=this.openTime.minute;
        this.userStore.eHour=this.closingTime.hour;
        this.userStore.eMinute=this.closingTime.minute;

        //주소 합침
        this.userStore.address= this.userStore.mainAddr+'/'+this.userStore.detailAddr;
        //상점 주인 아이디(갖고 있어서 필요없음)
        // this.userStore.sellerId = this.sessionService.getValue('loginId');

        //상점 수정작업
        this.storeService.modify(this.userStore, this.userStore.sellerId).subscribe((res) =>{
          if(res&&res.code!=undefined){
            if(res.code==1) {
              this.toast("수정 완료");
              this.navCtrl.setRoot("StoreDetailComponent");
            }else{
              this.toast(res.msg);
            }
          }
        });
      }
    );


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
            this.storeService.delete(this.userStore.sellerId).subscribe(
              (res) =>{
                //응답오면
                if(res&&res.code!=undefined){
                  //성공시
                  if(res.code==1) {
                      this.navCtrl.setRoot("StoreDetailComponent");
                      this.toast("삭제 완료");
                    }else{
                      this.toast(res.msg);
                    }
                  }
              }
            )
          }
        }
      ]
    });
    confirm.present();
  }

  goToMain(){
    this.navCtrl.setRoot('StoreDetailComponent');
  }

  startJusoSearch(){
    let frameElement: HTMLElement = document.getElementById('daumIframe');
    frameElement.style.display='block';
    frameElement.style.height="100%";
    frameElement.setAttribute('src',`${environment.API_ENDPOINT}daumJuso`);
    document.getElementById('formContent').style.display="none";
  }



  closeDaumIframe(){
    let frame = document.getElementById("daumIframe");
    document.getElementById('daumIframe').setAttribute('height','0px');
    document.getElementById('daumIframe').style.height="0px";
    document.getElementById('daumIframe').style.border="0px";
    document.getElementById('formContent').style.display="block";

  }

  imageUpload(event, i: number) {
    const file = event.target.files[0];
    const loginId = this.sessionService.getValue("loginId");
    this.awsService.getUploadUrl(loginId)
      .subscribe((res: IResponse<any>) => {
        if (res&&res.code === RESPONSE_CODE.SUCCESS) {
          this.uploadService.upload(res.data.url, file).subscribe((response : HttpResponse<any>) => {
            if(response&&response.status==200){
              const key = Converter.keyToAWSSource(res.data.key);
              if(this.userStore.images[i]==undefined){
                this.userStore.images.push(key);
                this.items.push(1);
              }else{
                this.userStore.images[i]=key;
              }
            }

          }, (err) => console.log(err));
        }
      });

  }

  imageDelete(i: number) {
    this.items.pop();
    this.userStore.images.splice(i, 1);
  }
}
