import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ProductCreateComponent} from "./product-create.component";

@NgModule({
  declarations: [
    ProductCreateComponent,
  ],
  imports: [
    IonicPageModule.forChild(ProductCreateComponent)
  ],
})
export class ProductCreateComponentModule {}
