import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StoreModifyComponent} from "./store-modify.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
@NgModule({
  declarations: [
    StoreModifyComponent
  ],
  imports: [
    IonicPageModule.forChild(StoreModifyComponent),
    NgbModule.forRoot()
  ]
})
export class StoreModifyComponentModule {}
