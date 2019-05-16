import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPageComponent } from './mypage.component';

@NgModule({
  declarations: [
    MyPageComponent
  ],
  imports: [

    IonicPageModule.forChild(MyPageComponent)
  ]
})
export class MyPageComponentModule {}
