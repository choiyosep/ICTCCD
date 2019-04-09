import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Product} from "../../../../../../core/model/Product";
import {ToastService} from "../../../../../../core/service/toast.service";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  contents: String;


  private product: Product;


  private amount: number = 0;

  constructor(private  navParams: NavParams,
              private navCtrl : NavController,
              private toastService : ToastService,
              private alertCtrl : AlertController
  ) {
    this.product = new Product();

    this.product.name="소보로빵";
    this.product.discountRate=20;
    this.product.originalPrice=1000;
    this.product.stock=10;
    this.product.discountPrice=800;
    this.product.images.push("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Soboro-ppang.jpg/330px-Soboro-ppang.jpg");
    this.product.images.push("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Soboro-ppang.jpg/330px-Soboro-ppang.jpg");

  }



  ionViewDidLoad() {

  }

  goToPage(str: string, product?:Product) {
    switch (str) {

    }
  }

  addButtonClicked() {
    this.amount++;
  }
  removeButtonClicked() {
    this.amount--;
  }

  cartAdd(){
    if(this.amount <=0 || this.amount> this.product.stock)
    {
      this.toastService.presentToast("수량을 정확히 입력하세요");
      return false;
    }


    let confirm = this.alertCtrl.create({
      title: '장바구니 담기 완료',
      subTitle: '장바구니로 이동하시겠습니까?',
      cssClass: '',
      buttons: [
        {
          text: '확인',
          cssClass: '',
          handler: () => {
            this.navCtrl.setRoot('CartListPage');
          }
        },
        {
          text: '취소',
          cssClass:'',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();


    //장바구니 추가 작업
  }



}
