import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';


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
    public splashScreen: SplashScreen
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
      case 'main':
        this.nav.setRoot('BuyerMainPage');
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
}
