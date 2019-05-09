import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserStore} from "../../../../core/model/UserStore";
import {ToastService} from "../../../../core/service/toast.service";
import {RESPONSE_CODE} from "../../../../core/service/response.service";
import {StoreService} from "../../../../core/api/store.service";
import {SessionService} from "../../../../core/service/session.service";


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

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private toastService: ToastService,
              private storeService : StoreService,
              private sessionService : SessionService
              )
  {
    let catName = this.navParams.get("catName");
    if(catName!=undefined){
      this.setContents(catName);
    }
  }

  setContents(catName: any){
    this.contents=catName;
    let location = this.sessionService.getLocation();
    let lat = location.lat;
    let lng = location.lng
    let catNum;
    switch(catName){
      case "제과":
        catNum = 1;
        break;
      case "분식":
        catNum = 2;
        break;
      case "반찬":
        catNum = 3;
        break;
      case "떡":
        catNum = 4;
        break;
      case "기타":
        catNum = 5;
        break;
      default:
        break;
    }
    console.log(lat,lng,catNum);
    let buyerId  = this.sessionService.getValue("loginId");
    this.storeService.getStores(lat,lng,catNum, buyerId).subscribe((res)=>{
      console.log(res);
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
        this.flourFoodStoreList= data;
        break;
      case 3:
        this.sideDishStoreList = data;
        break;
      case 4:
        this.riceCakeStoreList = data;
        break;
      case 5:
        this.EtcStoreList = data;
    }

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreListPage');
  }

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
            //즐겨찾기 추가 작업

            //즐겨찾기 속성 변경
            store.isBookMarked=true;

            //알림메시지
            this.toastService.presentToast('즐겨찾기 추가 완료!!');

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

            //즐겨찾기 속성 변경
            store.isBookMarked=false;

            //알림메시지
            this.toastService.presentToast('즐겨찾기 제거 완료!');
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
