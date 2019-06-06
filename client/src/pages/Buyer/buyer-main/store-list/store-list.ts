import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserStore} from "../../../../core/model/UserStore";
import {ToastService} from "../../../../core/service/toast.service";
import {IResponse, RESPONSE_CODE} from "../../../../core/service/response.service";
import {StoreService} from "../../../../core/api/store.service";
import {SessionService} from "../../../../core/service/session.service";
import {Bookmark} from "../../../../core/model/Bookmark";
import {BookmarkService} from "../../../../core/api/bookmark.service";
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {UserService} from "../../../../core/api/user.service";
import {environment} from '../../../../environments/environment';

/**
 * Generated class for the StoreListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store-list',
  templateUrl: 'store-list.html',
})
export class StoreListPage {

  private contents: string ;

  private bakeryStoreList: UserStore[] = [];
  private flourFoodStoreList: UserStore[] = [];
  private sideDishStoreList: UserStore[] = [];
  private riceCakeStoreList: UserStore[] = [];
  private EtcStoreList: UserStore[] = [];
  private storeList : UserStore[] = [];
  //private createBookmark : Bookmark[] = [];

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private toastService: ToastService,
              private storeService : StoreService,
              private bookmarkService : BookmarkService,
              private sessionService : SessionService,
              private userService : UserService,
              private push : Push,
              )
  {
    let catName = this.navParams.get("catName");
    if(catName!=undefined){
      this.setContents(catName);
    }

  }

  pushSetup(){
    const options: PushOptions = {
      android: {
        senderID: environment.Firebase.SenderId
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    }

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => {
      this.toastService.presentToast(notification.message);
      console.log('Received a notification', notification)
    });

    pushObject.on('registration').subscribe((registration: any) =>
    {
      console.log('Device registered', registration);
      const loginId = this.sessionService.getValue("loginId");
      this.userService.putToken(loginId, registration.registrationId)
        .subscribe((res: IResponse<any>) => {
          console.log(res);
        });
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }

  setContents(catName: any){
    this.contents=catName;
    let location = this.sessionService.getLocation();
    let lat = location.lat;
    let lng = location.lng;
    let catNum;
    switch(catName){
      case "제과":
        catNum = 1;
        break;
      case "떡":
        catNum = 2;
        break;
      case "분식":
        catNum = 3;
        break;
      case "반찬":
        catNum = 4;
        break;
      case "기타":
        catNum = 5;
        break;
      default:
        break;
    }
    let buyerId  = this.sessionService.getValue("loginId");
    let radius = this.sessionService.getRadius();

    console.log(buyerId);
    console.log(radius);
    this.storeService.getStores(lat,lng,catNum, buyerId, radius).subscribe((res)=>{
      if(res&&res.code==RESPONSE_CODE.SUCCESS){
        this.setStoreList(catNum, res.data);
      }
    })
  }

  setStoreList(catNum: number, data: any){
    switch(catNum){
      case 1:
        this.bakeryStoreList = data;
        break;
      case 2:
        this.riceCakeStoreList= data;
        break;
      case 3:
        this.flourFoodStoreList = data;
        break;
      case 4:
        this.sideDishStoreList = data;
        break;
      case 5:
        this.EtcStoreList = data;
        break;
    }

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreListPage');
  }
  /* toast(str: string = '') {
    this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: 'top'
    }).present();
  } */

  goToPage(pageName: string, sellerId?: string) {
    switch(pageName){
      case 'store-detail':
        this.navCtrl.push('BuyerStoreDetailPage', {sellerId: sellerId});
    }
  }

  addToBookmark(store: UserStore) {
    let confirm = this.alertCtrl.create({
      title: '즐겨찾기에 추가하시겠습니까??',
      subTitle: '',
      cssClass: '',
      buttons: [
        {
          text: '확인',
          cssClass: '',
          handler: () => {
            //토큰 값 전달
            this.pushSetup();
            //즐겨찾기 추가 작업
           //const sellerId = this.sessionService.getValue('loginId');
            let bookMark = new Bookmark();
            bookMark.buyerId = this.sessionService.getValue('loginId');
            bookMark.sellerId = store.sellerId;
            console.log(bookMark.buyerId);
            console.log(bookMark.sellerId);

             this.bookmarkService.add(bookMark).subscribe(
              (res) =>{
                //응답오면
                 if (res && res.code != undefined) {
                   //성공시
                   if (res.code == 1) {
                     //즐겨찾기 속성 변경(UserStore)
                     store.isBookMarked = true;
                     //알림메시지
                     this.toastService.presentToast('즐겨찾기 추가 완료!!');
                   } else {
                     this.toastService.presentToast(res.msg);
                   }
                 }
               }
            ) 
            

          }
        },
        {
          text: '취소',
          cssClass:'',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();

  }

  removeFromBookmark(store: UserStore) {
    let confirm = this.alertCtrl.create({
      title: '즐겨찾기에서 제거하시겠습니까?',
      subTitle: '',
      cssClass: '',
      buttons: [
        {
          text: '확인',
          cssClass: '',
          handler: () => {
            //즐겨찾기 추가 작업(로그인한 구매자 아이디와 해당 상점의 판매자 아이디 서버로 전송)
            let bookMark = new Bookmark();
            bookMark.buyerId = this.sessionService.getValue('loginId');
            bookMark.sellerId = store.sellerId;

            console.log(bookMark);

              this.bookmarkService.deleteBookMark(bookMark).subscribe(
              (res) =>{
                //응답오면
                console.log("res:"+ JSON.stringify(res))
                 if (res && res.code != undefined) {
                   //성공시
                   if (res.code == 1) {
          
                    //즐겨찾기 속성 변경
                     store.isBookMarked = false;
                     //알림메시지
                     this.toastService.presentToast('즐겨찾기 제거 완료!');
                   } else {
                     this.toastService.presentToast(res.msg);
                   }
                 }
               }
            )
          }
        },
        {
          text: '취소',
          cssClass:'',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();

  }

}
