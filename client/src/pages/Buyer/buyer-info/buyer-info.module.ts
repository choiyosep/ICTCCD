import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyerInfoPage } from './buyer-info';

@NgModule({
  declarations: [
    BuyerInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyerInfoPage),
  ],
})
export class BuyerInfoPageModule {}
