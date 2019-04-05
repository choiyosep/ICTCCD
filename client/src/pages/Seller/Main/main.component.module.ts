import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainComponent } from './main.component';
import {ProductCardComponent} from "./product-card/product-card";

@NgModule({
  declarations: [
    MainComponent,
    ProductCardComponent,
  ],
  imports: [
    IonicPageModule.forChild(MainComponent)
  ]
})
export class MainComponentModule {}
