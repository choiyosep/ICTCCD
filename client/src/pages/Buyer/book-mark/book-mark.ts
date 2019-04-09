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
  private userStore : UserStore;

  private products: Array<Product>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.userStore= new UserStore();




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookMarkPage');
  }

}
