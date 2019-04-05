import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPageModule} from "../pages/Account/login/login.module";
import {SessionService} from "../core/service/session.service";
import {AwsService} from "../core/service/aws.service";
import {ToastService} from "../core/service/toast.service";
import {HttpService} from "../core/service/http.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService,
    SessionService,
    ToastService,
    AwsService,
    HttpClient
  ]
})
export class AppModule {}
