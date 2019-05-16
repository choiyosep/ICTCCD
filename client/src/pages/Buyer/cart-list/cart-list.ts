import {Component, EventEmitter} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Product} from "../../../core/model/Product"
import {Cart} from "../../../core/model/Cart";
import {CartService} from "../../../core/api/cart.service";
import {CartProduct} from "../../../core/model/CartProduct";
import {ToastService} from "../../../core/service/toast.service";
import {Converter} from "../../../core/helper/converter";
import {SessionService} from "../../../core/service/session.service";

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
   deleteSelected: any[] = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cartService : CartService,
              private sessionService: SessionService,
  private alertCtrl: AlertController,
  private toastService: ToastService) {

    this.cart = new Cart();


    let cartProduct1 = new CartProduct();
    cartProduct1.product.prodName = "소보로빵";
    cartProduct1.quantity = 2;
    cartProduct1.product.salePrice=1000;
    cartProduct1.product.images.push("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Soboro-ppang.jpg/330px-Soboro-ppang.jpg");
    cartProduct1.checked=false;
   let cartProduct2 = new CartProduct();
    cartProduct2.product.prodName = "단팥빵";
    cartProduct2.quantity = 1;
    cartProduct2.product.salePrice=1200;
    cartProduct2.product.images.push("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Soboro-ppang.jpg/330px-Soboro-ppang.jpg");
    cartProduct2.checked=false;

    let cartProduct3 = new CartProduct();
    cartProduct3.product.prodName = "슈크림빵";
    cartProduct3.quantity = 3;
    cartProduct3.product.salePrice=900;
    cartProduct3.product.images.push("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Soboro-ppang.jpg/330px-Soboro-ppang.jpg");
    cartProduct3.checked=false;

    this.cart.totalPrice = 5900;

    this.cart.products.push(cartProduct1);
    this.cart.products.push(cartProduct2);
    this.cart.products.push(cartProduct3);

    this.allChecked = false;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartListPage');
}


  checked(item,ischecked: boolean) {
    if(!ischecked) {
      this.allChecked = false;
    } //item.checked=true;

  }

  checkedAll() {
    for (let product of this.cart.products) {
      product.checked = this.allChecked;
    }
  }


  order(){
    this.cartService.order(this.cart);
  }




  ionViewDidEnter(){
    //페이지가 처음 진입했을 때 실행하는 코드

    //session에 저장되있는, 로그인한 유저의 아이디를 받아온다.
    const id = this.sessionService.getValue("loginId");
    //서버로 id를 전송해서, 상점이 있는지 없는지 결과를 받아온다.
    this.cartService.get(id).subscribe((res) =>{
      if(res && res.code==1){
        this.cart=res.data;
        console.log(this.cart);

      }
    });
  }
  /*deletechecked(item){

    this.deleteSelected.push(item.index);

  }*/
  delete() {



    let confirm = this.alertCtrl.create({
      title: '삭제하시겠습니까??',
      subTitle: '',
      cssClass: '',
      buttons: [
        {
          text: '확인',
          cssClass: '',
          handler: () => {

            /*while(!this. cart.products[i].checked && i<this.cart.products.length){
              this.cart.products.splice(i, 1);
              i++;

            }*/
              for(let i=0; i < this.cart.products.length; i++){
               if( this. cart.products[i].checked==false) {
                 this.deleteSelected.push(this.cart.products[i])
                 //this.cart.products.splice(i, 1);
               }
              }



            //알림메시지
            this.toastService.presentToast('삭제 완료!!');

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
}



// 버튼 활성화/비활성화
/*
var btn = document.getElementById('buyBtn') as HTMLInputElement;
var clickedCheck = document.getElementById('buyAgreement') as HTMLInputElement;
clickedCheck.onchange = function() {
  btn.disabled = !clickedCheck;
}
*/
