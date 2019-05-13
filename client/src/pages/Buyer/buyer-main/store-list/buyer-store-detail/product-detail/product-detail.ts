import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Product} from "../../../../../../core/model/Product";
import {ToastService} from "../../../../../../core/service/toast.service";
import {CartService} from "../../../../../../core/api/cart.service";
import {CartProduct} from "../../../../../../core/model/CartProduct";
import {SessionService} from "../../../../../../core/service/session.service";
import {RESPONSE_CODE} from "../../../../../../core/service/response.service";
import {Converter} from "../../../../../../core/helper/converter";

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

  private cartProduct: CartProduct;


  private amount: number = 0;

  constructor(private  navParams: NavParams,
              private navCtrl : NavController,
              private toastService : ToastService,
              private alertCtrl : AlertController,
              private cartService : CartService,
              private sessionService : SessionService
  ) {

    if(this.navParams.get("product")!=undefined){
      this.product = this.navParams.get("product");
    }

    console.log(this.navParams.get("product"));
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


      this.cartProduct = new CartProduct();
      //구매자 아이디 (로그인한 아이디)
      this.cartProduct.buyerId =
        this.sessionService.getValue("loginId");
      //판매자 아이디
      this.cartProduct.sellerId = this.product.sellerId;
      //상품 아이디
      this.cartProduct.prodNum = this.product.prodNum;
      //구매할 수량
      this.cartProduct.quantity = this.amount;
      //장바구니 담기
      this.cartService.cartAdd(this.cartProduct).subscribe((res)=>{
        if(res&&res.code == 1){
          this.product.stock -= this.amount;
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
        }
      });
  }

}
