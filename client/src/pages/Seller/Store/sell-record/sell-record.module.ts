import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellRecordPage } from './sell-record';

@NgModule({
  declarations: [
    SellRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(SellRecordPage),
  ],
})
export class SellRecordPageModule {}
