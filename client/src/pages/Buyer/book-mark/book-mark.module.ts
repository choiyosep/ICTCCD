import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookMarkPage } from './book-mark';

@NgModule({
  declarations: [
    BookMarkPage,
  ],
  imports: [
    IonicPageModule.forChild(BookMarkPage),
  ],
})
export class BookMarkPageModule {}

