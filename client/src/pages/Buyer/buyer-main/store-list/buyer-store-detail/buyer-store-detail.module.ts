import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyerStoreDetailPage } from './buyer-store-detail';
import {ProductCardComponent2} from "./product-card/product-card2";

@NgModule({
  declarations: [
    BuyerStoreDetailPage,
    ProductCardComponent2
  ],
  imports: [
    IonicPageModule.forChild(BuyerStoreDetailPage),
  ],
})
export class BuyerStoreDetailPageModule {}
