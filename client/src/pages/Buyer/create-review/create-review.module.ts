import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateReviewPage } from './create-review';
//import {IonicRatingModule} from "ionic4-rating/dist";
@NgModule({
  declarations: [
    CreateReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateReviewPage),
    //IonicRatingModule
  ],
})
export class CreateReviewPageModule {}
