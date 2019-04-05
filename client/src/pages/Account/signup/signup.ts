import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormHelper} from "../../../core/helper/form";

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
      phone: {},
      code: {},
    };
    this.userForm = this.formBuilder.group( {
      // 1
      id: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required]],
      phone: [''],
      code: [''],
    }, {validator: FormHelper.confirmPassword('pass', 'confirmPass')} );

    this.idStatus="normal";
    this.passStatus="normal";
    this.confirmPassStatus="normal";
    this.phoneStatus="normal";
    this.authStatus="normal";
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
    if(this.userFormErrors.id.email||this.userFormErrors.id.required){
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

  signup(){

  }
}
