import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserStore} from "../../../core/model/UserStore";
import {Product} from "../../../core/model/Product";

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
  bookMarkArray: bookmarkStore[];

  private bookmarkStore1 : UserStore;
  private bookmarkStore2 : UserStore;
  private bookmarkStore3 : UserStore;

  private src: string;


  // private UserStore: Array<bookmarkStore>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bookmarkStore1 = new UserStore();
    this.bookmarkStore1.title="죠스떡볶이",
      this.bookmarkStore1.score=3.7,
      this.bookmarkStore1.images.push("http://www.fc123.co.kr/admin/data/webedit/11053005520520.jpg")

    this.bookmarkStore2 = new UserStore();
    this.bookmarkStore2.title="진이네 반찬가게",
      this.bookmarkStore2.score=3.7,
     this.bookmarkStore2.images.push("/assests/imgs/banchan.png")


    this.bookmarkStore3 = new UserStore();
    this.bookmarkStore3.title="파리바게트 아주대점",
      this.bookmarkStore3.score=4.3,
      this.bookmarkStore3.images.push("http://cfile221.uf.daum.net/image/2315ED485488F93131179E");

    this.bookMarkArray = [
      { store: this.bookmarkStore1 ,title: this.bookmarkStore1.title, score: this.bookmarkStore1.score ,images: this.bookmarkStore1.images},
      { store: this.bookmarkStore2 ,title: this.bookmarkStore2.title, score: this.bookmarkStore2.score ,images: this.bookmarkStore2.images},
      { store: this.bookmarkStore3 ,title: this.bookmarkStore3.title, score: this.bookmarkStore3.score ,images: this.bookmarkStore3.images},
    ];


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookMarkPage');
  }


}


class bookmarkStore {
  store: UserStore;
  title : string
  score : number
  images: any;

}


