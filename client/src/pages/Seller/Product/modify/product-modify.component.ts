import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from "ionic-angular";
import {Product} from "../../../../core/model/Product";

/**
 * Generated class for the StoreDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'ProductModifyComponent',
    segment: 'product/modify'
})
@Component({
  selector: 'page-product-modify',
  templateUrl: 'product-modify.component.html',
})
export class ProductModifyComponent{
  private product: Product;
  private items = [];


  private originalPrice: number;

  constructor(
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private toastCtrl : ToastController,
              public navCtrl: NavController
  ) {
    this.product= new Product();

    this.items.push(1);

  }

  toast(str: string = '') {
    this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: 'top'
    }).present();
  }
  modify(){

    if(this.items.length<2){
      this.toast("사진을 1장 이상 등록해주세요");
      return false;
    }

    if(this.product.name==undefined || this.product.name == ''){
      this.toast("상품명을 입력해주세요");
      return false;
    }

    if(this.product.originalPrice==undefined || this.product.originalPrice == null){
      this.toast("정상 가격을 입력해주세요");
      return false;
    }

    let confirm = this.alertCtrl.create({
      title: '변경사항을 저장 하시겠습니까?',
      subTitle: '',
      cssClass: 'storeDelete',
      buttons: [
        {
          text: '취소',
          cssClass: 'cancle',
          handler: () => {
          }
        },
        {
          text: '확인',
          cssClass: 'del',
          handler: () => {
            //수정작업
          }
        }
      ]
    });
    confirm.present();
  }



  goToPage(str: string) {
    switch (str) {
      case 'main' :
        this.navCtrl.setRoot('MainComponent');
        break;
    }
  }


  discountRateChanged( discountRate: number) {
    this.product.discountPrice= Math.round(this.product.originalPrice*((100-discountRate)/100));
  }

  discountPriceChanged(discountPrice: number) {
    this.product.discountRate =  (this.product.originalPrice - discountPrice)/this.product.originalPrice*100
  }

  addButtonClicked() {
    this.product.stock++;
  }
  removeButtonClicked() {
    this.product.stock--;
  }


  delete() {
    let confirm = this.alertCtrl.create({
      title: '상품을 삭제 하시겠습니까?',
      subTitle: '상품 삭제시 저장된<br>모든 데이터가 삭제됩니다',
      cssClass: 'storeDelete',
      buttons: [
        {
          text: '취소',
          cssClass: 'cancle',
          handler: () => {
          }
        },
        {
          text: '삭제',
          cssClass: 'del',
          handler: () => {
            //삭제작업
          }
        }
      ]
    });
    confirm.present();
  }

}
