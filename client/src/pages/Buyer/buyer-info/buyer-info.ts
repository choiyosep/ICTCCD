import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {SessionService} from "../../../core/service/session.service";
import {Converter} from "../../../core/helper/converter";
import {UserService} from "../../../core/api/user.service";

import {User} from "../../../core/model/user";

/**
 * Generated class for the BuyerInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyer-info',
  templateUrl: 'buyer-info.html',
})
export class BuyerInfoPage {

  public user : User;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService : UserService,
              private sessionService: SessionService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerInfoPage');

  }

  ionViewDidEnter(){

    const id = this.sessionService.getValue("loginId");

    console.log(id);
    this.userService.getUsersDetailsById(id).subscribe((res) =>{
      if(res && res.code==1){
       console.log(res.data);
       this.user=res.data;



      }
    });
  }
}
