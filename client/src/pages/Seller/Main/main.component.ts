import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from "ionic-angular";

import {UserStore} from "../../../core/model/UserStore";
import {SessionService} from "../../../core/service/session.service";
import {Product} from "../../../core/model/Product";

/**
 * Generated class for the StoremainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
*/

@IonicPage({
  name: 'MainComponent',
  segment: 'main'
})
@Component({
  selector: 'page-main-ionic',
  templateUrl: 'main.component.html',
})
export class MainComponent{
  private userStore : UserStore;

  private products: Array<Product>;

  constructor( public navCtrl: NavController, public navParams: NavParams) {
    this.userStore= new UserStore();

    this.userStore.title="이솝베이커리";
    this.userStore.operatingHour="09:00~22:00";
    this.userStore.tel="031-123-1234";

    var product:Product = new Product();
    product.name = "소보로빵";
    product.discountPrice = 1000;
    product.stock = 10;
    product.discountRate = 20 ;

    this.products=[product,product,product,product];
  }

  goToPage(str: string, product_id?: Product) {
    switch (str) {
      case 'store-create':
        this.navCtrl.push('StoreCreateComponent');
        break;
      case 'store-detail' :
        this.navCtrl.push('StoreDetailComponent');
        break;
      case 'product-create':
        this.navCtrl.push('ProductCreateComponent');
        break;
      case 'product-modify' :
        this.navCtrl.push('ProductModifyComponent', {product_id : product_id});
        break;
      case 'mypage':
        this.navCtrl.push('MyPageComponent');
        break;

    }
  }


}
