import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderRecordPage } from './order-record';

@NgModule({
  declarations: [
    OrderRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderRecordPage),
  ],
})


export class OrderRecordPageModule {}
