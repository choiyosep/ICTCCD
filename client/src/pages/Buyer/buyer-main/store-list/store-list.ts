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

  private contents: string = '제과';

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

    var store1 = new UserStore();
    store1.title = "브라운 파파";
    store1.grade = 4.5;
    store1.distance = 130;
    store1.isBookMarked=true;
    store1.images.push("http://www.reputation.kr/news/photo/201803/56_121_2159.jpg");

    var store2 = new UserStore();
    store2.title = "라두스 베이커리";
    store2.grade = 4.9;
    store2.distance = 190;
    store2.isBookMarked=false;
    store2.images.push("https://fastly.4sqi.net/img/general/600x600/29176994_bX10YpLlXDPjcq-f0LXaPG02fwyq5XLEkXQg_L7ACro.jpg");

    this.bakeryStoreList.push(store1);
    this.bakeryStoreList.push(store2);
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


  getStoresByCatNum(catNum: number){
    //기기에 저장돼있는 위치 정보를 받아온다.
    const location= this.sessionService.getValue("location");
    //위치, 카테고리를 기반으로 상점을 조회한다.
    this.storeService.getStores(location.lat, location.lng, catNum)
      .subscribe((res)=> {
      if (res && res.code == RESPONSE_CODE.SUCCESS) {
        this.storeList = res.data;
      }
    });
  }



}
