import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateReviewPage } from './create-review';
//import { IonicRatingModule } from "ionic-rating";

@NgModule({
  declarations: [
    CreateReviewPage,
  ],
  imports: [
    //IonicRatingModule,
    IonicPageModule.forChild(CreateReviewPage),

],
})
export class CreateReviewPageModule {}
