import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

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

  private pushon: boolean;
  private user : User;
  private data :
    {
      id: string;
      level:string;
      nickname: string;
      push_con: string;

    }
  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private toastCtrl : ToastController,
              public navParams: NavParams,
              private userService : UserService,
              private sessionService: SessionService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerInfoPage');

  }

  ionViewDidEnter(){

    const id = this.sessionService.getValue("loginId");
    //
    // console.log(id);


    this.userService.getUsersDetailsById(id).subscribe((res) =>{
      if(res && res.code==1){
          this.data= res.data;
          console.log(this.data.push_con);
        this.pushon = (this.data.push_con == "1")? true: false;


      }
    });
  }

  toast(str: string = '') {
    this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: 'top'
    }).present();
  }

  changeState($event) {

            //console.log(this.data.push_con);
            //console.log(this.data.id);

            this.userService.send(this.data.id,this.data.push_con).subscribe(
              (res) =>{
                //응답오면
                if(res&&res.code!=undefined){
                  //성공시
                  if(res.code==1) {
                    this.data.push_con= ($event.value==true)? "1": "0";
                    this.toast("변경 완료");
                  }else{
                    this.toast(res.msg);
                  }
                }
              }
            )

  }




}
