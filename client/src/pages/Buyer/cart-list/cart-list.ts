import {Component, EventEmitter} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Product} from "../../../core/model/Product"
import {Cart} from "../../../core/model/Cart";
import {CartService} from "../../../core/api/cart.service";
import {CartProduct} from "../../../core/model/CartProduct";

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

  allChecked: boolean;

  private cart: Cart ;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cartService : CartService) {

    this.cart = new Cart();

    let cartProduct1 = new CartProduct();
    cartProduct1.product.prodName = "소보로빵";
    cartProduct1.quantity = 2;
    cartProduct1.product.salePrice=1000;
    cartProduct1.product.images.push("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Soboro-ppang.jpg/330px-Soboro-ppang.jpg");


    let cartProduct2 = new CartProduct();
    cartProduct2.product.prodName = "단팥빵";
    cartProduct2.quantity = 1;
    cartProduct2.product.salePrice=1200;
    cartProduct2.product.images.push("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Soboro-ppang.jpg/330px-Soboro-ppang.jpg");


    let cartProduct3 = new CartProduct();
    cartProduct3.product.prodName = "슈크림빵";
    cartProduct3.quantity = 3;
    cartProduct3.product.salePrice=900;
    cartProduct3.product.images.push("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Soboro-ppang.jpg/330px-Soboro-ppang.jpg");

    this.cart.totalPrice = 5900;

    this.cart.products.push(cartProduct1);
    this.cart.products.push(cartProduct2);
    this.cart.products.push(cartProduct3);

    this.allChecked = false;


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
    for (let product of this.cart.products) {
      product.checked = this.allChecked;
    }
  }


  order(){
    this.cartService.order(this.cart);
  }

}

// 버튼 활성화/비활성화
/*
var btn = document.getElementById('buyBtn') as HTMLInputElement;
var clickedCheck = document.getElementById('buyAgreement') as HTMLInputElement;
clickedCheck.onchange = function() {
  btn.disabled = !clickedCheck;
}
*/
