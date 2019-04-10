import { Component, ViewChild } from '@angular/core';

import {Platform, MenuController, Nav, AlertController} from 'ionic-angular';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/Account/login/login";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = LoginPage;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private alertCtrl: AlertController,
  ) {
    this.initializeApp();

    // set our app's pages
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goToPage(pageName: string) {
    this.menu.close();

    switch(pageName){
      case 'buyerMain':
        this.nav.setRoot('BuyerMainPage');
        break;
      case 'sellerMain':
        this.nav.setRoot('StoreDetailComponent');
        break;
      case 'cart':
        this.nav.setRoot('CartListPage');
        break;
      case 'book-mark':
        this.nav.setRoot('BookMarkPage');
        break;
      case 'order-record':
        this.nav.setRoot('OrderRecordPage');
        break;
      default:
        break;
    }


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
            this.menu.close();
            this.nav.setRoot('LoginPage');
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
