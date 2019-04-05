import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from "ionic-angular";
import {SessionService} from "../../../core/service/session.service";

/**
 * Generated class for the StoremainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
*/

@IonicPage({
  name: 'MyPageComponent',
  segment: 'mypage'
})
@Component({
  selector: 'page-mypage-ionic',
  templateUrl: 'mypage.component.html',
})
export class MyPageComponent{

  constructor(
    private alertCtrl: AlertController, 
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
  }

  goToPage(str: string) {
    switch (str) {

    }
  }

  back() {
    this.navCtrl.pop();
  }

  logout() {
    let confirm = this.alertCtrl.create({
      title: '로그아웃 하시겠습니까?',
      cssClass: '',
      buttons: [
        {
          text: '취소',
          cssClass: 'cancle',
          handler: () => {
          }
        },
        {
          text: '확인',
          cssClass:'del',
          handler: () => {
            //로그아웃작업
          }
        }
      ]
    });
    confirm.present();
  }

  leave() {
    let confirm = this.alertCtrl.create({
      title: '회원을 탈퇴하시겠습니까?',
      subTitle: '회원탈퇴시 저장된<br>모든 데이터가 삭제됩니다.',
      cssClass: '',
      buttons: [
        {
          text: '취소',
          cssClass: 'cancle',
          handler: () => {
          }
        },
        {
          text: '회원탈퇴',
          cssClass:'del',
          handler: () => {
            //회원탈퇴작업
          }
        }
      ]
    });
    confirm.present();
  }
}
