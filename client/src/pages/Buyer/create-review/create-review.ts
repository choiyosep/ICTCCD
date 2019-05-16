import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

import {FormGroup} from "@angular/forms";
import {UserStore} from "../../../core/model/UserStore";

/**
 * Generated class for the CreateReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'CreateReviewPage'
  }
)
@Component({
  selector: 'page-create-review',
  templateUrl: 'create-review.html',

})
export class CreateReviewPage {
  userStore: UserStore;

  // rating : number= 4;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public events: Events) {

    // events.subscribe('star-rating:changed', (starRating) => {
    //   console.log(starRating);
    //   this.rating = starRating;
    // });
    this.userStore = new UserStore();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateReviewPage');
  }
  back() {
    this.navCtrl.pop();
  }

  add(){

    this.navCtrl.setRoot("StoreDetailComponent");
  }
}
