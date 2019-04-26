import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as AWSCognito from "amazon-cognito-identity-js";
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../core/service/toast.service";
import {SessionService} from "../../../core/service/session.service";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private idStatus;
  private passStatus;
  private loginForm: FormGroup;
  private loginFormErrors: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private toastService : ToastService,
              private sessionService : SessionService
              ) {
    this.loginFormErrors = {
      id: {},
      password: {}
    };
    this.loginForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  blur(type: string) {
    switch (type) {
      case 'id':
        this.idStatus = "normal";
        break;
      case 'pass':
        this.passStatus = "normal";
        break;
      default:
        break;
    }
  }

  onfocus(type: string) {
    switch (type) {
      case 'id':
        this.idStatus = "active";
        break;
      case 'pass':
        this.passStatus = "active";
        break;
      default:
        break;
    }
  }

  goToPage(str: string) {
    switch (str) {
      case 'sign-up' :
        this.navCtrl.push('SignupPage');
        break;
      case 'sellerMain':
        this.navCtrl.setRoot('StoreDetailComponent');
        break;
      case 'buyerMain':
        this.navCtrl.setRoot('BuyerMainPage');
    }
  }

  login(){

    new Promise((resolved, reject) => {

      const userPool = new AWSCognito.CognitoUserPool(environment._POOL_DATA);
      const login = this.loginForm.getRawValue();

      console.log(1);
      console.log(login);

      const authDetails = new AWSCognito.AuthenticationDetails({
        Username: login.id,
        Password: login.password
      });

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: login.id,
        Pool: userPool
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {
          const payload = result.getIdToken().payload;
          this.sessionService.init(
            {
              loginId: payload['cognito:username'],
              nickname: payload['nickname'],
              level: payload['custom:level']
            }
          )
          resolved(result);
        },
        onFailure: err => {
          console.log(err);
          reject(err);
        },
        newPasswordRequired: userAttributes => {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          userAttributes.email = login.id;
          delete userAttributes.email_verified;

          cognitoUser.completeNewPasswordChallenge(login.password, userAttributes, {
            onSuccess: (result) => {},
            onFailure: error => {
              reject(error);
            }
          });
        }
      });
    }).then((result)=> {
      console.log(result);
      //구매자회원이면
      if((result as any).idToken.payload['custom:level']==1){
        this.goToPage('buyerMain');
      }else { //판매자회원이면
        this.goToPage('sellerMain');
      }
      }
    ).catch(
      (err) => {
        console.log(err);
        this.toastService.presentToast(err.message);
      }
    );

  }

}
