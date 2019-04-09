import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the OrderRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
 
)
@Component({
  selector: 'page-order-record',
  templateUrl: 'order-record.html',
})
export class OrderRecordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderRecordPage');
  }

  goToPage(str: string) {
    switch (str) {
      case 'main':
        this.navCtrl.push('MainComponent');
        break;
  }
}

}
