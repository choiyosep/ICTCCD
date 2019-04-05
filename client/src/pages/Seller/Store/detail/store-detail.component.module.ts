import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StoreDetailComponent} from "./store-detail.component";

@NgModule({
  declarations: [
    StoreDetailComponent,
  ],
  imports: [
    IonicPageModule.forChild(StoreDetailComponent)
  ],
})
export class StoreDetailComponentModule {}
