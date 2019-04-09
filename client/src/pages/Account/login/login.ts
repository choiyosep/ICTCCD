import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private idStatus;
  private passStatus;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  blur(type: string) {
    switch (type) {
      case 'id':
        this.idStatus = "normal";
        break;
      case 'pass':
        this.passStatus = "normal";
        break;
      default:
        break;
    }
  }

  onfocus(type: string) {
    switch (type) {
      case 'id':
        this.idStatus = "active";
        break;
      case 'pass':
        this.passStatus = "active";
        break;
      default:
        break;
    }
  }

  goToPage(str: string) {
    switch (str) {
   /*   case 'sign-up' :
        this.navCtrl.setRoot('SignupPage');
        break;*/
      case 'sellerMain':
        this.navCtrl.setRoot('StoreDetailComponent');
        break;
    }
  }

}
