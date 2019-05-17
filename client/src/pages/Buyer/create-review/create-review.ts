import { Component,Input, EventEmitter, Output } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Events } from 'ionic-angular';

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
  @Input() rating : number;
  @Output() ratingChange : EventEmitter<number> = new EventEmitter();
  userStore: UserStore;

  // rating : number= 4;
  constructor(public navCtrl: NavController, public navParams: NavParams,
             ) {

    // events.subscribe('star-rating:changed', (starRating) => {
    //   console.log(starRating);
    //   this.rating = starRating;
    // });
    this.userStore = new UserStore();

  }

  rate(index : number){
    this.rating= index;
    this.ratingChange.emit(this.rating);

  }

  getColor(index : number){
    if(this.isAboveRating(index)){
      return COLORS.GREY;
    }
    switch(this.rating) {
      case 1:
        case 2:
          return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;

    }
  }
  isAboveRating(index: number) : boolean{
    return index> this.rating;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateReviewPage');
  }
  back() {
    this.navCtrl.setRoot('StoreDetailComponent');
  }

  add(){

    this.navCtrl.setRoot("StoreDetailComponent");
  }


}

enum COLORS{

  GREY= "#E0E0E0",
  GREEN="#76FF03",
  YELLOW="#FFCA28",
  RED="#DD2C00"
}
