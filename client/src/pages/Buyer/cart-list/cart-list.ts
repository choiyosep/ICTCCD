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
  private price: number;
  private cartNum: number;
  private data: {  cartNum: number ; prodNumList: any[]};
  private agreeState: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cartService : CartService,
              private sessionService: SessionService,
  private alertCtrl: AlertController,
  private toastService: ToastService) {

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


  order(price: number, cartNum : number){
 this.price= price;
 this.cartNum=cartNum;


 let confirm = this.alertCtrl.create({
      title: '결제 하시겠습니까?',
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
          text: '결제',
          cssClass:'del',
          handler: () => {
            console.log(this.price);
            console.log(this.cartNum);

            this.navCtrl.push("PayPage",{price: price, cartNum : cartNum});

        }
      }
    ]
  });
    confirm.present();
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
  all_delete(){

    let deleteSelected: any[] = [];

    for (let i = 0; i < this.cart.products.length; i++) {
        deleteSelected.push(this.cart.products[i].product.prodNum);
    }

    this.data = {
      "cartNum": this.cart.cartNum,
      "prodNumList":deleteSelected
    };


    let confirm = this.alertCtrl.create({
      title: '전체삭제 하시겠습니까?',
      subTitle: '',
      cssClass: 'storeDelete',
      buttons: [
        {
          text: '취소',
          cssClass: 'cancle',
          handler: () => {
            console.log("취소");
          }
        },
        {
          text: '삭제',
          cssClass:'del',
          handler: () => {
            this.cartService.cartDelete(this.data).subscribe(
              (res) =>{
                //응답오면
                if(res&&res.code!=undefined){
                  //성공시
                  if(res.code==1) {
                    this.navCtrl.setRoot("CartListPage");
                    this.toastService.presentToast("삭제 완료");
                  }else{
                    this.toastService.presentToast(res.msg);
                  }
                }
              }
            )
          }
        }
      ]
    });
    confirm.present();

  }
  delete() {

    let deleteSelected: any[] = [];

    console.log(this.cart.products);


    for (let i = 0; i < this.cart.products.length; i++) {
      if (this.cart.products[i].checked == true) {
        deleteSelected.push(this.cart.products[i].product.prodNum);
      }
    }

    this.data = {
      "cartNum": this.cart.cartNum,
      "prodNumList":deleteSelected
    };

    console.log(this.data);
    //
    // for(let i=0; i < this.deleteSelected.length; i++){
    //     this.deleteSelected.pop()
    //   }

    let confirm = this.alertCtrl.create({
      title: '삭제 하시겠습니까?',
      subTitle: '',
      cssClass: 'storeDelete',
      buttons: [
        {
          text: '취소',
          cssClass: 'cancle',
          handler: () => {
            console.log("취소");
          }
        },
        {
          text: '삭제',
          cssClass:'del',
          handler: () => {
            this.cartService.cartDelete(this.data).subscribe(
              (res) =>{
                //응답오면
                if(res&&res.code!=undefined){
                  //성공시
                  if(res.code==1) {
                    this.navCtrl.setRoot("CartListPage");
                    this.toastService.presentToast("삭제 완료");
                  }else{
                   this.toastService.presentToast(res.msg);
                  }
                }
              }
            )
          }
        }
      ]
    });
    confirm.present();
  }
}
