import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ProductModifyComponent} from "./product-modify.component";

@NgModule({
  declarations: [
    ProductModifyComponent,
  ],
  imports: [
    IonicPageModule.forChild(ProductModifyComponent)
  ]
})
export class ProductModifyComponentModule {}
