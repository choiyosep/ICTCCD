import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormHelper} from "../../../core/helper/form";
import * as AWSCognito from "amazon-cognito-identity-js";
import {environment} from "../../../environments/environment";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private change$: any;
  private userForm: FormGroup;
  private idStatus;
  private passStatus;
  private confirmPassStatus;
  private userFormErrors: any;
  private phoneStatus;
  private authStatus;
  private nickNameStatus;


  private cognitoUser : any;

  // 사용할 User Pool의 정보를 담고있는 변수입니다.
  private _POOL_DATA = environment._POOL_DATA;
  private allowStep: number = 1;
  private userLevel: string = "1";



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              private app : App
  ) {

    this.userFormErrors = {
      id: {},
      pass: {},
      confirmPass: {},
      email: {},
      nickName: {},
    };
    this.userForm = this.formBuilder.group( {
      // 1
      id: ['', [Validators.required]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nickName : ['', [Validators.required]],
      code : [''],
    }, {validator: FormHelper.confirmPassword('pass', 'confirmPass')} );

    this.idStatus="normal";
    this.passStatus="normal";
    this.confirmPassStatus="normal";
    this.phoneStatus="normal";
    this.authStatus="normal";
    this.nickNameStatus="normal";

    this.userLevel="2";
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  toast(str: string = '') {
    this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: 'top'
    }).present();
  }

  onfocus(type: String) {
    switch(type){
      case 'id':
        if(this.idStatus!="error")
          this.idStatus="active";
        break;
      case 'pass':
        if(this.passStatus!="error")
          this.passStatus="active";
        break;
      case 'confirmPass':
        if(this.confirmPassStatus!="error")
          this.confirmPassStatus="active";
        break;
      case 'phone':
        if(this.phoneStatus!="error")
          this.phoneStatus="active";
        break;
      case 'auth':
        if(this.authStatus!="error")
          this.authStatus="active";
        break;
      case 'nickName':
        if(this.nickNameStatus!="error")
          this.nickNameStatus="active";
      default:
        break;
    }

  }

  blur(type: string) {
    switch(type){
      case 'id':
        if(this.idStatus!="error")
          this.idStatus="normal";
        break;
      case 'pass':
        if(this.passStatus!="error")
          this.passStatus="normal";
        break;
      case 'confirmPass':
        if(this.confirmPassStatus!="error")
          this.confirmPassStatus="normal";
        break;
      case 'phone':
        if(this.phoneStatus!="error")
          this.phoneStatus="normal";
        break;
      case 'auth':
        if(this.authStatus!="error")
          this.authStatus="normal";
        break;
      case 'nickName':
        if(this.nickNameStatus!="error")
          this.nickNameStatus="normal";
      default:
        break;
    }

  }



  checkPass() {
    if(this.userFormErrors.pass.minlength || this.userFormErrors.pass.required){
      this.passStatus = "error";
    }else{
      this.passStatus="active";
    }
  }

  checkConfirmPass() {
    if(this.userForm.hasError('mismatchedPasswords')||this.userFormErrors.confirmPass.required){
      this.confirmPassStatus="error";
    }else{
      this.confirmPassStatus="active";
    }
  }

  checkId() {
    if(this.userFormErrors.id.required){
      this.idStatus="error";
    }else{
      this.idStatus="active";
    }
  }

  goToPage(str: string) {
    switch (str) {
      case 'login' :
        this.navCtrl.setRoot('LoginPage');
        break;
    }
  }


  sendAuthCode() {
    if(!this.userForm.valid){
      this.toast('정보를 빠짐없이 입력해주세요');
      return false;
    }

    if(!this.userForm.getRawValue().email) {
      this.toast('이메일을 입력해주세요.');
      return false;
    }

    const rawValue = this.userForm.getRawValue();



    new Promise((resolved, reject) => {
      // 입력한 User Pool 정보를 가지고 실제 User Pool에 접근할 수 있는 객체를 만듭니다.
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      console.log(1);
      console.log(userPool);

      let userAttribute = [];

      userAttribute.push(
        new AWSCognito.CognitoUserAttribute(
          { Name: "email", Value: rawValue.email },

        ),new AWSCognito.CognitoUserAttribute(
          { Name: "nickname", Value: rawValue.nickName },

        )
        ,new AWSCognito.CognitoUserAttribute(
          {Name:"custom:level", Value: this.userLevel},
        )
      );

      console.log(2);
      console.log(userAttribute);

      // 전역변수로 만들어 놓은 User Pool 객체에서는 signup 함수를 제공합니다.
      // 인자는 User name(ID ) Password, Attribute List, null(무슨 자리인지 모르겠어요..확인해야합니다.ㅎㅎ), 처리 결과가 오면 수행 될 callback 함수 입니다.
      userPool.signUp(rawValue.id, rawValue.pass, userAttribute, null,
        (err, result) => {
          if (err) {
            console.log("err!");
            console.log(err);
            reject(err);
          } else {
            console.log("result!!");
            console.log(result);
            this.cognitoUser = result.user;
            this.toast('인증번호가 전송되었습니다');
            this.allowStep = 2;
            resolved(result);
          }
        });
    }
    ).catch(
      (err) =>{
        this.toast(err.message);
      }
    )

  }




  authencateAndSignup() {
    if(!this.userForm.getRawValue().code) {
      this.toast('인증코드를 입력해주세요.');
      return false;
    }

    this.cognitoUser.confirmRegistration(this.userForm.getRawValue().code,true,
      (err, result)=>{
        if (err) {
          this.toast('인증번호가 일치하지 않습니다.');
          console.log(err);
          return;
        }
        // 인증이 성공하면 SUCCESS 문자가 되돌아 옵니다.
        console.log(result);
        this.toast('인증번호 확인!! 가입을 축하합니다!!');
        this.navCtrl.pop();
      });


  }

  segmentChanged(ev) {
    // this.userForm.setValue({'level':ev.value});
    // console.log(this.userForm.getRawValue().level);
  }
}
