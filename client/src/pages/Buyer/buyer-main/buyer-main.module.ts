import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyerMainPage } from './buyer-main';

@NgModule({
  declarations: [
    BuyerMainPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyerMainPage),
  ],
})
export class BuyerMainPageModule {}
