import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserStore} from "../../../core/model/UserStore";
import {Bookmark} from "../../../core/model/Bookmark";
import {ToastService} from "../../../core/service/toast.service";
import {BookmarkService} from "../../../core/api/bookmark.service";
import {StoreService} from "../../../core/api/store.service";
import {SessionService} from "../../../core/service/session.service";
import { resolve } from 'path';

/**
 * Generated class for the BookMarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-mark',
  templateUrl: 'book-mark.html',
})
export class BookMarkPage {

  private bookMarkArray: UserStore[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastService: ToastService,
    private bookmarkService: BookmarkService,
    private storeService:StoreService,
    private sessionService: SessionService
  ) {
        //bookmark리스트 불러오기
         this.getBookmarkList(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookMarkPage');
  }


  removeFromBookmark(store: UserStore, i : number) {
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
                        this.bookMarkArray.splice(i,1);
                         //알림메시지
                         this.toastService.presentToast('즐겨찾기 제거 완료!');
                       } else {
                         this.toastService.presentToast(res.msg);
                       }
                     }
                   }
                )   
                
               // //즐겨찾기 속성 변경
               // store.isBookMarked = false;
               // //알림메시지
               // this.toastService.presentToast('즐겨찾기 제거 완료!');
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
   getBookmarkList(){

    
    let bookMark = new Bookmark();
    bookMark.buyerId = this.sessionService.getValue('loginId');
    this.bookmarkService.get(bookMark.buyerId).subscribe(
      (res) => {
        //응답오면
        //console.log(JSON.stringify(res))
         if (res && res.code != undefined) {
           //성공시
           if (res.code == 1) {
             //console.log(JSON.stringify(res.data))
            this.bookMarkArray=res.data;

           } else {
             this.toastService.presentToast(res.msg);
           }
         }
       }
    ) 
  }

  goToPage(pageName: string, sellerId?: string) {
    switch(pageName){
      case 'store-detail':
        this.navCtrl.push('BuyerStoreDetailPage', {sellerId: sellerId});
    }
  }

}


class bookmarkStore {
  store: UserStore;
  title : string
  score : number
  images: any;

}


