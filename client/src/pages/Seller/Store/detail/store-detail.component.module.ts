import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StoreDetailComponent} from "./store-detail.component";
import {ProductCardComponent} from "../../Main/product-card/product-card";

@NgModule({
  declarations: [
    StoreDetailComponent,
    ProductCardComponent
  ],
  imports: [
    IonicPageModule.forChild(StoreDetailComponent)
  ],
})
export class StoreDetailComponentModule {}
