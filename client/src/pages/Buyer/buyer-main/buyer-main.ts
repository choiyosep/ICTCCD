import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ToastService} from "../../../core/service/toast.service";

/**
 * Generated class for the BuyerMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyer-main',
  templateUrl: 'buyer-main.html',
})
export class BuyerMainPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerMainPage');
  }
  goToPage(str: string) {
    switch (str) {
      // case 'sign-up' :
      //   this.navCtrl.setRoot('SignupPage');
      //   break;
      case 'store-detail':
        this.navCtrl.push('StoreDetailComponent')
        break;

    }
  }


}
