import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from "ionic-angular";
import {Product} from "../../../../core/model/Product";
import{ProductService} from"../../../../core/api/product.service"

/**
 * Generated class for the StoreDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'ProductCreateComponent',
    segment: 'product/create'
})
@Component({
  selector: 'page-product-create',
  templateUrl: 'product-create.component.html',
})
export class ProductCreateComponent{
  contents: String;

  private product: Product;
  private items = [];

  constructor(
    private toastCtrl : ToastController,
    private productService :ProductService,
    public navCtrl: NavController,
    public navParams: NavParams,

  ) {

    this.product = new Product();

    this.product.stock=0;

    this.items.push(1);

  }



  ionViewDidLoad() {

    console.log('ionViewDidLoad productCreatePage');
  }


  toast(str: string = '') {
    this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: 'top'
    }).present();
  }
  back() {
    this.navCtrl.pop();
  }

  discountRateChanged(discountRate: number) {
    this.product.salePrice= Math.round(this.product.originalPrice*((100-discountRate)/100));
  }

  discountPriceChanged(salePrice: number) {
    this.product.discountRate =  (this.product.originalPrice - salePrice)/this.product.originalPrice*100
  }



  add(){


     if(this.items.length<2){
      this.toast("사진을 1장 이상 등록해주세요");
      return false;
    } 

    if(this.product.prodName==undefined || this.product.prodName == ''){
      this.toast("상품명을 입력해주세요");
      return false;
    }

    if(this.product.originalPrice==undefined || this.product.originalPrice == null){
      this.toast("정상 가격을 입력해주세요");
      return false;
    }



    if(this.product.salePrice==undefined || this.product.salePrice == null){
      this.toast("할인 정보를 입력해주세요");
      return false;
    }

    if(this.product.stock==undefined || this.product.stock == null || this.product.stock <= 0){
      this.toast("수량을 정확히 입력해주세요");
      return false;
    }

    //상점 추가작업
    this.productService.add(this.product).subscribe((res) =>{
      console.log(res);
    });
  }

  goToPage(str: string) {
    switch (str) {
      case 'main' :
        this.navCtrl.push('MainComponent');
        break;
    }
  }

  addButtonClicked() {
    this.product.stock++;
  }
  removeButtonClicked() {
    this.product.stock--;
  }

  imageDelete(i: number) {
    this.items.pop();
    this.product.images.splice(i, 1);
  }
}
