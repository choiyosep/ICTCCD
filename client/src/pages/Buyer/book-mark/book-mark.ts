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
  private bookmarkStore1 : UserStore;
  private bookmarkStore2 : UserStore;
  private bookmarkStore3 : UserStore;
  private storeList : UserStore[] = [];

  private src: string;


  // private UserStore: Array<bookmarkStore>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastService: ToastService,
    private bookmarkService: BookmarkService,
    private storeService:StoreService,
    private sessionService: SessionService
  ) {
    /* this.bookmarkStore1 = new UserStore();
    this.bookmarkStore1.title="죠스떡볶이",
      this.bookmarkStore1.score=3.7,
      this.bookmarkStore1.isBookMarked=false,
      this.bookmarkStore1.images.push("http://www.fc123.co.kr/admin/data/webedit/11053005520520.jpg")

    this.bookmarkStore2 = new UserStore();
    this.bookmarkStore2.title="진이네 반찬가게",
      this.bookmarkStore2.score=3.7,
      this.bookmarkStore2.isBookMarked=true,
     this.bookmarkStore2.images.push("/assests/imgs/banchan.png")


    this.bookmarkStore3 = new UserStore();
    this.bookmarkStore3.title="파리바게트 아주대점",
      this.bookmarkStore3.score=4.3,
      this.bookmarkStore1.isBookMarked=false,
      this.bookmarkStore3.images.push("http://cfile221.uf.daum.net/image/2315ED485488F93131179E");


    this.bookMarkArray.push(this.bookmarkStore1);
    this.bookMarkArray.push(this.bookmarkStore2);
    this.bookMarkArray.push(this.bookmarkStore3);
   /* // this.bookMarkArray = [
    //   { store: this.bookmarkStore1 ,title: this.bookmarkStore1.title, score: this.bookmarkStore1.score ,images: this.bookmarkStore1.images},
    //   { store: this.bookmarkStore2 ,title: this.bookmarkStore2.title, score: this.bookmarkStore2.score ,images: this.bookmarkStore2.images},
    //   { store: this.bookmarkStore3 ,title: this.bookmarkStore3.title, score: this.bookmarkStore3.score ,images: this.bookmarkStore3.images},
    // ];*/
         this.getBookmarkList(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookMarkPage');
    //페이지가 처음 진입했을 때 실행하는 코드

  }

  addToBookmark(store: UserStore) {
    let confirm = this.alertCtrl.create({
      title: '찜하시겠습니까??',
      subTitle: '',
      cssClass: '',
      buttons: [
        {
          text: '확인',
          cssClass: '',
          handler: () => {
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
                
               //즐겨찾기 속성 변경
               store.isBookMarked = false;
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



} 


class bookmarkStore {
  store: UserStore;
  title : string
  score : number
  images: any;

}


