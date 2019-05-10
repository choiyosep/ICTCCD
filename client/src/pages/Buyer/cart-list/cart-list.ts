import {Component, EventEmitter} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Product} from "../../../core/model/Product"
import {Cart} from "../../../core/model/Cart";
import {CartService} from "../../../core/api/cart.service";

/**
 * Generated class for the CartListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(

)
@Component({
  selector: 'page-cart-list',
  templateUrl: 'cart-list.html',
})
export class CartListPage {

  cartProductArray: cartProduct[];
  totalPrice: number;
  allChecked: boolean;
  // dummy product
  private product1: Product;
  private product2: Product;
  private product3: Product;

  private cart: Cart ;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cartService : CartService) {
    this.totalPrice = 0;
    this.allChecked = false;

    this.product1 = new Product();
    this.product1.prodName="소보로빵",
    this.product1.salePrice=1000,
    this.product1.images.push("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Soboro-ppang.jpg/330px-Soboro-ppang.jpg");

    this.product2 = new Product();
    this.product2.prodName="단팥빵",
    this.product2.salePrice=1200,
    this.product2.images.push("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Soboro-ppang.jpg/330px-Soboro-ppang.jpg");

    this.product3 = new Product();
    this.product3.prodName="슈크림빵",
    this.product3.salePrice=900.
    this.product3.images.push("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Soboro-ppang.jpg/330px-Soboro-ppang.jpg");

    this. cartProductArray = [
      { product: this.product1, qnty: 2, checked: false },
      { product: this.product2, qnty: 1, checked: false },
      { product: this.product3, qnty: 3, checked: false },
    ];
    
    for(let product of this.cartProductArray) {
      this.totalPrice += product.product.salePrice * product.qnty;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartListPage');
}


  checked(ischecked: boolean) {
    if(!ischecked) {
      this.allChecked = false;
    }
  }

  checkedAll() {
    for (let product of this.cartProductArray) {
      product.checked = this.allChecked;
    }
  }


  order(){
    this.cartService.order(this.cart);
  }

}


class cartProduct {
  product: Product;
  qnty: number;
  checked: boolean;

}


// 버튼 활성화/비활성화
/*
var btn = document.getElementById('buyBtn') as HTMLInputElement;
var clickedCheck = document.getElementById('buyAgreement') as HTMLInputElement;
clickedCheck.onchange = function() {
  btn.disabled = !clickedCheck;
}
*/
