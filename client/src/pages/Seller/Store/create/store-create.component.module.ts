import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StoreCreateComponent} from "./store-create.component";
import {NgbModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    StoreCreateComponent,
  ],
  imports: [
    IonicPageModule.forChild(StoreCreateComponent),
    NgbModule.forRoot()
  ],
})
export class StoreCreateComponentModule {}
